import React, { useEffect, useState } from "react";
import useCustomMove from "../../api/hooks/useCustomMove";

const PaginationNav = (props) => {
  const { moveToList } = useCustomMove();
  const { pagedData } = props;
  const [pageNumArr, setPageNumArr] = useState([]);

  useEffect(() => {
    console.log("pageData");
    console.log(pagedData.pageNumList);
    console.log(Array.isArray(pagedData.pageNumList));
    setPageNumArr(pagedData.pageNumList);
  }, [pagedData]);

  return (
    <div className="flex justify-center space-x-2">
      {/* 이전으로 버튼 */}
      <button
        onClick={() => moveToList({ page: pagedData.prevGroupLastPage })}
        className="px-4 py-2 rounded border bg-white hover:bg-gray-100"
        disabled={!pagedData.hasPrevPageGroup}
      >
        &lt; {/* < 문자 */}
      </button>

      {/* 페이지 블록 */}
      {pageNumArr &&
        pageNumArr.map((page) => (
          <button
            key={page}
            className="px-4 py-2 rounded border bg-white hover:bg-gray-100"
            /* 임시로 {page:2 } 를 넣어 테스트 중 */
            onClick={() => moveToList({ page: page })}
          >
            {page}
          </button>
        ))}

      {/* 다음으로 버튼 */}
      <button
        onClick={() => moveToList({ page: pagedData.nextGroupFirstPage })}
        className="px-4 py-2 rounded border bg-white hover:bg-gray-100"
        disabled={!pagedData.hasNextPageGroup}
      >
        &gt; {/* > 문자 */}
      </button>
    </div>
  );
};

export default PaginationNav;
