import { useMutation } from "@tanstack/react-query";
import Axios, { AxiosError } from "axios";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { type StateUserType } from "../types/interfaces";
import useAppStore from "../stores/AppStore";
import { enqueueSnackbar } from "notistack";
import { lsWrite } from "../db/ls.io";
import { type User } from "../types/interfaces";
import { useState } from "react";
import { handleErrors } from "../utils/handlersAndFormatters";

export const useCreateAccount = () => {
  const navigateTo = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationKey: ["user", "auth"],
    mutationFn: async (data: StateUserType) => {
      try {
        const response = await Axios.post(BASE_URL.concat("/user"), data);
        if (response.status === 201) {
          navigateTo("/auth/login");
          enqueueSnackbar("Account successfully created, log in !");
        }
      } catch (e) {
        handleErrors(e as AxiosError);
      }
    },
  });

  return { mutate, isPending };
};

export const useLogUserIn = () => {
  const navigateTo = useNavigate();
  const setAuth = useAppStore((state) => state.setAuth);
  const { mutate, isPending } = useMutation({
    mutationKey: ["user", "auth"],
    mutationFn: async (data: StateUserType) => {
      try {
        const response = await Axios.post(BASE_URL.concat("/user/auth"), data, {
          withCredentials: true,
        });
        if (response.status < 400) {
          // Store the current authenticated user in a state
          setAuth(response.data as User);

          // Store the user that logged in in indexedDB so we have access to his data
          // later on
          lsWrite("socme-auth", response.data);

          // Navigate to the Feed main page
          navigateTo("/");
        } else {
          throw new AxiosError("BAD_RESPONSE");
        }
      } catch (e) {
        handleErrors(e as AxiosError);
      }
    },
  });

  return { mutate, isPending };
};

export const useUpdateUserProfile = () => {
  const setAuth = useAppStore((state) => state.setAuth);
  const navigateTo = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationKey: ["user", "profile"],
    mutationFn: async (data: Partial<StateUserType>) => {
      try {
        const response = await Axios.patch(BASE_URL.concat("/user"), data, {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log(response.data);

        lsWrite("socme-auth", response.data);

        if (response.status === 200) {
          setAuth(response.data as User);
          navigateTo("/");
        }

        return response.data;
      } catch (e) {
        handleErrors(e as AxiosError);
      }
    },
  });

  return { mutate, isPending };
};

export const useLogUserOut = () => {
  const [status, setStatus] = useState<
    "pending" | "stable" | "success" | "error"
  >("stable");
  const navigateTo = useNavigate();

  return {
    logout: async function () {
      setStatus("pending");
      try {
        const response = await Axios.get(BASE_URL.concat("/user/auth"), {
          withCredentials: true,
        });

        if (response.status == 204) {
          navigateTo("/auth/login");
          setStatus("success");
        } else {
          setStatus("stable");
        }

        return response.data;
      } catch (e) {
        setStatus("error");
        handleErrors(e as AxiosError);
      }
    },
    status,
  };
};
