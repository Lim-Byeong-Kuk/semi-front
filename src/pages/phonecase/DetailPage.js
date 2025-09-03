import React from "react";
import DetailComponent from "../../components/phonecase/DetailComponent";
import Footer from "../../components/headerfooter/Footer";
import Header from "../../components/headerfooter/Header";

const DetailPage = () => {
  return (
    <div>
      <Header isSticky={false} />
      <DetailComponent />
      <Footer />
    </div>
  );
};

export default DetailPage;
