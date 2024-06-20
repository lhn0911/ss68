interface ModalState {
    type: string;
    message: string;
  }
  
  const initialState: ModalState = {
    type: "",
    message: "",
  };
  
  const ReducerModal = (state = initialState, action: any) => {
    switch (action.type) {
      case "ADD_TO_CART_SUCCESS":
        return { type: "success", message: "Add to cart successfully" };
      case "DELETE_SUCCESS":
        return { type: "danger", message: "Delete successfully" };
      case "CLEAR_MODAL":
        return initialState;
      default:
        return state;
    }
  };
  
  export default ReducerModal;
  