import { set, connect } from "mongoose";

const mongo_URL =
  "mongodb+srv://nguyenduyethphocit2002:nguyenduyethphocit2002@bfr-system.jjjo9w5.mongodb.net/";
const handleConnectDB = () => {
  set("strictQuery", false);
  connect(mongo_URL)
    .then(() => console.log(`Connected to MongoDB: ${mongo_URL}`))
    .catch((err) => console.log("Failed to connect"));
};

handleConnectDB();
