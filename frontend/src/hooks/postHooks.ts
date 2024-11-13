import { useMutation, useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../utils/constants";
import Axios, { AxiosError } from "axios";
import useAppStore from "../stores/AppStore";
import { handleErrors } from "../utils/handlersAndFormatters";
import { useNavigate } from "react-router-dom";
import { useState, useTransition } from "react";
import { enqueueSnackbar } from "notistack";

export const usePostAPost = (onSucces: () => void) => {
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
          onSucces(); // The main purpose of this function it's to reinitialize the state of the post form
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

export const useGetPosts = () => {
  const { addPosts } = useAppStore();
  const [on_fetch_posts_transition, startTransition] = useTransition();

  const { isFetching, isError, isSuccess } = useQuery({
    queryKey: ["post"],
    queryFn: async () => {
      try {
        const response = await Axios.get(BASE_URL.concat(`/post`), {
          withCredentials: true,
        });

        if (response.status < 400) {
          startTransition(() => addPosts(response.data));
        }

        return response.data;
      } catch (e) {
        handleErrors(e as AxiosError);
      }
    },
  });

  return { isFetching, isError, isSuccess, on_fetch_posts_transition };
};

export const useCountUpdators = (postId: string) => {
  const updatePosts = useAppStore((state) => state.updatePosts);

  const [likeState, setLikeState] = useState<"pending" | "stable">("stable");
  const [on_like_updating_state, startLikeTransition] = useTransition();

  const [dislikeState, setDislikeState] = useState<"pending" | "stable">(
    "stable"
  );
  const [on_dislike_updating_state, startDislikeTransition] = useTransition();

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
          startLikeTransition(() => updatePosts(response.data));
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
          startDislikeTransition(() => updatePosts(response.data));
        }
      } catch (e) {
        enqueueSnackbar("An error occured trying to dislike this post !");
      } finally {
        setDislikeState("stable");
      }
    },
    likeState,
    dislikeState,
    on_like_updating_state,
    on_dislike_updating_state,
  };
};

export const useDeletePost = () => {
  const [on_delete_updating_state, startTransition] = useTransition();
  const deletePost = useAppStore((state) => state.deletePost);

  const { mutate, isPending } = useMutation({
    mutationKey: ["post"],
    mutationFn: async (id: string) => {
      try {
        const response = await Axios.delete(BASE_URL.concat(`/post/${id}`), {
          withCredentials: true,
        });

        if (response.status === 204) {
          startTransition(() => deletePost(id));
        }
      } catch (e) {
        handleErrors(e as AxiosError);
        return e;
      }
    },
  });

  return { mutate, isPending, on_delete_updating_state };
};
