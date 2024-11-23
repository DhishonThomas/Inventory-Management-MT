
import { useState } from "react";
import InputField from "../components/ui/InputField";
import Wrapper from "../components/ui/Wrapper";
import userApi from "../utils/axiosInterceptors/userApiService";
import Button from "../components/ui/Button";
import { validateDescription, validateFullName } from "../utils/validator";

const InventoryEdit = ({userId,inventoryData}:any) => {
  const [name, setName] = useState(inventoryData.name);
  const [description, setDescription] = useState(inventoryData.description);
  const [quantity, setQuantity] = useState<number|string>("");
  const [price, setPrice] = useState(inventoryData.price);


  const handleSubmit=async()=>{


    const checkName=validateFullName(name)
    const checkDescription=validateDescription(description)
    

    const response=await userApi.put("/inventory/",{name,description,quantity,price,userId})

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
        onchange={(e:any) => {
            if(e.target.value>=0){
                setQuantity(Number(e.target.value));

            }
        }}
      />
      <InputField
        name="price"
        type="number"
        value={price}
        bgColor="bg-gray-600"
        label="Price"
        onchange={(e:any) => {
            if(e.target.value>=0){
                setPrice(Number(e.target.value));
            }
        }}
      />
      <Button text="Add Product" onclick={handleSubmit} bgColor="bg-gray-800"/>
    </Wrapper>
  );
};

export default InventoryEdit;