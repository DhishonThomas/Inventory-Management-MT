import React, { useState } from "react";
import userApi from "../utils/axiosInterceptors/userApiService";
import Wrapper from "../components/ui/Wrapper";
import InputField from "../components/ui/InputField";
import Button from "../components/ui/Button";
import { toast } from "react-toastify";
import { validateAddress, validateFullName, validatePhoneNumber } from "../utils/validator";

const CustomerEdit = ({ userId,customer }: any) => {
  const [name, setName] = useState(customer.name);
  const [address, setAddress] = useState(customer.address);
  const [mobile, setMobile] = useState(customer.mobile);

  const handleSubmit = async () => {

    const checkName=validateFullName(name)
    const checkAddress=validateAddress(address)
    const checkMobile=validatePhoneNumber(mobile+"")

    if(checkName!=null){
      toast.error(checkName.errMessage, {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
      });  
      
      return
    }

    if(checkAddress !=null){
      toast.error(checkAddress.errMessage, {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
      }); 

      return
    }

    if(checkMobile!=null){
      toast.error(checkMobile.errMessage, {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
      }); 
      
      return 
    }

    const response = await userApi.put("/customer", { _id:customer._id,name, address, mobile,userId });
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


  };

  return (
    <Wrapper title="">
      <InputField
        type="text"
        label="Customer Name"
        bgColor="bg-gray-400"
        name="name"
        value={name}
        onchange={(e) => {
          setName(e.target.value);
        }}
      />
      <InputField
        type="text"
        label="Customer Address"
        bgColor="bg-gray-400"
        name="address"
        value={address}
        onchange={(e) => {
          setAddress(e.target.value);
        }}
      />
      <InputField
        type="text"
        label="Customer Mobile"
        bgColor="bg-gray-400"
        name="number"
        value={mobile}
        onchange={(e:any) => {
    if (!isNaN(e.target.value) && e.target.value.trim() !== "") {
      setMobile(Number(e.target.value)); 
    }
         ;
        }}
      />

      <Button
        text="Add Customer"
        onclick={handleSubmit}
        bgColor="bg-gray-400"
      />
    </Wrapper>
  );
};

export default CustomerEdit;
