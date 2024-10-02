import { MongoClient } from "mongodb";

if (!process.env.MONGO_URL) {
  throw new Error("MONGO_URL is not set");
}

const uri = process.env.MONGO_URL;
const options = {};
let client;
let clientPromise: Promise<MongoClient>;
declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient>;
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
