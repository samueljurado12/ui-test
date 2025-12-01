import { UserData } from "../models";

export const getUserFullName = (user: UserData) =>
  `${user.firstName} ${user.lastName}`;
