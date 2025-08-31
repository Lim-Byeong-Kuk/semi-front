import React, { useEffect, useState } from "react";
import { getList } from "../../api/shopApi";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../headerfooter/Header";
import useCustomMove from "../../api/hooks/useCustomMove";
import { phonecaseProducts } from "../../dummydata/phonecaseProducts";
import PaginationNav from "./PaginationNav";
import { createPagiNationData } from "../../api/paginationApi";

const ListComponent = () => {
  const navigate = useNavigate();
  const { page, size } = useCustomMove();
  const [products, setProducts] = useState([]);
  const [pagedData, setPagedData] = useState({});

  useEffect(() => {
    // const productList = getList({ page, size });
    const pagiNationData = createPagiNationData({ page, size });
    setPagedData(pagiNationData);
    setProducts(pagiNationData.products);
  }, [page, size]);

  const moveToDetailHandler = (e, productId) => {
    e.preventDefault();

    navigate(`/phonecase/${productId}`);
  };

  // const products = phonecaseProducts;

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

      {/* 페이지네이션 */}
      <PaginationNav pagedData={pagedData}></PaginationNav>
    </div>
  );
};

export default ListComponent;
