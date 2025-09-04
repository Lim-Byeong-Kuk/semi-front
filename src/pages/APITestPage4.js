import { useEffect, useState } from "react";
import { LocalStorageService, storageEnum } from "../api/storageApi";
import { userData } from "../dummydata/userData";

const APITestPage4 = () => {
    const [isUserMode, setUserMode] = useState(false);
    const [isCart, setCartMode] = useState(false);
    const [isReviewMode, setReviewMode] = useState(false);
    const [isQnAMode, setQnAMode] = useState(false);

    const [users, setUsers] = useState([]);
    const [carts, setCarts] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [qnas, setQnAs] = useState([]);

    // 더미 데이터를 통해 localstorage에 세팅
    useEffect(() => {
        LocalStorageService.initData(storageEnum.Class.User, userData);
    }, []);

    const getUserTable = (users) => {
        return <div>userTable</div>
    }

    const getCartTable = (carts) => {
        return <div>cartTable</div>
    }

    const getReviewTable = (reviews) => {
        return <div>reviewTable</div>
    }

    const getQnATable = (qnas) => {
        return <div>qnaTable</div>
    }

    // 데이터 추가를 통해 테스트용 데이터 반환
    const getRamdomData = (collectionName) => {

    }

    // 읽기
    const readReview = () => {
        var data = LocalStorageService.findAllByCollection(
            storageEnum.Collection.Reviews
        );
        console.log(data);
    }

    // 수정
    const updateReview = () => {
        LocalStorageService.updateCollection(
            storageEnum.Class.Review,
            storageEnum.Collection.Reviews,
            data2,
        );
    }

    // 쓰기
    const saveReview = () => {
        LocalStorageService.saveCollectionOne(
            storageEnum.Class.Review,
            storageEnum.Collection.Reviews,
            data2,
        );
    }

    // 삭제
    const deleteReview = () => {
        LocalStorageService.deleteByCollection(
            storageEnum.Class.Review,
            storageEnum.Collection.Reviews,
            "sora1228",
            5
        );
    }

    return (
        <>
            <div>
                <h1>모드 변경</h1>
                <button onClick={() => {
                    setUserMode(true);
                    setCartMode(false);
                    setReviewMode(false);
                    setQnAMode(false);
                }}>
                    <h1>user모드</h1>
                </button>
                <button onClick={() => {
                    setUserMode(false);
                    setCartMode(true);
                    setReviewMode(false);
                    setQnAMode(false);
                }}>
                    <h1>Cart모드</h1>
                </button>
                <button onClick={() => {
                    setUserMode(false);
                    setCartMode(false);
                    setReviewMode(true);
                    setQnAMode(false);
                }}>
                    <h1>Review모드</h1>
                </button>
                <button onClick={() => {
                    setUserMode(false);
                    setCartMode(false);
                    setReviewMode(false);
                    setQnAMode(true);
                }}>
                    <h1>QnA모드</h1>
                </button>
            </div>
            <br />
            <div>
                <h1>데이터 추가</h1>
                <button onClick={() => getRamdomData(storageEnum.Class.User)}><h1>유저 추가</h1></button>
                <button onClick={() => getRamdomData(storageEnum.Collection.Carts)}><h1>카트 추가</h1></button>
                <button onClick={() => getRamdomData(storageEnum.Collection.Reviews)}><h1>리뷰 추가</h1></button>
                <button onClick={() => getRamdomData(storageEnum.Collection.QnAs)}><h1>QnA 추가</h1></button>
            </div>
            <br />
            {users && isUserMode && getUserTable(users)}
            {carts && isCart && getCartTable(carts)}
            {reviews && isReviewMode && getReviewTable(reviews)}
            {qnas && isQnAMode && getQnATable(qnas)}
        </>
    );
}

export default APITestPage4;