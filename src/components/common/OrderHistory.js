import React from "react";
const orders = [
  {
    id: "20230901-001",
    date: "2023-09-01",
    item: "아이스크림토끼 맥세이프 커스텀 카드지갑",
    status: "배송중",
  },
  {
    id: "20230901-002",
    date: "2023-08-28",
    item: "그려용 커스텀 방탄케이스",
    status: "배송완료",
  },
  {
    id: "20230901-003",
    date: "2023-08-25",
    item: "코기궁디 커스텀 방탄케이스",
    status: "주문취소",
  },
];
const OrderHistory = () => {
  return (
    <div>
      <h2 className="text-lg font-bold mb-4">주문내역 조회</h2>
      <div className="border rounded-lg shadow-sm">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="text-sm p-3 border-b">주문번호</th>
              <th className="text-sm p-3 border-b">주문일자</th>
              <th className="text-sm p-3 border-b">상품명</th>
              <th className="text-sm p-3 border-b">상태</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="text-xs p-3 border-b">{order.id}</td>
                <td className="text-xs p-3 border-b">{order.date}</td>
                <td className="text-xs p-3 border-b">{order.item}</td>
                <td className="text-xs p-3 border-b font-medium">
                  {order.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderHistory;
