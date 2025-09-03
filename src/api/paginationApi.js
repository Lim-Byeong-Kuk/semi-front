import { phonecaseProducts } from "../dummydata/phonecaseProducts";

const createPageRes = (pageParam, products, totalDataCnt) => {
  //페이지 파라미터
  const { page, size } = pageParam;
  //현재 페이지, 0 들어오지 못하도록 최소 1로 함
  const currentPage = Math.max(1, page);

  //현재 페이지 기준 페이지네이션의 마지막 번호: 현재 page=7 이라면 end=10, 현재 page=11 -> end=20,
  let endOfPageBlock = Math.ceil(page / 10.0) * 10;
  //페이지네이션의 첫 번호
  const startOfPageBlock = endOfPageBlock - 9;
  //총 페이지 수이자 마지막 페이지 번호
  const totalPagesCnt = Math.ceil(totalDataCnt / size);
  //페이지네이션의 마지막 번호가 실제 마지막 페이지번호를 넘지 않도록 조정
  endOfPageBlock = Math.min(endOfPageBlock, totalPagesCnt);
  //페이지네이션의 첫번째 번호가 1보다 크다면 < 버튼 활성화
  const hasPrevPageGroup = startOfPageBlock > 1;
  //페이지네이션의 마지막 번호가 실제 마지막 페이지(총 페이지 수) 보다 작다면 > 버튼 활성화
  const hasNextPageGroup = endOfPageBlock < totalPagesCnt;
  // startOfPageBlock ~ endOfPageBlock 까지의 페이지 번호 목록 생성
  let pageNumList = [];
  for (let i = startOfPageBlock; i <= endOfPageBlock; i++) {
    pageNumList.push(i);
  }
  // < 버튼 활성화 되면 이동할 곳은 startOfPageBlock - 1
  const prevGroupLastPage = hasPrevPageGroup ? startOfPageBlock - 1 : undefined;
  // > 버튼 활성화 되면 이동할 곳은 endOfPageBlock + 1
  const nextGroupFirstPage = hasNextPageGroup ? endOfPageBlock + 1 : undefined;
  // 현재 페이지네이션 바에서 표현하고 있는 페이지 숫자 버튼의 갯수
  const currentPageBlockCnt = pageNumList.length;

  return {
    products: products,
    pageParam: pageParam,
    pageNumList: pageNumList,
    hasPrevPageGroup: hasPrevPageGroup,
    hasNextPageGroup: hasNextPageGroup,
    totalDataCnt: totalDataCnt,
    prevGroupLastPage: prevGroupLastPage,
    nextGroupFirstPage: nextGroupFirstPage,
    currentPageBlockCnt: currentPageBlockCnt,
    currentPage: currentPage,
  };
};

const findAllByPageParam = (pageParam) => {
  const { page, size } = pageParam;
  const startIdx = (page - 1) * size;
  const endIdx = page * size - 1;
  // page, size 에 의해 dummy데이터에서 가져올 몇번째 idx 부터 몇번째 idx 까지 가져올지 정한는 수식
  const productList = phonecaseProducts.filter(
    (p, idx) => idx >= startIdx && idx <= endIdx
  );
  return productList;
};

export const createPagiNationData = (pageParam) => {
  //pageParam, productList, totalCnt 를 이용해 페이지네이션을 위해 필요한 정보 생성(createPageRes 가 만들어줌)
  const productList = findAllByPageParam(pageParam);
  const totalDataCnt = phonecaseProducts.length;
  const pagiNationData = createPageRes(pageParam, productList, totalDataCnt);

  return pagiNationData;
};
