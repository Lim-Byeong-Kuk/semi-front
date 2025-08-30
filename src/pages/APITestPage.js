import React, { useEffect, useState } from "react";
import NavBar from "../components/headerfooter/Navbar";
import Footer from "../components/headerfooter/Footer";
import axios from "axios";
import { addCartList, getCartListByOne, getCartListByAll, updateCarListByOne, deleteCarListByOne, initData } from "../api/storageApi";
import { cartData } from "../dummydata/cartData";

const APITestPage = () => {

  const storageEnum = {
    Success: "success",
    Failure: "failure",
    Unknown: "unknown",
  }
  const addData = () => {
    const newItem = {
      id: Date.now(), // 고유 ID 생성
      name: "새로운 테스트 상품",
      quantity: 1,
      model: "테스트모델",
      select: { design: "테스트디자인" },
      price: "₩9,900",
      img: "https://via.placeholder.com/150",
    };

    const result = addCartList("cartData", newItem);
    if (result === storageEnum.Success) {
      const updated = JSON.parse(getCartListByAll("cartData"));
      setData(updated);
      console.log("추가 성공:", newItem);
    } else {
      console.log("추가 실패");
    }
  };

  const deleteData = () => {
    const targetId = data.length > 0 ? data[data.length - 1].id : null;
    if (!targetId) return;

    const result = deleteCarListByOne("cartData", targetId);
    if (result === storageEnum.Success) {
      const updated = JSON.parse(getCartListByAll("cartData"));
      setData(updated);
      console.log("삭제 성공:", targetId);
    } else {
      console.log("삭제 실패");
    }
  };

  const modifyData = () => {
    if (data.length === 0) return;

    const targetId = data[0].id;
    const updatedItem = {
      id: targetId,
      name: "수정된 상품명",
      quantity: 99,
      model: "수정모델",
      select: { design: "수정디자인" },
      price: "₩99,999",
      img: "https://via.placeholder.com/150/0000FF/FFFFFF?text=Updated",
    };

    const result = updateCarListByOne("cartData", targetId, updatedItem);
    if (result === storageEnum.Success) {
      const updated = JSON.parse(getCartListByAll("cartData"));
      setData(updated);
      console.log("수정 성공:", updatedItem);
    } else {
      console.log("수정 실패");
    }
  };

  const modify = (oneData) => {
    setData([...data, { [data[oneData.id - 1]]: oneData }]);
  }

  const [data, setData] = useState([]);
  useEffect(() => {
    const initAndFetch = async () => {
      const initResult = await initData("cartData", cartData);
      console.log("초기화 결과:", initResult);

      const result = getCartListByAll("cartData");
      console.log("두 번째 저장된 데이터:", result);
      const parsed = JSON.parse(result);
      setData(parsed);
      console.log("데이터 로드 성공:", parsed);
      if (result) {
        try {

        } catch (e) {
          console.log("데이터 파싱 실패:", e);
        }
      } else {
        console.log("데이터 없음");
      }
    };

    initAndFetch();
  }, []);

  return (
    <div>
      <NavBar />
      {data && data.map(item => {
        return <div key={item.id}>
          <div>{item.id}</div>
          <div>{item.name}</div>
          <div>{item.quantity}</div>
          <div>{item.model}</div>
          <div>{item.price}</div>

          <div>{item.img}</div>
        </div>
      })}
      <div style={{ margin: "20px 0" }}>
        <button onClick={addData}>🟢 Add</button>
        <button onClick={modifyData}>🟡 Update</button>
        <button onClick={deleteData}>🔴 Delete</button>
      </div>
      <Footer />
    </div>
  );
};

export default APITestPage;
