import React, { useEffect, useState } from "react";
import { qnaData } from "../dummydata/qnaData";
import { LocalStorageService, storageEnum } from "../api/storageApi";

const APITestPage = () => {
  const [qnaDatas, setQnaDatas] = useState([]);
  const [change, setChange] = useState(0);

  const addData = () => {
    LocalStorageService.initData(storageEnum.Class.QnA, qnaData);
    setChange(change + 1);
  };

  useEffect(() => {
    (async () => {
      const data = await LocalStorageService.findAll(storageEnum.Class.QnA);
      if (data === storageEnum.Result.Failure) {
        console.log("fail");
        return;
      }
      setQnaDatas(data);
    })();
  }, [change]);

  return (
    <div>
      <button onClick={() => addData()}>qna추가 및 api 테스트</button>
      {qnaDatas &&
        qnaDatas.map((data) => (
          <div>
            <div>qnaId : {data.qnaId}</div>
            <div>user : {data.user}</div>
            <div>title : {data.title}</div>
            <div>content : {data.content}</div>
            <div>date : {data.date}</div>
            <br />
          </div>
        ))}
    </div>
  );
};

export default APITestPage;
