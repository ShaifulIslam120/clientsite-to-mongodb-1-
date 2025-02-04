const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

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

let UsersCollection; // Declare globally

async function run() {
  try {
    await client.connect();
    const database = client.db("usersDB");
    UsersCollection = database.collection("users"); // ✅ Assign to the global variable
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

run();

app.get('/', (req, res) => {
  res.send('simple curd is running');
});

app.post('/users', async (req, res) => {
  const user = req.body;
  console.log('new user', user);
  const result = await UsersCollection.insertOne(user);
  res.send(result);
  if(data.insertedId){
    alert('user add successfully')
    form.reset;
  }

  
});

app.listen(port, () => {
  console.log(`Simple curd is running on port: ${port}`);
});
