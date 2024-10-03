export interface IUser {
    id: string;
    phoneNumber: string;
    name?: string;
    surname?: string;
    birthday?: string;
    createdAt: Date;
    updatedAt: Date;
    verificationCode?: string | null;
    isVerified: boolean;
    isBlocked: boolean;
  }
  
export   interface IUserTableProps {
    users: IUser[];
    selectedUsers: string[];
    toggleUserSelection: (userId: string) => void;
    handleBlockUser: (userId: string) => Promise<void>;
    currentPage: number;
    pageSize: number;
    isBlockedList?: boolean;
  }
  
 export  interface IPaginationProps {
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    hasMore: boolean;
  }
  