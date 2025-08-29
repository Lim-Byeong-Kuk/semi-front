import React, { useEffect, useState } from "react";
import { phonecaseProducts } from "../../dummydata/phonecaseProducts";
import { useParams } from "react-router-dom";
import { getOne } from "../../api/shopApi";

const DetailComponent = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({
    id: 0,
    name: "",
    price: 0,
    image: "",
  });

  useEffect(() => {
    setProduct(getOne(productId));
  }, []);

  return (
    <div className="p-6 space-y-10">
      {/* 상단 제품 정보 */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* 왼쪽: 대표 이미지 */}
        <div className="flex-1 flex justify-center items-center border rounded-lg p-4">
          <img src={product.image} alt="상품 이미지" className="object-cover" />
        </div>

        {/* 오른쪽: 상세 정보 */}
        <div className="flex-1 space-y-4">
          <h1 className="text-2xl font-bold">상품명 {product.name}</h1>
          <p className="text-xl text-red-500 font-semibold">
            판매가: {product.price}원
          </p>
          <p className="text-gray-600">제조사: OO컴퍼니</p>
          <p className="text-gray-600">원산지: 대한민국</p>
          <p className="text-gray-600">배송비: 3,000원</p>

          <div className="flex gap-4 pt-4">
            <button className="flex-1 py-3 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition">
              바로결제
            </button>
            <button className="flex-1 py-3 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition">
              장바구니
            </button>
          </div>
        </div>
      </div>

      {/* 네비게이션 바 */}
      <div className="border-b">
        <nav className="flex gap-6 justify-center text-lg font-semibold">
          <button className="py-3 border-b-2 border-black">제품상세</button>
          <button className="py-3 text-gray-500 hover:text-black">
            상품구매안내
          </button>
          <button className="py-3 text-gray-500 hover:text-black">리뷰</button>
        </nav>
      </div>

      {/* 제품상세 이미지 */}
      <div className="border rounded-lg p-4">
        <img
          src={product.image}
          alt="제품 상세 이미지"
          className="w-full object-cover"
        />
      </div>

      {/* 상품구매안내 */}
      <div className="p-6 border rounded-lg">
        <h2 className="text-xl font-bold mb-4">상품구매안내</h2>
        <p className="text-gray-700">
          배송은 결제 완료 후 2~3일 내 이루어집니다. 반품 및 교환은 수령일로부터
          7일 이내에 가능합니다.
        </p>
      </div>

      {/* 리뷰 */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold">리뷰</h2>
        <div className="space-y-2">
          {/* 리뷰 목록 */}
          <div className="border p-4 rounded-lg shadow-sm">
            <p className="font-semibold">사용자 A</p>
            <p className="text-gray-700">좋은 제품이에요!</p>
          </div>
          <div className="border p-4 rounded-lg shadow-sm">
            <p className="font-semibold">사용자 B</p>
            <p className="text-gray-700">배송도 빠르고 만족합니다.</p>
          </div>
        </div>

        {/* 페이지 버튼 */}
        <div className="flex justify-center gap-2">
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              {page}
            </button>
          ))}
        </div>
      </div>

      {/* 리뷰 작성하기 버튼 */}
      <div className="flex justify-center">
        <button className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition">
          리뷰 작성하기
        </button>
      </div>
    </div>
  );
};

export default DetailComponent;
