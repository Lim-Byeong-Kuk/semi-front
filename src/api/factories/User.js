import { storageEnum, isValid } from "./factoriesApi";

// User 클래스 입니다.
export class User {
  // 생성자 입니다.
  // 다음 userId를 탐색하여 부여합니다.
  constructor(userId, id, pwd) {
    this.userId = isValid(userId) ? userId : User.getNextId();
    this.id = id;
    this.pwd = pwd;
  }

  // User.validate();
  // 데이터 체크입니다.
  // 모두 true로 판정이 나와야 성공입니다.
  static validate(data) {
    console.log("userData", data);
    return (
      // createEntitiy에서 pno를 ""로 넘기게 됩니다.
      // typeof data.id === "string" && typeof data.pwd === "number"
      true
    );
  }

  // 저장소에서 pno의 값을 확인합니다.
  static getNextId() {
    const users =
      JSON.parse(localStorage.getItem(storageEnum.Class.User)) || [];

    // 데이터에 문제가 있다면 1번을 부여합니다.
    if (isValid(users) === false) return 1;

    // 마지막 번호 + 1
    const maxPno = Math.max(...users.map((user) => user.userId || 0));
    return maxPno + 1;
  }

  static create(data) {
    // 문제가 없는 것으로 판단하여,
    // 클래스를 생성자를 통해 생성해줍니다.
    // tempClass에 생성한 것을 넣습니다.
    // todo : tempClass대신에 instance로 바꾸기 helper : 소라님
    const { id, pwd } = data;
    // const pnoId = data[getIdByClass[className]];
    const pnoId = "";
    return new User(pnoId, id, pwd);
  }
}
