import { useMutation, useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../utils/constants";
import Axios, { AxiosError } from "axios";
import useAppStore from "../stores/AppStore";
import { handleErrors } from "../utils/handlersAndFormatters";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { enqueueSnackbar } from "notistack";

export const usePostAPost = () => {
  const addPost = useAppStore((state) => state.addPost);
  const navigateTo = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationKey: ["post"],
    mutationFn: async (data: FormData) => {
      try {
        const response = await Axios.post(BASE_URL.concat("/post"), data, {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 201) {
          addPost(response.data);
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

export const useGetAllPosts = () => {
  const addPosts = useAppStore((state) => state.addPosts);

  const { isFetching, isError, isSuccess } = useQuery({
    queryKey: ["post"],
    queryFn: async () => {
      try {
        const response = await Axios.get(BASE_URL.concat("/post"), {
          withCredentials: true,
        });

        if (response.status < 400) {
          addPosts(response.data);
        }

        return response.data;
      } catch (e) {
        handleErrors(e as AxiosError);
      }
    },
  });

  return { isFetching, isError, isSuccess };
};

export const useCountUpdators = (postId: string) => {
  const updatePosts = useAppStore((state) => state.updatePosts);

  const [likeState, setLikeState] = useState<"pending" | "stable">("stable");

  const [dislikeState, setDislikeState] = useState<"pending" | "stable">(
    "stable"
  );

  return {
    likePost: async () => {
      try {
        setLikeState("pending");
        const response = await Axios.patch(
          BASE_URL.concat("/post/like"),
          { postId },
          {
            withCredentials: true,
          }
        );

        if (response.status < 400) {
          updatePosts(response.data);
        }
      } catch (e) {
        enqueueSnackbar("An error occured trying to like this post !");
      } finally {
        setLikeState("stable");
      }
    },

    dislikePost: async () => {
      try {
        setDislikeState("pending");
        const response = await Axios.patch(
          BASE_URL.concat("/post/dislike"),
          { postId },
          {
            withCredentials: true,
          }
        );

        if (response.status < 400) {
          updatePosts(response.data);
        }
      } catch (e) {
        enqueueSnackbar("An error occured trying to dislike this post !");
      } finally {
        setDislikeState("stable");
      }
    },
    likeState,
    dislikeState,
  };
};
