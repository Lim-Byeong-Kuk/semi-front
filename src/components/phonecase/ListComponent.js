import React, { useEffect, useState } from "react";
import { phonecaseProducts } from "../../dummydata/phonecaseProducts";
import { getList } from "../../api/shopApi";
import { useNavigate } from "react-router-dom";

const ListComponent = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // 백엔드가 있다면 이런식으로
    // getList({ page, size }).then((da) => {
    //   setServerData(da);
    // });
    const data = getList();
    setProducts(data);
  }, []);

  const addClickHandler = () => {
    setProducts((prev) => [
      {
        id: 9,
        name: "Phone Case I",
        price: 21000,
        image:
          "https://akan.co.kr/upload/products/NEVER/JINN5007/thumb-single-graybg.webp",
      },
      ...prev,
    ]);
  };

  const moveToDetailHandler = (e, productId) => {
    e.preventDefault();

    navigate(`/phonecase/${productId}`);
  };

  return (
    <div className="p-6 space-y-6">
      <button onClick={addClickHandler}>
        상품 추가 버튼(더미데이터 테스트)
      </button>
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
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ListComponent;
