import { storageEnum, isValid } from "./factoriesApi";

// Product클래스입니다.
export class Product {
  // 생성자
  constructor(productId, name, price, image) {
    // this.productId = productId;
    this.productId = Product.getNextId();
    this.name = name;
    this.price = price;
    this.image = image;
  }

  // 데이터 체크
  static validate(data) {
    return (
      // (typeof data.productId === "number" || data.productId === "") &&
      // typeof data.name === "string" &&
      // typeof data.price === "number" &&
      // typeof data.image === "string"
      true
    );
  }

  // 저장소에서 pno의 값을 확인합니다.
  static getNextId() {
    const products =
      JSON.parse(localStorage.getItem(storageEnum.Class.Product)) || [];

    // 데이터에 문제가 있다면 1번을 부여합니다.
    if (isValid(products) === false) return 1;

    // 마지막 번호 + 1
    const maxPno = Math.max(
      ...products.map((product) => product.productId || 0)
    );
    return maxPno + 1;
  }

  static create(data) {
    const { name, price, image } = data;
    // id는 클래스마다 다르므로 따라 구분하였습니다.
    // const pnoId = data[getIdByClass[className]];
    const pnoId = "";
    return new Product(pnoId, name, price, image);
  }
}
