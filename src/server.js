const express = require('express');
const routes = require('./routes');
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3333;

app.use(routes);

app.listen(PORT, () => console.log(`Running on port ${PORT}`));