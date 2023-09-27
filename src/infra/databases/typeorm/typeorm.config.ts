import { DataSource } from "typeorm";

export const TypeOrmDataSource = new DataSource({
  type: "sqlite",
  database: "sqlite3",
  entities: [__dirname + "/models/*.model{.js,.ts}"],
  synchronize: true,
});
