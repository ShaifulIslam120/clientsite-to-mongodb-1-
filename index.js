const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
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

    // Root route
    app.get('/', (req, res) => {
      res.send('Simple CRUD is running');
    });

    // Get all users
    app.get('/users', async (req, res) => {
      const result = await UsersCollection.find().toArray();
      res.send(result);
    });

    // Get a single user by ID
    app.get('/users/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const user = await UsersCollection.findOne(query);
      res.send(user);
    });

    // Add a new user
    app.post('/users', async (req, res) => {
      const user = req.body;
      console.log('New user:', user);
      const result = await UsersCollection.insertOne(user);
      res.send(result);
    });

    // Update a user
    app.put('/users/:id', async (req, res) => {
      const id = req.params.id;
      const updateuser = req.body; // Corrected variable name
      console.log('Updating user:', id, updateuser);

      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const update = {
        $set: {
          name: updateuser.name,
          email: updateuser.email
        }
      };

      const result = await UsersCollection.updateOne(filter, update, options);
      res.send(result);
    });

    // Delete a user
    app.delete('/users/:id', async (req, res) => {
      const id = req.params.id;
      console.log('Deleting from database:', id);

      const query = { _id: new ObjectId(id) };
      const result = await UsersCollection.deleteOne(query);
      res.send(result);
    });

  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

run();

// Start server
app.listen(port, () => {
  console.log(`Simple CRUD is running on port: ${port}`);
});
