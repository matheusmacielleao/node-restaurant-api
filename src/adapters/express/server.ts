require("dotenv").config();
import express from "express";
import { dishRouter } from "./routes/dish.routes";
import { TypeOrmDataSource } from "../../infra/databases/typeorm/typeorm.config";
import { userRouther } from "./routes/user.routes";

TypeOrmDataSource.initialize();
const app = express();

app.use(express.json());

app.use(dishRouter);
app.use(userRouther);
const port = process.env.API_PORT || 3000;
app.listen(port, () => console.log(`server running on port ${port}`));
