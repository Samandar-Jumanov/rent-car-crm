export interface IFeature {
    id: string;
    title: string;
    icon: string;
  }
  

  export interface ICFeature {
      data : string ,
      icon : File 
  }
  // src/types/server.response.ts
  export interface IServiceResponse<T> {
    success: boolean;
    responseObject: T;
    message?: string;
  }