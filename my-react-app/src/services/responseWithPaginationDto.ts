export default interface IResponseWithPagination<T> {
  items: T[];
  total: number;
  pageSize: number;
  currentPage: number;
}
