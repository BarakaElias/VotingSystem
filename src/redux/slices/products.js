// import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// const initialState = {
//   products: [],
// };

// const slice = createSlice({
//   name: "products",
//   initialState,
//   reducers: {
//     setProducts(state, payload) {
//       state.products = [
//         {
//           id: "1",
//           slug: "my-first-product",
//           title: "My first product",
//         },
//       ];
//     },
//   },
// });

// export const { reducer } = slice;

// export default slice;

// export function getProducts() {
//   return async (dispatch) => {
//     const response = await axios.get("/api/products");
//     dispatch(slice.actions.setProducts(response.data.products));
//   };
// }
