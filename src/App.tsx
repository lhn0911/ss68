import React, { useState } from "react";
import Products from "./components/Products";
import TodoList from "./components/TodoList";
import Cart from "./components/Cart";
export default function App() {
  return (
    <>
      <TodoList></TodoList>
      <Products></Products>
      {/* <Cart></Cart> */}
    </>
  );
}
