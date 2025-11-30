import { Address } from "./address";
import { Title } from "./enums";

export interface UserData {
    title: string;
  firstName: string;
  lastName: string;
  email: string;
    password: string;
    dateOfBirth?: {
        day: number;
        month: number;
        year: number;
    };
  address: Address;
  phoneNumber: string;
  newsletterSubscribed?: boolean;
    specialOffersSubscribed?: boolean;
    company?: string;
    
}