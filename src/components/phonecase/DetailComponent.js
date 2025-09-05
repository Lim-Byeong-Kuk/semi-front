import React, { useEffect, useRef, useState } from "react";
import { phonecaseProducts } from "../../dummydata/phonecaseProducts";
import { useNavigate, useParams } from "react-router-dom";
import { getOne } from "../../api/shopApi";
import ReviewComponent from "./ReviewComponent";

const DetailComponent = () => {
  const { productId } = useParams();
  const productDetail = useRef(null);
  const purchaseInformation = useRef(null);
  const reviewRef = useRef(null);
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    productId: 0,
    name: "",
    price: 0,
    image: "",
  });

  useEffect(() => {
    const test = getOne(productId);
    setProduct(test);
    console.log(test);
  }, []);

  const moveToCartPageHandler = () => {
    navigate("/cart");
  };
  const moveToCheckOutHandler = () => {
    navigate("/checkout");
  };

  // 제품상세 ref 핸들러
  const productDetailHandler = () => {
    productDetail.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  // 상품구매안내 ref 핸들러
  const purchaseInformationHandler = () => {
    purchaseInformation.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };
  // 리뷰 ref 핸들러
  const reviewRefHandler = () => {
    reviewRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

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
            <button
              className="flex-1 py-3 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition"
              onClick={moveToCheckOutHandler}
            >
              바로결제
            </button>
            <button
              className="flex-1 py-3 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
              onClick={moveToCartPageHandler}
            >
              장바구니
            </button>
          </div>
        </div>
      </div>

      {/* 네비게이션 바 */}
      <div className="border-b">
        <nav className="flex gap-6 justify-center text-lg font-semibold">
          <button
            className="py-3 border-b-2 border-black"
            onClick={productDetailHandler}
          >
            제품상세
          </button>
          <button
            className="py-3 text-gray-500 hover:text-black"
            onClick={purchaseInformationHandler}
          >
            상품구매안내
          </button>
          <button
            className="py-3 text-gray-500 hover:text-black"
            onClick={reviewRefHandler}
          >
            리뷰
          </button>
        </nav>
      </div>

      {/* 제품상세 이미지 */}
      <div ref={productDetail} className="border rounded-lg p-4">
        <img
          src={product.image}
          alt="제품 상세 이미지"
          className="w-full object-cover"
        />
      </div>

      {/* 상품구매안내 */}
      <div ref={purchaseInformation} className="p-6 border rounded-lg">
        <h2 className="text-xl font-bold mb-4">상품구매안내</h2>
        <p className="text-gray-700">
          배송은 결제 완료 후 2~3일 내 이루어집니다. 반품 및 교환은 수령일로부터
          7일 이내에 가능합니다.
        </p>
      </div>
      <ReviewComponent ref={reviewRef} />
      {/* 페이지 버튼 */}
      <div className="flex justify-center gap-2">
        {[1].map((page) => (
          <button
            key={page}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DetailComponent;
