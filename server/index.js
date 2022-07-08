const express = require("express");
const app = express();
const PORT = 3001;

app.get("/test", (req, res) => {
  res.json({ name: "Daniel" });
});

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
