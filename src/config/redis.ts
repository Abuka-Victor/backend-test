import { createClient } from "redis";
import { REDIS_URI, NODE_ENV } from "./keys"

const client = createClient({
  url: REDIS_URI as string,
  socket: {
    tls: NODE_ENV === "development",
  }
})

client.on('error', err => console.log('Redis Client Error', err));
client.connect();

export default client
