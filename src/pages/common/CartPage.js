import React from "react";
import CartComponent from "../../components/common/CartComponent";
import Header from "../../components/headerfooter/Header";
import Footer from "../../components/headerfooter/Footer";

const CartPage = () => {
  return (
    <div>
      <Header />
      <CartComponent />
      <Footer />
    </div>
  );
};

export default CartPage;
