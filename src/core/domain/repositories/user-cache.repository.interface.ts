export interface IUserCacheRepository {
  get(id1: string, id2: string): Promise<string | null>;
  set(id1: string, id2: string, userId: string): Promise<void>;
}
