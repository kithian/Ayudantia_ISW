import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import { connectDB } from "./config/configDb.js";
import { routerApi } from "./routes/index.routes.js";
import { createUser } from "./config/initialSetup.js";
import { HOST,PORT } from "./config/configEnv.js";
import authRoutes from "./routes/auth.routes.js";
import profileRoutes from "./routes/profile.routes.js";


const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://146.83.198.35:1366"],
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use("/auth", authRoutes); 
app.use("/profile", profileRoutes);
app.get("/", (req, res) => {
  res.send("¡Bienvenido a mi API REST con TypeORM!");
});

connectDB()
  .then(async () => {
    
    routerApi(app);
    await createUser();
    
    app.listen(PORT, () => {
      console.log(`Servidor iniciado en http://${HOST}:${PORT}/api`);
    });
  })
  .catch((error) => {
    console.log("Error al conectar con la base de datos:", error);
    process.exit(1);
  });
