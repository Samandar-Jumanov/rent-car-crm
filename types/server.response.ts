export interface IServiceResponse<T> {
    success: boolean;
    message: string;
    data: T;
    statusCode: number;
    responseObject : any 
  }
  