import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cart from "./Cart";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
}

export default function TodoList() {
  const products: Product[] = useSelector((state: any) => state.products || []);
  const dispatch = useDispatch();

  const [reload, setReload] = useState(false);

  const addToCart = (product: Product) => {
    // Check if the product is already in the cart
    const cartItem = products.find((item) => item.id === product.id);
    if (cartItem) {
      dispatch({
        type: "EDIT", // Assuming you have this action to edit cart item quantity
        payload: {
          ...cartItem,
          quantity: cartItem.quantity + 1,
        },
      });
    } else {
      // If product not in cart, add it
      dispatch({
        type: "ADD",
        payload: {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1, // Start with quantity 1
        },
      });
    }

    // Update local storage
    const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingCartItem = cartItems.find(
      (item: Product) => item.id === product.id
    );

    if (existingCartItem) {
      existingCartItem.quantity += 1;
    } else {
      cartItems.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cartItems));
    setReload((pre) => !pre);
  };

  if (!products || products.length === 0) {
    return <div>No products available.</div>;
  }

  return (
    <div className="container">
      <div className="page-header">
        <h1>Shopping Cart</h1>
      </div>
      <div className="row">
        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
          <div className="panel panel-primary">
            <div className="panel-heading">
              <h1 className="panel-title">List Products</h1>
            </div>
            <div className="panel-body" id="list-product">
              {products.map((product) => (
                <div key={product.id} className="media product">
                  <div className="media-left">
                    <a href="#">
                      <img
                        className="media-object"
                        src={product.image}
                        alt={product.name}
                      />
                    </a>
                  </div>
                  <div className="media-body">
                    <h4 className="media-heading">{product.name}</h4>
                    <p>{product.description}</p>

                    <input
                      name={`quantity-product-${product.id}`}
                      type="number"
                      min={1}
                      defaultValue={1}
                    />

                    <a className="price" onClick={() => addToCart(product)}>
                      {product.price} USD
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Cart reload={reload} />
      </div>
    </div>
  );
}
