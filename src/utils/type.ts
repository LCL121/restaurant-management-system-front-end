import { AxiosResponse } from 'axios'

export type ResponseCommon = AxiosResponse<{
  code: string;
  data: any;
  msg: string;
}>
