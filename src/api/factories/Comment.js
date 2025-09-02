import { storageEnum, isValid } from "./factoriesApi";
import { User } from "./User";

export class Comment {
  constructor(user, commentId, content, date) {
    this.user = user;
    // this.commentId = isValid(commentId) ? commentId : Comment.getNextId();
    this.commentId = Comment.getNextId();
    this.content = content;
    this.date = date;

    console.log("commetId", this.commentId);
  }

  // Comment.validate();
  // 데이터 체크입니다.
  // 모두 true로 판정이 나와야 성공입니다.
  static validate(data) {
    return (
      // User.validate(data.user) &&
      // typeof data.commentId === "number" &&
      // // data.commentPno.trim() === "" &&
      // typeof data.content === "string" &&
      // typeof data.date === "string"
      true
    );
  }

  // 저장소에서 pno의 값을 확인합니다.
  static getNextId() {
    const comments =
      JSON.parse(localStorage.getItem(storageEnum.Class.Comment)) || [];

    // 데이터에 문제가 있다면 1번을 부여합니다.
    if (isValid(comments) === false) return 1;

    const maxPno = Math.max(
      ...comments.map((comment) => comment.commentId || 0)
    );

    console.log("review pno", maxPno);
    return maxPno + 1;
  }

  static create(data) {
    // 문제가 없는 것으로 판단하여,
    // 클래스를 생성자를 통해 생성해줍니다.
    // tempClass에 생성한 것을 넣습니다.
    // todo : tempClass대신에 instance로 바꾸기 helper : 소라님
    const { user, content, date } = data;
    // const pnoId = data[getIdByClass[storageEnum.Class.Comment]];
    const pnoId = "";
    return new Comment(user, pnoId, content, date);
  }
}
