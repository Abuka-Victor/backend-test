import { Sequelize } from "sequelize";

import { POSTGRES_URI } from "./keys";

const sequelize = new Sequelize(POSTGRES_URI as string);

const tryAuthenticateDb = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

tryAuthenticateDb()

export default sequelize