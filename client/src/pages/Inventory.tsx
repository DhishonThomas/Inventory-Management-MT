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
  const [inventorsData, setInventors] = useState([]);
  const [isVisibleProduct, setIsVisibleProduct] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); 
  const [paymentModalVisible, setPaymentModal] = useState(false); 
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const { _id } = user.user;

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
  const handleProductModalClose = () => setIsVisibleProduct(false);

  const handlePaymentModalOpen = (product: any) => {
    setSelectedProduct(product);
    setPaymentModal(true);
  };

  const handlePaymentModalClose = () => {
    setSelectedProduct(null);
    setPaymentModal(false);
  };


  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredInventory = inventorsData.filter((item: any) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    fetchInventory();
  }, []);

  return (
    <div className="inventory-container">
      <div className="inventory-header">
        <input
          type="text"
          placeholder="Search by name or description"
          value={searchQuery}
          onChange={handleSearch}
          className="search-input"
        />
        <Button text="Add Product" onclick={handleProductCreateModal} />
      </div>

      <table className="inventory-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredInventory.map((product: any) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.quantity}</td>
              <td>${product.price}</td>
              <td>
                <Button
                  text="Edit"
                  onclick={() => console.log("Edit product", product)}
                />
                <Button
                  text="View Customers"
                  onclick={() => console.log("View customers for", product)}
                />
                <Button
                  text="Record Payment"
                  onclick={() => handlePaymentModalOpen(product)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Product Modal */}
      <Modal
        isVisible={isVisibleProduct}
        title="Add Product"
        onClose={handleProductModalClose}
      >
        <InventoryCreate userId={_id} />
      </Modal>

        <Modal
          isVisible={paymentModalVisible}
          title={`Record Payment for ${selectedProduct?.name}`}
          onClose={handlePaymentModalClose}
        >
          <div className="payment-options">
            <p>Select Payment Type:</p>
            <Button
              text="Cash"
              onclick={() => console.log("Cash payment for", selectedProduct)}
            />
            <Button
              text="Online"
              onclick={() => console.log("Online payment for", selectedProduct)}
            />
          </div>
        </Modal>
    </div>
  );
};

export default Inventory;
