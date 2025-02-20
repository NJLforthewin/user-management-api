import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import  userRouter from "./users/users.routes"

// Load environment variables
dotenv.config();

// Validate PORT
if (!process.env.PORT) {
    console.log(`No port value specified...`);
}

const PORT = parseInt(process.env.PORT as string, 10);

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

app.use('/', userRouter)

// Start the server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});