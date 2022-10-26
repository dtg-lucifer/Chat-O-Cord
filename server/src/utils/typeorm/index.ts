import { User } from "./entities/User";
import { Session } from "./entities/Session";

const entities = [User, Session]

// export const AppDataStore = new DataSource({
//     type: "mysql",
//     host: process.env.MYSQL_DB_HOST,
//     port: parseInt(process.env.MYSQL_DB_PORT),
//     username: process.env.MYSQL_DB_USERNAME,
//     password: "",
//     database: process.env.MYSQL_DB_NAME,
//     synchronize: true,
//     entities: [User],
// })

export { User, Session };
export default entities