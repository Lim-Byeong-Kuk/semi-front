import { storageEnum, isValid } from "./factoriesApi";
import { Product } from "./Product";

// Cart클래스입니다.
export class Cart {
  // 생성자
  constructor(cartId, productId, id, name, quantity, singlePrice, image) {
    this.cartId = isValid(cartId) ? cartId : Cart.getNextId();
    this.productId = productId;
    this.id = id;
    this.name = name;
    this.quantity = quantity;
    this.singlePrice = singlePrice;
    this.image = image;
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

  static getNextId() {
    const users = JSON.parse(localStorage.getItem("user"));
    const allCarts = users.map((user) => user.carts).flat(2) || [];
    // console.log("allOrders", allCarts);
    // console.log("allOrders.length", allCarts.length);
    // 형우님은 localStorage("order") 에서 데이터를 가져왔었다. 왜??
    // 이제 "order" 란 storage 는 쓰지 않음, 이전에 있던 코드 였는데
    // 수정이 안되었던것 같음
    // const orders =
    //   JSON.parse(localStorage.getItem(storageEnum.Class.Order)) || [];

    // 데이터에 문제가 있다면 1번을 부여합니다.
    // 여기서는 좀더 구체적으로 배열이 비어있는지만 체크한다.
    if (allCarts.length === 0) return 1;

    const maxPno = Math.max(...allCarts.map((cart) => cart.cartId || 0));
    return maxPno + 1;
  }

  static create(data) {
    // 문제가 없는 것으로 판단하여,
    // 클래스를 생성자를 통해 생성해줍니다.
    // tempClass에 생성한 것을 넣습니다.
    const { cartId, productId, id, name, quantity, singlePrice, image } = data;
    return new Cart(cartId, productId, id, name, quantity, singlePrice, image);
  }
}
