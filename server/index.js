/* PACKAGES IMPORTS */
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

/* ROUTES */
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";

/* IMPORTING DATA AND MODELS TO ADD DATA TO DATABASE */
// import User from "./models/User.js";
// import Product from "./models/Product.js";
// import ProductStat from "./models/ProductStat.js";
// import Transaction from "./models/Transaction.js";
// import OverallStat from "./models/OverallStat.js";
// import AffiliateStat from "./models/AffiliateStat.js";
// import { dataUser, dataProduct, dataProductStat, dataTransaction, dataOverallStat, dataAffiliateStat } from "./data/index.js";

/* ENVIRONMENT VARIABLES CONFIGURATION */
dotenv.config();

/* SETTING UP OUR SERVER  */
const app = express();

/* SECURITY CONFIGURATION */
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors());

/* PARSING JSON AND FORM DATA SENT FROM CLIENT */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* LOG API CALLS TO THE TERMINAL WITH THE METHOD, URL AND DATE OF EACH API CALL REQUEST */
app.use(morgan("common"));

/* ROUTES ENDPOINTS */
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 5001;
mongoose.set('strictQuery', false);
export const conn = mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    /* ONLY ADD DATA ONE TIME */
    // AffiliateStat.insertMany(dataAffiliateStat);
    // OverallStat.insertMany(dataOverallStat);
    // Product.insertMany(dataProduct);
    // ProductStat.insertMany(dataProductStat);
    // Transaction.insertMany(dataTransaction);
    // User.insertMany(dataUser);
}).catch((error) => console.log(`${error} did not connect`));

/* HANDLE SUDDEN CRUSHES OF THE APP */
process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected on app termination');
        process.exit(0);
    });
});
