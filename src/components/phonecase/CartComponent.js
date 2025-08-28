import React from "react";
import { cartData } from "../../dummydata/cartData";

const CartComponent = () => {
  return (
    <div className="p-6 font-sans">
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

      <div className="space-y-4">
        {/* 테이블 섹션 */}
        {cartData.map((item, index) => (
          <table
            key={index}
            className="table-auto w-full bg-blue-50 p-4 rounded-lg shadow-md"
          >
            <tbody>
              <tr>
                {/* 상품 이미지 (1열) */}
                <td className="w-1/5 p-2">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-24 object-cover rounded-md"
                  />
                </td>
                {/* 상품 정보 (2열) */}
                <td className="w-3/5 p-2">
                  <div className="font-semibold">{item.name}</div>
                  <div className="text-sm text-gray-500">{item.model}</div>
                  <div className="text-sm text-gray-500">
                    색상: {item.color}
                  </div>
                </td>
                {/* 가격 (3열) */}
                <td className="w-1/5 p-2 text-right">
                  <div className="font-semibold">₩{item.price}</div>
                </td>
              </tr>
              <tr>
                {/* 수량 조정 버튼 (1열) */}
                <td className="w-1/5 p-2">
                  <div className="flex items-center space-x-2">
                    <button className="px-3 py-1 bg-gray-200 text-black rounded-md">
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button className="px-3 py-1 bg-gray-200 text-black rounded-md">
                      +
                    </button>
                  </div>
                </td>
                {/* 가격 (2열) */}
                <td className="w-3/5 p-2"></td>
                {/* 가격 (3열) */}
                <td className="w-1/5 p-2 text-right">
                  <div className="font-semibold">₩{item.price}</div>
                </td>
              </tr>
            </tbody>
          </table>
        ))}
      </div>
    </div>
  );
};

export default CartComponent;
