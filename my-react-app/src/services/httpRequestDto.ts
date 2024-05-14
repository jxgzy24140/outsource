export interface IHttpRequest<T> {
  success: boolean;
  message: string;
  data?: T;
}
