import React, { useState } from "react";
import userApi from "../utils/axiosInterceptors/userApiService";
import Wrapper from "../components/ui/Wrapper";
import InputField from "../components/ui/InputField";
import Button from "../components/ui/Button";

const CustomerCreate = ({ userId }: any) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState(0);

  const handleSubmit = async () => {
    const response = await userApi.post("/customer", { name, address, mobile,userId });
  
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
        type="number"
        label="Customer Mobile"
        bgColor="bg-gray-400"
        name="number"
        value={mobile}
        onchange={(e) => {
          setMobile(Number(e.target.value));
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

export default CustomerCreate;
