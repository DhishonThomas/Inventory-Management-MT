import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import userApi from "../utils/axiosInterceptors/userApiService";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import InventoryCreate from "./InventoryCreate";

const Inventory = () => {
  const user: any = useSelector((state: RootState) => state.user);
  const [inventors_data, setInventors] = useState([]);
  const [isVisibleProduct, setIsVisibleProduct] = useState(false);
  const { _id } = user.user;
  console.log(_id);

  const fetchInventory = async () => {
    const response = await userApi.get(`/inventory/${_id}`);

    const { message, status, inventors } = response.data;

    if (!status) {
      toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
      });
    }

    setInventors(inventors);

    console.log("inventors.",inventors)
  };

  const handleProductCreateModal=()=>setIsVisibleProduct(true)

    const handleProductModalClose=()=>setIsVisibleProduct(false)

    
  useEffect(() => {
    fetchInventory();
  }, []);

  return (
    <>
  <div>

<Button text="Add Product" onclick={handleProductCreateModal}/>
  </div>

<Modal isVisible={isVisibleProduct} title="" onClose={handleProductModalClose}>
<InventoryCreate userId={_id}/>
</Modal>

</>
);
};

export default Inventory;
