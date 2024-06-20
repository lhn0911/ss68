import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartProps {
  reload: boolean;
}

const Cart: React.FC<CartProps> = ({ reload }: CartProps) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [notification, setNotification] = useState({ type: "", message: "" });
  const dispatch = useDispatch();

  // Fetch cart items from localStorage on component mount
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(storedCartItems);
  }, [reload]);

  const deleteProduct = (id: number) => {
    // Filter out the item with the given id
    const updatedCart = cartItems.filter((item) => item.id !== id);

    // Update localStorage with the updated cart
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // Update state to re-render the UI
    setCartItems(updatedCart);

    // Show delete notification
    setNotification({ type: "danger", message: "Delete successfully" });
    setShowModal(true);

    // Optionally, dispatch an action to update Redux store
    dispatch({ type: "DELETE_CART_ITEM", payload: id });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNotification({ type: "", message: "" });
  };

  return (
    <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
      <div className="panel panel-danger">
        <div className="panel-heading">
          <h1 className="panel-title">Your Cart</h1>
        </div>
        <div className="panel-body">
          <table className="table">
            <thead>
              <tr>
                <th style={{ width: "4%" }}>STT</th>
                <th>Name</th>
                <th style={{ width: "15%" }}>Price</th>
                <th style={{ width: "4%" }}>Quantity</th>
                <th style={{ width: "25%" }}>Action</th>
              </tr>
            </thead>
            <tbody id="my-cart-body">
              {cartItems.map((item, index) => (
                <tr key={item.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.price} USD</td>
                  <td>
                    <input
                      name={`cart-item-quantity-${item.id}`}
                      type="number"
                      value={item.quantity}
                      min={1}
                      onChange={(e) => {
                        // Handle quantity change if needed
                      }}
                    />
                  </td>
                  <td>
                    <button className="label label-info update-cart-item">
                      Update
                    </button>
                    <button
                      className="label label-danger delete-cart-item"
                      onClick={() => deleteProduct(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Notification</Modal.Title>
        </Modal.Header>
        <Modal.Body>{notification.message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Cart;
