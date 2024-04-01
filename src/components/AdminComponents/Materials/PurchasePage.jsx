import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosAdmin } from "../../../Api/Api";
import MaterialListDropdown from "./MaterialListDropdown";
import CareofDropdown from "./CareofDropdown";
import TextFields from "../../CommonComponents/TextFields/TextFields";
import Buttons from "../../CommonComponents/Button/Buttons";
import ReturnButton from "../../CommonComponents/Return/ReturnButton";
import PurchaseTable from "./PurchaseTable";
import Swal from "sweetalert2";
import toast ,{Toaster}from "react-hot-toast";
import Nodata from "../../CommonComponents/Nodata/Nodata";
import moment from "moment";
import Footer from "../Footer/Footer";

function PurchasePage() {
 const navigate = useNavigate();
 const location = useLocation();
 const state = location.state;
 const { projectname, date } = state;
 const [MaterialName, setMaterialName] = useState("");
 const [quantity, setQuantity] = useState("");
 const [Rate, setRate] = useState("");
 const [careof, setCareOf] = useState("");
 const [table, setTable] = useState(false);
 const [selectedValues, setSelectedValues] = useState([]);
 const [materialResetKey, setMaterialResetKey] = useState(0);
 const [careOfResetKey, setCareOfResetKey] = useState(0);

 const handleMaterialChange = (material) => {
    setMaterialName(material);
 };

 const handleCareOfChange = (careOf) => {
    setCareOf(careOf);
 };

 const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
 };

 const handleRateChange = (e) => {
    setRate(e.target.value);
 };

 const handleMaterials = (material, quantity, rate, careof) => {
  if (material && quantity && rate && careof) {
    setTable(true);

    const newMaterial = {
      name: material,
      careof: careof,
      quantity: quantity,
      baseRate: rate,
      total: rate * quantity,
    };

    setSelectedValues(prevSelectedValues => [
      ...prevSelectedValues,
      newMaterial,
    ]);

    // Reset all fields including dropdowns after submission
    resetAllFields();
    toast.success("Material added successfully!");
  } else {
    toast.error("Please fill in all fields before submission.");
  }
};


const resetAllFields = () => {
  setMaterialName("");
  setCareOf("");
  setQuantity("");
  setRate("");

  // Increment the keys to trigger a remount of the dropdown components
  setMaterialResetKey(prevKey => prevKey + 1);
  setCareOfResetKey(prevKey => prevKey + 1);
};


 const handleDelete = (index) => {
    const updatedValues = [...selectedValues];
    updatedValues.splice(index, 1);
    setSelectedValues(updatedValues);
 };

 const handleMaterialSubmit = async () => {
    try {
      const formattedDate = moment(date).format("YYYY-MM-DD");
      const result = await Swal.fire({
        title: "Purchase Material ?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Purchase!",
      });

      if (result.isConfirmed) {
        const response = await axiosAdmin.post("/purchasematerial", {
          materials: selectedValues,
          projectname,
          date: formattedDate,
        });

        if (response?.data?.success) {
          Swal.fire({ title: "Material Purchased", icon: "success" }).then(
            () => {
              navigate("/admin/projectlist");
            }
          );
        } else {
          Swal.fire({ title: "Failed to purchase material", icon: "error" });
        }
      }
    } catch (error) {
      if (error?.response && error?.response?.status === 401) {
        window.location.replace("/admin/login");
      }
    }
 };

 return (
    <div className="flex flex-col justify-between min-h-screen">
      <Toaster position="top-center" reverseOrder={false}/>
      <ReturnButton navigation={'/admin/purchasematerial'}/>
      <div className="flex flex-col justify-center items-center ">
        <div className="flex justify-center gap-24 items-center mb-14">
          <h2 className="">{projectname}</h2>
          <p>{moment(date).format("MMMM Do, YYYY")}</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="mx-4">
          <MaterialListDropdown key={`material-dropdown-${materialResetKey}`} onDataPassed={handleMaterialChange} />
          </div>
          <div className="mx-4">
          <CareofDropdown key={`careof-dropdown-${careOfResetKey}`} onDataPassed={handleCareOfChange} />
          </div>
          <div>
            <TextFields
              name="Quantity"
              value={quantity}
              type="number"
              onChange={handleQuantityChange}
            />
          </div>
          <div>
            <TextFields
              name="BaseRate"
              value={Rate}
              type="number"
              onChange={handleRateChange}
            />
          </div>
        </div>
        <div className="">
          <Buttons
            name="ADD +"
            click={() => handleMaterials(MaterialName, quantity, Rate, careof)}
          />
        </div>

        {table && (
          <>
            <div className="mt-6">
              <PurchaseTable values={selectedValues} handleDelete={handleDelete} />
            </div>
            <div className="flex justify-center mt-6 mb-14">
              <Buttons name="SUBMIT" click={handleMaterialSubmit} />
            </div>
          </>
        )}
      </div>
      <Footer/>
    </div>
 );
}

export default PurchasePage;
