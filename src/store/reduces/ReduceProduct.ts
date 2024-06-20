const initialProducts = JSON.parse(localStorage.getItem("products") || "[]");

const ReducerProduct = (state = initialProducts, action: any) => {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];
    default:
      return state;
  }
};

export default ReducerProduct;
