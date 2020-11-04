import { ErrorResponse } from './ErrorResponse';

export class RejectedResponse
{
  statusCode: number;
  message: string;
  errors: ErrorResponse[];

  constructor(rejected: any)
  {
    if (rejected)
    {
      this.statusCode = rejected.status;

      if (rejected.errors)
      {
        let errorObj = rejected.errors;

        if (errorObj.message)
        {
          this.message = errorObj.message;
        }

        this.errors = [];
        for (const error of errorObj)
        {
          if (error.message)
            this.errors.push(new ErrorResponse(error.field, error.message));
        }
      }
    }
  }
}
