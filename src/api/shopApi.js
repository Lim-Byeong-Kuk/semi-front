import { phonecaseProducts } from "../dummydata/phonecaseProducts";

export const getList = (pageParam) => {
  // getList 안에서 pagenationApi 의 pageNation 을 호출하는 방식으로 변경 중
  // todo: 페이지네이션
  const { page, size } = pageParam;
  const startIdx = (page - 1) * size;
  const endIdx = page * size - 1;
  // page, size 에 의해 dummy데이터에서 가져올 몇번째 idx 부터 몇번째 idx 까지 가져올지 정한는 수식
  const productList = phonecaseProducts.filter(
    (p, idx) => idx >= startIdx && idx <= endIdx
  );

  return productList;
};

export const getOne = (productId) => {
  return phonecaseProducts.find((p) => p.productId == productId);
};
