// localStorage는 기본적으로 key와 value로 이루어집니다.
// value 가 string밖에 안됨
// const objString = JSON.stringify(obj) obj가 json 형태 일 때, string 형태로 펼칩니다.
// const obj = JSON.parse(objString)는 obj는 string화된 객체를 json화 합니다.
const checkData = (data) => {
  // null, undefined, 공백 문자열 체크
  if (data === null || data === undefined || data === "") {
    return false;
  }

  return true;
};

const initData = (name, data) => {
  if (!checkData(data)) return "failure";

  try {
    let tempData;

    // 원시값이면 객체로 감싸기
    if (typeof data !== "object") {
      tempData = { parseData: data };
    } else {
      tempData = data;
    }

    const stringified = JSON.stringify(tempData);
    localStorage.setItem(name, stringified);
    console.log("데이터 저장 성공:", stringified);
    return "success";
  } catch (error) {
    console.error("데이터 저장 실패:", error);
    return "failure";
  }
};

const addCartList = (name, newData) => {
  // 전체항목 로드
  var data = localStorage.getItem(name);

  if (!checkData(newData)) return "failure";

  var parseData = JSON.parse(data);
  console.log("parseData", parseData);
  parseData.push(newData);

  localStorage.setItem(name, JSON.stringify(parseData));
  console.log("추가 이후 데이터 : ", parseData);

  return "success";
};

const getCartListByOne = (name, id) => {
  var data = localStorage.getItem(name);

  if (!checkData(data)) return "failure";

  // 2번을 배열의 순서대로 내보내기 위함
  var findData = JSON.parse(data)[id - 1];
  return JSON.stringify(findData);
};

const getCartListByAll = (name) => {
  // 데이터 꼬임을 방지하기 위해 비동기로 해야함
  var data = localStorage.getItem(name);
  return data;
};

const updateCarListByAll = (name, newDatas) => {
  const stored = localStorage.getItem(name);
  if (!checkData(stored)) return "failure";

  try {
    const parsed = JSON.parse(newDatas);
    localStorage.setItem(name, JSON.stringify(parsed));
    console.log("수정된 데이터:", parsed);
    return "success";
  } catch (error) {
    console.error("업데이트 실패:", error);
    return "failure";
  }
};

const updateCarListByOne = (name, newData) => {
  const stored = localStorage.getItem(name);
  if (!checkData(stored)) return "failure";

  try {
    const parsed = JSON.parse(stored);
    const updated = parsed.map((obj) => {
      // 혹시나 모를 상황 방지
      return String(obj.id) === String(newData.id) ? newData : obj;
    });

    console.log("업데이트 내용", JSON.stringify(updated));
    localStorage.setItem(name, JSON.stringify(updated));
    console.log("수정된 데이터:", updated);
    return "success";
  } catch (error) {
    console.error("업데이트 실패:", error);
    return "failure";
  }
};

const deleteCarListByOne = (name, id) => {
  const stored = localStorage.getItem(name);
  if (!checkData(stored)) return "failure";

  console.log("test : ", JSON.parse(stored));
  var resultData = JSON.parse(stored).filter((d, idx) => d.id !== id);
  updateCarListByAll(name, JSON.stringify(resultData));
  return "success";
};

export {
  initData,
  addCartList,
  getCartListByOne,
  getCartListByAll,
  updateCarListByOne,
  deleteCarListByOne,
};
