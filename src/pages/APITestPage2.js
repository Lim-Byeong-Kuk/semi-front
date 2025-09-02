import React, { useEffect, useState } from "react";
import axios from "axios";
import { storageEnum, LocalStorageService } from "../api/storageApi";

// 제품 , 회원 순서
import { phonecaseProducts } from "../dummydata/phonecaseProducts";
import { userData } from "../dummydata/userData";
import { commentData } from "../dummydata/commentData";

const APITestPage2 = () => {
  const [isUserMode, setUserMode] = useState(false);
  const [isCommentMode, setCommentMode] = useState(false);
  const [isReviewMode, setReviewMode] = useState(false);

  const [cnt, setCnt] = useState(0);
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [reviews, setReviews] = useState([]);

  const openEditForm = (className, id) => {
    const userInput = prompt("수정할 내용을 입력하세요:");
    if (userInput === null) return; // 사용자가 취소한 경우

    const form = {
      content: userInput, // 예시: 수정할 내용
    };
    
    updateById(className, id, form);

  }

  const getCommentTable = (comments) => {
    return (
      <table className="w-full table-fixed border-collapse border border-gray-300 text-xs mb-6">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-1 w-[4%]">commentId</th>
            <th className="border p-1 w-[4%]">userId</th>
            <th className="border p-1 w-[15%]">id</th>
            <th className="border p-1 w-[8%]">pwd</th>
            <th className="border p-1 w-[8%]">commentId</th>
            <th className="border p-1 w-[10%]">content</th>
            <th className="border p-1 w-[25%]">date</th>
          </tr>
        </thead>
        <tbody>
          {comments &&
            comments.map((commentData) => (
              <React.Fragment key={commentData.commentId}>
                <tr>
                  <td className="border p-1 text-center">
                    {commentData.commentId}
                  </td>
                  <td className="border p-1 text-center">
                    {commentData.user.userId}
                  </td>
                  <td className="border p-1 text-center">
                    {commentData.user.id}
                  </td>
                  <td className="border p-1 text-center">
                    {commentData.user.pwd}
                  </td>
                  <td className="border p-1 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <input
                        type="password"
                        placeholder="패스워드"
                        className="border px-1 py-0.5 text-[10px] w-[70px]"
                      />
                      <button className="px-2 py-0.5 bg-blue-500 text-white text-[10px] rounded hover:bg-blue-600"
                        onClick={() => openEditForm()}>
                        수정
                      </button>
                      <button className="px-2 py-0.5 bg-blue-500 text-white text-[10px] rounded hover:bg-blue-600"
                        onClick={() => deleteById(storageEnum.Class.Comment, commentData.commentId)}>
                        삭제
                      </button>
                    </div>
                  </td>
                  <td className="border p-1 truncate">{commentData.content}</td>
                  <td className="border p-1 text-center">{commentData.date}</td>
                </tr>
              </React.Fragment>
            ))}
        </tbody>
      </table>
    );
  };

  const getUserTable = (users) => {
    return (
      <table className="w-full table-fixed border-collapse border border-gray-300 text-xs mb-6">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-1 w-[4%]">userId</th>
            <th className="border p-1 w-[15%]">id</th>
            <th className="border p-1 w-[8%]">pwd</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((userData) => (
              <React.Fragment key={userData.userId}>
                <tr>
                  <td className="border p-1 text-center">{userData.userId}</td>
                  <td className="border p-1 text-center">{userData.id}</td>
                  <td className="border p-1 text-center">{userData.pwd}</td>
                </tr>
              </React.Fragment>
            ))}
        </tbody>
      </table>
    );
  };

  const getReviewTable = (reviews) => {
    return (
      <table className="w-full table-fixed border-collapse border border-gray-300 text-xs mb-6">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-1 w-[4%]">Review Id</th>
            <th className="border p-1 w-[15%]">Product</th>
            <th className="border p-1 w-[8%]">User</th>
            <th className="border p-1 w-[8%]">Title</th>
            <th className="border p-1 w-[10%]">Content</th>
            <th className="border p-1 w-[25%]">Date</th>
          </tr>
        </thead>
        <tbody>
          {reviews &&
            reviews.map((reviewData) => (
              <React.Fragment key={reviewData.reviewId}>
                <tr>
                  <td className="border p-1 text-center">
                    {reviewData.reviewId}
                  </td>
                  <td className="border p-1 text-center">
                    {reviewData.product.name}
                  </td>
                  <td className="border p-1 text-center">
                    {reviewData.user.id}
                  </td>
                  <td className="border p-1 text-center">{reviewData.title}</td>
                  <td className="border p-1 text-center">
                    {reviewData.content}
                  </td>
                  <td className="border p-1 text-center">{reviewData.date}</td>
                </tr>
              </React.Fragment>
            ))}
        </tbody>
      </table>
    );
  };

  const getRandomProduct = () => {
    const ran = parseInt(Math.random() * phonecaseProducts.length);
    return phonecaseProducts[ran];
  };

  const getRandomUser = () => {
    const ran = parseInt(Math.random() * userData.length);
    return userData[ran];
  };

  const getByIdUser = (idx) => {
    return userData[idx];
  };

  const getRandomComment = () => {
    const ran = parseInt(Math.random() * commentData.length);
    const data = commentData[ran];
    data.user = getByIdUser(parseInt(data.user));
    return data;
  };

  const resetUser = async () => {
    const result = await LocalStorageService.initData(
      storageEnum.Class.User,
      []
    );

    if (result === storageEnum.Result.Failure)
      return storageEnum.Result.Failure;

    const result2 = await LocalStorageService.initData(
      storageEnum.Class.Comment,
      []
    );

    if (result2 === storageEnum.Result.Failure)
      return storageEnum.Result.Failure;

    const result3 = await LocalStorageService.initData(
      storageEnum.Class.Review,
      []
    );

    if (result3 === storageEnum.Result.Failure)
      return storageEnum.Result.Failure;

    setCnt((i) => 0);
  };

  const addReview = async () => {
    // 현재 날짜 데이터를 ISO인데 String형태로 
    const currentDate = new Date().toISOString();
    const tempComment = getRandomComment(); // 랜덤 Comment데이터 가져오기
    const pushComments = [];

    // 제품 코멘트를 랜덤한 개수만큼 생성합니다.
    for (var i = 0; i < parseInt(Math.random() * 5); i++)
      pushComments.push(getRandomComment());

    const result = await LocalStorageService.saveByOne(
      storageEnum.Class.Review,
      {
        // 랜덤한 데이터를 가져옵니다.
        product: getRandomProduct(),
        user: getRandomUser(),
        commentId: 1, // 형식상 id를 넘깁니다.
        title: tempComment.title,
        content: tempComment.content,
        date: currentDate,
        comments: pushComments,
      }
    );

    if (result === storageEnum.Result.Failre) {
      console.log("데이터 삽입 실패");
      return storageEnum.Result.Failure;
    }

    setCnt((i) => i + 1);
  };

  const addUser = async () => {
    const userData = getRandomUser();

    console.log(userData);
    const result = await LocalStorageService.saveByOne(
      storageEnum.Class.User,
      userData
    );


    if (result === storageEnum.Result.Failure) {
      console.log("데이터추가 실패");
      return storageEnum.Result.Failure;
    }

    setCnt((i) => i + 1);
    console.log(cnt);
  };

  const addComment = async () => {
    const userData = getRandomUser();
    // 현재 시간을 ISO 8601 형식으로 저장
    const currentDate = new Date().toISOString();
    const result = await LocalStorageService.saveByOne(
      storageEnum.Class.Comment,
      {
        user: userData,
        commentId: 1,
        content: "내용입니다.",
        date: currentDate,
      }
    );
    if (result === storageEnum.Result.Failure) {
      console.log("데이터 추가 실패");
      return storageEnum.Result.Failure;
    }

    setCnt((i) => i + 1);
    console.log(cnt);
  };

  const deleteById = async (className, id) => {
    console.log(id);
    const result = await LocalStorageService.deleteById(className, id);
    if (result === storageEnum.Result.Failure) {
      console.log("데이터 삭제 실패");
      return storageEnum.Result.Failure;
    }

    setCnt(i => i + 1);
  }

  const updateById = async (className, id, newData) => {
    const result = await LocalStorageService.updateById(className, id, newData);
    if (result === storageEnum.Result.Failure) {
      console.log("데이터 삭제 실패");
      return storageEnum.Result.Failure;
    }

    setCnt(i => i + 1);
  }

  useEffect(() => {
    (async () => {
      const resultUser = await LocalStorageService.findAll(
        storageEnum.Class.User
      );

      if (resultUser === storageEnum.Result.Failure)
        return storageEnum.Result.Failure;

      setUsers(resultUser);
    })();

    (async () => {
      const resultComment = await LocalStorageService.findAll(
        storageEnum.Class.Comment
      );
      if (resultComment === storageEnum.Result.Failure)
        return storageEnum.Result.Failure;

      setComments(resultComment);
    })();

    (async () => {
      const resultComment = await LocalStorageService.findAll(
        storageEnum.Class.Review
      );
      if (resultComment === storageEnum.Result.Failure)
        return storageEnum.Result.Failure;

      setReviews(resultComment);
    })();
  }, [cnt]);

  return (
    <>
      <button onClick={() => resetUser()}>user data reset</button>
      <br />
      <button onClick={() => addUser()}>user data 1개 추가</button>
      <button onClick={() => addComment()}>Comment data 1개 추가</button>
      <button onClick={() => addReview()}>Review data 1개 추가</button>
      <br />
      <button
        onClick={() => {
          setUserMode(true);
          setCommentMode(false);
          setReviewMode(false);
        }}
      >
        user모드
      </button>
      <button
        onClick={() => {
          setUserMode(false);
          setCommentMode(true);
          setReviewMode(false);
        }}
      >
        comment모드
      </button>
      <button
        onClick={() => {
          setUserMode(false);
          setCommentMode(false);
          setReviewMode(true);
        }}
      >
        review모드
      </button>
      <br />
      {comments && isCommentMode && getCommentTable(comments)}
      {users && isUserMode && getUserTable(users)}
      {reviews && isReviewMode && getReviewTable(reviews)}
    </>
  );
};

export default APITestPage2;
