import { EResponseStatus } from '@/models/enums/shared.enum';

export interface IFailureResponse {
  error: {
    code: number;
    message: string;
  };
  status: EResponseStatus;
}
