import React from "react";

const NavBar = () => {
  return (
    <header className="w-full bg-white">
      {/* 상단 로고 + 우측 메뉴 */}
      <div className="max-w-7xl mx-auto flex items-center justify-between px-5 py-3">
        {/* 로고 */}
        <div className="flex-shrink-0">
          <img
            src="https://cdn.pixabay.com/photo/2025/07/11/20/21/beagle-9709437_1280.jpg"
            alt="사이트 로고"
            className="w-14 h-14 object-cover rounded-full border border-gray-300"
          />
        </div>

        {/* 상단 오른쪽 유틸 메뉴 */}
        <nav className="flex gap-2 text-[9px] text-gray-500 font-medium">
          <span className="cursor-pointer hover:text-blue-600 transition">
            로그인
          </span>
          <span className="cursor-pointer hover:text-blue-600 transition">
            회원가입
          </span>
          <span className="cursor-pointer hover:text-blue-600 transition">
            마이페이지
          </span>
          <span className="cursor-pointer hover:text-blue-600 transition">
            주문조회
          </span>
        </nav>
      </div>

      {/* 메인 네비게이션 바 */}
      <nav className="w-full bg-gray-50">
        <div className="max-w-7xl mx-auto px-5">
          <ul className="flex justify-center gap-7 overflow-x-auto whitespace-nowrap text-[9px] font-semibold text-gray-700 py-2">
            <li className="cursor-pointer hover:text-blue-600 transition">
              방탄케이스
            </li>
            <li className="cursor-pointer hover:text-blue-600 transition">
              젤리케이스
            </li>
            <li className="cursor-pointer hover:text-blue-600 transition">
              카드케이스
            </li>
            <li className="cursor-pointer hover:text-blue-600 transition">
              하드케이스
            </li>
            <li className="cursor-pointer hover:text-blue-600 transition">
              Z플립 시리즈
            </li>
            <li className="cursor-pointer hover:text-blue-600 transition">
              에어팟케이스
            </li>
            <li className="cursor-pointer hover:text-blue-600 transition">
              아크릴/스마트톡
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
