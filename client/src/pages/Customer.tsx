import React, { useEffect, useState } from "react";
import userApi from "../utils/axiosInterceptors/userApiService";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Button from "../components/ui/Button";
import InputField from "../components/ui/InputField";
import Modal from "../components/ui/Modal";
import CustomerCreate from "./CustomerCreate";
import CustomerEdit from "./CustomerEdit";
import Swal from "sweetalert2";

const PAGE_SIZE = 5;

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [paginatedCustomers, setPaginatedCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editCustomer, setEditCustomer] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isEditVisible,setIsEditVisible]=useState(false)
  const user: any = useSelector((state: RootState) => state.user);
  const { _id } = user.user;

  const fetchCustomers = async () => {
    const response = await userApi.get(`/customer/${_id}`);
    const { customers: customerData } = response.data;
    setCustomers(customerData);
    setPaginatedCustomers(customerData.slice(0, PAGE_SIZE)); // Initialize with first page
  };

  const handleEdit = (customer: any) => {
    setEditCustomer(customer);
    setIsEditVisible(true);
  };

  const handleDelete = async (customerId: string) => {
        Swal.fire({
          title: "Delete Customer?",
          text: "Do you really want to delete this Customer? This action cannot be undone!",
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
              
             const response=await userApi.delete(`/customer/${_id}/${customerId}`)
              
             const {message,status}=response.data

             if(!status){
              Swal.fire({
                title: "Deletion Unsuccessful!",
                text: "There was a problem deleting the customer.",
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
                text: "The customer has been successfully deleted.",
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

              fetchCustomers();
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


  const handleModalClose = () => {
    setIsVisible(false);
    setEditCustomer(null);
  };

  const handleModalEditClose=()=>{
    setIsEditVisible(false)
    fetchCustomers();
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    const filteredCustomers = customers.filter(
      (customer: any) =>
        customer.name.toLowerCase().includes(query.toLowerCase()) ||
      customer.mobile.toString().includes(query)
    );
    setCurrentPage(1);
    setPaginatedCustomers(filteredCustomers.slice(0, PAGE_SIZE));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const startIndex = (page - 1) * PAGE_SIZE;
    setPaginatedCustomers(customers.slice(startIndex, startIndex + PAGE_SIZE));
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const totalPages = Math.ceil(customers.length / PAGE_SIZE);

  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Customer Management</h1>
        <div className="flex justify-between items-center mb-4">
          <InputField
            label="Search"
            name="search"
            type="text"
            value={searchQuery}
            onchange={handleSearchChange}
          />
          <Button
            text="Add Customer"
            onclick={() => setIsVisible(true)}
            bgColor="bg-blue-500"
          />
        </div>
        <table className="table-auto w-full border-collapse border border-gray-800">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="border border-gray-800 p-2">Name</th>
              <th className="border border-gray-800 p-2">Mobile</th>
              <th className="border border-gray-800 p-2">Address</th>
              <th className="border border-gray-800 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCustomers.length > 0 ? (
              paginatedCustomers.map((customer: any) => (
                <tr key={customer._id}>
                  <td className="border border-gray-200 p-2">{customer.name}</td>
                  <td className="border border-gray-200 p-2">{customer.mobile}</td>
                  <td className="border border-gray-200 p-2">{customer.address}</td>
                  <td className="border border-gray-200 p-2 flex gap-2 justify-center">
                    <Button
                      text="Edit"
                      onclick={() => handleEdit(customer)}
                      bgColor="bg-yellow-500"
                    />
                    <Button
                      text="Delete"
                      onclick={() => handleDelete(customer._id)}
                      bgColor="bg-red-500"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="text-center p-4 text-gray-500 font-semibold"
                >
                  No Customers Found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center mt-4">
          {[...Array(totalPages)].map((_, index) => (
            <Button
              key={index}
              text={`${index + 1}`}
              onclick={() => handlePageChange(index + 1)}
              bgColor={currentPage === index + 1 ? "bg-blue-500" : "bg-gray-300"}
            />
          ))}
        </div>
      </div>

      {/* Modal for Add/Edit Customer */}
      <Modal isVisible={isVisible} maxWidth5Xl onClose={handleModalClose} title="Customer">
        <CustomerCreate
          userId={_id}
          customer={editCustomer}
          onClose={() => {
            handleModalClose();
            fetchCustomers();
          }}
        />
      </Modal>
      <Modal isVisible={isEditVisible} maxWidth5Xl onClose={handleModalEditClose} title="Customer">
        <CustomerEdit
          userId={_id}
          customer={editCustomer}
          onClose={() => {
            handleModalEditClose();
          }}
        />
      </Modal>
    </>
  );
};

export default Customer;
