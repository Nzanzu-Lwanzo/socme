import { useMutation } from "@tanstack/react-query";
import Axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { type UserToAuthenticateStateType } from "../types/types";
import useAppStore from "../stores/AppStore";
import { User } from "../types/interfaces";

export const useCreateAccount = () => {
  const navigateTo = useNavigate();
  const setAuth = useAppStore((state) => state.setAuth);
  const { mutate, isPending } = useMutation({
    mutationKey: ["user", "auth"],
    mutationFn: async (data: UserToAuthenticateStateType) => {
      const response = await Axios.post(BASE_URL.concat("/user"), data);
      if (response.status === 201) {
        setAuth(response.data as User);
        navigateTo("/");
      }
    },
  });

  return { mutate, isPending };
};
