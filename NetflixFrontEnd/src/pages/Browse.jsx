import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Banner from "../components/Banner/Banner";
import BrowseHeader from "../components/Header/BrowseHeader";
import DisplayRow from "../components/DisplayRow/DisplayRow";
import Footer from "../components/Footer/Footer";
import * as authApi from "../services/authApi";

function Browse() {
  const [authChecked, setAuthChecked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      try {
        await authApi.getMe();

        if (isMounted) {
          setAuthChecked(true);
        }
      } catch {
        if (isMounted) {
          navigate("/", { replace: true });
        }
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await authApi.logout();
    } finally {
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
