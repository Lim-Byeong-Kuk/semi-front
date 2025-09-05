import React, { forwardRef, useContext, useEffect, useState } from "react";
import { LocalStorageService, storageEnum } from "../../api/storageApi";
import { userData } from "../../dummydata/userData";
import { useParams } from "react-router-dom";
import { LoginContext } from "../../api/context/LoginContext";

const ReviewComponent = forwardRef(({}, ref) => {
  const { user, loginCheck } = useContext(LoginContext);
  const [formVisible, setFormVisible] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState({ title: "", id: user.id, detail: "" });
  const { productId } = useParams();

  const [review, setReview] = useState({
    reviewId: 0,
    title: "",
    id: user.id,
    detail: "",
    date: "",
  });

  const [isChange, setChange] = useState(false);

  // 리뷰 목록의 초기 상태를 로컬스토리지에서 가져옴
  const [reviewList, setReviewList] = useState(() => {
    const allUserReviews = LocalStorageService.findAllByCollection(
      storageEnum.Collection.Reviews
    );
    if (allUserReviews === storageEnum.Result.Failure) return [];
    const productReviews = allUserReviews.filter(
      (review) => review.productId === parseInt(productId)
    );
    return productReviews;
  });

  //
  useEffect(() => {
    // productId가 변경될 때마다 리뷰 목록을 다시 불러옴
    updateReviewList();
  }, [productId]);

  useEffect(() => {
    const handleStorageChange = () => {
      updateReviewList();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []); // isChange 상태를 사용하지 않고 storage 이벤트만 감지

  const reviewInit = () => {
    const tempData = userData
      .map((user) => user.reviews)
      .flat(2)
      .filter((review) => review.productId === parseInt(productId));
    setReviewList(tempData);
    LocalStorageService.initData(storageEnum.Class.Review, tempData);
  };

  const updateReviewList = () => {
    const allReviews =
      LocalStorageService.findAllByCollection(storageEnum.Collection.Reviews) ||
      [];
    if (allReviews === storageEnum.Result.Failure) return [];
    const productReviews = allReviews.filter(
      (rev) => rev.productId === parseInt(productId)
    );
    setReviewList(productReviews);
  };

  // 리뷰를 작성하기 전에 모든 입력 필드가 비어 있지 않은지 확인
  const validateFields = (data) => {
    if (!data.title.trim() || !data.detail.trim()) {
      alert("제목/내용을 모두 입력해 주세요");
      return false;
    } else {
      return true;
    }
  };

  // 리뷰 등록 handler
  const reviewHandler = () => {
    if (!validateFields(review)) return;

    // 모든 리뷰 데이터를 가져와서 새로운 ID를 생성
    const allReviews = LocalStorageService.findAllByCollection(
      storageEnum.Collection.Reviews
    );
    const newReviewId =
      allReviews.length > 0
        ? allReviews[allReviews.length - 1].reviewId + 1
        : 1;

    const newReview = {
      // reviewId: newReviewId, //없는채로 넘겨도 상관 없다 api에서 알아서 생성
      productId: parseInt(productId), // productId를 숫자로 변환
      id: user.id,
      title: review.title,
      detail: review.detail,
      date: new Date().toLocaleString(),
    };

    // 로컬 스토리지에 새 리뷰 저장
    LocalStorageService.saveCollectionOne(
      storageEnum.Class.Review,
      storageEnum.Collection.Reviews,
      newReview
    );

    // 로컬 스토리지에서 최신 데이터를 다시 불러와서 상태 업데이트
    updateReviewList();

    // 폼 초기화 및 숨기기
    setReview({ title: "", id: "", detail: "" });
    setFormVisible(false);
    alert(`리뷰 작성 완료`);
  };

  // 리뷰 삭제 handler
  const deleteHandler = (reviewId, id) => {
    console.log("삭제 test -> ", user.id, id);
    if (user.id === id) {
      alert(`삭제 완료`);

      LocalStorageService.deleteByCollection(
        storageEnum.Class.Review,
        storageEnum.Collection.Reviews,
        reviewId
      );
    } else {
      alert(`본인이 작성.한 리뷰만 삭제할 수 있습니다`);
    }

    updateReviewList();

    // if (storageEnum.Result.Failure === updateReview) {
    //   console.log("실패확인");
    //   return;
    // } else {
    //   setReviewList(LocalStorageService.findAll(storageEnum.Class.Review));
    // }
    // setChange(!isChange);
  };

  // 리뷰 수정 시작
  const startEdit = (r) => {
    console.log("수정 test -> ", user.id, r.id);
    if (user.id === r.id) {
      setEditingId(r.reviewId);
      setDraft({ title: r.title, detail: r.detail });
    } else {
      alert(`본인이 작성한 리뷰만 수정할 수 있습니다.`);
    }
  };

  // 인라인 수정 저장
  const saveEdit = (editId) => {
    if (!validateFields(draft)) return;

    let reviewObj = reviewList.find((r) => r.reviewId === editId);
    console.log("리뷰 수정 test -> ", reviewObj.reviewId, editId);
    reviewObj = { ...reviewObj, ...draft, date: new Date().toLocaleString() };
    LocalStorageService.updateCollection(
      storageEnum.Class.Review,
      storageEnum.Collection.Reviews,
      reviewObj
    );
    updateReviewList();

    alert("리뷰 수정 완료");
    setEditingId(null);
    setDraft({ title: "", detail: "" });
    // setChange(!isChange);
  };

  // 인라인 수정 취소
  const cancelEdit = () => {
    setEditingId(null);
    setDraft({ title: "", detail: "" });
  };

  // 리뷰 텍스트 입력 핸들러
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setReview({ ...review, [name]: value });
  };

  // 인라인 수정 핸들러
  const draftChangeHandler = (e) => {
    const { name, value } = e.target;
    setDraft((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div ref={ref} className="space-y-6">
      <h2 className="text-xl font-bold">리뷰</h2>

      {/* 목록 */}
      <div className="space-y-2">
        {reviewList &&
          reviewList.map((review) => (
            <div
              key={review.reviewId}
              className="border p-4 rounded-lg shadow-sm flex justify-between items-start"
            >
              {/* 왼쪽: 내용 / 리뷰 수정하기를 누르면 나오는 폼 */}
              <div className="text-left w-full max-w-[70%]">
                {editingId === review.reviewId ? (
                  <>
                    <div className="flex gap-3 mb-2">
                      <input
                        className="w-1/2 p-2 border rounded-md"
                        type="text"
                        name="title"
                        placeholder="제목"
                        value={draft.title}
                        onChange={draftChangeHandler}
                      />
                      {/* <input
                        className="w-1/2 p-2 border rounded-md"
                        type="text"
                        name="id"
                        placeholder="이름"
                        value={draft.id}
                        onChange={draftChangeHandler}
                      /> */}
                    </div>
                    <textarea
                      className="w-full p-2 border rounded-md"
                      name="detail"
                      placeholder="리뷰 내용"
                      value={draft.detail}
                      onChange={draftChangeHandler}
                      style={{
                        height: "120px",
                        overflow: "auto",
                        resize: "none",
                      }}
                    />
                    <p className="text-gray-500 mt-2">
                      마지막 수정: {review.date}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="font-semibold">{review.title}</p>
                    <p className="font-semibold">{review.id}</p>
                    <p
                      className="text-gray-700"
                      style={{ whiteSpace: "pre-line" }}
                    >
                      {review.detail}
                    </p>
                    <p className="text-gray-700">{review.date}</p>
                  </>
                )}
              </div>

              {/* 오른쪽: 버튼 / 리뷰 수정한걸 저장,취소 하는 버튼 */}
              <div className="flex flex-col space-y-2 ml-4">
                {editingId === review.reviewId ? (
                  <>
                    <button
                      className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
                      onClick={() => saveEdit(editingId)}
                    >
                      저장
                    </button>
                    <button
                      className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                      onClick={cancelEdit}
                    >
                      취소
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                      onClick={() => deleteHandler(review.reviewId, review.id)}
                    >
                      삭제하기
                    </button>
                    <button
                      className="px-4 py-2 rounded bg-amber-500 text-white hover:bg-amber-400"
                      onClick={() => startEdit(review)}
                    >
                      수정하기
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
      </div>

      {/* 리뷰 작성 버튼 */}
      <div className="flex justify-center">
        <button
          className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition"
          onClick={() => setFormVisible((v) => !v)}
          disabled={editingId !== null} // 편집 중엔 작성 비활성화
        >
          리뷰 작성하기
        </button>
      </div>

      {/* 작성 폼 */}
      {formVisible && editingId === null && (
        <div className="border p-4 rounded-lg shadow-md space-y-4 mt-4 flex flex-col justify-start">
          <div className="flex space-x-4">
            <input
              className="w-full p-2 border rounded-md"
              type="text"
              placeholder="제목"
              name="title"
              value={review.title}
              onChange={changeHandler}
            />
            {/* <input
              className="w-full p-2 border rounded-md"
              type="text"
              placeholder="이름"
              name="id"
              value={review.id}
              onChange={changeHandler}
            /> */}
          </div>

          <textarea
            className="w-full p-2 border rounded-md"
            placeholder="리뷰를 입력하세요..."
            name="detail"
            value={review.detail}
            onChange={changeHandler}
            style={{ height: "120px", overflow: "auto", resize: "none" }}
          />

          <div className="flex justify-end space-x-2">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={reviewHandler}
            >
              등록
            </button>
            <button
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              onClick={() => {
                setReview({ title: "", id: "", detail: "" });
                setFormVisible(false);
              }}
            >
              취소
            </button>
          </div>
        </div>
      )}
    </div>
  );
});

export default ReviewComponent;
