import React, { useEffect, useState } from "react";
import userApi from "../utils/axiosInterceptors/userApiService";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { toast } from "react-toastify";

const Sales = () => {
  const user: any = useSelector((state: RootState) => state.user);
  const [sales, setSales] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const { _id } = user.user;

  const fetchSales = async () => {
    try {
      const response = await userApi.get(`/sales/${_id}`);
      const { status, sales } = response.data;

      if (!status) {
        return toast.error("Failed to get sales", {
          position: "top-center",
          autoClose: 5000,
          theme: "dark",
        });
      }

      setSales(sales);
    } catch (error) {
      toast.error("An error occurred while fetching sales", {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
      });
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  const totalPages = Math.ceil(sales.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = sales.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-6 bg-gray-800 min-h-screen">
      <h1 className="text-2xl font-bold text-white mb-4">Sales</h1>

      {/* Sales Table */}
      <div className="bg-gray-700 p-4 rounded-lg shadow-md">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-400">
              <th className="p-3 border-b border-gray-600">Sale ID</th>
              <th className="p-3 border-b border-gray-600">Product</th>
              <th className="p-3 border-b border-gray-600">Customer</th>
              <th className="p-3 border-b border-gray-600">Customer Mobile</th>
              <th className="p-3 border-b border-gray-600">Quantity</th>
              <th className="p-3 border-b border-gray-600">Payment Type</th>
              <th className="p-3 border-b border-gray-600">Total Price</th>
              <th className="p-3 border-b border-gray-600">Date</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((sale: any) => (
                <tr key={sale._id} className="text-white hover:bg-gray-600">
                  <td className="p-3 border-b border-gray-600">{sale._id}</td>
                  <td className="p-3 border-b border-gray-600">{sale.item_id.name}</td>
                  <td className="p-3 border-b border-gray-600">
                    {sale.customer_id.name}
                  </td>
                  <td className="p-3 border-b border-gray-600">
                    {sale.customer_id.mobile} 
                  </td>
                  <td className="p-3 border-b border-gray-600">{sale.quantity}</td>
                  <td className="p-3 border-b border-gray-600">{sale.payment_type}</td>
                  <td className="p-3 border-b border-gray-600">
                    ₹{sale.totalPrice}
                  </td>
                  <td className="p-3 border-b border-gray-600">
                    {new Date(sale.date).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="p-3 text-center text-gray-500 border-b border-gray-600"
                >
                  No sales found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination flex justify-center items-center mt-6">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-3 py-1 mx-1 rounded-md ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-400 text-black"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sales;
