import { storageEnum, isValid } from "./factoriesApi";
import { Product } from "./Product";
import { User } from "./User";

export class Review {
  constructor(reviewId, product, user, title, content, date, comments) {
    // this.reviewId = isValid(reviewId) ? reviewId : Review.getNextId();
    this.reviewId = Review.getNextId();
    this.product = product;
    this.user = user;
    this.title = title;
    this.content = content;
    this.date = date;
    this.comments = comments;
  }

  // Comment.validate();
  // 데이터 체크입니다.
  // 모두 true로 판정이 나와야 성공입니다.
  static validate(data) {
    console.log("test", data);
    console.log(Product.validate(data.product));
    console.log(User.validate(data.user));
    console.log(typeof data.title === "string");
    console.log(typeof data.content === "string");

    return (
      //  || data.reviewId.trim() === ""
      // typeof data.reviewId === "number" &&
      // Product.validate(data.product) &&
      // User.validate(data.user) &&
      // typeof data.title === "string" &&
      // typeof data.content === "string"
      true
    );
  }

  // 저장소에서 pno의 값을 확인합니다.
  static getNextId() {
    const reviews =
      JSON.parse(localStorage.getItem(storageEnum.Class.Review)) || [];

    // 데이터에 문제가 있다면 1번을 부여합니다.
    if (isValid(reviews) === false) return 1;

    const maxPno = Math.max(...reviews.map((reviews) => reviews.reviewId || 0));
    return maxPno + 1;
  }

  static create(data) {
    // 문제가 없는 것으로 판단하여,
    // 클래스를 생성자를 통해 생성해줍니다.
    // tempClass에 생성한 것을 넣습니다.
    // todo : tempClass대신에 instance로 바꾸기 helper : 소라님

    // const pnoId = data[getIdByClass[storageEnum.Class.Review]];
    const pnoId = "";
    const { product, user, title, content, date, comments } = data;
    return new Review(pnoId, product, user, title, content, date, comments);
  }
}
