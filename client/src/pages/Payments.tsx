import React, { useEffect, useState } from "react";
import Wrapper from "../components/ui/Wrapper";
import InputField from "../components/ui/InputField";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import CustomerCreate from "./CustomerCreate";
import userApi from "../utils/axiosInterceptors/userApiService";
import { TiPlus, TiMinus } from "react-icons/ti";
import { toast } from "react-toastify";

const Payments = ({ userId, productId,handleClose }: any) => {
  const [isVisible, setIsVisible] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    quantity: 0,
    price: 0,
    description: "",
  });
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [selectedCustomer, setSelectedCustomer] = useState<null | string>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [payment, setPayment] = useState<null | string>(null);

const PAGE_SIZE=5

  const handleModalOpen = () => setIsVisible(true);
  const handleModalClose = () => {
    fetchCustomers()
     setIsVisible(false)};

     const [currentPage, setCurrentPage] = useState(1);
    
     const handlePageChange = (page: number) => {
       setCurrentPage(page);
     };


  const handleSubmit = async () => {
    if (selectedCustomer === null) {
      toast.error("Select a customer", {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
      });
      return;
    }

    if (payment === null) {
      toast.error("Select a payment to Sale", {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
      });
      return;
    }

    const data = {
      item_id: productId,
      quantity: quantity,
      customer_id: selectedCustomer,
      payment_type: payment,
      totalPrice: price,
      userId: userId,
    };


    const response=await userApi.post("/sales",{...data})
const {status,message}=response.data
    if(!status){
      toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
      });
    return
    }
    
    toast.success(message, {
      position: "top-center",
      autoClose: 5000,
      theme: "dark",
    });
handleClose()
  };

  const fetchCustomers = async (query = "", page = 1) => {
    const response = await userApi.get(
      `/customer/${userId}?q=${query}&page=${page}`
    );
    const { customers: customerData } = response.data;
    setCustomers(customerData);
  };

  const fetchProduct = async () => {
    const response = await userApi.get(`/inventory/${userId}/${productId}`);
    const { inventors } = response.data;

    if (inventors) {
      setProduct({
        name: inventors.name,
        description: inventors.description,
        quantity: inventors.quantity - 1,
        price: inventors.price,
      });
    }
    setPrice(inventors.price);
    setQuantity(1);
  };

  const handleQuantityIncrease = () => {
    if (product.quantity > 0) {
      setQuantity((prev) => prev + 1);
      setProduct((prev) => ({
        ...prev,
        quantity: prev.quantity - 1,
      }));
      setPrice((prev) => prev + product.price);
    }
  };

  const handleQuantityDecrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
      setProduct((prev) => ({
        ...prev,
        quantity: prev.quantity + 1,
      }));
      setPrice((prev) => prev - product.price);
    }
  };

  const handleCustomerSelect = (id: string) => setSelectedCustomer(id);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredCustomers = customers.filter(
    (item: any) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.mobile.toString().includes(searchQuery)
  );

  const totalPages = Math.ceil(filteredCustomers.length / PAGE_SIZE);
  const paginatedCustomers = filteredCustomers.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  useEffect(() => {
    fetchCustomers();
    fetchProduct();
  }, []);

  return (
    <Wrapper title="Checkout" maxWidth5Xl>
      <div className="checkout-container grid lg:grid-cols-2 gap-6">
        {/* Product Details Section */}
        <div className="product-card border p-6 rounded-lg shadow-md bg-gradient-to-r from-gray-700 to-gray-900 text-white">
          <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
          <p className="text-gray-300 mb-2">{product.description}</p>
          <p className="mb-2">
            <span className="font-bold">Price:</span> ₹{product.price}
          </p>
          <p className="mb-4">
            <span className="font-bold">Available Quantity:</span>{" "}
            {product.quantity}
          </p>

          {/* Quantity Controls */}
          <div className="quantity-controls flex items-center gap-4 mb-4">
            <Button
              onclick={handleQuantityDecrease}
              text={<TiMinus />}
              textColor="text-gray-300 text-xl"
              bgColor="bg-gray-800"
            />
            <span className="text-lg font-semibold">{quantity}</span>
            <Button
              onclick={handleQuantityIncrease}
              text={<TiPlus />}
              textColor="text-gray-300 text-xl"
              bgColor="bg-gray-800"
            />
          </div>

          <p className="mb-4">
            <span className="font-bold">Total Price:</span> ₹{price}
          </p>

          {/* Payment Method */}
          <div className="payment-methods flex items-center gap-4 mb-6">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                checked={payment === "Cash"}
                onChange={() => setPayment("Cash")}
              />
              <span>Cash</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                checked={payment === "Online"}
                onChange={() => setPayment("Online")}
              />
              <span>Online</span>
            </label>
          </div>

          <Button
            text="Proceed to Sale"
            type="submit"
            onclick={handleSubmit}
            bgColor="bg-blue-500 text-white font-semibold"
          />
        </div>

        {/* Customer Section */}
        <div className="customer-section border p-6 rounded-lg shadow-md bg-gray-800">
          <div className="flex items-center justify-between mb-4">
            <InputField
              label="Search Customers"
              name="search"
              type="text"
              value={searchQuery}
              onchange={handleSearchChange}
            />
            <Button
              text="Add Customer"
              bgColor="bg-blue-500 text-white"
              onclick={handleModalOpen}
            />
          </div>

          <table className="w-full border-collapse border border-gray-800 text-sm">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="border border-gray-800 p-2">Select</th>
                <th className="border border-gray-800 p-2">Name</th>
                <th className="border border-gray-800 p-2">Mobile</th>
                <th className="border border-gray-800 p-2">Address</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCustomers.map((customer: any) => (
                <tr key={customer._id}>
                  <td className="border border-gray-800 p-2 text-center">
                    <input
                      type="radio"
                      name="selectedCustomer"
                      checked={selectedCustomer === customer._id}
                      onChange={() => handleCustomerSelect(customer._id)}
                    />
                  </td>
                  <td className="border border-gray-800 p-2">{customer.name}</td>
                  <td className="border border-gray-800 p-2">
                    {customer.mobile}
                  </td>
                  <td className="border border-gray-800 p-2">
                    {customer.address}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="pagination mt-4 flex justify-center gap-2">
            {[...Array(totalPages)].map((_, index) => (
              <Button
                key={index}
                text={`${index + 1}`}
                onclick={() => handlePageChange(index + 1)}
                bgColor={
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-black"
                }
              />
            ))}
          </div>
        </div>
      </div>

      <Modal
        isVisible={isVisible}
        maxWidth2Xl
        onClose={handleModalClose}
        title="Add Customer"
      >
        <CustomerCreate userId={userId} />
      </Modal>
    </Wrapper>

  );
};

export default Payments;
