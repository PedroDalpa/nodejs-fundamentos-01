export class Database {
  #database = [{}];

  select(table) {
    return this.#database[table];
  }
}
