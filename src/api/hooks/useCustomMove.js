import { useCallback } from "react";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

const getNum = (param, defaultValue) => {
  if (!param) {
    return defaultValue;
  }
  return parseInt(param);
};

const useCustomMove = () => {
  const navigate = useNavigate();

  // page=1&size=10 이같은 쿼리스트링을 가져옴
  const [queryParams] = useSearchParams();

  // page 파라미터에 value 를 가져오고 없으면 기본 1
  const page = getNum(queryParams.get("page"), 1);
  const size = getNum(queryParams.get("size"), 8);

  // 가져온 page, size 를 바탕으로 기본 queryDefault 를 만들어 놓음
  const queryDefault = createSearchParams({ page, size }).toString();

  const moveToList = useCallback((pageParam) => {
    let queryStr = "";
    if (pageParam) {
      const pageNum = getNum(pageParam.page, 1);
      const sizeNum = getNum(pageParam.size, 10);
      queryStr = createSearchParams({
        page: pageNum,
        size: sizeNum,
      }).toString();
    } else {
      queryStr = queryDefault;
    }
    navigate({
      pathname: "/phonecase",
      search: `?${queryStr}`,
    });
  });

  return { page, size, moveToList };
};

export default useCustomMove;
