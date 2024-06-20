const initialProducts = JSON.parse(localStorage.getItem("products") || "[]");

const ReducerCart = (state = initialProducts, action: any) => {
  switch (action.type) {
    case "DELETE":
      const updatedState = state.filter((product: any) => product.id !== action.payload);
      localStorage.setItem("products", JSON.stringify(updatedState));
      return updatedState;
    default:
      return state;
  }
};

export default ReducerCart;
