import express from "express"
import mongoose from "mongoose"

import { config } from "dotenv"

import userRoutes from './routes/userRoutes.js'

config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/blog", userRoutes);

const db_user = process.env.DB_USERNAME;
const db_password = process.env.DB_PASSWORD;
const db_name = process.env.DB_NAME;

const mongo_connection_URL = `mongodb+srv://${db_user}:${db_password}@testcluster.hgjzc.mongodb.net/${db_name}?retryWrites=true&w=majority`;

const port = process.env.PORT || 3300;

mongoose.connect(mongo_connection_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
.then(() => {
    console.log("Mongoose connected!");
    app.listen(port, () => console.log(`Server running on port: ${port}`))
})
.catch((error)=> {
    console.error(`This is the error while connecting to Mongo: ${error}`)
});