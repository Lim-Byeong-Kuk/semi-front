import React from "react";
import { Link, Outlet } from "react-router-dom";

const MyPageComponent = () => {
  return (
    <div className="flex">
      {/* 왼쪽 사이드바 */}
      <aside className="w-60 border-r p-4">
        <h2 className="text-lg font-bold mb-4">마이페이지</h2>
        <ul className="space-y-2">
          <li>
            <Link
              to="/mypage/orders"
              className="block text-xs text-gray-400 hover:text-black no-underline"
            >
              주문내역 조회
            </Link>
          </li>
          <li>
            <Link
              to="/mypage/profile"
              className="block text-xs text-gray-400 hover:text-black no-underline"
            >
              회원정보 수정
            </Link>
          </li>
          {/* 필요시 추가 */}
        </ul>
      </aside>

      {/* 오른쪽 컨텐츠 */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default MyPageComponent;
