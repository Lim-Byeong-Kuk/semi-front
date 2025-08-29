import React from "react";
import { cartData } from "../../dummydata/cartData";
import kakaoPayCheckOut from "../../resources/img/KakaoPayCheckOut.png";
import NaverPayCheckOut from "../../resources/img/NaverPayCheckOut.png";

const CartComponent = () => {
  return (
    <div className="w-full font-sans p-5">
      <div className="h-16 bg-gray-100 mb-5">Shopping Cart</div>

      <div className="h-20 bg-gray-200 mb-5">
        <div className="text-sm p-3 space-y-1">
          <h5>AKAN 회원만의 특별한 혜택을 놓치지 마세요!</h5>
          <h5>회원가입하고 구매시 할인 및 적립 리워드 받기</h5>
          <h5>회원가입 또는 로그인하기.</h5>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-5">
        {/* Cart List */}
        <div className="md:w-[70%] w-full space-y-5">
          {cartData &&
            cartData.map((data) => (
              <div key={data.id} className="border-b pb-5 flex gap-4">
                <div className="w-24 h-24 bg-gray-100 flex items-center justify-center rounded">
                  <img
                    src={data.img}
                    alt={data.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1 flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <div className="font-bold text-sm">{data.name}</div>
                    <button className="text-red-500 text-sm">X</button>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div>{data.model}</div>
                    {Array.isArray(data.select) &&
                      data.select.map((item, index) => (
                        <div key={index}>{item.design}</div>
                      ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <button className="px-2 border">-</button>
                      <input
                        type="number"
                        className="w-12 text-center border"
                      />
                      <button className="px-2 border">+</button>
                    </div>
                    <div className="font-bold text-right text-sm">
                      {data.price}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Aside */}
        <div className="md:w-[30%] w-full">
          <div className="border p-4 space-y-4">
            <div>
              <h5 className="font-semibold mb-2">주문상품</h5>
              <div className="text-sm space-y-1">
                <h5>총 상품금액</h5>
                <h5>총 배송비</h5>
              </div>
              <div className="flex justify-between mt-2 text-sm">
                <div className="space-y-1">
                  <h5>결제예정금액</h5>
                  <h5>적립예정금액</h5>
                  <h5>→상품별 적립금</h5>
                </div>
                <div className="text-right space-y-1">
                  <h5>50,800원</h5>
                  <h5>최대 250원</h5>
                  <h5>250원</h5>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button className="w-full py-2 border text-sm">
                기본결제하기
              </button>

              {/* 네이버 결제 박스 */}
              <div className="flex items-center justify-between border rounded-md p-4 bg-[#f0fdf4] text-green-700">
                <div className="text-sm font-medium">
                  <span className="block">NAVER</span>
                  <span className="block">네이버 ID로 간편구매</span>
                  <span className="block">네이버페이</span>
                </div>
                <button className="bg-green-500 text-white px-4 py-2 rounded text-sm font-semibold hover:bg-green-600">
                  N Pay 구매
                </button>
              </div>

              {/* 카카오 결제 박스 */}
              <div className="flex items-center justify-between border rounded-md p-4 bg-[#fff7e0] text-yellow-800 mt-4">
                <div className="text-sm font-medium">
                  <span className="block">kakao</span>
                  <span className="block">톡체크아웃</span>
                </div>
                <button className="bg-yellow-400 text-black px-4 py-2 rounded text-sm font-semibold hover:bg-yellow-500">
                  간편구매
                </button>
              </div>

              <h5 className="text-xs text-gray-600">
                [비회원 구매] 카카오페이포인트 1% 적립
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartComponent;
