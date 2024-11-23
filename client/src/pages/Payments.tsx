import React, { useEffect, useState } from "react";
import Wrapper from "../components/ui/Wrapper";
import InputField from "../components/ui/InputField";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import CustomerCreate from "./CustomerCreate";
import userApi from "../utils/axiosInterceptors/userApiService";
import { TiPlus, TiMinus } from "react-icons/ti";
import { toast } from "react-toastify";

const Payments = ({ userId, productId }: any) => {
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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [payment, setPayment] = useState<null | string>(null);

  const handleModalOpen = () => setIsVisible(true);
  const handleModalClose = () => setIsVisible(false);
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

    setIsVisible(false)
    
    toast.success(message, {
      position: "top-center",
      autoClose: 5000,
      theme: "dark",
    });
  };

  const fetchCustomers = async (query = "", page = 1) => {
    const response = await userApi.get(
      `/customer/${userId}?q=${query}&page=${page}`
    );
    const { customers: customerData, totalPages: total } = response.data;
    setCustomers(customerData);
    setTotalPages(total);
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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchCustomers(searchQuery, page);
  };

  useEffect(() => {
    fetchCustomers();
    fetchProduct();
  }, []);

  return (
    <Wrapper title="Checkout" maxWidth5Xl>
      <div className="product-card border p-4 rounded-lg shadow-sm mb-6 bg-gray-600">
        <h2 className="text-xl font-bold">{product.name}</h2>
        <p>{product.description}</p>
        <p>
          <span className="font-bold">Price:</span> ₹{product.price}
        </p>
        <p>
          <span className="font-bold">Available Quantity:</span>{" "}
          {product.quantity}
        </p>
        <div className="quantity-controls mt-4 flex items-center gap-2 ">
          <Button
            onclick={handleQuantityIncrease}
            text={<TiPlus />}
            textColor="text-pink-400 text-2xl"
          />
          <p>{quantity}</p>
          <Button
            onclick={handleQuantityDecrease}
            text={<TiMinus />}
            textColor="text-pink-400 text-2xl"
          />
        </div>
        <p className="mt-2">
          <span className="font-bold">Total Price:</span> ₹{price}
        </p>
        <Button text="Sale" type="button" onclick={handleSubmit} />

        <input
          type="radio"
          name="Cash"
          checked={payment === "Cash"}
          onChange={() => setPayment("Cash")}
        />

        <input
          type="radio"
          name="Online"
          checked={payment === "Online"}
          onChange={() => setPayment("Online")}
        />
      </div>

      <div className="customer-section">
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
            bgColor="bg-gray-800"
            onclick={handleModalOpen}
          />
        </div>

        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Select</th>
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Mobile</th>
              <th className="border border-gray-300 p-2">Address</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((customer: any) => (
              <tr key={customer._id}>
                <td className="border border-gray-300 p-2 text-center">
                  <input
                    type="radio"
                    name="selectedCustomer"
                    checked={selectedCustomer === customer._id}
                    onChange={() => handleCustomerSelect(customer._id)}
                  />
                </td>
                <td className="border border-gray-300 p-2">{customer.name}</td>
                <td className="border border-gray-300 p-2">
                  {customer.mobile}
                </td>
                <td className="border border-gray-300 p-2">
                  {customer.address}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination mt-4 flex justify-center">
          {[...Array(totalPages)].map((_, index) => (
            <Button
              key={index}
              text={`${index + 1}`}
              onclick={() => handlePageChange(index + 1)}
              bgColor={
                currentPage === index + 1 ? "bg-blue-500" : "bg-gray-400"
              }
            />
          ))}
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
