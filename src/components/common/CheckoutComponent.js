import React from "react";

const CheckoutComponent = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b bg-white">
        <button className="text-gray-600">←</button>
        <h1 className="text-lg font-semibold">주문/결제</h1>
        <button className="text-gray-600">마이페이지</button>
      </header>

      {/* Content */}
      <main className="max-w-2xl mx-auto p-4 space-y-6">
        {/* 배송지 */}
        <section className="bg-white p-4 rounded-2xl shadow">
          <h2 className="text-lg font-semibold mb-3">배송지</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium">받는사람</label>
              <input
                type="text"
                className="mt-1 w-full border rounded-lg p-2 text-sm"
                placeholder="이름 입력"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">주소</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  className="flex-1 border rounded-lg p-2 text-sm"
                  placeholder="우편번호"
                />
                <button className="px-3 py-2 text-sm bg-gray-100 rounded-lg border">
                  검색
                </button>
              </div>
              <input
                type="text"
                className="w-full border rounded-lg p-2 text-sm mb-2"
                placeholder="기본주소"
              />
              <input
                type="text"
                className="w-full border rounded-lg p-2 text-sm"
                placeholder="나머지 주소"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">휴대전화</label>
              <input
                type="tel"
                className="mt-1 w-full border rounded-lg p-2 text-sm"
                placeholder="010-0000-0000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">배송 메시지</label>
              <select className="mt-1 w-full border rounded-lg p-2 text-sm">
                <option>부재 시 문 앞에 놓아주세요</option>
                <option>경비실에 맡겨주세요</option>
                <option>직접 받겠습니다</option>
              </select>
            </div>
          </div>
        </section>

        {/* 결제정보 */}
        <section className="bg-white p-4 rounded-2xl shadow">
          <h2 className="text-lg font-semibold mb-3">결제정보</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>주문상품</span>
              <span>₩270,000</span>
            </div>
            <div className="flex justify-between">
              <span>배송비</span>
              <span>₩10,000</span>
            </div>
            <div className="flex justify-between">
              <span>할인/부가결제</span>
              <span>- ₩0</span>
            </div>
            <div className="flex justify-between font-semibold text-base border-t pt-2">
              <span>최종 결제 금액</span>
              <span>₩280,000</span>
            </div>
          </div>
        </section>

        {/* 결제수단 */}
        <section className="bg-white p-4 rounded-2xl shadow">
          <h2 className="text-lg font-semibold mb-3">결제수단</h2>
          <div className="space-y-2">
            {[
              "네이버페이",
              "카카오페이",
              "토스페이",
              "카드 결제",
              "무통장 입금",
              "휴대폰 결제",
            ].map((method) => (
              <button
                key={method}
                className="w-full border rounded-lg p-2 text-sm hover:bg-gray-50 text-left"
              >
                {method}
              </button>
            ))}
          </div>
          <p className="mt-3 text-xs text-gray-500 leading-relaxed">
            - 주문 변경 시 카드사 혜택 및 할부 적용 여부는 카드사 정책에 따라
            변경될 수 있습니다. <br />- 네이버페이는 별도 앱 설치 없이
            신용카드/은행 계좌 등록 후 비밀번호만으로 결제 가능한 간편결제
            서비스입니다.
          </p>
        </section>
      </main>

      {/* 결제 버튼 */}
      <footer className="p-4 border-t bg-white">
        <button className="w-full bg-black text-white py-3 rounded-2xl font-semibold text-lg">
          ₩280,000 결제하기
        </button>
        <p className="mt-3 text-xs text-gray-500 leading-relaxed">
          - 무이자할부가 적용되지 않은 상품과 무이자할부가 가능한 상품을 동시에
          구매할 경우 전체 금액에 대해 무이자할부가 적용되지 않습니다.
          <br />- 최소 결제 가능 금액은 배송비 제외 금액입니다.
        </p>
      </footer>
    </div>
  );
};

export default CheckoutComponent;
