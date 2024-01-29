import React from "react";
import { useState, useEffect } from "react";
import { ImagetoBase64 } from "../ultility/ImagetoBase64";
import axiosConfig from "../axiosConfig";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { showToast } from "../../../utils/toast";

function EditBikeForm({ bikeInfo }) {
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

  const submitForm = async (event) => {
    event.preventDefault();
    // Use inputs.bikeType or inputs.customType based on the selection
    const typeToSubmit =
      inputs.bikeType === "Khác" ? inputs.customType : inputs.bikeType;

    try {
      const response = await axiosConfig.put(
        `/updateBikeInfo/${bikeInfo._id}`,
        {
          name: inputs.bikeName,
          type: typeToSubmit,
          price: inputs.bikePrice,
          owner_id: manager_id,
          image: inputs.bikeImage,
          description: inputs.bikeDescription,
        }
      );
      showToast("success", "Chỉnh sửa thông tin xe thành công");
      setTimeout(() => {
        navigate("/manager/homepage");
      }, 3000);
    } catch (error) {
      showToast("error", "Chỉnh sửa thông tin xe thất bại");
    }
  };

  useEffect(() => {
    if (bikeInfo) {
      setInputs({
        bikeName: bikeInfo.name,
        bikeType: bikeInfo.type,
        bikePrice: bikeInfo.price,
        bikeImage: bikeInfo.image,
        bikeDescription: bikeInfo.description,
      });
    }
  }, []);

  return (
    <div className="w-100%">
      <form className="flex flex-wrap -mx-3" onSubmit={submitForm}>
        <div className="w-full md:w-1/2 px-2 mb-6 md:mb-0">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="bikeName"
            >
              Tên xe
            </label>
            <input
              type="text"
              name="bikeName"
              value={inputs.bikeName}
              placeholder="Nhập tên xe"
              required
              className="border rounded-md py-2 px-3 w-full"
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="bikeType"
            >
              Loại xe
            </label>
            <select
              name="bikeType"
              value={inputs.bikeType}
              className="border rounded-md py-2 px-3 w-full"
              onChange={handleChange}
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
                value={inputs.customType}
                placeholder="Nhập loại xe khác"
                className="border rounded-md py-2 px-3 w-full mt-2"
                onChange={handleChange}
              />
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="bikePrice"
            >
              Giá thuê(VND)
            </label>
            <input
              type="text"
              name="bikePrice"
              value={inputs.bikePrice}
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
              className="block text-gray-700 text-sm font-bold"
              htmlFor="bikeImage"
            >
              Hình ảnh xe
            </label>
            {inputs.bikeImage ? (
              <img src={inputs.bikeImage} alt="Bike" className="h-full" />
            ) : (
              <span className="text-5xl"></span>
            )}
            <input
              type="file"
              name="bikeImage"
              className="mt-2"
              onChange={uploadImage}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="bikeDescription"
            >
              Mô tả
            </label>
            <input
              type="text"
              name="bikeDescription"
              value={inputs.bikeDescription}
              className="border rounded-md py-2 px-3 w-full"
              onChange={handleChange}
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white rounded-md py-4 px-8 mt-5 mx-auto block hover:bg-blue-600 transition duration-300"
        >
          Chỉnh sửa
        </button>
      </form>
    </div>
  );
}
export default EditBikeForm;
