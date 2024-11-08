import { Connection } from "jsstore";
import WorkerInjector from "jsstore/dist/worker_injector";

const localDatabaseConnection = new Connection();
localDatabaseConnection.addPlugin(WorkerInjector);

const localDatabase = await localDatabaseConnection.initDb({
  name: "socme",
  tables: [],
});

export default localDatabaseConnection;
export { localDatabase };
