import { useMutation, useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../utils/constants";
import Axios, { AxiosError } from "axios";
import useAppStore from "../stores/AppStore";
import { handleErrors } from "../utils/handlersAndFormatters";
import { useNavigate } from "react-router-dom";
import { useState, useTransition } from "react";
import { enqueueSnackbar } from "notistack";
import useFeedFormStore from "../stores/FeedFormStore";

export const usePostAPost = (onSucces?: () => void) => {
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
          if (onSucces) onSucces(); // The main purpose of this function it's to reinitialize the state of the post form
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

  const navigateTo = useNavigate();

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
        const error = e as AxiosError;
        handleErrors(error);

        if (error.status === 401) {
          navigateTo("/auth/login");
        }
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

export const useUpdatePost = (id: string) => {
  const { updatePosts, setModal } = useAppStore();
  const [on_update_post_transition, startTransition] = useTransition();

  const { mutate, isPending } = useMutation({
    mutationKey: ["post", "update"],
    mutationFn: async (data: FormData) => {
      try {
        const response = await Axios.patch(
          BASE_URL.concat(`/post/${id}`),
          data,
          { withCredentials: true }
        );

        if (response.status < 400) {
          startTransition(() => updatePosts(response.data));
          setModal(null);
        }
      } catch (e) {
        handleErrors(e as AxiosError);
      }
    },
  });

  return { mutate, isPending, on_update_post_transition };
};

export const useDeleteCloudImage = () => {
  const [status, setStatus] = useState<"stable" | "error" | "pending">(
    "stable"
  );
  const updatePosts = useAppStore((state) => state.updatePosts);
  const [on_update_post_transition, startTransition] = useTransition();

  const deleteImageFromPostToUpdate = useFeedFormStore(
    (state) => state.deleteImageFromPostToUpdate
  );

  return {
    requestDeletion: async (post_id: string, public_id: string) => {
      setStatus("pending");
      try {
        const response = await Axios.delete(
          BASE_URL.concat(`/post/${post_id}/${public_id}`),
          { withCredentials: true }
        );

        if (response.status === 200) {
          deleteImageFromPostToUpdate(public_id);
          startTransition(() => updatePosts(response.data));
        }
      } catch (e) {
        enqueueSnackbar("Error trying to delete an image !");
      } finally {
        setStatus("stable");
      }
    },
    status,
    on_update_post_transition,
  };
};

export const useFilterAndSearch = () => {
  return {
    showAll: () => {},
    showMyPosts: () => {},
    showPostByAuthor: (e: string) => {
      e.toLocaleLowerCase();
    },

    showPostByTextContent: (e: string) => {
      e.toLocaleLowerCase();
    },
  };
};

export const usePostComment = (onSucces: () => void) => {
  const updatePosts = useAppStore((state) => state.updatePosts);

  const { mutate, isPending } = useMutation({
    mutationKey: ["comment"],
    mutationFn: async ({
      comment,
      postId,
    }: {
      comment: string;
      postId: string;
    }) => {
      try {
        const response = await Axios.post(
          BASE_URL.concat(`/post/comment/${postId}`),
          { comment },
          { withCredentials: true }
        );

        if (response.status === 201) {
          updatePosts(response.data);
          onSucces();
        }
      } catch (e) {
        handleErrors(e as AxiosError);
      }
    },
  });

  return { mutate, isPending };
};

export const useDeletePostComment = () => {
  const deletePostComment = useAppStore((state) => state.deletePostComment);

  const [status, setStatus] = useState<"stable" | "error" | "pending">(
    "stable"
  );

  return {
    requestDeletion: async (commentId: string, postId: string) => {
      try {
        setStatus("pending");
        const response = await Axios.delete(
          BASE_URL.concat(`/post/comment/${postId}/${commentId}`),
          { withCredentials: true }
        );

        if (response.status === 204) {
          deletePostComment(postId, commentId);
        }

        setStatus("stable");
      } catch (e) {
        setStatus("error");
        handleErrors(e as AxiosError);
      }
    },
    status,
  };
};
