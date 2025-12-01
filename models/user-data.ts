import { Address } from "./address";

export interface UserData {
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth?: {
    day: number;
    month: string;
    year: number;
  };
  address: Address;
  phoneNumber: string;
  newsletterSubscribed?: boolean;
  specialOffersSubscribed?: boolean;
  company?: string;
}
