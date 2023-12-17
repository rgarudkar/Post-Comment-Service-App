// Importing necessary components and routing utilities from React and react-router-dom
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import AuthPage from "./pages/AuthPage/AuthPage";
import PageLayout from "./Layouts/PageLayout/PageLayout";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";

function App() {
  // Using the useAuthState hook to track the authentication state
  const [authUser] = useAuthState(auth);

  return (
    <PageLayout>
      {/* Defining the routes for the application */}
      <Routes>
        {/* Route for the home page, conditionally rendering HomePage or navigating to the auth page */}
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/auth" />}
        />
        {/* Route for the authentication page, conditionally rendering AuthPage or navigating to the home page */}
        <Route
          path="/auth"
          element={!authUser ? <AuthPage /> : <Navigate to="/" />}
        />
        {/* Route for user profiles, rendering the ProfilePage component */}
        <Route path="/:username" element={<ProfilePage />} />
      </Routes>
    </PageLayout>
  );
}

export default App;
