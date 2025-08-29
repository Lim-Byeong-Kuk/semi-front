import React from "react";
import NavBar from "../components/headerfooter/Navbar";
import Footer from "../components/headerfooter/Footer";
import MainComponent from "../components/main/MainComponent";

const HomePage = () => {
  return (
    <div>
      <NavBar />
      <MainComponent/>
      <Footer />
    </div>
  );
};

export default HomePage;
