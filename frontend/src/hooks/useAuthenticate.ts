import { useMutation } from "@tanstack/react-query";
import Axios from "axios";
import { BASE_URL } from "../utils/constants";
import { type UserToCreate } from "../types/interfaces";
import { useNavigate } from "react-router-dom";

export const useCreateAccount = () => {
  const navigateTo = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationKey: ["user", "auth"],
    mutationFn: async (data: UserToCreate) => {
      const response = await Axios.post(BASE_URL.concat("/user"), data);
      if (response.status === 201) {
        navigateTo("/");
      }
    },
  });

  return { mutate, isPending };
};
