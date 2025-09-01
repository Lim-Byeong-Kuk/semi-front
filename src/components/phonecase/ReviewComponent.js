import React, { useState } from "react";

const ReviewComponent = () => {
  const [form, setForm] = useState(false);
  //초기값 false, 리뷰 작성하기 버튼을 눌렀을때 버튼 밑에 작성 공간 활성화를 위한 세팅
  const [review, setReview] = useState({
    reviewId: 0,
    title: "",
    user: "",
    detail: "",
    date: "",
  });
  const [reviews, setReviews] = useState([
    {
      reviewId: 1,
      title: "dummytitle",
      user: "dummyUser",
      detail: "dummyDetail",
      date: "",
    },
  ]);
  //등록된 리뷰들을 관리할 빈 배열

  const newReviewHandler = (e) => {
    const { name, value } = e.target;
    setReview({
      ...review,
      [name]: value,
    });
  };

  //리뷰 등록 핸들러
  const reviewHandler = () => {
    const newReview = {
      reviewId: reviews[reviews.length - 1].reviewId + 1,
      title: review.title,
      user: review.user,
      detail: review.detail,
      date: new Date().toLocaleString(),
    };
    setReviews([...reviews, newReview]);
    setReview({ title: "", user: "", detail: "" });
    setForm(true);

    alert(`리뷰 작성 완료`);
  };

  // 리뷰 삭제
  const deleteHandler = (id) => {
    alert(`삭제 완료`);
    const upddate = reviews.filter((review) => review.reviewId !== id);
    setReviews(upddate);
    console.log("삭제 후 리뷰 : ", upddate);
  };

  return (
    // 리뷰
    <div className="space-y-6">
      <h2 className="text-xl font-bold">리뷰</h2>
      <div className="space-y-2">
        {/* 리뷰 목록 */}
        {reviews.map((review) => (
          <div
            key={review.reviewId}
            className="border p-4 rounded-lg shadow-sm flex justify-between items-start"
          >
            <div className="text-left">
              <p className="font-semibold">{review.title}</p>
              <p className="font-semibold">{review.user}</p>
              <p className="text-gray-700" style={{ whiteSpace: "pre-line" }}>
                {review.detail}
              </p>
              <p className="text-gray-700">{review.date}</p>
            </div>
            <button
              className="px-4 py-2"
              onClick={() => deleteHandler(review.reviewId)}
            >
              {" "}
              삭제하기
            </button>
          </div>
        ))}
      </div>
      {/* 리뷰 작성하기 버튼 */}
      <div className="flex justify-center">
        <button
          className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition"
          onClick={() => setForm(!form)}
          // 리뷰 작성하기 버튼을 눌렀을때 setForm이 true가 돼서 버튼 밑에
          // 리뷰 작성을 위한 공간이 나옴
        >
          리뷰 작성하기
        </button>
      </div>

      {/* 리뷰 작성 공간 */}
      {form && (
        <div className="border p-4 rounded-lg shadow-md space-y-4 mt-4 flex flex-col justify-start">
          {/* 제목 입력 */}
          <div className="flex space-x-4">
            <input
              className="w-full p-2 border rounded-md"
              type="text"
              placeholder="제목"
              name="title"
              value={review.title}
              onChange={newReviewHandler}
            />
            {/* 이름 입력 */}
            <input
              className="w-full p-2 border rounded-md"
              type="text"
              placeholder="이름"
              name="user"
              value={review.user}
              onChange={newReviewHandler}
            />
          </div>
          {/* 리뷰 내용 입력 */}
          <textarea
            className="w-full p-2 border rounded-md"
            type="text"
            placeholder="리뷰를 입력하세요..."
            name="detail"
            value={review.detail}
            onChange={newReviewHandler}
            style={{
              height: "120px",
              overflow: "auto",
              resize: "none",
            }}
          />

          {/* 리뷰 등록 */}
          <div className="flex justify-end space-x-2">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={reviewHandler}
              // 제출 버튼을 누르면 실행되는 reviewHandler 함수
              // alert(`리뷰 작성 완료`)가 실행돼서 브라우저에 알림이 뜸
              // setForm(true)는 제출을 완료했을때 리뷰 작성을 위한 공간을 유지하기 위한 상태
              // false로 바꾸면 제출 완료후 공간이 사라지고 다시 리뷰 작성하기 버튼을 눌러야 나타남
              // setReviewText("") 위 코드 onChange에 따라 제출을 누르면
              // 입력된 내용이 리뷰로 등록된다
            >
              등록
            </button>

            {/* 리뷰 작성 취소 */}
            <button
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              onClick={() => {
                setReview({ title: "", user: "", detail: "" });
                setForm(form);
              }}
              // 취소 버튼을 눌렀을때 리뷰 작성 공간을 유지하고 싶으면 true 상태여야함
              // 리뷰 작성하기에서 onClick={() => setForm(!form)}
              // setForm을 이미 true로 상태 변경
              // 취소에서 setForm(!form)을 하면 true -> false로 상태 변경
              // setForm은 현재 true 이기 때문에 setForm(form) 으로 작성
              // 취소를 눌렀을시 리뷰 공간이 사라지길 원하면 setForm(!form) (false가 됨)

              // 취소를 눌렀을때 작성중이던 텍스트가 초기화되길 원하면 setReviewText("")
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
