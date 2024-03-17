import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function PaymentPage() {
  const orders = useSelector((state) => state.cart.items);
  const total = orders.reduce(
    (acc, order) => acc + order.price * order.quantity,
    0
  );
  const [amountPaid, setAmountPaid] = useState(0);
  const [change, setChange] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAmountPaidChange = (e) => {
    const paid = parseFloat(e.target.value);
    setAmountPaid(paid);
    setChange(paid - total);
  };

  const handleOrder = () => {
    if (amountPaid >= total) {
      // a.	Mengirimkan data ke endpoint API transaksi
      // b.	menampilkan pop up pembelian sukses jika berhasil dibuat transaksi baru
      // c.	me-reset Daftar Pesanan dan mengembalikan ke halaman Order Produk

      navigate("/");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-md shadow-md">
        <h1 className="mb-6 text-3xl font-bold">Halaman Pembayaran</h1>
        <div className="mb-4">
          <label htmlFor="totalPrice" className="block font-bold text-gray-700">
            Total Price:
          </label>
          <span id="totalPrice" className="ml-2 font-bold">
            Rp {total}
          </span>
        </div>
        <div className="mb-4">
          <label htmlFor="amountPaid" className="block font-bold text-gray-700">
            Amount Paid:
          </label>
          <input
            type="number"
            id="amountPaid"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            value={amountPaid}
            onChange={handleAmountPaidChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="orderDetails"
            className="block font-bold text-gray-700"
          >
            Order Details:
          </label>
          <ul id="orderDetails" className="ml-2">
            {orders.map((order) => (
              <li key={order.id} className="mb-2">
                {order.name} ({order.quantity}) - Rp{" "}
                {order.price * order.quantity}
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-6">
          <label htmlFor="change" className="block font-bold text-gray-700">
            Change:
          </label>
          <span id="change" className="ml-2 font-bold">
            Rp {change}
          </span>
        </div>
        <button
          className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:opacity-50"
          onClick={handleOrder}
          disabled={amountPaid < total}
        >
          Order
        </button>
      </div>
    </div>
  );
}

export default PaymentPage;
