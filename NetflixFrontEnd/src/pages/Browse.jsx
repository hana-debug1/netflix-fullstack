import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Banner from "../components/Banner/Banner";
import BrowseHeader from "../components/Header/BrowseHeader";
import DisplayRow from "../components/DisplayRow/DisplayRow";
import Footer from "../components/Footer/Footer";

import * as authApi from "../services/authApi";
import { setUser, clearUser } from "../features/user/userSlice.js";

function Browse() {
  const [authChecked, setAuthChecked] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      try {
        const data = await authApi.getMe();

        if (isMounted) {
          dispatch(setUser(data.user));
          setAuthChecked(true);
        }
      } catch (error) {
        if (isMounted) {
          dispatch(clearUser());
          navigate("/", { replace: true });
        }
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, [navigate, dispatch]);

  const handleLogout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      dispatch(clearUser());
      navigate("/", { replace: true });
    }
  };

  if (!authChecked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        Checking session...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <BrowseHeader onLogout={handleLogout} />

      <Banner />

      <DisplayRow />

      <Footer />
    </div>
  );
}

export default Browse;
