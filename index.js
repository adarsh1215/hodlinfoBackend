const express = require('express')
const { MongoClient } = require("mongodb")
const cors = require("cors")

// creating express instance
const app = express();

// port
const port = process.env.PORT || 3000

// middleware
app.use(cors())

const uri = "mongodb+srv://adarshpal390:WXye13LgcmS1uhmM@cluster0.hykjmsj.mongodb.net/?retryWrites=true&w=majority";

async function getData() {

    const client = new MongoClient(uri);

    try {

        await client.connect();
        const hodlinfoDb = client.db("hodlinfo")
        const collection = hodlinfoDb.collection("cryptos");
        const data = await collection.find().toArray();

        return data;
    } catch {

        throw new Error("something went wrong");
    }
}

app.get("/", (req, res) => {

    getData()
        .then(data => res.json(data))
        .catch(err => res.send("data not found"));
})

app.listen(port, ()=> console.log(`listening on port ${port}`));