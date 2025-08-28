import React, { useState, useEffect } from "react";
import { cartData } from "../../dummydata/cartData";

const CartComponent = () => {
  return (
    <div className="bg-gray-50 p-6 font-sans">
      {/* 광고 섹션 */}
      <div className="bg-blue-100 p-4 text-center text-sm text-gray-700 rounded-md mb-6">
        <span>회원가입하고 구매시 할인 및 적립 리워드 받기</span>
        <br />
        <a href="/member/join.html" className="text-blue-500 hover:underline">
          회원가입
        </a>
        &nbsp;또는&nbsp;
        <a href="/member/login.html" className="text-blue-500 hover:underline">
          로그인하기
        </a>
        .
      </div>

      <div className="flex justify-between space-x-6">
        {/* 부모 컨테이너 */}
        <div className="flex-1">
          {/* 내용 섹션 */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            {cartData.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-4 border-b border-gray-200"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-24 h-24">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                  <div>
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-sm text-gray-500">{item.model}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button className="px-3 py-1 bg-gray-200 text-black rounded-md">
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button className="px-3 py-1 bg-gray-200 text-black rounded-md">
                    +
                  </button>
                </div>

                <div className="font-semibold">₩{item.price}</div>
                <button className="text-xl text-gray-400 hover:text-gray-600">
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 사이드바 섹션 */}
        <div className="w-60 bg-white p-6 rounded-lg shadow-md"></div>
      </div>
    </div>
  );
};

export default CartComponent;
