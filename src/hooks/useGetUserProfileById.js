import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import axios from "axios";

//Function to fetch user profile by user id
const useGetUserProfileById = (userId) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);

  const showToast = useShowToast();
  useEffect(() => {
    const getUserProfile = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/api/user-profile/id/${userId}` //API Get request to get user profile using user id
        );
        setUserProfile(response.data);
      } catch (error) {
        console.log(error);
        showToast(
          "Error",
          error.response?.data?.error || "An error occurred",
          "error"
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      getUserProfile();
    }
  }, [userId, showToast]);

  return { userProfile, isLoading };
};

export default useGetUserProfileById;
