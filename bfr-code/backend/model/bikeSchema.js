import mongoose from "mongoose";
import Account from "./accountSchema";

const bikeSchema = mongoose.Schema({
  weight: {
    type: String,
    require: true,
  },
  height: {
    type: String,
    require: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    require: true,
  },
  bike_status: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  price: {
    type: String,
    require: true,
  },
  ban_request_ammount: {
    type: Number,
    require: true,
  },
});

const Bike = mongoose.model("Bike", bikeSchema);

const getAllRentedBike = async (ownerID) => {
  try {
    const rentedBikes = await Bike.find({
      owner: ownerID,
      bike_status: rented,
    }).populate("owner");
    return rentedBikes;
  } catch (error) {
    console.error("Error in method", error.message);
  }
  throw error;
};

const getAllBikesById = async (ownerId) => {
  try {
    const allBikes = await Bike.find({ owner: ownerId }).populate("owner");
    return allBikes;
  } catch (error) {
    console.error("Error in method:", error.message);
    throw error;
  }
};

export { Bike, getAllRentedBike, getAllBikesById };
