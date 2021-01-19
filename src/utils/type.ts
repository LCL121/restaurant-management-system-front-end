import { AxiosResponse } from 'axios'

export type ResponseCommon<T> = AxiosResponse<{
  code: string;
  data: T;
  msg: string;
}>
