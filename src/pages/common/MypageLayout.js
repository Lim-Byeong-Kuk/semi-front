import React from "react";
import Header from "../../components/headerfooter/Header";
import MyPageComponent from "../../components/common/MyPageComponent";
import Footer from "../../components/headerfooter/Footer";

const MypageLayout = () => {
  return (
    <div>
      <Header />
      <MyPageComponent />
      <Footer />
    </div>
  );
};

export default MypageLayout;
