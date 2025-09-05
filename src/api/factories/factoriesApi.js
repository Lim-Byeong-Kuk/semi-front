import { Product } from "./Product";
import { Cart } from "./Cart";
import { User } from "./User";
import { Comment } from "./Comment";
import { Review } from "./Review";
import { QnA } from "./QnA";
import { Order } from "./Order";

export const storageEnum = {
  Result: {
    Success: "success",
    Failure: "failure",
    Unknown: "unknown",
  },

  Class: {
    Product: "product",
    Cart: "cart",
    User: "user",
    Comment: "comment",
    Review: "review",
    QnA: "qna",
    Order: "order",
  },

  Collection: {
    Carts: "carts",
    Reviews: "reviews",
    QnAs: "qnas",
    Products: "products",
    Orders: "orders",
  },
};

export const getIdByClass = {
  [storageEnum.Class.Product]: "productId",
  [storageEnum.Class.Cart]: "cartId",
  [storageEnum.Class.User]: "id",
  [storageEnum.Class.Comment]: "commentId",
  [storageEnum.Class.Review]: "reviewId",
  [storageEnum.Class.QnA]: "qnaId",
  [storageEnum.Class.Order]: "orderId",
};

export const isValid = (data) => {
  if (data === 0) return false;
  // 널 , 언디파인 체크
  if (data === null || data === undefined) return false;

  // 스트링 체크
  if (typeof data === "string" && data.trim() === "") return false;

  // 숫자 체크
  // Not a Number
  if (typeof data === "number" && isNaN(data)) return false;

  // 빈 배열 체크
  if (Array.isArray(data) && data.length === 0) return false;

  // 빈 객체 체크
  // todo : 빈 객체 체크가 좀 난해하다. 배열 체크를 다시할 필요 있을까. : 소라님
  if (typeof data === "object" && !Array.isArray(data)) {
    if (Object.keys(data).length === 0) return false;
  }

  // 데이터가 문제 없다면 true를 반환합니다.
  return true;
};

// Product , Cart , User 를 생성해줍니다.
// classType은 String이며,
// data는 {}의 객체입니다.
// 팩토리 패턴을 통해 클래스명과 데이터를 받아서 올바른 타입으로 반환해줍니다.
export function createEntity(className, data) {
  // className이 유효한지 확인합니다.
  if (!Object.values(storageEnum.Class).includes(className))
    return storageEnum.Result.Failure;

  // data가 유효한 데이터인지 확인합니다.
  if (!isValid(data)) return storageEnum.Result.Failure;

  // 클래스반환을 위한 빈공간 생성
  var instance = null;

  // 클래스명을 통해 각각의 클래스를 반환합니다.
  switch (className) {
    case storageEnum.Class.Product: {
      // 클래스의 여부를 체크합니다.
      // 유효하지 않은 경우 바로 break 합니다.
      if (Product.validate(data) === false) {
        console.log("데이터 이상", data);
        break;
      }

      // 문제가 없는 것으로 판단하여,
      // 클래스를 생성자를 통해 생성해줍니다.
      // tempClass에 생성한 것을 넣습니다.
      // todo : tempClass대신에 instance로 바꾸기 helper : 소라님

      instance = Product.create(data);
      console.log(instance);
      break;
    }
    case storageEnum.Class.Cart: {
      // 클래스의 여부를 체크합니다.
      // 유효하지 않은 경우 바로 break 합니다.
      if (Cart.validate(data) === false) break;

      instance = Cart.create(data);
      break;
    }
    case storageEnum.Class.User: {
      // 클래스의 여부를 체크합니다.
      // 유효하지 않은 경우 바로 break 합니다.
      if (User.validate(data) === false) {
        console.log("데이터 이상", data);
        break;
      }

      instance = User.create(data);
      break;
    }
    case storageEnum.Class.Comment: {
      // 클래스의 여부를 체크합니다.
      // 유효하지 않은 경우 바로 break 합니다.
      console.log(data);
      if (Comment.validate(data) === false) break;

      instance = Comment.create(data);
      break;
    }
    case storageEnum.Class.Review: {
      // 클래스의 여부를 체크합니다.
      // 유효하지 않은 경우 바로 break 합니다.
      console.log("data", data);
      console.log("coments", data.comments);
      if (Review.validate(data) === false) break;

      instance = Review.create(data);
      break;
    }
    case storageEnum.Class.QnA: {
      // 클래스의 여부를 체크합니다.
      // 유효하지 않은 경우 바로 break 합니다.
      if (QnA.validate(data) === false) break;

      instance = QnA.create(data);
      break;
    }
    case storageEnum.Class.Order: {
      // 클래스의 여부를 체크합니다.
      // 유효하지 않은 경우 바로 break 합니다.
      if (Order.validate(data) === false) break;

      instance = Order.create(data);
      break;
    }
  }

  // 데이터에 문제가 없을 경우 데이터 저장, 문제가 있을 경우 실패를 반환
  return instance !== null ? instance : storageEnum.Result.Failure;
}
