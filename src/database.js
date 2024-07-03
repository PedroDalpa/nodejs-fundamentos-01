export class Database {
  #database = [{}];

  select(table, search) {
    let data = this.#database[table];
    if (search) {
      data = data?.filter((row) => {
        return Object.entries(search).some(([key, value]) => {
          return row[key].includes(value);
        });
      });
    }

    return data;
  }
  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data);
      return;
    }
    this.#database[table] = [data];
    return;
  }

  update(table, data) {
    if (!Array.isArray(this.#database[table])) {
      return 0;
    }
    const rawIndex = this.#database[table].findIndex(
      (raw) => raw.id === data.id
    );

    if (rawIndex === -1) {
      return 0;
    }

    const raw = this.#database[table][rawIndex];

    const updated = {
      id: raw.id,
      title: data.title || raw.title,
      description: data.description || raw.description,
      completed_at: raw.completed_at,
      created_at: raw.created_at,
      updated_at: new Date(),
    };

    this.#database[table][rawIndex] = updated;

    return 1;
  }
  delete(table, id) {
    if (!Array.isArray(this.#database[table])) {
      return 0;
    }
    const rawIndex = this.#database[table].findIndex((raw) => raw.id === id);

    if (rawIndex === -1) {
      return 0;
    }

    this.#database[table].splice(rawIndex, 1);

    return 1;
  }

  complete(table, data) {
    if (!Array.isArray(this.#database[table])) {
      return 0;
    }
    const rawIndex = this.#database[table].findIndex(
      (raw) => raw.id === data.id
    );

    if (rawIndex === -1) {
      return 0;
    }

    const raw = this.#database[table][rawIndex];

    const updated = {
      id: raw.id,
      title: raw.title,
      description: raw.description,
      completed_at: raw.completed_at ? null : new Date(),
      created_at: raw.created_at,
      updated_at: new Date(),
    };

    this.#database[table][rawIndex] = updated;

    return 1;
  }
}
