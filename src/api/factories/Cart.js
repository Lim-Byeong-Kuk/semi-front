import { storageEnum, isValid } from "./factoriesApi";
import { Product } from "./Product";

// Cart클래스입니다.
export class Cart {
  // 생성자
  constructor(product, model, quantity, select) {
    this.product = product;
    this.model = model;
    this.quantity = quantity;
    this.select = select;
  }

  // 데이터 체크
  static validate(data) {
    return (
      // Product.validate(data.product) &&
      // typeof data.model === "string" &&
      // typeof data.quantity === "number" &&
      // Array.isArray(data.select)
      true
    );
  }

  static create(data) {
    // 문제가 없는 것으로 판단하여,
    // 클래스를 생성자를 통해 생성해줍니다.
    // tempClass에 생성한 것을 넣습니다.
    // todo : tempClass대신에 instance로 바꾸기 helper : 소라님
    const { product, model, quantity, select } = data;
    return new Cart(product, model, quantity, select);
  }
}
