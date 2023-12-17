// Importing the create function from Zustand for creating a store
import { create } from "zustand";
// Defining a Zustand store for managing authentication-related state
const useAuthStore = create((set) => ({
  // Initializing the 'user' state with the user information retrieved from localStorage
  user: JSON.parse(localStorage.getItem("user-info")),
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
  setUser: (user) => set({ user }),
}));
export default useAuthStore;
