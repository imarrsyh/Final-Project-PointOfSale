import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addProductToCart,
  decrementQuantity,
  incrementQuantity,
  removeProductFromCart,
} from "../store/cartSlice";
import Navbar from "../components/Navbar";

function LandingPage() {
  //Need Update
  //Update terkait get product dari API
  //Update terkait search and sort
  //langsung dari API aja get product
  const products = useSelector((state) => state.products.list);
  const orders = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    dispatch(addProductToCart(product));
  };

  const handleRemoveFromCart = (productId) => {
    dispatch(removeProductFromCart(productId));
  };

  const handleIncrementQuantity = (productId) => {
    dispatch(incrementQuantity(productId));
  };

  const handleDecrementQuantity = (productId) => {
    dispatch(decrementQuantity(productId));
  };

  const total = orders.reduce(
    (acc, order) => acc + order.price * order.quantity,
    0
  );

  const handleGoToPayment = () => {
    if (orders.length > 0) {
      navigate("/payment");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <div className="container py-10 mx-auto">
        <div className="grid grid-cols-12 gap-4 mt-10">
          <div className="col-span-12 md:col-span-8">
            <h2 className="mb-4 text-2xl font-bold">Daftar Produk</h2>
            <div className="grid grid-cols-12 gap-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="col-span-12 md:col-span-6 lg:col-span-4"
                >
                  <div className="p-4 bg-white rounded-md shadow-md">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="object-cover w-full h-48"
                    />
                    <h3 className="mt-4 text-lg font-bold">{product.name}</h3>
                    <p className="mt-2 text-gray-500">Rp {product.price}</p>
                    <button
                      className="px-4 py-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                      onClick={() => handleAddToCart(product)}
                    >
                      Tambahkan ke Keranjang
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-12 md:col-span-4">
            <h2 className="mb-4 text-2xl font-bold">Daftar Pesanan</h2>
            <div className="p-4 bg-white rounded-md shadow-md">
              <ul>
                {orders.map((order) => (
                  <li
                    key={order.id}
                    className="flex items-center justify-between py-4 border-b border-gray-200"
                  >
                    <div className="flex flex-col">
                      <h3>{order.name}</h3>
                      <p className="text-gray-500">
                        Jumlah:
                        <button
                          className="px-2 py-1 mr-2 text-gray-500 bg-gray-200 rounded-md"
                          onClick={() => handleDecrementQuantity(order.id)}
                        >
                          -
                        </button>
                        {order.quantity}
                        <button
                          className="px-2 py-1 ml-2 text-gray-500 bg-gray-200 rounded-md"
                          onClick={() => handleIncrementQuantity(order.id)}
                        >
                          +
                        </button>
                      </p>
                    </div>
                    <p className="text-right">Rp {order.price}</p>
                    <button
                      className="px-4 py-2 ml-4 text-white bg-red-500 rounded-md hover:bg-red-600"
                      onClick={() => handleRemoveFromCart(order.id)}
                    >
                      Hapus
                    </button>
                  </li>
                ))}
              </ul>
              <div className="flex justify-end mt-4">
                <div className="text-lg font-bold text-right">
                  Total: Rp {total}
                </div>
                <button
                  className="px-4 py-2 ml-4 text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:opacity-50"
                  onClick={handleGoToPayment}
                  disabled={orders.length === 0}
                >
                  Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
