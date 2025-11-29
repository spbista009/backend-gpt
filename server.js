// way 1: to intract with openAi
// import OpenAI from "openai";
// import "dotenv/config";

// const client = new OpenAI({
//   apiKey: process.env.OPEN_API_KEY, // This is the default and can be omitted
// });

// const response = await client.responses.create({
//   model: "gpt-4o-mini",
//   input: "Joke related to computer Science",
// });

// console.log(response.output_text);

import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
// console.log(process.env.ATLASDB_URL);

import cors from "cors";
import { Messages } from "openai/resources/beta/threads/messages.js";
import chatRoutes from "./routes/chat.js";

const app = express();
const port = 8000;

// setting connection to mangoDB
// const MONGO_URL = "mongodb://127.0.0.1:27017/sigmaGPT"; // --> this will connect to our local db!!
const dbUrl = process.env.ATLASDB_URL; // --> this will connect to atlas db!

main()
  .then(() => {
    console.log("connection successful to db");
  })
  .catch((err) => {
    console.log(err);
  });
async function main() {
  // await mongoose.connect(MONGO_URL); // this creates db named: wanderlust-->local db
  await mongoose.connect(dbUrl); // this will connect the mongoose atlas db
}

// these help us connect frontend with backend
app.use(express.json()); // this helps to parse the incoming req
app.use(cors());

app.use("/api", chatRoutes);

app.listen(port, () => {
  console.log(`server is running in ${port}`);
});

// this is the change that is done in the website!! just example to check ci/cd
app.get("/test", async (req, res) => {
  res.json({
    msg: "Final: test was successful !",
  });
});

// app.get("/test", async (req, res) => {
//   const options = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
//     },
//     body: JSON.stringify({
//       model: "gpt-4o-mini",
//       messages: [
//         {
//           role: "user",
//           content: "give me a joke related to computers",
//         },
//       ],
//     }),
//   };

//   try {
//     const response = await fetch(
//       "https://api.openai.com/v1/chat/completions",
//       options
//     );
//     const data = await response.json();
//     console.log(data.choices[0].message.content); // reply
//     res.send(data.choices[0].message.content);
//   } catch (err) {
//     console.error("OpenAI request failed:", err);
//     res.status(500).send({ error: err.message, stack: err.stack });
//   }
// });
