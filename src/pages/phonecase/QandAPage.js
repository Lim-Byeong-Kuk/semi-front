import React from "react";
import DetailComponent from "../../components/phonecase/DetailComponent";
import Footer from "../../components/headerfooter/Footer";
import Header from "../../components/headerfooter/Header";
import QandAComponent from "../../components/phonecase/QandAComponent";

const DetailPage = () => {
  return (
    <div>
      <Header />
      <QandAComponent />
      <Footer />
    </div>
  );
};

export default DetailPage;
