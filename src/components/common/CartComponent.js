import React, { useContext, useEffect, useState } from "react";
import { cartData } from "../../dummydata/cartData";
import { useNavigate } from "react-router-dom";
import { LocalStorageService, storageEnum } from "../../api/storageApi";
import { userData } from "../../dummydata/userData";
import { LoginContext } from "../../api/context/LoginContext";

const CartComponent = () => {
  const { user, loginCheck } = useContext(LoginContext);
  const [deliveryFee, setDeliveryFee] = useState(3000);
  const [isChange, setChange] = useState(false);

  const navigate = useNavigate();

  const moveToHandler = () => {
    navigate("/checkout");
  };
  const moveToImgHandler = () => {
    navigate("/phonecase/27");
  };

  const [carts, setCarts] = useState([]);

  useEffect(() => {
    loginCheck();
    // 데이터 로드
    setCarts(loadCartData());
  }, []);

  // carts 값이 변경될 때마다 로그 찍기
  useEffect(() => {
    console.log("수정");
    setCarts(loadCartData());
  }, [isChange]); // carts가 변경될 때마다 실행

  const changeQuantity = (e, id, parValue) => {
    const { name, value } = e.target;
    const resultValue = parseInt(value) + parseInt(parValue);

    handleQuantity(name, resultValue > 0 ? resultValue : 1, id);
  };

  const handleQuantity = (name, value, id) => {
    setCarts((carts) =>
      carts.map((cart) => {
        return cart.cartId === id ? { ...cart, [name]: value } : cart;
      })
    );
  };

  const getCartSum = () => {
    return carts.reduce(
      (sum, cart) => sum + cart.singlePrice * cart.quantity,
      0
    );
  };

  const loadCartData = () => {
    const findCartData = LocalStorageService.findAllByCollection(
      storageEnum.Collection.Carts
    );
    if (findCartData === storageEnum.Result.Failure)
      LocalStorageService.initData(storageEnum.Class.User, userData);

    const find = LocalStorageService.findAllByCollection(
      storageEnum.Collection.Carts
    );

    var findCart = find.filter((cart) => cart.id === user.id);
    if (findCart === storageEnum.Result.Failure) findCart = [];

    return findCart;
  };

  const deleteCartData = (cartId) => {
    LocalStorageService.deleteByCollection(
      storageEnum.Class.Cart,
      storageEnum.Collection.Carts,
      cartId
    );

    setChange(!isChange);
  };

  //장바구니에 담긴 제품 이미지 클릭하면 해당 제품 상세페이지로 이동
  return (
    <div className="w-full font-sans p-5">
      <div className="h-16 flex items-center justify-center font-bold mb-5">
        Shopping Cart
      </div>

      <div className="h-20 bg-gray-200 mb-5 flex items-center">
        <div className="text-sm px-3 space-y-1">
          <h5>AKAN 회원만의 특별한 혜택을 놓치지 마세요!</h5>
          <h5>회원가입하고 구매시 할인 및 적립 리워드 받기</h5>
          <h5>회원가입 또는 로그인하기.</h5>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-5">
        {/* Cart List */}
        <div className="md:w-[70%] w-full space-y-5">
          {carts &&
            carts.map((cart) => (
              <div key={cart.id} className="border-b pb-5 flex gap-4">
                <div className="w-24 h-24 bg-gray-100 flex items-center justify-center rounded">
                  <img
                    src={cart.image}
                    alt={cart.name}
                    className="w-full h-full object-contain"
                    onClick={moveToImgHandler}
                  />
                </div>
                <div className="flex-1 flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <div className="font-bold text-sm">
                      {cart.name}
                    </div>
                    <button
                      className="text-red-500 text-sm"
                      onClick={() => deleteCartData(cart.cartId)}
                    >
                      X
                    </button>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <button
                        className="px-2 border"
                        name="quantity"
                        value={cart.quantity}
                        onClick={(e) => changeQuantity(e, cart.cartId, -1)}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        name="quantity"
                        value={cart.quantity}
                        className="w-12 text-center border"
                        readOnly
                      />
                      <button
                        className="px-2 border"
                        name="quantity"
                        value={cart.quantity}
                        onClick={(e) => changeQuantity(e, cart.cartId, +1)}
                      >
                        +
                      </button>
                    </div>
                    <div className="font-bold text-right text-sm">
                      {cart.quantity * cart.singlePrice}원
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Aside */}
        <div className="md:w-[30%] w-full">
          <div className="border p-4 space-y-4">
            <div>
              <h5 className="font-semibold mb-2">주문상품</h5>
              <div className="text-sm space-y-1"></div>
              <div className="flex justify-between mt-2 text-sm">
                <div className="space-y-1">
                  <h5>총 상품금액</h5>
                  <h5>총 배송비</h5>
                </div>
                <div className="text-right space-y-1">
                  <h5>{carts ? getCartSum() : 0}원</h5>
                  <h5>{deliveryFee}원</h5>
                </div>
              </div>
              <br />
              <div className="flex justify-between mt-2 text-sm">
                <div className="space-y-1">
                  <h5>결제예정금액</h5>
                  <h5>적립예정금액</h5>
                  <h5>→상품별 적립금</h5>
                </div>
                <div className="text-right space-y-1">
                  {/* 장바구니의 합계와 배송비를 더함 */}
                  <h5>{carts ? getCartSum() + deliveryFee : 0}원</h5>
                  {/* 5% 적립 */}
                  <h5>{carts ? getCartSum() * 0.05 : 0}원</h5>
                  {carts ? (
                    <div>
                      {carts.map((cart) => (
                        <div>
                          {cart.name} {cart.quantity * cart.singlePrice * 0.05}
                          원 적립
                        </div>
                      ))}
                    </div>
                  ) : (
                    <h5>0원</h5>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                className="w-full py-2 border text-sm"
                onClick={moveToHandler}
              >
                기본결제하기
              </button>

              {/* 네이버 결제 박스 */}
              <div className="flex items-center justify-between border rounded-md p-4 bg-[#f0fdf4] text-green-700">
                <div className="text-sm font-medium">
                  <span className="block">NAVER</span>
                  <span className="block">네이버 ID로 간편구매</span>
                  <span className="block">네이버페이</span>
                </div>
                <button className="bg-green-500 text-white px-4 py-2 rounded text-sm font-semibold hover:bg-green-600"
                onClick={moveToHandler}>
                  N Pay 구매
                </button>
              </div>

              {/* 카카오 결제 박스 */}
              <div className="flex items-center justify-between border rounded-md p-4 bg-[#fff7e0] text-yellow-800 mt-4">
                <div className="text-sm font-medium">
                  <span className="block">kakao</span>
                  <span className="block">톡체크아웃</span>
                </div>
                <button className="bg-yellow-400 text-black px-4 py-2 rounded text-sm font-semibold hover:bg-yellow-500"
                onClick={moveToHandler}>
                  간편구매
                </button>
              </div>

              <h5 className="text-xs text-gray-600">
                [비회원 구매] 카카오페이포인트 1% 적립
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartComponent;
