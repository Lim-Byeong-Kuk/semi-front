import React, { useState } from "react";

// 로고 SVG 아이콘
const LogoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-10 h-10 text-pink-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6v6h4m6 6a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

// 아코디언 컴포넌트
const Accordion = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-3 text-left cursor-pointer"
      >
        <span className="font-medium">{title}</span>
        <span>{isOpen ? "▲" : "▼"}</span>
      </button>
      {isOpen && <div className="p-3 text-gray-600 text-sm">{content}</div>}
    </div>
  );
};

// 회원가입 페이지
const SignupPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        {/* 로고 */}
        <div className="flex justify-center mb-6">
          <LogoIcon />
        </div>

        {/* 제목 */}
        <h1 className="text-2xl font-bold text-center mb-6">회원가입</h1>

        {/* 입력 필드 */}
        <form className="space-y-4">
          <input
            type="text"
            placeholder="아이디"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
          <input
            type="password"
            placeholder="비밀번호"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
          <input
            type="email"
            placeholder="이메일"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
          />

          {/* 약관 동의 (아코디언) */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">이용약관</h2>
            <Accordion
              title="이용약관 동의 (필수)"
              content="이곳에 이용약관 전문이 들어갑니다. 길이가 길어도 접었다 펼 수 있어요."
            />
            <Accordion
              title="개인정보 처리방침 (필수)"
              content="여기에 개인정보 처리방침 전문이 들어갑니다."
            />
            <Accordion
              title="마케팅 수신 동의 (선택)"
              content="마케팅 정보 수신에 동의하시면 다양한 혜택을 받으실 수 있습니다."
            />
          </div>

          {/* 회원가입 버튼 */}
          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition"
          >
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
