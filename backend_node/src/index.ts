import express from "express";

const app = express();
app.get("/", (req, res) => {
  return res.json({ message: "welcome api" });
});

app.listen(4000, () => {
  console.log(`✓ Server running on localhost:4000`);
});
