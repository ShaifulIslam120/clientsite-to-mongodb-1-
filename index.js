const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://bappy:Amihscdimo@cluster0.uxwhh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    const database = client.db("usersDB");
    const UsersCollection = database.collection("users");
    console.log("Connected to MongoDB!");

    app.get('/', (req, res) => {
      res.send('simple CRUD is running');
    });

    // Retrieve data from MongoDB
    app.get('/users', async (req, res) => {
      const cursor = UsersCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    // Send data to the server
    app.post('/users', async (req, res) => {
      const user = req.body;
      console.log('New user:', user);
      const result = await UsersCollection.insertOne(user);
      res.send(result);
    });

    // Delete operation
    app.delete('/users/:id', async (req, res) => {
      const id = req.params.id;
      console.log('Deleting from database:', id);
      const query = { _id: new ObjectId (id) };
      const result=await UsersCollection.deleteOne(query)
      res.send(result)


      // try {
      //   const result = await UsersCollection.deleteOne({ _id: new ObjectId(id) });
      //   res.send(result);
      // } catch (error) {
      //   res.status(500).send({ error: 'Error deleting user' });
      // }
    });

  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

run();

app.listen(port, () => {
  console.log(`Simple CRUD is running on port: ${port}`);
});
