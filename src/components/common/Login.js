import React, { useContext, useEffect, useState } from "react";
import { LocalStorageService, storageEnum } from "../../api/storageApi";
import { userData } from "../../dummydata/userData";
import { LoginContext } from "../../api/context/LoginContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { initData, findById } = LocalStorageService;
  const storageEnuma = storageEnum;
  const { user, login, loginCheck } = useContext(LoginContext);
  const navigate = useNavigate();

  const [loginform, setLoginform] = useState({
    id: "",
    pwd: "",
  });

  useEffect(() => {
    initData(storageEnuma.Class.User, userData);
    loginCheck();
  }, []);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setLoginform((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const id = loginform.id.trim();
    const pwd = loginform.pwd.trim();
    const findedUser = findById(storageEnuma.Class.User, loginform.id.trim());

    if (findedUser === storageEnum.Result.Failure) {
      alert("존재하지 않는 아이디입니다.");
      return;
    }
    if (findedUser[0].pwd == pwd) {
      login(loginform);
      navigate("/");
    } else {
      alert("틀린 비밀번호 입니다.");
      return;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-xs mx-auto text-center px-3">
        {/* 로고 */}
        <h1 className="text-lg font-bold mb-1">BRAND NAME</h1>
        <p className="text-[10px] text-gray-500 mb-3">ARTIST DESIGN</p>

        {/* 안내 문구 */}
        <p className="text-gray-600 text-[11px] leading-snug mb-3">
          100% 만족 보장 · 10일 이내 반품/교환 가능
          <br />
          20,000원 이상 무료 배송 · 안전한 우체국 택배
        </p>

        {/* 로그인 제목 */}
        <h2 className="text-sm font-semibold mb-1">로그인</h2>
        <p className="text-gray-500 text-[11px] mb-3">Sign in to continue</p>

        {/* 로그인 폼 */}
        <form onSubmit={(e) => submitHandler(e)} className="space-y-2">
          <input
            type="text"
            name="id"
            placeholder="아이디"
            value={loginform.id}
            onChange={(e) => changeHandler(e)}
            className="w-full px-2 py-1.5 border rounded-md bg-gray-100 text-xs focus:outline-none focus:ring-1 focus:ring-black"
          />
          <input
            type="password"
            name="pwd"
            placeholder="패스워드"
            value={loginform.pwd}
            onChange={(e) => changeHandler(e)}
            className="w-full px-2 py-1.5 border rounded-md bg-gray-100 text-xs focus:outline-none focus:ring-1 focus:ring-black"
          />

          <button
            type="submit"
            className="w-full py-1.5 bg-black text-white rounded-md text-xs font-medium hover:bg-gray-800"
          >
            로그인 하기
          </button>
        </form>

        {/* 추가 안내 */}
        <p className="text-[10px] text-gray-500 mt-3 leading-snug">
          네이버 간편 로그인을 통해
          <br />
          멤버십 할인 혜택을 경험하세요.
        </p>
      </div>
    </div>
  );
};

export default Login;
