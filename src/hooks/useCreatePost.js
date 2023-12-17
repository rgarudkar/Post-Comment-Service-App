import { useState } from "react";
import axios from "axios";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";
import usePostStore from "../store/postStore";
import useUserProfileStore from "../store/userProfileStore";
import { useLocation } from "react-router-dom";

function useCreatePost() {
  const showToast = useShowToast();
  const [isLoading, setIsLoading] = useState(false);
  const authUser = useAuthStore((state) => state.user);
  const createPost = usePostStore((state) => state.createPost);
  const addPost = useUserProfileStore((state) => state.addPost);
  const userProfile = useUserProfileStore((state) => state.userProfile);
  const { pathname } = useLocation();

  const handleCreatePost = async (content) => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/posts/create",
        {
          content: content,
          createdBy: authUser.uid,
        }
      );
      const newPost = response.data.newPost
      const postDocRefId = response.data.postDocRefId
      if (userProfile.uid === authUser.uid)
        createPost({ ...newPost, id: postDocRefId });
      if (pathname !== "/" && userProfile.uid === authUser.uid)
        addPost({ ...newPost, id: postDocRefId  });
      showToast("Success", "Post created successfully", "success");
    } catch (error) {
      console.log(error)
      showToast(
        "Error",
        error.response?.data?.error || "An error occurred",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, handleCreatePost };
}

export default useCreatePost;
