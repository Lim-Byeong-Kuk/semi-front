import React from "react";
import { FaArrowLeft, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom"; // react-router-dom 쓰실 경우

const CheckoutHeader = () => {
  return (
    <div className="bg-white border-b sticky top-0 z-50 p-4">
      <div className="max-w-2xl mx-auto relative flex flex-col items-center">
        {/* 로고 */}
        <Link
          to="/"
          className="text-3xl font-extrabold text-black mb-6 cursor-pointer"
        >
          CASE
        </Link>

        {/* 주문/결제 텍스트 */}
        <h1 className="text-lg font-semibold mb-3">주문/결제</h1>

        {/* 뒤로가기 버튼 */}
        <button
          className="absolute left-0 top-0 text-gray-500"
          aria-label="뒤로가기"
        >
          <FaArrowLeft size={20} />
        </button>

        {/* 마이페이지 버튼 */}
        <button
          className="absolute right-0 top-0 text-gray-500"
          aria-label="마이페이지"
        >
          <FaUser size={20} />
        </button>
      </div>
    </div>
  );
};

export default CheckoutHeader;
