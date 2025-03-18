import express from "express";
import "dotenv/config";

const app = express();

//url-encoded middleware
app.use(express.json());

//portNumber
const port = 8080 || process.env.PORT;

let teaData = [];
let nextId = 1;

//Adding newTea
app.post("/teas", (req, res) => {
  const { name, price } = req.body;

  //Tea data
  const newTea = {
    id: nextId++,
    name,
    price,
  };

  //push this data into an array
  teaData.push(newTea);

  //status
  res.status(201).send(newTea);
});

//Get Listing allTeas
app.get("/teas", (req, res) => {
  res.status(200).send(teaData);
});

//Get Individual Tea
app.get("/teas/:id", (req, res) => {
  const result = teaData.find((t) => t.id === parseInt(req.params.id));

  if (!result) {
    res.status(404).send("404 id not found");
  } else {
    res.status(200).send(result);
  }
});

//Updating Tea
app.put("/teas/:id", (req, res) => {
  const teaId = parseInt(req.params.id);
  const tea = teaData.find((tea) => tea.id === teaId);

  if (!tea) {
    res.status(404).send("404 not found");
  } else {
    // enter new data via body
    const { name, price } = req.body;
    tea.name = name;
    tea.price = price;

    res.status(200).send(tea);
  }
});

//removing Tea
app.delete("/teas/:id", (req, res) => {
  teaData = teaData.filter((tea) => tea.id !== parseInt(req.params.id));

  if (!teaData) {
    res.status(404).send("404 Id not found");
  } else {
    res.status(200).send(teaData);
  }
});

app.listen(port, (req, res) => {
  console.log("App is listening on... ", port);
});
