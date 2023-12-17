import { useState } from "react";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import usePostStore from "../store/postStore";
import { v4 as uuid } from "uuid";
import axios from "axios";

//Function handles saving comments on database by making a document of comment according to Userid
const usePostComment = () => {
  const [isCommenting, setIsCommenting] = useState(false);
  const showToast = useShowToast();
  const authUser = useAuthStore((state) => state.user);
  const addComment = usePostStore((state) => state.addComment);

  const handlePostComment = async (postId, comment) => {
    if (isCommenting) return;
    if (!authUser)
      return showToast("Error", "You must be logged in to comment", "error");
    setIsCommenting(true);
    try {
      const newComment = {
        id: uuid(),
        comment,
        createdAt: Date.now(),
        createdBy: authUser.uid,
        postId,
      };
      console.log(newComment);
      const response = await axios.post(
        "http://localhost:5000/api/post/comment", //API Post Request to create new comments
        {
          postId: postId,
          comment: newComment,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      addComment(postId, newComment);
    } catch (error) {
      console.log(error);
      showToast("Error", error.message, "error");
    } finally {
      setIsCommenting(false);
    }
  };

  return { isCommenting, handlePostComment };
};

export default usePostComment;
