import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getImgtUrl } from "../../utils/getImgtUrl";
import { clearCart, removeFromCart } from "../../redux/features/cart/cartSlice";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispach = useDispatch();
  const totalPrice = cartItems
    .reduce((acc, item) => acc + item.newPrice, 0)
    .toFixed(2);
  const handleRemoveFromCart = (item) => {
    dispach(removeFromCart(item));
  };
  return (
    <>
      <div className="flex max-w-6xl mx-auto h-full flex-col overflow-hidden bg-white shadow-xl">
        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
          <div className="flex items-start justify-between">
            <div className="text-lg font-medium text-gray-900">
              Carrito de Compras
            </div>
            <div className="ml-3 flex h-7 items-center ">
              <button
                type="button"
                onClick={() => dispach(clearCart())}
                className="relative -m-2 py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-700 transition-all duration-200">
                <span className="">Vaciar Carrito</span>
              </button>
            </div>
          </div>

          <div className="mt-8">
            <div className="flow-root">
              {cartItems.length > 0 ? (
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <li key={item?._id} className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          alt={item?.title}
                          src={`${getImgtUrl(item?.coverImage)}`}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex flex-wrap justify-between text-base font-medium text-gray-900">
                            <h3>
                              <Link to="/">{item?.title}</Link>
                            </h3>
                            <p className="sm:ml-4">{item?.newPrice} €</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500 capitalize flex gap-x-3">
                            <strong>Category:</strong>
                            {item?.category}
                          </p>
                        </div>
                        <div className="flex flex-1 flex-wrap items-end justify-between space-y-2 text-sm">
                          <p className="text-gray-500 flex gap-x-3">
                            <strong>Qty:</strong> 1
                          </p>

                          <div className="flex">
                            <button
                              onClick={() => handleRemoveFromCart(item)}
                              type="button"
                              className="font-medium text-red-500 hover:bg-red-500 hover:text-white px-4 py-2 rounded-md hover:scale-105 transition-all duration-200">
                              Eliminar
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No se han encontrado libros en su carrito</p>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>{totalPrice ? totalPrice : 0} €</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">
            Envío e impuestos calculados al finalizar la compra.
          </p>
          <div className="mt-6">
            <Link
              to="/checkout"
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
              Checkout
            </Link>
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <Link to="/">
              or
              <button
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500 ml-1">
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
