import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReturnButton from "../../CommonComponents/Return/ReturnButton";
import Dropdown from "../../CommonComponents/Dropdown/Dropdown";
import { axiosAdmin } from "../../../Api/Api";
import Buttons from "../../CommonComponents/Button/Buttons";
import AddMaterialModal from "./AddMaterialModal";
import TextFields from "../../CommonComponents/TextFields/TextFields";
import PurchaseTable from "./PurchaseTable";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";
import Nodata from "../../CommonComponents/Nodata/Nodata"; 

function PurchaseMaterial() {
  const location = useLocation();
  const navigate = useNavigate();
  const [projectname, setProjectName] = useState("");
  const [projectData, setProjectData] = useState("");
  const [MaterialData, setMaterialData] = useState("");
  const [MaterialName, setMaterialName] = useState("");
  const [quantity, setQuantity] = useState();
  const [selectedValues, setSelectedValues] = useState([]);
  const [Rate, setRate] = useState();
  const [table, setTable] = useState(false);
  const [date, setDate] = useState();
  const [careof, setCareOf] = useState();

  const handleDataReceived = (projectname) => {
    setProjectName(projectname);
  };

  const handleQuantitychange = (e) => {
    setQuantity(e.target.value);
  };

  const handleRatechange = (e) => {
    setRate(e.target.value);
  };
  const handleDatechange = (e) => {
    setDate(e.target.value);
  };
  const handleCareOfchange = (e) => {
    setCareOf(e.target.value);
  };

  const fetchData = async () => {
    try {
      const response = await axiosAdmin.get("projectList?status=false");
      setProjectData(response?.data?.FindProject);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.replace("/admin/login")
      }
    }
  };

  const fetchMaterialData = async () => {
    try {
      const response = await axiosAdmin.get("allmateriallist");
     

      setMaterialData(response?.data?.allMaterials);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.replace("/admin/login")
      }
    }
  };

  const handleMaterialSubmit = async () => {
    try {
      Swal.fire({
        title: "Purchase Material ?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Purchase!",
      }).then((result) => {
        if (result.isConfirmed) {
          const response = axiosAdmin.post("/purchasematerial", {
            materials: selectedValues,
            projectname,
            date,
          });
          setProjectData(response?.data?.FindProject);
          Swal.fire({ title: "Material Purchased", icon: "success" }).then(
            () => {
              navigate("/admin/projectlist");
            }
          );
        }
      });

      
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.replace("/admin/login")
      }
    }
  };

  //data displaying when mounting
  useEffect(() => {
    fetchData();
    fetchMaterialData();
  }, [MaterialName, MaterialData]);

  const handleChange = (e) => {
    const selectedMaterialname = e.target.value;
    setMaterialName(selectedMaterialname);
  };

  const handleMaterials = (material, quantity, rate, careof) => {
    if (material && quantity && rate) {
      setTable(true);

      const newMaterial = {
        name: material,
        careof: careof,
        quantity: quantity,
        baseRate: rate,
        total: rate * quantity,
      };

      setSelectedValues((prevSelectedValues) => [
        ...prevSelectedValues,
        newMaterial,
      ]);

      // Clear the input fields after submission
      setMaterialName("");
      setQuantity("");
      setRate("");
      setCareOf("");
    } else {
      toast.error("Please fill in all fields before submission.");
    }
  };

  const handleDelete = (index) => {
    const updatedValues = [...selectedValues];
    updatedValues.splice(index, 1);
    setSelectedValues(updatedValues);
  };


  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <ReturnButton />
      <div></div>

      {projectname && date ? (
        <>
        <div className="flex justify-around">
          <p className="font-bold ">DATE&nbsp;:&nbsp;&nbsp; {date}</p>
        <p className="font-bold uppercase">
            {" "}
            PROJECT : &nbsp;&nbsp; {projectname}
          </p>
        </div>
        
          <div className="flex justify-center flex-wrap gap-4 mt-8">
            <>
              {MaterialData?.length > 0 ? (
                <Box className="w-[380px]">
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      SELECT MATERIAL
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={MaterialName}
                      label="SELECT PROJECT"
                      onChange={handleChange}
                    >
                      {MaterialData.map((item) => (
                        <MenuItem key={item.name} value={item.name}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              ) : (
                <Box className="sm:w-[380px] w-80">
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      No materials found
                    </InputLabel>
                    <Select
                      id="demo-simple-select"
                      label="SELECT PROJECT"
                      disabled
                    >
                      <MenuItem>No materials found</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              )}
            </>

            <div className="mt-3">
              <AddMaterialModal />
            </div>

            <TextFields
              name="Care OF"
              value={careof}
              type="text"
              onChange={handleCareOfchange}
            />

            <TextFields
              name="Quantity"
              value={quantity}
              type="number"
              onChange={handleQuantitychange}
            />
            <div className="ms-16">
              <TextFields
                name="BaseRate"
                value={Rate}
                type="number"
                onChange={handleRatechange}
              />
            </div>

          </div>
          <div className=" flex justify-center mt-2">
            <Buttons
              name="SUBMIT"
              click={() =>
                handleMaterials(MaterialName, quantity, Rate, careof)
              }
            />
          </div>

          {table ? (
            <>
              <div className="flex justify-center">
                <PurchaseTable values={selectedValues} handleDelete={handleDelete} />
              </div>
              <div className="flex justify-center mt-10">
                <Buttons name="SUBMIT" click={handleMaterialSubmit} />
              </div>
            </>
          ) : (
            ""
          )}
        </>
      ) : (
        <>
          {projectData && projectData.length > 0 ? (
            <div>
              <p className="text-sm text-red-500 mt-2 flex justify-center">
                Please select a project and a purchase date to continue.
              </p>

              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <TextFields
                  name="Purchase date"
                  type="date"
                  input={true}
                  onChange={handleDatechange}
                />
                <Dropdown
                  projects={projectData}
                  onDataPassed={handleDataReceived}
                />
              </div>
            </div>
          ) : (
            <Nodata/>
          )}
        </>
      )}
    </div>
  );
}

export default PurchaseMaterial;
