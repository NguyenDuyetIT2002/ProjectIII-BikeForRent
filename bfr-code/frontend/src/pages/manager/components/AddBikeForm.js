import React from "react";
import { useState } from "react";
import { ImagetoBase64 } from "../ultility/ImagetoBase64";
import axiosConfig from "../axiosConfig";
import { useSelector } from "react-redux";
import { showToast } from "../../../utils/toast";
import { useNavigate } from "react-router-dom";

function AddBikeForm() {
  const [inputs, setInputs] = useState({
    bikeName: "",
    bikeType: "",
    customType: "", // New field for custom type
    bikePrice: "",
    bikeImage: "",
    bikeDescription: "",
  });
  const manager_id = useSelector((state) => state.manager.managerInfo._id);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setInputs((values) => ({ ...values, [name]: value }));
  };

  const uploadImage = async (event) => {
    const data = await ImagetoBase64(event.target.files[0]);
    setInputs((values) => ({ ...values, bikeImage: data }));
  };

  const handleTypeChange = (event) => {
    const selectedType = event.target.value;
    setInputs((values) => ({ ...values, bikeType: selectedType }));
  };

  const submitForm = async (event) => {
    event.preventDefault();
    // Use inputs.bikeType or inputs.customType based on the selection
    const typeToSubmit =
      inputs.bikeType === "Khác" ? inputs.customType : inputs.bikeType;

    try {
      const response = await axiosConfig.post("/createBike", {
        name: inputs.bikeName,
        type: typeToSubmit,
        price: inputs.bikePrice,
        owner_id: manager_id,
        image: inputs.bikeImage,
        description: inputs.bikeDescription,
      });
      showToast("success", "Thêm xe thành công");
      setTimeout(() => {
        navigate("/manager/homepage");
      }, 3000);
    } catch (error) {
      showToast("error", "Thêm xe thất bại");
    }
  };

  return (
    <div className="w-100%">
      <form className="flex flex-wrap -mx-3" onSubmit={submitForm}>
        <div className="w-full md:w-1/2 px-2 mb-6 md:mb-0">
          <div className="mb-4">
            <label
              htmlFor="bikeName"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Tên xe
            </label>
            <input
              type="text"
              name="bikeName"
              placeholder="Nhập tên xe"
              required
              className="border rounded-md py-2 px-3 w-full"
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="bikeType"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Loại xe
            </label>
            <select
              name="bikeType"
              onChange={handleTypeChange}
              value={inputs.bikeType}
              className="border rounded-md py-2 px-3 w-full"
            >
              <option value="Xe thể thao">Xe thể thao</option>
              <option value="Xe đạp đua">Xe đạp đua</option>
              <option value="Xe đường phố">Xe đường phố</option>
              <option value="Khác">Khác</option>
            </select>
            {inputs.bikeType === "Khác" && (
              <input
                type="text"
                name="customType"
                placeholder="Nhập loại xe khác"
                className="border rounded-md py-2 px-3 w-full mt-2"
                onChange={handleChange}
              />
            )}
          </div>

          <div>
            <label
              htmlFor="bikePrice"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Giá thuê(VND)
            </label>
            <input
              type="text"
              name="bikePrice"
              placeholder="Nhập giá thuê xe"
              required
              className="border rounded-md py-2 px-3 w-full"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="w-full md:w-1/2 mb-6 md:mb-0">
          <div className="mb-4">
            <label
              htmlFor="bikeImage"
              className="block text-gray-700 text-sm font-bold"
            >
              Hình ảnh xe
            </label>
            {inputs.bikeImage ? (
              <img src={inputs.bikeImage} alt={"none"} className="h-full" />
            ) : (
              <span className="text-5xl"></span>
            )}
            <input type="file" name="bikeImage" onChange={uploadImage} />
          </div>

          <div>
            <label
              htmlFor="bikeDescription"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Mô tả
            </label>
            <input
              type="text"
              name="bikeDescription"
              className="border rounded-md py-2 px-3 w-full"
              onChange={handleChange}
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-md py-4 px-8 mt-5 mx-auto block hover:bg-blue-600 transition duration-300"
        >
          Thêm xe
        </button>
      </form>
    </div>
  );
}

export default AddBikeForm;
