import { useState } from "react";
import InputField from "../components/ui/InputField";
import Wrapper from "../components/ui/Wrapper";
import userApi from "../utils/axiosInterceptors/userApiService";
import Button from "../components/ui/Button";

const InventoryCreate = ({userId}:any) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);


  const handleSubmit=async()=>{
    const response=await userApi.post("/inventory/",{name,description,quantity,price,userId})

    console.log("response>>",response.data)

  }
  
  return (
    <Wrapper title="Product create">
      <InputField
        name="name"
        type="text"
        value={name}
        bgColor="bg-gray-600"
        label="Product Name"
        onchange={(e) => {
          setName(e.target.value);
        }}
      />
      <InputField
        name="description"
        type="text"
        value={description}
        bgColor="bg-gray-600"
        label="Description"
        onchange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <InputField
        name="quantity"
        type="number"
        value={quantity}
        bgColor="bg-gray-600"
        label="Quantity"
        onchange={(e) => {
          setQuantity(Number(e.target.value));
        }}
      />
      <InputField
        name="price"
        type="number"
        value={price}
        bgColor="bg-gray-600"
        label="Price"
        onchange={(e) => {
          setPrice(Number(e.target.value));
        }}
      />
      <Button text="Add Product" onclick={handleSubmit} bgColor="bg-gray-800"/>
    </Wrapper>
  );
};

export default InventoryCreate;
