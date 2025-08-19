

export interface IFirebaseService {
  send(token: string, payload: { title: string; body: string }): Promise<void>;
}   