import { Client, ClientConfig } from "pg";

const config: ClientConfig = {
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "Ayush@18",
  database: "RealTimeChat",
};

const client = new Client(config);

export const connectPostgres = () => {
  client
    .connect()
    .then(() => {
      console.log("Connect with database successfully");
    })
    .catch((err) => {
      console.log(err.message);
    });
};
export default client;
