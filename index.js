const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// murshedmargub
// tg8LaTOtqScTm6JT


const uri = `mongodb+srv://murshedmargub:tg8LaTOtqScTm6JT@cluster0.hrq6pyr.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const db = client.db("usersDB");
    const usersCollection = db.collection("users");


    app.get("/users", async(req, res) => {
      const cursor = usersCollection.find();
      const users = await cursor.toArray();
      res.send(users)
    })

    app.get("/users/:id", async(req,res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await usersCollection.findOne(query);
      res.send(result)
    })

    app.post("/users", async(req, res) => {
      const doc = req.body;
      const result = await usersCollection.insertOne(doc);
      res.send(result)
    })

    app.put("/users/:id", async(req, res) => {
      const id = req.params.id;
      const updatedUser = req.body;
      const filter = {_id: new ObjectId(id)};
      const result = await usersCollection.updateOne(filter, {$set: updatedUser}, {upsert: true});
      res.send(result);
    })

    app.delete("/users/:id", async(req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const response = await usersCollection.deleteOne(query);
      res.send(response);
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.get("/", (req,res) => res.send("Server is running"))

app.listen(port);