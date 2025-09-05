import { storageEnum, isValid, getIdByClass } from "./factoriesApi";
import { Product } from "./Product";
import { User } from "./User";

export class Order {
  constructor(
    orderId,
    name,
    id,
    orderCode,
    postcode,
    roadAddress,
    detailAddress,
    phoneNum,
    deliveryInstruction,
    totalPrice,
    paymentOption,
    date
  ) {
    // 여기서도 isValid(orderId) 를 할 필요가 없음, orderId
    console.log("Order 생성자 호출");
    this.orderId = isValid(orderId) ? orderId : Order.getNextId();
    this.name = name;
    this.id = id;
    this.orderCode = orderCode;
    this.postcode = postcode;
    this.roadAddress = roadAddress;
    this.detailAddress = detailAddress;
    this.phoneNum = phoneNum;
    this.deliveryInstruction = deliveryInstruction;
    this.totalPrice = totalPrice;
    this.paymentOption = paymentOption;
    this.date = date;
  }

  // Comment.validate();
  // 데이터 체크입니다.
  // 모두 true로 판정이 나와야 성공입니다.
  static validate(data) {
    console.log("test", data);
    console.log(Product.validate(data.product));
    console.log(User.validate(data.user));

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
    const users = JSON.parse(localStorage.getItem("user"));
    const allOrders = users.map((user) => user.orders).flat(2) || [];
    console.log("allOrders", allOrders);
    console.log("allOrders.length", allOrders.length);
    // const orders =
    //   JSON.parse(localStorage.getItem(storageEnum.Class.Order)) || [];

    // 데이터에 문제가 있다면 1번을 부여합니다.
    // isValid 를 너무 범용적으로 쓰고 있는게 문제,
    // 여기서는 좀더 구체적으로 배열이 비어있는지만 체크한다.
    if (allOrders.length === 0) return 1;

    const maxPno = Math.max(...allOrders.map((order) => order.orderId || 0));
    return maxPno + 1;
  }

  static create(data) {
    // 문제가 없는 것으로 판단하여,
    // 클래스를 생성자를 통해 생성해줍니다.
    // tempClass에 생성한 것을 넣습니다.
    // todo : tempClass대신에 instance로 바꾸기 helper : 소라님

    const pnoId = data[getIdByClass[storageEnum.Class.Order]];

    const {
      orderId,
      name,
      id,
      orderCode,
      postcode,
      roadAddress,
      detailAddress,
      phoneNum,
      deliveryInstruction,
      totalPrice,
      paymentOption,
      date,
    } = data;
    return new Order(
      orderId,
      name,
      id,
      orderCode,
      postcode,
      roadAddress,
      detailAddress,
      phoneNum,
      deliveryInstruction,
      totalPrice,
      paymentOption,
      date
    );
  }
}
