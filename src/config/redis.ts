import { createClient } from "redis";
import { REDIS_URI } from "./keys"

const client = createClient({
  url: REDIS_URI as string,
  socket: {
    tls: true,
  }
})

client.on('error', err => console.log('Redis Client Error', err));
client.connect();

export default client
