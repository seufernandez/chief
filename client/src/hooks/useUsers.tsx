import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { User } from "../dtos/User.dto";
import useAxios, { RefetchFunction } from "axios-hooks";
import { AxiosError } from "axios";

interface UsersContextValue {
  getUsersList: {
    users: User[];
    isLoading: boolean;
    error: AxiosError<any, any> | null;
    refetch: RefetchFunction<any, any>;
  };
  getSingleUser: {
    user: User;
    isLoading: boolean;
    error: AxiosError<any, any> | null;
    refetch: RefetchFunction<any, any>;
  };
  setUserId: Dispatch<SetStateAction<string | null>>;
  userId: string | null;
}

const UsersContext = createContext<UsersContextValue | undefined>(undefined);

interface UsersProviderProps {
  children: ReactNode;
}

export const UsersProvider: React.FC<UsersProviderProps> = ({ children }) => {
  const [userId, setUserId] = useState<string | null>(null);

  const [
    {
      data: usersListData,
      loading: isLoadingUsersList,
      error: errorWhileCallingUsersList,
    },
    refetchUsersList,
  ] = useAxios(`${process.env.REACT_APP_SERVER_BASE_URL}/users`, {
    useCache: false,
  });

  const [
    { data: singleUserData, loading: isLoadingUser, error: hasErrorIn },
    refetchUser,
  ] = useAxios(
    userId ? `${process.env.REACT_APP_SERVER_BASE_URL}/users/${userId}` : "",
    { manual: !userId },
  );

  useEffect(() => {
    if (userId) {
      refetchUser();
    }
  }, [userId, refetchUser]);

  return (
    <UsersContext.Provider
      value={{
        getUsersList: {
          users: usersListData?.users,
          isLoading: isLoadingUsersList,
          error: errorWhileCallingUsersList,
          refetch: refetchUsersList,
        },
        getSingleUser: {
          user: singleUserData?.user,
          isLoading: isLoadingUser,
          error: hasErrorIn,
          refetch: refetchUser,
        },
        setUserId: setUserId,
        userId,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = (): UsersContextValue => {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error("useUsers must be used within a UsersProvider");
  }
  return context;
};
