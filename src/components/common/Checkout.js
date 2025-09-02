import React, { useState } from "react";

import CheckoutHeader from "../headerfooter/CheckoutHeader";
import { LocalStorageService } from "../../api/storageApi";

/*
  이 페이지에서 완성될 데이터 -> 결제내역
  name:
  postcode:
  roadAddress:
  detailAddress:
  phoneNum:
  deleveryInstruction:
  paymentOption:
  상품가격에 대한 정보는 장바구니 또는 제품상세페이지에서 넘어와야 함
  주문일자,
  주문번호,


  TODO :
  - 버튼이 누르면 배송지 정보에 대한 유효성 검사(특히 이름이 제대로된 모양이어야 함)
    를 하고 실패하면 alert 창을 띄워야 함
  - 폰넘버는 결제버튼이 눌렸을때 세팅해주도록 한다. (010-0000-0000 1,2,3번째 번호를 따로 받았기 때문에)
  - 결제버튼이 누르면 결제내역 데이터를 완성해서 localStorage 저장!
*/

const Checkout = () => {
  const [phoneFirst, setPhoneFirst] = useState("010");
  const [phoneSecond, setPhoneSecond] = useState("");
  const [phoneThird, setPhoneThird] = useState("");
  const [paymentOption, setPaymentOption] = useState("");

  const [shippingAddress, setShippingAddress] = useState({
    name: "",
    postcode: "",
    roadAddress: "",
    detailAddress: "",
    phoneNum: "",
    deleveryInstruction: "부재 시 문 앞에 놓아주세요",
  });

  /* daum 우편번호 API 사용 */
  const openPostcode = () => {
    new window.daum.Postcode({
      oncomplete: (data) => {
        // 선택한 데이터 가져오기
        setShippingAddress((prev) => ({
          ...prev,
          postcode: data.zonecode,
          roadAddress: data.roadAddress,
        }));
      },
    }).open();
  };

  const changeHandler = (e) => {
    setShippingAddress((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const logHandler = () => {
    setShippingAddress((prev) => {
      const temp = {
        ...prev,
        phoneNum: `${phoneFirst}${phoneSecond}${phoneThird}`,
      };
      console.log(temp);
      return temp;
    });

    console.log("결제수단 : ", paymentOption);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <CheckoutHeader />

      <button onClick={logHandler}>배송지 정보 로그 버튼(테스트용)</button>

      {/* Content */}
      <main className="max-w-2xl mx-auto p-4 space-y-6">
        {/* 배송지 */}
        <section className="bg-white p-4 rounded-2xl shadow">
          <h2 className="text-lg font-semibold mb-3">배송지</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium">*받는사람</label>
              <input
                type="text"
                name="name"
                value={shippingAddress.name}
                onChange={(e) => changeHandler(e)}
                className="mt-1 w-full border rounded-lg p-2 text-sm"
                placeholder="이름 입력"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">*주소</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  name="postcode"
                  value={shippingAddress.postcode}
                  className="flex-1 border rounded-lg p-2 text-sm"
                  readOnly
                  placeholder="우편번호"
                />
                <button
                  type="button"
                  onClick={openPostcode}
                  className="px-3 py-2 text-sm bg-gray-100 rounded-lg border"
                >
                  주소 검색
                </button>
              </div>
              <input
                type="text"
                name="roadAddress"
                value={shippingAddress.roadAddress}
                readOnly
                placeholder="기본주소"
                className="w-full border rounded-lg p-2 text-sm mb-2"
              />
              <input
                type="text"
                name="detailAddress"
                value={shippingAddress.detailAddress}
                onChange={(e) => changeHandler(e)}
                className="w-full border rounded-lg p-2 text-sm"
                placeholder="나머지 주소"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">*휴대전화</label>
              <div className="flex gap-2 flex-1">
                <select
                  name="phoneFirst"
                  value={phoneFirst}
                  onChange={(e) => setPhoneFirst(e.target.value)}
                  className="border rounded px-3 py-2"
                >
                  <option>010</option>
                  <option>011</option>
                  <option>016</option>
                  <option>017</option>
                  <option>018</option>
                  <option>019</option>
                </select>
                <input
                  type="text"
                  name="phoneSecond"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={phoneSecond}
                  onChange={(e) =>
                    setPhoneSecond(e.target.value.replace(/[^0-9]/g, ""))
                  }
                  className="flex-1 border rounded px-3 py-2"
                  maxLength="4"
                />
                <input
                  type="text"
                  name="phoneThird"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={phoneThird}
                  onChange={(e) =>
                    setPhoneThird(e.target.value.replace(/[^0-9]/g, ""))
                  }
                  className="flex-1 border rounded px-3 py-2"
                  maxLength="4"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium">배송 메시지</label>
              <select
                name="deleveryInstruction"
                value={shippingAddress.deleveryInstruction}
                onChange={(e) => changeHandler(e)}
                className="mt-1 w-full border rounded-lg p-2 text-sm"
              >
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
            ].map((option) => {
              const isSelected = paymentOption === option;

              return (
                <button
                  key={option}
                  onClick={(e) => {
                    setPaymentOption(option);
                  }}
                  className={`w-full border rounded-lg p-2 text-sm text-left
        ${isSelected ? "bg-blue-500 text-white" : "hover:bg-gray-100"}`}
                >
                  {option}
                </button>
              );
            })}
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

export default Checkout;
