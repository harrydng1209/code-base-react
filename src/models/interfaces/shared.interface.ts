import { EResponseStatus } from '@/models/enums/shared.enum';

export interface IBreadcrumbItem {
  text: string;
  to: unknown;
}

export interface IFailureResponse {
  error: {
    code: number;
    message: string;
  };
  status: EResponseStatus;
}
