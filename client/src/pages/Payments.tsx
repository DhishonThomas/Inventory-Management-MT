import React, { useEffect, useState } from "react";
import Wrapper from "../components/ui/Wrapper";
import InputField from "../components/ui/InputField";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import CustomerCreate from "./CustomerCreate";
import userApi from "../utils/axiosInterceptors/userApiService";

const Payments = ({ userId, productId }: any) => {
  const [isVisible, setIsVisible] = useState(false);
  const [customer_data, setCustomers] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    quantity: 0,
    price: 0,
    description: "",
  });

  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const handleModalOpen = () => {
    setIsVisible(true);
  };
  const handleOnClose = () => {
    setIsVisible(false);
  };

  const fetchCustomers = async () => {
    const response = await userApi.get(`/customer/${userId}`);
    console.log("response", response.data);
  }; 

  const fetchProduct = async () => {
    const response = await userApi.get(`/inventory/${userId}/${productId}`);
    console.log("response>>product", response.data);
const {message,status,inventors}=response.data
    if(!status){
      
    }else{

      setProduct({name:inventors.name,
        description:inventors.description,
        quantity:inventors.quantity,
        price:inventors.price
      })

      // setPrice(inventors.price)
      // setQuantity(inventors.quantity) 
    }
  };

  const handleQuantityIncrease = () => {
    if (product.quantity  !=0) {
      setQuantity((prev) => prev + 1);
      setProduct((prev)=>({
        ...prev,
        quantity:prev.quantity-1
      }))
      
      setPrice((prev) => prev + product.price);
    }
  };

  const handleQuantityDecrease = () => {
    if (quantity > 0) {
      setProduct((prev)=>({
        ...prev,
        quantity:prev.quantity+1
      }))
      setQuantity((prev) => prev - 1);
      setPrice((prev) => prev - product.price);
    }
  };

  useEffect(() => {
    fetchCustomers();
    fetchProduct();
  }, []);

  return (
    <Wrapper title="Payment" maxWidth5Xl>
      <Button
        text="Add Customer"
        bgColor="bg-gray-400"
        onclick={handleModalOpen}
      />
      <p>select customer</p>
      //search for customer with name and mobile. //All customer want to show on
      the table , with name ,address,mobile . and a button to select them.
      //select only one customer like radio Button or any thing like selection
      <InputField
      label="Product Name"
        name="ProductName"
        type="text"
        value={product.name}
        bgColor="bg-gray-400"
        disable
      />
      <InputField
      label="Description"
        name="Description"
        type="text"
        value={product.description}
        bgColor="bg-gray-400"
        disable
      />
      <InputField
      label="Quantity"
        name="Quantity"
        type="number"
        value={product.quantity}
        bgColor="bg-gray-400"
        disable
      />
      <InputField
      label="Price"
        name="Price"
        type="number"
        value={product.price}
        bgColor="bg-gray-400"
        disable
      />
      <p>userQuantity:{quantity}</p>
      <p>userPrice:{price}</p>


      <Button
        type="submit"
        bgColor="bg-gray-400"
        onclick={handleQuantityIncrease}
        text={`➕`}
      />
      <Button
        type="submit"
        bgColor="bg-gray-400"
        onclick={handleQuantityDecrease}
        text={`➖`}
      />
      <Modal isVisible={isVisible} onClose={handleOnClose} title="Add Customer">
        <CustomerCreate userId={userId} />
      </Modal>
    </Wrapper>
  );
};

export default Payments;
