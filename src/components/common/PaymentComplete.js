import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentComplete = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
        {/* 상단 타이틀 */}
        <h2 className="text-xl font-semibold text-center mb-2">주문완료</h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          아래 계좌정보로 입금해 주시면 <br /> 결제 완료처리가 됩니다
        </p>

        {/* 주문 정보 박스 */}
        <div className="border rounded-lg divide-y text-sm">
          {/* 입금계좌 안내 */}
          <div className="p-4 flex justify-between">
            <span className="text-gray-600">입금계좌 안내</span>
            <span className="font-medium">국민은행 123-456-0204</span>
          </div>
          <div className="p-4 flex justify-between">
            <span className="text-gray-600">입금금액</span>
            <span className="text-blue-600 font-semibold">35,500원</span>
          </div>

          {/* 주문번호 */}
          <div className="p-4 flex justify-between">
            <span className="text-gray-600">주문번호</span>
            <span className="font-medium">2020060149794</span>
          </div>

          {/* 배송지 */}
          <div className="p-4">
            <span className="text-gray-600 block mb-1">배송지</span>
            <p className="text-gray-800 font-medium">홍길동</p>
            <p className="text-gray-600">010-3948-3716</p>
            <p className="text-gray-600">
              서울 마포구 동교로 194 (동교동, 혜원빌딩) 2층 <br />
              (03995)
            </p>
          </div>

          {/* 배송 방법 */}
          <div className="p-4 flex justify-between">
            <span className="text-gray-600">배송 방법</span>
            <span className="font-medium">택배</span>
          </div>

          {/* 배송 메모 */}
          <div className="p-4">
            <span className="text-gray-600 block mb-1">배송 메모</span>
            <p className="text-gray-800">배송 전에 미리 연락 바랍니다.</p>
          </div>
        </div>

        {/* 홈으로 버튼 */}
        <button
          className="w-full mt-6 bg-sky-500 hover:bg-sky-600 text-white font-medium py-3 rounded-lg"
          onClick={() => {
            navigate("/");
            window.scrollTo(0, 0);
          }}
        >
          홈으로
        </button>
      </div>
    </div>
  );
};

export default PaymentComplete;
