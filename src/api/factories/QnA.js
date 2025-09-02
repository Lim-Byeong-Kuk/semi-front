import { storageEnum, isValid } from "./factoriesApi";

export class QnA {
  constructor(qnaId, user, title, content, date) {
    this.qnaId = QnA.getNextId();
    this.user = user;
    this.title = title;
    this.content = content;
    this.date = date;
  }

  static validate(data) {
    return true;
  }

  // 저장소에서 pno의 값을 확인합니다.
  static getNextId() {
    const qnas = JSON.parse(localStorage.getItem(storageEnum.Class.QnA)) || [];

    // 데이터에 문제가 있다면 1번을 부여합니다.
    if (isValid(qnas) === false) return 1;

    const maxPno = Math.max(...qnas.map((qna) => qnas.qnaId || 0));
    return maxPno + 1;
  }

  static create(data) {
    const pnoId = "";
    const { user, title, content, date } = data;
    return new QnA(pnoId, user, title, content, date);
  }
}
