import { storageEnum, isValid } from "./factoriesApi";

export class QnA {
  constructor(qnaId, id, title, content, writer, date, images, href) {
    this.qnaId = isValid(qnaId) ? qnaId : QnA.getNextId();
    this.id = id;
    this.title = title;
    this.content = content;
    this.writer = writer;
    this.date = date;
    this.images = images;
    this.href = href;
  }

  static validate(data) {
    return true;
  }

  // 저장소에서 pno의 값을 확인합니다.
  static getNextId() {
    // const qnas = JSON.parse(localStorage.getItem(storageEnum.Class.QnA)) || [];
    const users = JSON.parse(localStorage.getItem("user"));
    const allQnAs = users.map((user) => user.qnas).flat(2) || [];

    // 데이터에 문제가 있다면 1번을 부여합니다.
    if (allQnAs === 0) return 1;

    const maxPno = Math.max(...allQnAs.map((qna) => qna.qnaId || 0));
    return maxPno + 1;
  }

  static create(data) {
    const { qnaId, id, title, content, writer, date, images, href } = data;
    return new QnA(qnaId, id, title, content, writer, date, images, href);
  }
}
