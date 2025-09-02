import React from "react";

const Signup = () => {
  return (
    <div className="flex justify-center py-10 bg-gray-50 min-h-screen">
      <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow">
        {/* 상단 제목 */}
        <div className="text-center mb-10">
          <h1 className="text-2xl font-bold">Membership</h1>
          <p className="text-gray-500 text-sm mt-2">
            BrandName 에서만 누릴 수 있는 특별한 프리미엄 혜택
            <br />
            지금 바로 멤버십에 가입하세요.
          </p>
        </div>

        {/* 가입 양식 */}
        <form className="space-y-6">
          {/* 이메일 */}
          <div className="flex items-center">
            <label className="w-32 text-sm font-medium text-gray-700">
              이메일 <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="이메일 입력"
            />
          </div>

          {/* 아이디 */}
          <div className="flex items-center">
            <label className="w-32 text-sm font-medium text-gray-700">
              아이디 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="flex-1 border rounded px-3 py-2"
              placeholder="영문/숫자 4~16자"
            />
          </div>

          {/* 비밀번호 */}
          <div className="flex items-center">
            <label className="w-32 text-sm font-medium text-gray-700">
              비밀번호 <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              className="flex-1 border rounded px-3 py-2"
              placeholder="영문 대소문자/숫자 4~16자"
            />
          </div>

          {/* 비밀번호 확인 */}
          <div className="flex items-center">
            <label className="w-32 text-sm font-medium text-gray-700">
              비밀번호 확인 <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              className="flex-1 border rounded px-3 py-2"
              placeholder="비밀번호 확인"
            />
          </div>

          {/* 이름 */}
          <div className="flex items-center">
            <label className="w-32 text-sm font-medium text-gray-700">
              이름 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="flex-1 border rounded px-3 py-2"
              placeholder="이름 입력"
            />
          </div>

          {/* 주소 */}
          <div className="flex items-start">
            <label className="w-32 text-sm font-medium text-gray-700">
              주소
            </label>
            <div className="flex-1 space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  className="w-32 border rounded px-3 py-2"
                  placeholder="우편번호"
                />
                <button
                  type="button"
                  className="px-4 py-2 border rounded bg-gray-100"
                >
                  주소검색
                </button>
              </div>
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                placeholder="기본주소"
              />
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                placeholder="나머지 주소"
              />
            </div>
          </div>

          {/* 휴대전화 */}
          <div className="flex items-center">
            <label className="w-32 text-sm font-medium text-gray-700">
              휴대전화 <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2 flex-1">
              <select className="border rounded px-3 py-2">
                <option>010</option>
                <option>011</option>
                <option>016</option>
                <option>017</option>
                <option>018</option>
                <option>019</option>
              </select>
              <input
                type="text"
                className="flex-1 border rounded px-3 py-2"
                maxLength="4"
              />
              <input
                type="text"
                className="flex-1 border rounded px-3 py-2"
                maxLength="4"
              />
            </div>
          </div>
        </form>

        {/* 약관 동의 */}
        <div className="mt-12 space-y-6">
          <h2 className="text-lg font-semibold">서비스 이용 약관</h2>

          <div className="space-y-4">
            <label className="flex items-start gap-2">
              <input type="checkbox" className="mt-1" />
              <span>
                모든 약관을 확인하고 전체 동의합니다.
                <br />
                <span className="text-sm text-gray-500">
                  (전체 동의는 필수 및 선택 정보에 대한 동의가 포함되어
                  있습니다.)
                </span>
              </span>
            </label>

            <label className="flex items-start gap-2">
              <input type="checkbox" className="mt-1" />
              <span>[필수] 이용약관 동의</span>
            </label>
            <textarea
              className="w-full border rounded px-3 py-2 h-24"
              readOnly
              value="이용약관 내용이 여기에 표시됩니다."
            />

            <label className="flex items-start gap-2">
              <input type="checkbox" className="mt-1" />
              <span>[필수] 개인정보 수집 및 이용 동의</span>
            </label>
            <textarea
              className="w-full border rounded px-3 py-2 h-24"
              readOnly
              value="개인정보 수집 및 이용에 대한 내용이 여기에 표시됩니다."
            />

            <label className="flex items-start gap-2">
              <input type="checkbox" className="mt-1" />
              <span>[선택] 쇼핑정보 수신 동의</span>
            </label>
            <textarea
              className="w-full border rounded px-3 py-2 h-24"
              readOnly
              value="쇼핑정보 수신 동의에 대한 내용이 여기에 표시됩니다."
            />
          </div>
        </div>

        {/* 버튼 */}
        <div className="mt-8 text-center">
          <button
            type="submit"
            className="px-8 py-3 bg-black text-white rounded-md hover:bg-gray-800"
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
