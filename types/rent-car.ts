export interface IRentCar {
    id: string;
    userId: string;
    logo: string;
    brendName: string;
    ownerNumber: string;
    address: string;
    password: string;
    carDelivery: any;
    topBrendId: string | null;
    payment: any;
    ratings: number[];
    averageRating: number;
    createdAt: Date;
    updatedAt: Date;
  }

  


  
 export  interface IRentCarFormData {
    brendName: string;
    ownerNumber: string;
    address: string;
    logo?: string;
    carDelivery?: any;
    payment?: any;
    password : string
  }