import React from "react";
import { useGetOrdersByEmailQuery } from "../../redux/features/orders/ordersApi";
import { useAuth } from "../../context/AuthContext";
import Loading from "../../components/Loading";

const OrdersPage = () => {
  const { currentUser } = useAuth();
  const {
    data: orders = [],
    isLoading,
    isError,
  } = useGetOrdersByEmailQuery(currentUser?.email);
  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <div>Error al cargar las ordenes</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-semibold mb-2">Mis ordenes</h2>
      <div className="h-1 w-48 bg-primary mb-2"></div>
      {orders.length === 0 ? (
        <div>No hay ordenes para mostrar</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 ">
          {orders.map((order, index) => (
            <div
              key={order._id}
              className="border border-gray-200 bg-slate-50 m-4 p-4 rounded-xl">
              <p className="w-10 px-1 py-2 bg-gray-200 rounded-full text-sm text-center mb-2 ">
                # {index + 1}
              </p>
              <h3 className="text-lg font-semibold mb-2 bg-gray-200 p-2 rounded-r-full">
                Order Id:
                <span className="text-gray-600 ml-2 text-lg">{order._id}</span>
              </h3>
              <div className="flex flex-col lg:flex-row justify-between gap-x-4">
                <div className="lg:px-2 text-sm">
                  <p className="text-gray-600 mb-2">
                    <span className="font-semibold mr-2">Nombre:</span>
                    {order.name}
                  </p>
                  <p className="text-gray-600 mb-2">
                    <span className="font-semibold mr-2">Email:</span>
                    {order.email}
                  </p>
                  <p className="text-gray-600 mb-2">
                    <span className="font-semibold mr-2">Telefono:</span>
                    {order.phone}
                  </p>
                  <p className="text-gray-600 mb-2">
                    <span className="font-semibold mr-2">Precio Total: </span>
                    {order.totalPrice} €
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Direccion</h3>
                  <p>
                    {order.address.street} {order.address.city}{" "}
                    {order.address.state} {order.address.country}{" "}
                    {order.address.zipcode}
                  </p>
                  <h3 className="font-semibold mt-2">ProductsID:</h3>
                  <ul>
                    {order.productsIds.map((productId) => (
                      <li key={productId}>{productId}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
