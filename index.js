// app.js or server.js
const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
const { MongoClient } = require('mongodb');
const port = 3000; // You can use any port you prefer
const dbName = 'slimfit';

const client=new MongoClient("mongodb+srv://heroreal5385:GMsgz5TbAGl7ExvO@cluster0.lw1435t.mongodb.net/?retryWrites=true&w=majority")

async function connectToMongo() {
    try {
      client.connect();
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  }
  connectToMongo();

  app.post("/order",async(req,res)=>{
    const { email,schedule,date,total,cartItem } = req.body;
  const msgInfo = {
    email:email,
    schedule:schedule,
    date:date,
    total:total,
    cartItem:cartItem
  }
  const db = client.db(dbName);
  const collection = db.collection("order");
  await collection.insertOne(msgInfo);
  })

  app.get('/order', async (req, res) => {
    try {
      const db = client.db(dbName);
      const collection = db.collection("order");
  
      // Retrieve data from MongoDB
      const data = await collection.find().toArray();
  
      res.json(data);
    } catch (error) {
      console.error('Error fetching data from MongoDB:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.post("/user",async(req,res)=>{
    const  {email}  = req.body;
    const userInfo = {
      email:email,
    }
    const db = client.db(dbName);
    const collection = db.collection("UserData");
    await collection.insertOne(userInfo);
  })

  app.get('/user', async (req, res) => {
    try {
      const db = client.db(dbName);
      const collection = db.collection("UserData");
  
      // Retrieve data from MongoDB
      const data = await collection.find().toArray();
  
      res.json(data);
    } catch (error) {
      console.error('Error fetching data from MongoDB:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
// Define a simple route
app.get('/', (req, res) => {
    res.send('Hello, this is your backend!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
