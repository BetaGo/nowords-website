import { USER } from "../graphql/queries";
import { User } from "../graphql/__generated__/User";
import { useQuery } from "@apollo/client";

export const useUserInfo = () => {
  return useQuery<User>(USER);
};
