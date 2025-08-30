import React, { useEffect, useState } from "react";
import { getList } from "../../api/shopApi";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../headerfooter/Header";
import useCustomMove from "../../api/hooks/useCustomMove";
const getNum = (param, defaultValue) => {
  if (!param) {
    return defaultValue;
  }
  return parseInt(param);
};

const ListComponent = () => {
  // const { page, size } = useCustomMove();
  // const [queryParams] = useSearchParams();

  // page 파라미터에 value 를 가져오고 없으면 기본 1
  // const page = getNum(queryParams.get("page"), 1);
  // const size = getNum(queryParams.get("size"), 8);

  const { page, size, moveToList } = useCustomMove();

  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    console.log("useEffect 진입");
    const productList = getList({ page, size });
    setProducts(productList);
  }, [page, size]);

  const moveToDetailHandler = (e, productId) => {
    e.preventDefault();

    navigate(`/phonecase/${productId}`);
  };

  return (
    <div className="p-6 space-y-6">
      {/* 상단 전체 개수 */}
      <div className="text-lg font-semibold">전체 30개</div>

      {/* 상품 목록 */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            onClick={(e) => moveToDetailHandler(e, product.id)}
            className="border rounded-lg shadow-sm hover:shadow-md transition p-4 flex flex-col items-center cursor-pointer"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-24 h-24 object-cover mb-3 "
            />
            <div className="text-base font-medium">{product.name}</div>
            <div className="text-sm text-gray-600">
              {product.price.toLocaleString()}원
            </div>
          </div>
        ))}
      </div>

      {/* 페이지 버튼 */}
      <div className="flex justify-center space-x-2">
        {[1, 2, 3, 4].map((page) => (
          <button
            key={page}
            className="px-4 py-2 rounded border bg-white hover:bg-gray-100"
            /* 임시로 {page:2 } 를 넣어 테스트 중 */
            onClick={() => moveToList({ page: 2 })}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ListComponent;
