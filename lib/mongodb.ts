import { MongoClient, Db } from "mongodb";

const uri =
  process.env.MONGO_URI ||
  "mongodb+srv://inkomastories_db_user:p4iVITHLWbN38qRD@inkomabrian.jdi3si4.mongodb.net/inkoma_brain?retryWrites=true&w=majority";

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function getClientPromise(): Promise<MongoClient> {
  if (!global._mongoClientPromise) {
    const client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  return global._mongoClientPromise;
}

export async function getDatabase(dbName = "inkoma_brain"): Promise<Db> {
  const connectedClient = await getClientPromise();
  return connectedClient.db(dbName);
}

export default getClientPromise;
