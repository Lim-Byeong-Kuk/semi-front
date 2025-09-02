// localStorage는 기본적으로 key와 value로 이루어집니다.
// value 가 string밖에 안됨
// JSON.stringify(객체데이터) obj가 json 형태 일 때, string 형태로 펼칩니다.
// JSON.parse(string데이터)는 obj는 string화된 객체를 json화 합니다.

// enum(열거형 타입)을 만든다.
// Result는 결과의 enum이고,
// Class는 클래스명의 enum이다.

// 데이터에 이상이 없는지 체크한다.
// null이나 빈데이터, 혹은 이상한 데이터를 체크합니다.
// 데이터 유효성 검사

import {
  createEntity,
  isValid,
  getIdByClass,
  storageEnum,
} from "./factories/factoriesApi";

// 클래스 명과 데이터 배열을 매개 변수로 받아서,
// 저장소의 초기 데이터를 세팅합니다.
const initData = (className, dataArray) => {
  // 클래스 체크
  if (Object.values(storageEnum.Class).includes(className) === false)
    return storageEnum.Result.Failure;

  // 데이터 체크
  // 비어있는 init도 허용
  if (isValid(dataArray) === false) {
    localStorage.setItem(className, JSON.stringify([]));
    return storageEnum.Result.Success;
  }

  // date를 넣기위한 배열
  const result = [];

  // 데이터 배열를 enhanced for로 돌립니다.
  for (var data of dataArray) {
    // 객체를 생성합니다.
    // 만약 객체가 반환실패하면 실행되지 않습니다.
    const entity = createEntity(className, data);
    if (entity !== storageEnum.Result.Failure) result.push(entity);
  }

  // 빈 객체인지 체크
  if (isValid(result) === false) return storageEnum.Result.Failure;

  // 정상적인 데이터라면 데이터가 저장소에 들어갑니다.
  localStorage.setItem(className, JSON.stringify(result));
  return storageEnum.Result.Success;
};

// 데이터를 여러개 추가하는 기능입니다.
// 데이터를 배열 객체로 받습니다.
const save = (className, dataArray) => {
  // 클래스 체크
  if (Object.values(storageEnum.Class).includes(className) === false)
    return storageEnum.Result.Failure;

  // 데이터 체크
  if (isValid(dataArray) === false) return storageEnum.Result.Failure;

  // 데이터를 불러옵니다.
  const stored = localStorage.getItem(className);

  // 기존 데이터가 없다면 새로 추가합니다.
  // 있다면 데이터를 parse해서 가져옵니다.
  var result = null;
  if (isValid(stored) === false) {
    result = [];
  } else {
    result = JSON.parse(stored);
  }

  for (const data of dataArray) {
    // 객체 생성
    const entity = createEntity(className, data);

    // 객체 생성의 결과가 실패인 경우 종료
    if (entity === storageEnum.Result.Failure) {
      console.log("데이터에 이상이 있습니다.");
      return storageEnum.Result.Failure;
    }

    result.push(entity);
  }

  // 배열에 올바르게 데이터가 들어갔는지 유효한지 체크
  if (isValid(result) === false) return storageEnum.Result.Failure;

  // 성공적으로 데이터를 저장하였습니다.
  localStorage.setItem(className, JSON.stringify(result));
  return storageEnum.Result.Success;
};

// 데이터를 한 개 추가하는 기능입니다.
// 데이터를 단일 객체로 받습니다.
const saveByOne = (className, newData) => {
  // 클래스 체크
  if (Object.values(storageEnum.Class).includes(className) === false)
    return storageEnum.Result.Failure;

  // 데이터 체크
  if (!isValid(newData)) return storageEnum.Result.Failure;

  // 데이터 추가를 위한 객체 생성
  const entity = createEntity(className, newData);
  if (entity === storageEnum.Result.Failure) return storageEnum.Result.Failure;

  // 데이터를 불러옵니다.
  const stored = localStorage.getItem(className);
  console.log("결과", stored);
  // 기존 데이터가 없다면 새로 추가합니다.
  // 배열 형태로 저장되어야 하므로 배열로 감쌉니다.
  var result = null;
  if (isValid(stored) === false) {
    result = [];
  } else {
    result = JSON.parse(stored);
  }

  console.log(result);

  // 데이터 추가에 성공합니다.
  result.push(entity);
  localStorage.setItem(className, JSON.stringify(result));
  return storageEnum.Result.Success;
};

// 반환 타입은 json 형태로 반환합니다.
// 클래스 이름과 id를 통해 데이터를 1개 반환받습니다.
const findById = (className, id) => {
  // enum을 통한 클래스 확인
  if (!Object.values(storageEnum.Class).includes(className))
    return storageEnum.Result.Failure;

  // className을 통한 데이터 불러오기
  const getData = localStorage.getItem(className);

  // 데이터가 비어있는지 체크합니다.
  if (isValid(getData) === false) return storageEnum.Result.Failure;

  // 필터를 통한 데이터 찾고, 빈 데이터인지 체크
  // 원래라면 map.find로 단일 객체를 반환해야 하지만, 데이터를 배열 객체 형태로 읽기때문에,
  // 배열객체로 반환하도록 하였습니다.
  // const findData = JSON.parse(getData).find(item => String(item.id) === String(id));

  // 기존에는 데이터가 String으로 펼쳐져있기 때문에,
  // JSON화를 한 후에 filter를 통해 데이터를 찾습니다.
  const findData = JSON.parse(getData).filter(
    (data) => String(data[getIdByClass[className]]) === String(id)
  );

  // 데이터가 유효한지 확인합니다.
  if (isValid(findData) === false) return storageEnum.Result.Failure;

  // 찾은 데이터를 JSON형태로 반환합니다.
  return findData;
};

// 데이터를 반환할 때는, json형태로 반환합니다.
// 클래스 이름을 통해 모든 데이터를 불러옵니다.
const findAll = (className) => {
  // enum을 통한 클래스 체크
  if (!Object.values(storageEnum.Class).includes(className))
    return storageEnum.Result.Failure;

  // 데이터 로드 후 유효성 체크
  // 데이터가 string형태로 나옵니다.
  const getData = localStorage.getItem(className);
  if (!isValid(getData)) return storageEnum.Result.Failure;

  // 불러온 데이터를 JSON으로 변환한 후에 반환
  return JSON.parse(getData);
};

// 데이터를 업데이트합니다.
// save대신 updateById로 개명하였습니다.
// 클래스이름, id, 새로운 데이터를 받아서 처리합니다.
// todo : 같은 처리인데, 계속 반복되는 구간이 너무 많다. 소라님 감사해요.
const updateById = (className, id, newData) => {
  // 데이터 유효성 체크
  if (!isValid(newData)) return storageEnum.Result.Failure;

  // 클래스가 유효한지 체크합니다.
  if (!Object.values(storageEnum.Class).includes(className))
    return storageEnum.Result.Failure;

  // 전체 데이터 가져오기
  const getData = JSON.parse(localStorage.getItem(className));

  // 데이터가 유효한지 체크합니다.
  if (isValid(getData) === false) return storageEnum.Result.Failure;

  // 가져온 데이터에서 map을 활용해서변경하기
  // 참이면 새로운 데이터를 덮어씌웁니다.
  // 거짓이면 기존 데이터를 덮어씌웁니다.
  const updatedData = getData.map((data) => {
    return String(data[getIdByClass[className]]) === String(id)
      ? newData
      : data;
  });

  // 데이터를 저장소에 전달합니다.
  localStorage.setItem(className, JSON.stringify(updatedData));
  return storageEnum.Result.Success;
};

// 데이터를 클래스명과 id를 통해 삭제합니다.
const deleteById = (className, id) => {
  // 데이터 유효성 체크
  if (isValid(id) === false) return storageEnum.Result.Failure;

  if (!Object.values(storageEnum.Class).includes(className))
    return storageEnum.Result.Failure;

  // 전체 데이터 가져오기
  const getData = JSON.parse(localStorage.getItem(className));
  if (isValid(getData) === false) return storageEnum.Result.Failure;

  // 가져온 데이터에서 id만 제외
  console.log("가져와따", getData);
  console.log(id);
  console.log(
    getData.filter(
      (data) => String(data[getIdByClass[className]]) !== String(id)
    )
  );
  const updatedData = getData.filter(
    (data) => String(data[getIdByClass[className]]) !== String(id)
  );

  // 이것으로 인하여 삭제가 안되므로 주석처리 하였습니다.
  // if (isValid(updatedData) === false) return storageEnum.Result.Failure;

  // 저장소에 데이터를 저장합니다.
  localStorage.setItem(className, JSON.stringify(updatedData));
  return storageEnum.Result.Success;
};

// 데이터 초기화 기능입니다.
// 5MB라는 작은 용량이기도 하고,
// 혹시나 터지는 경우를 방지합니다.

// 전체 초기화
const clearAllData = () => {
  localStorage.clear();
};

// 클래스별 초기화
const clearClassData = () => {
  localStorage.removeItem(storageEnum.Class.Product);
  localStorage.removeItem(storageEnum.Class.Cart);
  localStorage.removeItem(storageEnum.Class.User);
  localStorage.removeItem(storageEnum.Class.Review);
  localStorage.removeItem(storageEnum.Class.QnA);
};

export { storageEnum, createEntity };

export const LocalStorageService = {
  initData,
  save,
  saveByOne,
  findById,
  findAll,
  updateById,
  deleteById,
};
