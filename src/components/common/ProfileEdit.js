import React from "react";

const ProfileEdit = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* 제목 */}
      <h1 className="text-2xl font-bold text-center mb-8">회원 정보 수정</h1>

      {/* 기본정보 */}
      <section>
        <h2 className="text-lg font-semibold mb-4">기본정보</h2>

        <form className="space-y-6">
          {/* 이메일 */}
          <div className="flex items-center">
            <label className="w-32 text-sm font-medium text-gray-700">
              이메일 <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              className="flex-1 border border-gray-300 rounded px-3 py-2"
              defaultValue="bye0414@naver.com"
            />
          </div>

          {/* 아이디 */}
          <div className="flex items-center">
            <label className="w-32 text-sm font-medium text-gray-700">
              아이디 <span className="text-red-500">*</span>
            </label>
            <div className="flex-1 flex items-center gap-2">
              <input
                type="text"
                className="flex-1 border border-gray-300 rounded px-3 py-2"
                defaultValue="3102736030@n"
              />
              <span className="text-xs text-gray-500">
                (영문소문자/숫자, 4~16자)
              </span>
            </div>
          </div>

          {/* 비밀번호 */}
          <div className="flex items-center">
            <label className="w-32 text-sm font-medium text-gray-700">
              비밀번호 <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              className="flex-1 border border-gray-300 rounded px-3 py-2"
              placeholder="영문 대소문자/숫자 4자~16자"
            />
          </div>

          {/* 비밀번호 확인 */}
          <div className="flex items-center">
            <label className="w-32 text-sm font-medium text-gray-700">
              비밀번호 확인 <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              className="flex-1 border border-gray-300 rounded px-3 py-2"
            />
          </div>

          {/* 이름 */}
          <div className="flex items-center">
            <label className="w-32 text-sm font-medium text-gray-700">
              이름 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="flex-1 border border-gray-300 rounded px-3 py-2"
              defaultValue="임병국"
            />
          </div>

          {/* 주소 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              주소 <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="우편번호"
                className="w-32 border border-gray-300 rounded px-3 py-2"
              />
              <button className="px-4 py-2 bg-gray-100 border rounded hover:bg-gray-200">
                주소검색
              </button>
            </div>
            <input
              type="text"
              placeholder="기본주소"
              className="w-full border border-gray-300 rounded px-3 py-2 mb-2"
            />
            <input
              type="text"
              placeholder="나머지 주소"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          {/* 일반전화 */}
          <div className="flex items-center gap-2">
            <label className="w-32 text-sm font-medium text-gray-700">
              일반전화
            </label>
            <select className="border rounded px-2 py-2">
              <option>02</option>
              <option>031</option>
            </select>
            <span>-</span>
            <input
              type="text"
              className="w-24 border rounded px-2 py-2"
              maxLength="4"
            />
            <span>-</span>
            <input
              type="text"
              className="w-24 border rounded px-2 py-2"
              maxLength="4"
            />
          </div>

          {/* 휴대전화 */}
          <div className="flex items-center gap-2">
            <label className="w-32 text-sm font-medium text-gray-700">
              휴대전화 <span className="text-red-500">*</span>
            </label>
            <select className="border rounded px-2 py-2">
              <option>010</option>
              <option>011</option>
            </select>
            <span>-</span>
            <input
              type="text"
              className="w-24 border rounded px-2 py-2"
              defaultValue="4662"
              maxLength="4"
            />
            <span>-</span>
            <input
              type="text"
              className="w-24 border rounded px-2 py-2"
              defaultValue="4036"
              maxLength="4"
            />
          </div>

          {/* 이메일 수신여부 */}
          <div className="flex items-center">
            <label className="w-32 text-sm font-medium text-gray-700">
              이메일 수신여부 <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-1 text-sm">
                <input type="radio" name="emailOptIn" /> 수신함
              </label>
              <label className="flex items-center gap-1 text-sm">
                <input type="radio" name="emailOptIn" defaultChecked /> 수신안함
              </label>
            </div>
          </div>

          <p className="ml-32 text-xs text-gray-500">
            쇼핑몰에서 제공하는 유익한 이벤트 소식을 이메일로 받으실 수
            있습니다.
          </p>

          {/* 버튼 영역 */}
          <div className="flex justify-center gap-4 mt-8">
            <button className="px-6 py-2 border rounded hover:bg-gray-100">
              취소
            </button>
            <button className="px-6 py-2 bg-gray-800 text-white rounded hover:bg-gray-700">
              회원정보수정
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default ProfileEdit;
