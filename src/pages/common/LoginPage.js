import React from "react";

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-md text-center">
        {/* 로고 */}
        <h1 className="text-3xl font-bold mb-2">BRAND NAME</h1>
        <p className="text-sm text-gray-500 mb-8">ARTIST DESIGN</p>

        {/* 안내 문구 */}
        <p className="text-gray-600 text-sm leading-relaxed mb-8">
          100% 만족도 보장. 10일 이내 반품 또는 교환 가능.
          <br />
          20,000원 이상 무료 배송. 상품 주문 시 국내 자체제작 시스템
          <br />
          빠르고 안전한 배송을 위해 우체국 택배와 함께 합니다.
        </p>

        {/* 로그인 제목 */}
        <h2 className="text-xl font-semibold mb-1">로그인</h2>
        <p className="text-gray-500 text-sm mb-6">Sign in to continue.</p>

        {/* 로그인 폼 */}
        <form className="space-y-4">
          <input
            type="text"
            placeholder="아이디"
            className="w-full px-4 py-3 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <input
            type="password"
            placeholder="패스워드"
            className="w-full px-4 py-3 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black"
          />

          <button
            type="submit"
            className="w-full py-3 bg-black text-white rounded-md font-medium hover:bg-gray-800"
          >
            로그인 하기
          </button>
        </form>

        {/* 링크 */}
        <div className="flex justify-center gap-4 text-xs mt-4 font-bold">
          <a href="#" className="text-black no-underline hover:cursor-pointer">
            아이디찾기
          </a>
          <span>|</span>
          <a href="#" className="text-black no-underline hover:cursor-pointer">
            비밀번호찾기
          </a>
          <span>|</span>
          <a href="#" className="text-black no-underline hover:cursor-pointer">
            회원가입
          </a>
          <span>|</span>
          <a href="#" className="text-black no-underline hover:cursor-pointer">
            비회원 주문조회
          </a>
        </div>

        {/* 소셜 로그인 */}
        <div className="flex justify-center gap-4 mt-8">
          {/* 네이버 */}
          <button className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M4 4h5l5 7V4h6v16h-5l-5-7v7H4z" />
            </svg>
          </button>

          {/* 카카오 */}
          <button className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-black"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 3C6.48 3 2 6.58 2 11c0 2.46 1.38 4.66 3.52 6.1L4 21l5.05-2.15c.9.2 1.87.3 2.95.3 5.52 0 10-3.58 10-8s-4.48-8-10-8z" />
            </svg>
          </button>

          {/* 구글 */}
          <button className="w-12 h-12 rounded-full border flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-red-500"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M21.35 11.1H12v2.9h5.35c-.25 1.45-1.55 4.25-5.35 4.25a5.87 5.87 0 010-11.75c1.65 0 2.75.7 3.35 1.3l2.3-2.25C16.85 4.35 14.65 3.5 12 3.5a9 9 0 100 18c5.2 0 8.65-3.65 8.65-8.8 0-.6-.05-1-.15-1.6z" />
            </svg>
          </button>

          {/* 페이스북 */}
          <button className="w-12 h-12 rounded-full border flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-blue-600"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M22 12a10 10 0 10-11.6 9.9v-7h-2.3V12h2.3v-1.6c0-2.3 1.3-3.6 3.4-3.6.95 0 1.9.17 1.9.17v2.1h-1c-1 0-1.3.62-1.3 1.2V12h2.6l-.4 2.9h-2.2v7A10 10 0 0022 12z" />
            </svg>
          </button>
        </div>

        {/* 추가 안내 */}
        <p className="text-xs text-gray-500 mt-6">
          네이버 간편 로그인을 통해 매일리지
          <br />
          멤버십 할인 혜택으로 특별한 할인을 경험해보세요.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
