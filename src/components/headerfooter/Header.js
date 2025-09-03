import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "./Navbar";
import { LoginContext } from "../../api/context/LoginContext";

const Header = () => {
  const navigate = useNavigate();
  const { user, loginCheck, logout } = useContext(LoginContext);

  useEffect(() => {
    loginCheck();
  }, []);

  const moveToLoginPage = () => {
    navigate("/login");
  };

  const logoutAndMoveToHome = () => {
    logout();
    navigate("/");
  };

  return (
    <>
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
            {!user.isLogin && (
              <span className="cursor-pointer" onClick={moveToLoginPage}>
                로그인
              </span>
            )}
            {user.isLogin && (
              <span className="cursor-pointer" onClick={logoutAndMoveToHome}>
                로그아웃
              </span>
            )}
            <span className="cursor-pointer">회원가입</span>
            <span className="cursor-pointer">마이페이지</span>
            <span className="cursor-pointer">주문조회</span>
          </nav>
        </div>
      </header>
      <NavBar />
    </>
  );
};

export default Header;
