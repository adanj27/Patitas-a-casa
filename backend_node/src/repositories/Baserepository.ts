/* eslint-disable no-unused-vars */
interface DatabaseAdapter<T, K> {
  getAll(): Promise<T[]>;
  create(input: Partial<T>): Promise<T>;
  getById(id: K): Promise<T>;
  update(id: K, input: Partial<T>): Promise<T>;
  delete(id: K): Promise<T>;
}

export class BaseRepository<T, K> {
  private databaseAdapter: DatabaseAdapter<T, K>;

  constructor(databaseAdapter: DatabaseAdapter<T, K>) {
    this.databaseAdapter = databaseAdapter;
  }

  async getAll(): Promise<T[]> {
    return this.databaseAdapter.getAll();
  }

  async create(input: Partial<T>): Promise<T> {
    return this.databaseAdapter.create(input);
  }

  async getById(id: K): Promise<T> {
    return this.databaseAdapter.getById(id);
  }

  async update(id: K, input: Partial<T>): Promise<T> {
    return this.databaseAdapter.update(id, input);
  }

  async delete(id: K): Promise<T> {
    return this.databaseAdapter.delete(id);
  }
}
