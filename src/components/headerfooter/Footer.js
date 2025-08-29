import { useState } from "react";

const Footer = () => {
  const [isCompanyInfoOpen, setIsCompanyInfoOpen] = useState(false);

  return (
    <footer className="bg-gray-900 text-gray-400 text-[10px] py-3 px-4">
      <div className="max-w-5xl mx-auto grid grid-cols-[2fr_1fr_1fr] gap-3">
        {/* 회사정보 - 오른쪽 패딩 추가 */}
        <div className="space-y-[2px] md:pr-6">
          {/* 모바일에서 토글 버튼 */}
          <div
            className="flex items-center justify-between md:justify-start text-white mb-[10px] cursor-pointer md:cursor-auto"
            onClick={() => setIsCompanyInfoOpen(!isCompanyInfoOpen)}
          >
            <div className="space-x-1">
              <span className="cursor-pointer hover:text-gray-200">
                회사소개
              </span>
              <span>|</span>
              <span className="cursor-pointer hover:text-gray-200">
                이용약관
              </span>
              <span>|</span>
              <span className="cursor-pointer hover:text-gray-200">
                개인정보 취급방침
              </span>
              <span>|</span>
              <span className="cursor-pointer hover:text-gray-200">
                이용안내
              </span>
            </div>
            <div className="md:hidden ml-2 text-[12px] select-none">
              {isCompanyInfoOpen ? "▲" : "▼"}
            </div>
          </div>

          <div
            className={`transition-max-height duration-300 ease-in-out overflow-hidden md:overflow-visible ${
              isCompanyInfoOpen ? "max-h-[1000px]" : "max-h-0"
            } md:max-h-full`}
          >
            <p className="mb-[2px]">회사명 : 케이스</p>
            <p className="mb-[2px]">대표 : 홍길동</p>
            <p className="mb-[2px]">
              사업자등록번호 000-00-00000 | 통신판매업신고 xxxx-xx-xxxx
              [사업자정보확인]
            </p>
            <p className="mb-[2px]">경기 성남시 xxx xxxx</p>
            <p className="mb-[2px]">전화 : 000-0000-0000</p>
            <p className="mb-[2px]">
              개인정보보관리책임자 : 아무개 (test@test.co.kr)
            </p>
            <p className="mt-[5px] text-gray-500 text-[10px]">
              Copyright © 케이스. All rights reserved.
            </p>
          </div>
        </div>

        {/* 고객센터 - 좌우 패딩 줄임 */}
        <div className="space-y-[2px] md:px-2">
          <p className="text-white text-[13px] font-semibold">고객센터</p>
          <p className="text-white text-[13px] font-bold">000-0000-0000</p>
          <p>평일 10:00 - 18:00</p>
          <p>점심시간 12:30 - 13:30</p>
          <p>주말 및 공휴일 휴무</p>
          <div className="flex gap-[6px] mt-[4px] text-[10px]">
            <span>💬</span>
            <span>📷</span>
            <span>👍</span>
          </div>
        </div>

        {/* 커뮤니티 - 왼쪽 패딩 추가 */}
        <div className="space-y-[2px] md:pl-6">
          <ul>
            <li className="cursor-pointer hover:text-white">공지사항</li>
            <li className="cursor-pointer hover:text-white">회원가입</li>
            <li className="cursor-pointer hover:text-white">로그인</li>
            <li className="cursor-pointer hover:text-white">마이페이지</li>
            <li className="cursor-pointer hover:text-white">주문조회</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
