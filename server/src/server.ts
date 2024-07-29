import dotenv from "dotenv";
import { app } from "./app";

dotenv.config();

const port = Number(process.env.PORT) || 3547; 

app.listen({ port }, (err) => {
  if (err) throw err;
  console.log(`Server listening on port ${port}`);
});
