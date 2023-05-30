import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import multer from "multer";
import morgan from "morgan";
import path from "path";
import helmet from "helmet";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
/* routes */
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
/* controllers */
import { register } from "./controllers/auth.js";
import { createPost} from "./controllers/posts.js";
/* middleware */
import { verifyToken } from "./middleware/auth.js";
import User from "./models/User.js";
import Post from "./models/Post.js";


/* CONFIGURATIONS */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "3mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "3mb", extended: true })); 
app.use(cors());
app.use("/assets", express.static(path.join(__dirname,'public/assets')));

/* FILE STORAGE*/
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/assets");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

const upload = multer({ storage });
/*Lorsque une route doit être protégée par une auth, on a juste à utiliser le middleware "verifyToken" créé dans middleware/auth.js   */
/* ROUTES WITH FILES*/

app.post("/auth/register", upload.single("picture"),register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/users",userRoutes);
app.use("/posts",postRoutes);

/* DATABASE CONNECTION */
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    app.listen(PORT,()=>console.log(`Server Port ${PORT}`));
}).catch((err)=>console.log(err));