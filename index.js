const express = require("express");
const app = express();

app.use(express.json());

const routes = require("./app/routes");
const { default: mongoose } = require("mongoose");
routes(app);

const port = 3000;
app.listen(port, () => console.log(`App is running on port ${port}`))


const dbUrl = "mongodb+srv://Saalim-db-access:Saalim123@cluster0.gbisa.mongodb.net/Saalim-db?retryWrites=true&w=majority";

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

mongoose.connect(dbUrl, connectionParams)
    .then(() => console.log("Connected to the DB"))
    .catch(error => console.error(error, 'error'));
