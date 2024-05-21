import { ListRequestParams, ListResponseData } from "@/types";
import { api } from "./api-custom";
import { ApiRequestConfig } from "./types";

let MAIN_ROUTE = "";

async function create<Request = any, Response = any>(request: Request) {
  return api.post<Response>(`${MAIN_ROUTE}`, request);
}

async function update<Request = any, Response = any>(
  request: Request,
  id: string
) {
  return api.put<Response>(`${MAIN_ROUTE}/${id}`, request);
}

async function list<TData, Params extends ListRequestParams = {}>(
  params?: Params,
  configs?: ApiRequestConfig
): Promise<ListResponseData<TData>> {
  const { signal, ...rest } = configs || {};
  return api.get<ListResponseData<TData>>(`${MAIN_ROUTE}`, {
    params,
    signal,
    ...rest,
  });
}

async function getById<TData>(id: string) {
  return api.get<TData>(`${MAIN_ROUTE}/${id}`);
}

async function deleteCRUD(id: string) {
  return api.delete(`${MAIN_ROUTE}/${id}`);
}

interface CrudProps {
  route: string;
}

export function crud<
  TCreate = any,
  TUpdate = any,
  TDataList = any,
  TParams extends ListRequestParams = any
>(props: CrudProps) {
  const { route } = props;
  MAIN_ROUTE = route;

  return {
    create: create<TCreate>,
    update: update<TUpdate>,
    list: list<TDataList, TParams>,
    getById,
    delete: deleteCRUD,
  };
}
