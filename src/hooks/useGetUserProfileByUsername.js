import { useEffect, useState } from "react";
import axios from "axios";
import useShowToast from "./useShowToast";
import useUserProfileStore from "../store/userProfileStore";

const useGetUserProfileByUsername = (username) => {
  const [isLoading, setIsLoading] = useState(true);
  const showToast = useShowToast();
  const { userProfile, setUserProfile } = useUserProfileStore();

  useEffect(() => {
    const getUserProfile = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/api/user-profile/${username}`
        );
        setUserProfile(response.data);
      } catch (error) {
        showToast(
          "Error",
          error.response?.data?.error || "An error occurred",
          "error"
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (username) {
      getUserProfile();
    }
  }, [username, showToast, setUserProfile]);

  return { isLoading, userProfile };
};

export default useGetUserProfileByUsername;
