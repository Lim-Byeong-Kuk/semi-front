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

  return (
    <div className="p-6 space-y-6">
      {/* 상단 전체 개수 */}
      <div className="text-lg font-semibold">
        전체 {pagedData.totalDataCnt}개
      </div>

      {/* 상품 목록 */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            onClick={(e) => moveToDetailHandler(e, product.id)}
            className="cursor-pointer"
          >
            <div className="w-full h-56 flex items-center justify-left bg-white">
              <img
                src={product.image}
                alt={product.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            <div className="mt-2 space-y-1">
              <div className="text-[11px] font-medium text-gray-800">
                {product.name}
              </div>
              <div className="text-[10px] text-gray-600">
                {product.price.toLocaleString()}원
              </div>
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
