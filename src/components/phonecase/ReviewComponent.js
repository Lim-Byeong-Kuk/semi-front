import React, { useEffect, useState } from "react";
import { LocalStorageService, storageEnum } from "../../api/storageApi";

const ReviewComponent = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState({ title: "", user: "", detail: "" });

  const [review, setReview] = useState({
    reviewId: 0,
    title: "",
    user: "",
    detail: "",
    date: "",
  });

  //로컬스토리지에서 초기 복원
  const [reviewList, setReviewList] = useState(() => {
    try {
      // const saved = localStorage.getItem("reviewList");
      const saved = LocalStorageService.findAll(storageEnum.Class.Review);
      return saved !== storageEnum.Result.Failure ? saved : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    // localStorage.setItem("reviewList", JSON.stringify(reviewList));
    LocalStorageService.initData(storageEnum.Class.Review, []);
    reviewList.map((i) =>
      LocalStorageService.saveByOne(storageEnum.Class.Review, i)
    );
  }, [reviewList]);

  // 리뷰 텍스트 입력 핸들러
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setReview({ ...review, [name]: value });
  };
  // 인라인 수정 폼 핸들러
  const draftChangeHandler = (e) => {
    const { name, value } = e.target;
    console.log("뭐든 출력을 해주십셔, 출력이 되는지 볼거에요", name, value);
    setDraft((prev) => ({ ...prev, [name]: value }));
  };

  //리뷰 등록 handler
  const reviewHandler = () => {
    console.log("눈으로 보는게 빠릅니다", review);
    if (!review.title.trim() || !review.user.trim() || !review.detail.trim()) {
      alert("제목/이름/내용을 모두 입력해 주세요");
      return;
    }
    const generateId = () => {
      if (reviewList.length === 0) return 1;
      else return reviewList[reviewList.length - 1].reviewId + 1;
    };
    const newReview = {
      reviewId: generateId(),
      title: review.title,
      user: review.user,
      detail: review.detail,
      date: new Date().toLocaleString(),
    };
    setReviewList([...reviewList, newReview]);
    setReview({ title: "", user: "", detail: "" });
    // localStorage.setItem("reviewList", reviewList);
    LocalStorageService.initData(storageEnum.Class.Review, reviewList);
    setFormVisible(true);

    alert(`리뷰 작성 완료`);
  };

  // 리뷰 삭제 handler
  const deleteHandler = (id) => {
    alert(`삭제 완료`);
    const update = reviewList.filter((review) => review.reviewId !== id);
    setReviewList(update);
    console.log("삭제 후 리뷰 : ", update);
  };

  // 리뷰 수정 시작
  const startEdit = (r) => {
    setEditingId(r.reviewId);
    setDraft({ title: r.title, user: r.user, detail: r.detail });
  };

  // 인라인 수정 저장
  const saveEdit = () => {
    if (!draft.title.trim() || !draft.user.trim() || !draft.detail.trim()) {
      alert("제목/이름/내용을 모두 입력해 주세요");
      return;
    }
    setReviewList((prev) =>
      prev.map((review) =>
        review.reviewId === editingId
          ? { ...review, ...draft, date: new Date().toLocaleString() }
          : review
      )
    );
    alert("리뷰 수정 완료");
    setEditingId(null);
    setDraft({ title: "", user: "", detail: "" });
  };

  // 인라인 수정 취소
  const cancelEdit = () => {
    setEditingId(null);
    setDraft({ title: "", user: "", detail: "" });
  };

  return (
    <div className="space-y-6">
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
                      <input
                        className="w-1/2 p-2 border rounded-md"
                        type="text"
                        name="user"
                        placeholder="이름"
                        value={draft.user}
                        onChange={draftChangeHandler}
                      />
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
                    <p className="font-semibold">{review.user}</p>
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
                      onClick={saveEdit}
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
                      onClick={() => deleteHandler(review.reviewId)}
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
          disabled={editingId !== null} // 편집 중엔 작성 비활성화(선택)
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
            <input
              className="w-full p-2 border rounded-md"
              type="text"
              placeholder="이름"
              name="user"
              value={review.user}
              onChange={changeHandler}
            />
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
                setReview({ title: "", user: "", detail: "" });
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
};

export default ReviewComponent;
