import React, { use, useEffect, useState } from "react";
import NavBar from "../components/headerfooter/Navbar";
import Footer from "../components/headerfooter/Footer";
import axios from "axios";
import {
  storageEnum,
  LocalStorageService
} from "../api/storageApi";
import { phonecaseProducts } from "../dummydata/phonecaseProducts";

const APITestPage = () => {
  // isChange가 변동하면 출력이 바뀌는 목적입니다.
  const [isChange, setChange] = useState(false);

  // 상태 정의
  const [idx, setIdx] = useState(0);
  const [products, setProducts] = useState([]);
  const [carts, setCarts] = useState([]);
  const [users, setUsers] = useState([]);

  // 수정을 테스트하기위한 edit시리즈입니다.
  const [editProducts, setEditProducts] = useState([]);
  const [editCarts, setEditCarts] = useState([]);
  const [editUsers, setEditUsers] = useState([]);

  // useEffect를 통한 동기화를 구현하고자 하였습니다.
  useEffect(() => {
  }, [isChange]);

  // setter 매핑 객체
  // setterMap[storageEnum.Class.Product]의 결과는 setProducts()입니다.
  const setterMap = {
    [storageEnum.Class.Product]: setProducts,
    [storageEnum.Class.Cart]: setCarts,
    [storageEnum.Class.User]: setUsers,
  };

  // example
  // const addOneProduct = async () => {
  //   // phonecaseProducts Product의 초기 데이터
  //   console.log(phonecaseProducts[0]);
  //   const product = await createEntity(storageEnum.Class.Product, phonecaseProducts[idx]);
  //   console.log(product);
  // };
  // const addOneProduct = async () => {
  // }

  // example
  const addOneProduct = async () => {
    // phonecaseProducts[0]은 Product입니다.
    var ran = parseInt(Math.random() * phonecaseProducts.length);
    console.log(ran)
    var data = phonecaseProducts[ran];
    console.log(data);
    const product = await LocalStorageService.saveByOne(storageEnum.Class.Product, data);
    if (product === storageEnum.Result.Failure)
      return storageEnum.Result.Failure;

    setChange(!isChange);
  }

  const addProducts = async () => {
    const result = await LocalStorageService.save(storageEnum.Class.Product, phonecaseProducts);

    if (result === storageEnum.Result.Failure) {
      return storageEnum.Result.Failure;

      setChange(!isChange);
    };
  }

  // 데이터 리셋
  const resetProductData = async () => {
    const result = await LocalStorageService.initData(storageEnum.Class.Product, []);
    console.log(result);
    setChange(!isChange);
  }

  // 데이터 초기화
  const initProductData = async () => {
    const product = await LocalStorageService.initData(storageEnum.Class.Product, phonecaseProducts);
    console.log(product);
    setChange(!isChange);
  }

  // 모든 데이터를 로드
  const findAllData = async (className) => {
    const loadData = await LocalStorageService.findAll(className);
    console.log(loadData);
    setChange(!isChange);
    if (loadData === storageEnum.Result.Failure) {
      console.log("findAll실패");
      return storageEnum.Result.Failure;
    }

    const setState = setterMap[className];
    if (!setState)
      return storageEnum.Result.Failure;

    setState(loadData);
    setEditProducts(loadData);
  }

  const findOneData = async (className, id) => {
    const loadData = await LocalStorageService.findById(className, id);
    if (loadData === storageEnum.Result.Failure) {
      console.log("findAll실패");
      return storageEnum.Result.Failure;
    }

    const setState = setterMap[className];
    if (!setState)
      return storageEnum.Result.Failure;

    setState(loadData);
  }

  const updateOneData = async (className, id, newData) => {
    const result = await LocalStorageService.updateById(className, id, newData);
    if (result === storageEnum.Result.Failure) {
      console.log("findAll실패");
      return storageEnum.Result.Failure;
    }

    setChange(!isChange);
  }

  const deleteOneData = async (className, id) => {
    const result = await LocalStorageService.deleteById(className, id);
    if (result === storageEnum.Result.Failure) {
      return storageEnum.Result.Failure;
    }

    // 데이터 삭제의 경우 idx가 변경되면서 재로딩이 필요함
    // todo : 새로고침 안하고서도, delete된 데이터를 감지해야함
    findAllData(className);
    setEditProducts(products);
    setChange(!isChange);
  }

  return (
    <div>
      <NavBar />
      <button onClick={addProducts}>phonecaseProducts를 추가</button><br />      
      <button onClick={addOneProduct}>랜덤으로 Product 한 개 추가</button><br />
      <button onClick={resetProductData}>Product Data 모두 삭제</button><br />
      <button onClick={initProductData}>Product Data 초기화</button><br />
      <button onClick={() => findAllData(storageEnum.Class.Product)}>Product 데이터 로드 및 세팅</button><br />
      <input type="number" placeholder="숫자를 입력하시오" value={idx} onChange={(e) => {
        setIdx(e.target.value);
        console.log(e.target.value);
      }} />
      <button onClick={() => findOneData(storageEnum.Class.Product, idx)}>Product 원하는 데이터 불러오기</button>
      <hr />
      {products && products.map((item, idx) => {
        return <div>
          <h1>Product Data</h1>
          <div key={item.id}>
            <div>id : {item.id}</div>
            <div>name : {item.name}</div>
            <div>price : {item.price}</div>
            <div>image : {item.image}</div>
          </div>
          <br />
          <br />
          <h1>Product Data Modify</h1>
          {editProducts && editProducts.length > 0 && (<div>
            id : <input type="text" name="id" value={editProducts[idx].id} />
            name : <input type="text" name="name" value={editProducts[idx].name} onChange={e => {
              const updated = [...editProducts];
              updated[idx].name = e.target.value;
              setEditProducts(updated);
            }} />
            price : <input type="text" name="price" value={editProducts[idx].price} onChange={e => {
              const updated = [...editProducts];
              updated[idx].price = e.target.value;
              setEditProducts(updated);
            }} />
            image : <input type="text" name="image" value={editProducts[idx].image} onChange={e => {
              const updated = [...editProducts];
              updated[idx].image = e.target.value;
              setEditProducts(updated);
            }} />
            <br />
            <button onClick={() => updateOneData(storageEnum.Class.Product, item.id, editProducts[idx])}>수정하기</button>
            <br />
            <button onClick={() => deleteOneData(storageEnum.Class.Product, item.id)}>삭제하기</button>
          </div>)}

        </div>
      })}
      <hr />
      <Footer />
    </div>
  );
}



export default APITestPage;
