import React from "react";
import Header from "./Header";
import { FaUser, FaShoppingCart } from "react-icons/fa";

const NavBar = () => {
  return (
    <>
      <Header />
      <nav className="w-full bg-gray-50 sticky top-0 z-50 shadow-sm">
        <div className="relative max-w-7xl mx-auto h-8 leading-8">
          {/* 메뉴 리스트 */}
          <ul className="absolute left-1/2 -translate-x-1/2 flex gap-7 whitespace-nowrap text-[10px] font-semibold text-gray-700">
            <li className="cursor-pointer">방탄케이스</li>
            <li className="cursor-pointer">젤리케이스</li>
            <li className="cursor-pointer">카드케이스</li>
            <li className="cursor-pointer">하드케이스</li>
            <li className="cursor-pointer">Z플립 시리즈</li>
            <li className="cursor-pointer">에어팟케이스</li>
            <li className="cursor-pointer">아크릴/스마트톡</li>
          </ul>

          {/* 아이콘 그룹 */}
          <div
            className="absolute top-0 bottom-0 flex items-center gap-4 text-gray-500 text-lg"
            style={{ right: "48px" }}
          >
            <span className="cursor-pointer">
              <FaUser title="마이페이지" />
            </span>
            <span className="cursor-pointer">
              <FaShoppingCart title="장바구니" />
            </span>
          </div>
        </div>
      </nav>
      임시 컨텐츠
      <div style={{ height: "1500px", backgroundColor: "#f9f9f9" }} />
    </>
  );
};

export default NavBar;
