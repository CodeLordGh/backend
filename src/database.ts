import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017");

export async function connectToDatabase() {
  await client.connect();
  console.log(client)
}

export async function closeDatabaseConnection() {
  await client.close();
}
