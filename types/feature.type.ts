export interface IFeature {
    id: string;
    title: string;
    icon: string;
  }
  
  // src/types/server.response.ts
  export interface IServiceResponse<T> {
    success: boolean;
    responseObject: T;
    message?: string;
  }