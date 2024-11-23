import React, { useEffect, useState } from "react";
import userApi from "../utils/axiosInterceptors/userApiService";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import Button from "../components/ui/Button";
import * as XLSX from "xlsx";
import { exportDataToExcel, exportTableToPDF, printTable } from "../utils/dataExports";


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

  const exportToPDF=()=>exportTableToPDF("sales-table")
  const exportToExcel=()=>exportDataToExcel(sales)
  const print=()=>printTable("sales-table")



  // const exportToExcel = () => {
  //   const worksheet = XLSX.utils.json_to_sheet(sales);
  //   const workbook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(workbook, worksheet, "Sales");
  //   XLSX.writeFile(workbook, "sales_data.xlsx");
  // };

  // const printData = () => {
  //   const tableContent = document.getElementById("sales-table")?.outerHTML || "";
  //   if (!tableContent) {
  //     toast.error("Unable to find the sales table for printing", {
  //       position: "top-center",
  //       autoClose: 5000,
  //       theme: "dark",
  //     });
  //     return;
  //   }
  
  //   // Open a new window for printing
  //   const printWindow = window.open("", "_blank");
  //   if (printWindow) {
  //     printWindow.document.write(`
  //       <html>
  //         <head>
  //           <title>Sales Report</title>
  //           <style>
  //             body { font-family: Arial, sans-serif; padding: 20px; }
  //             table { border-collapse: collapse; width: 100%; margin-top: 20px; }
  //             th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
  //             th { background-color: #f2f2f2; }
  //           </style>
  //         </head>
  //         <body>
  //           <h2>Sales Report</h2>
  //           ${tableContent}
  //         </body>
  //       </html>
  //     `);
  //     printWindow.document.close(); // Close the document for writing
  //     printWindow.print(); // Trigger the print dialog
  //   } else {
  //     toast.error("Failed to open the print window", {
  //       position: "top-center",
  //       autoClose: 5000,
  //       theme: "dark",
  //     });
  //   }
  // };
  
  // const exportToPDF = () => {
  //   const doc = new jsPDF();
  //   let y = 10;

  //   doc.setFontSize(16);
  //   doc.text("Sales Report", 10, y);
  //   y += 10;

  //   sales.forEach((sale, index) => {
  //     doc.setFontSize(12);
  //     doc.text(`ID: ${sale._id}`, 10, y);
  //     doc.text(`Item ID: ${sale.item_id}`, 10, y + 5);
  //     doc.text(`Quantity: ${sale.quantity}`, 10, y + 10);
  //     doc.text(`Customer ID: ${sale.customer_id}`, 10, y + 15);
  //     doc.text(`Payment Type: ${sale.payment_type}`, 10, y + 20);
  //     doc.text(`Total Price: ₹${sale.totalPrice}`, 10, y + 25);
  //     y += 30;
  //     if (y > 280) {
  //       doc.addPage();
  //       y = 10;
  //     }
  //   });

  //   doc.save("sales_data.pdf");
  // };


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
      <Button text="Export PDF" type="button" bgColor="bg-gray-600" onclick={exportToPDF}/>
      <Button text="Export Excel" type="button" bgColor="bg-gray-600" onclick={exportToExcel}/>
      <Button text="Print" type="button" bgColor="bg-gray-600" onclick={print}/>

        <table id="sales-table" className="w-full text-left border-collapse">

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
