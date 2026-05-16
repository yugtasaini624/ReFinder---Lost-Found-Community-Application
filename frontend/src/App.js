import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import MainLayout from "./components/MainLayout";
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import About from "./pages/About";
import LostItems from "./pages/LostItems";
import FoundItems from "./pages/FoundItems";
import HowItWorks from "./pages/HowItWorks";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import TermsAndConditions from "./pages/TermsAndConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import FAQs from "./pages/FAQs";
import HowToPost from "./pages/HowToPost";
import UploadLostItems from "./pages/UploadLostItems";
import UploadFoundItems from "./pages/UploadFoundItems";
import MyItems from "./pages/MyItems";
import FoundDetails from "./pages/FoundDetails";
import ContactPage from "./pages/ContactPage";
import CategoryPage from "./pages/CategoryPage";
import SearchResults from "./pages/SearchResults";
import AddSuccessStory from "./pages/AddSuccessStory";
import Details from "./pages/Details";

function App() {

  // =========================
  // LOGIN STATE
  // =========================
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // =========================
  // CHECK TOKEN ON LOAD
  // =========================
  useEffect(() => {

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const token = localStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

  }, []);

  return (
    <>

      <ScrollToTop />

      <Routes>

        {/* ========================= */}
        {/* PUBLIC ROUTES */}
        {/* ========================= */}

        <Route
          path="/login"
          element={
            <Login
              setIsLoggedIn={setIsLoggedIn}
            />
          }
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        {/* ========================= */}
        {/* MAIN LAYOUT */}
        {/* ========================= */}

        <Route
          path="/*"
          element={

            <MainLayout
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
            >

              <Routes>

                {/* PUBLIC ROUTES */}

                <Route path="/" element={<Home />} />

                <Route
                  path="/about"
                  element={<About />}
                />

                <Route
                  path="/lostItems"
                  element={<LostItems />}
                />

                <Route
                  path="/foundItems"
                  element={<FoundItems />}
                />

                <Route
                  path="/work"
                  element={<HowItWorks />}
                />

                <Route
                  path="/contact"
                  element={<Contact />}
                />

                <Route
                  path="/terms&conditions"
                  element={<TermsAndConditions />}
                />

                <Route
                  path="/privacypolicy"
                  element={<PrivacyPolicy />}
                />

                <Route
                  path="/faqs"
                  element={<FAQs />}
                />

                <Route
                  path="/howtopost"
                  element={<HowToPost />}
                />

                <Route
                  path="/lost/:id"
                  element={<Details />}
                />

                <Route
                  path="/found/:id"
                  element={<FoundDetails />}
                />

                <Route
                  path="/contact/:id"
                  element={<ContactPage />}
                />

                <Route
                  path="/category/:category"
                  element={<CategoryPage />}
                />

                <Route
                  path="/search-results"
                  element={<SearchResults />}
                />

                {/* ========================= */}
                {/* PROTECTED ROUTES */}
                {/* ========================= */}

                <Route
                  path="/upload/lostitem"
                  element={
                    <ProtectedRoute>
                      <UploadLostItems />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/upload/founditem"
                  element={
                    <ProtectedRoute>
                      <UploadFoundItems />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/user/myitems"
                  element={
                    <ProtectedRoute>
                      <MyItems />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/user/story"
                  element={
                    <ProtectedRoute>
                      <AddSuccessStory />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Home />
                    </ProtectedRoute>
                  }
                />

              </Routes>

            </MainLayout>
          }
        />

      </Routes>

      {/* ========================= */}
      {/* TOAST */}
      {/* ========================= */}

      <ToastContainer
        position="top-right"
        autoClose={2500}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
      />

    </>
  );
}

export default App;