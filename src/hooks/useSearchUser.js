import { useState } from "react";
import useShowToast from "./useShowToast";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

// Custom hook for searching user profiles
const useSearchUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const showToast = useShowToast();

  // Async function to get user profile by username
  const getUserProfile = async (username) => {
    setIsLoading(true);
    setUser(null);
    try {
      // Creating a Firestore query to search for users by username
      const q = query(
        collection(firestore, "users"),
        where("username", "==", username)
      );

      // Fetching the documents that match the query
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty)
        return showToast("Error", "User not found", "error");
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (error) {
      showToast("Error", error.message, "error");
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };
  return { isLoading, getUserProfile, user, setUser };
};

export default useSearchUser;
