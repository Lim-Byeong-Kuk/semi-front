import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full bg-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-5 py-3">
        {/* 로고 텍스트 (클릭 시 '/' 경로로 이동) */}
        <Link
          to="/"
          className="flex-shrink-0 text-3xl font-extrabold text-black cursor-pointer"
        >
          CASE
        </Link>

        {/* 상단 오른쪽 유틸 메뉴 - md 사이즈에서만 보이도록 수정 */}
        <nav className="hidden md:flex gap-2 text-[10px] text-gray-500 font-medium">
          <span className="cursor-pointer">로그인</span>
          <span className="cursor-pointer">회원가입</span>
          <span className="cursor-pointer">마이페이지</span>
          <span className="cursor-pointer">주문조회</span>
        </nav>
      </div>
    </header>
  );
};

export default Header;
