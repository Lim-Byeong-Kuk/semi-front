import React from "react";
import { phonecaseProducts } from "../../dummydata/phonecaseProducts";

const ListComponent = () => {
  const dummyProducts = phonecaseProducts;

  return (
    <div className="p-6 space-y-6">
      {/* 상단 전체 개수 */}
      <div className="text-lg font-semibold">전체 50개</div>

      {/* 상품 목록 */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {dummyProducts.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg shadow-sm hover:shadow-md transition p-4 flex flex-col items-center"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-24 h-24 object-cover mb-3"
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
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ListComponent;
