import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import userApi from "../utils/axiosInterceptors/userApiService";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import InventoryCreate from "./InventoryCreate";
import Payments from "./Payments";
import InventoryEdit from "./InventoryEdit";
import Swal from "sweetalert2";

const Inventory = () => {
  const user: any = useSelector((state: RootState) => state.user);
  const [inventorsData, setInventors] = useState([]);
  const [isVisibleEditProduct,setIsEditVisibleProduct]=useState(false)
  const [isVisibleProduct, setIsVisibleProduct] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [paymentModalVisible, setPaymentModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const { _id } = user.user;


  const handleDelete = async (productId: string) => {
    Swal.fire({
      title: "Delete Product?",
      text: "Do you really want to delete this Product? This action cannot be undone!",
      icon: "warning",
      background: "#1a1a1a",
      color: "#fff",
      iconColor: "#d33",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          
         const response=await userApi.delete(`/inventory/${_id}/${productId}`)
          
         const {message,status}=response.data

         if(!status){
          Swal.fire({
            title: "Deletion Unsuccessful!",
            text: "There was a problem deleting the product.",
            icon: "error",
            background: "#1a1a1a",
            color: "#fff",
            confirmButtonColor: "#d33",
            iconColor: "#d33",
          });
          return 
         }
         
         Swal.fire({
            title: "Deleted!",
            text: "The product has been successfully deleted.",
            icon: "success",
            background: "#1a1a1a",
            color: "#fff",
            confirmButtonColor: "#4CAF50",
            iconColor: "#4CAF50",
            showClass: {
              popup: "animate__animated animate__fadeInDown",
            },
            hideClass: {
              popup: "animate__animated animate__fadeOutUp",
            },
          });

          fetchInventory();
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "There was a problem deleting the customer.",
            icon: "error",
            background: "#1a1a1a",
            color: "#fff",
            confirmButtonColor: "#d33",
            iconColor: "#d33",
          });
        }
      }
    });
  };


  const fetchInventory = async () => {
    try {
      const response = await userApi.get(`/inventory/${_id}`);
      const { message, status, inventors } = response.data;

      if (!status) {
        toast.error(message, {
          position: "top-center",
          autoClose: 5000,
          theme: "dark",
        });
      } else {
        setInventors(inventors);
      }
    } catch (error) {
      toast.error("Failed to fetch inventory", {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
      });
    }
  };

  const handleProductCreateModal = () => setIsVisibleProduct(true);
  const handleProductModalClose = () =>   {
    fetchInventory()
    setIsVisibleProduct(false)}

  const handleModalProductEdit=(product:any)=>{
    setSelectedProduct(product)
    setIsEditVisibleProduct(true)
  }
  const handlePaymentModalOpen = (product: any) => {
    setSelectedProduct(product);
    setPaymentModal(true);
  };

  

const handleProductEditModalClose=()=>{
  fetchInventory()
  setIsEditVisibleProduct(false)}

  const handlePaymentModalClose = () => {
    setSelectedProduct(null);
    fetchInventory()
    setPaymentModal(false);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredInventory = inventorsData.filter(
    (item: any) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5)

  const totalPages = Math.ceil(filteredInventory.length / itemsPerPage);
  const currentItems = filteredInventory.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  return (
    <div className="inventory-container p-6 bg-gray-800 rounded-lg shadow-md">
    {/* Header Section */}
    <div className="inventory-header flex justify-between items-center mb-6">
      <input
        type="text"
        placeholder="Search by name or description"
        value={searchQuery}
        onChange={handleSearch}
        className="search-input p-2 border rounded-lg shadow-sm w-1/2"
      />
      <Button
        text="Add Product"
        onclick={handleProductCreateModal}
        bgColor="bg-blue-500 text-white px-4 py-2 rounded-lg"
      />
    </div>

    <div className="overflow-x-auto">
      <table className="inventory-table w-full text-left border-collapse border border-gray-300 bg-gray-600 shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-900">
            <th className="p-4 border border-gray-800">Name</th>
            <th className="p-4 border border-gray-800">Description</th>
            <th className="p-4 border border-gray-800">Quantity</th>
            <th className="p-4 border border-gray-800">Price</th>
            <th className="p-4 border border-gray-800">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map((product: any) => (
              <tr
                key={product._id}
                className="hover:cursor-pointer hover:text-base hover:font-extrabold transition-all"
              >
                <td className="p-2 border border-gray-800">{product.name}</td>
                <td className="p-2 border border-gray-800">
                  {product.description}
                </td>
                <td className="p-2 border border-gray-800 text-center">
                  {product.quantity}
                </td>
                <td className="p-2 border border-gray-800 text-green-600 font-semibold">
                  ₹{product.price}
                </td>
                <td className="p-2 border border-gray-800 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      text="Edit"
                      onclick={() => handleModalProductEdit(product)}
                      bgColor="bg-yellow-500 text-white px-3 py-1 rounded-md"
                    />
                    <Button
                      text="Delete"
                      onclick={() =>
                        handleDelete(product._id)
                      }
                      bgColor="bg-red-500 text-white px-3 py-1 rounded-md"
                    />
                    <Button
                      text="Report"
                      onclick={() => handlePaymentModalOpen(product)}
                      bgColor="bg-pink-500 text-white px-3 py-1 rounded-md"
                      disabled={product.quantity>0?false:true}
                    />

                   {product.quantity>0&& <Button
                      text="Record Payment"
                      onclick={() => handlePaymentModalOpen(product)}
                      bgColor="bg-green-500 text-white px-3 py-1 rounded-md"
                      disabled={product.quantity>0?false:true}
                    />}
                    {!(product.quantity>0)&&
                       <Button
                       text="No Stock"
                       onclick={() => handlePaymentModalOpen(product)}
                       bgColor="bg-yellow-500 text-white hover:cursor-not-allowed rounded-md"
                       disabled={product.quantity>0?false:true}
                     />
                    }
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={5}
                className="text-center p-2 text-gray-500 font-semibold"
              >
                No Products Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

    {/* Pagination Section */}
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


    <Modal
      isVisible={isVisibleEditProduct}
      title="Edit Product"
      onClose={handleProductEditModalClose}
      maxWidth5Xl
    >
      <InventoryEdit  userId={_id} inventoryData={selectedProduct} />
    </Modal>

    <Modal
      isVisible={isVisibleProduct}
      title="Add Product"
      onClose={handleProductModalClose}
      maxWidth5Xl
    >
      <InventoryCreate userId={_id} />
    </Modal>

    <Modal
      isVisible={paymentModalVisible}
      title={`Record Payment for ${selectedProduct?.name}`}
      onClose={handlePaymentModalClose}
      maxWidth5Xl
    >
      <Payments
        userId={_id}
        handleClose={handlePaymentModalClose}
        productId={selectedProduct?._id}
      />
    </Modal>
  </div>


  );
};

export default Inventory;
