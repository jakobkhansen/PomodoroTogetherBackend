import express from "express";
const app = express();
const port = 3000;

app.get("/sessions/:id", (req, res) => {
  console.log(req.params)
});

app.listen(3000, () => {})
