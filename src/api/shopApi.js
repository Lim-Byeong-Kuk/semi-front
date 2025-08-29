import { phonecaseProducts } from "../dummydata/phonecaseProducts";

export const getList = () => {
  // todo: 페이지네이션
  // const { page, size } = pageParam;
  // const res = await axios.get(`${prefix}/list`, { params: { page, size } });
  // return res.data;
  const data = phonecaseProducts;
  return data;
};

export const getOne = (productId) => {
  //   const res = await axios.get(`${prefix}/${tno}`);
  //   return res.data;
  return phonecaseProducts.find((p) => p.id == productId);
};
