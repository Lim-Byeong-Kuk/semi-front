import React, { useState } from "react";
import Header from "./Header";
import { FaUser, FaShoppingCart, FaBars } from "react-icons/fa"; // FaBars 아이콘 추가

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // 메뉴 상태 관리

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <Header />

      <nav className="w-full sticky top-0 z-50">
        <div className="relative max-w-7xl mx-auto h-8 leading-8 px-4 flex justify-between items-center">
          {/* 모바일 햄버거 메뉴 버튼 - md 사이즈에서 숨김 */}
          <button className="md:hidden" onClick={toggleMenu}>
            <FaBars className="text-gray-700 text-lg" />
          </button>

          {/* 데스크톱 메뉴 리스트 - my-0 클래스를 추가하여 위아래 마진 제거 */}
          <ul className="my-0 hidden md:flex flex-grow justify-center gap-6 text-[10px] font-semibold text-gray-700 overflow-hidden max-w-[calc(100%-110px)] whitespace-nowrap truncate">
            <li className="cursor-pointer">아티스트</li>
            <li className="cursor-pointer">액세서리 시리즈</li>
            <li className="cursor-pointer">방탄케이스</li>
            <li className="cursor-pointer">젤리케이스</li>
            <li className="cursor-pointer">카드케이스</li>
            <li className="cursor-pointer">하드케이스</li>
            <li className="cursor-pointer">에어팟케이스</li>
            <li className="cursor-pointer">악세서리</li>
            <li className="cursor-pointer">아크릴/스마트톡</li>
          </ul>

          {/* 아이콘 그룹 */}
          <div className="absolute right-12 top-0 bottom-0 flex items-center gap-4 text-gray-500 text-lg">
            <span className="cursor-pointer">
              <FaUser title="마이페이지" />
            </span>
            <span className="cursor-pointer">
              <FaShoppingCart title="장바구니" />
            </span>
          </div>
        </div>

        {/* 모바일 메뉴 - 상태에 따라 토글 */}
        <div
          className={`md:hidden absolute w-full bg-gray-50 transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-96 py-4" : "max-h-0 overflow-hidden"
          }`}
        >
          <ul className="flex flex-col items-center gap-4 text-[12px] font-semibold text-gray-700">
            <li className="cursor-pointer">아티스트</li>
            <li className="cursor-pointer">액세서리 시리즈</li>
            <li className="cursor-pointer">방탄케이스</li>
            <li className="cursor-pointer">젤리케이스</li>
            <li className="cursor-pointer">카드케이스</li>
            <li className="cursor-pointer">하드케이스</li>
            <li className="cursor-pointer">에어팟케이스</li>
            <li className="cursor-pointer">악세서리</li>
            <li className="cursor-pointer">아크릴/스마트톡</li>
          </ul>
        </div>
      </nav>

      {/* 임시 콘텐츠 */}
      <div style={{ height: "1500px", backgroundColor: "#f9f9f9" }}>
        임시 컨텐츠
      </div>
    </>
  );
};

export default NavBar;
