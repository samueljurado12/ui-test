import { LoremIpsum } from "lorem-ipsum"
import { Address, UserData } from "../models";


const loremIpsum = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
    },
    wordsPerSentence: {
        max: 16,
        min: 4,
    },
})

export const selectRandomFromArray = <T>(arr: T[]): T => {
    const randomIndex = loremIpsum.generator.generateRandomInteger(0, arr.length -1);
    return arr[randomIndex];
}

export const generateEmailBasedOnName = (firstName: string, lastName: string) => 
    `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;
    
const generateRandomAddress = (): Address => ({
    address: loremIpsum.generateWords(2) + loremIpsum.generator.generateRandomInteger(10, 100),
    city: loremIpsum.generateWords(1),
    state: loremIpsum.generateWords(1),
    zipCode: loremIpsum.generator.generateRandomInteger(10000, 99999).toString(),
    country: selectRandomFromArray(["India", "United States", "Canada", "Australia"]), 

});

const generateRandomPhoneNumber = (): string => {
    const areaCode = loremIpsum.generator.generateRandomInteger(100, 999);
    const centralOfficeCode = loremIpsum.generator.generateRandomInteger(100, 999);
    const lineNumber = loremIpsum.generator.generateRandomInteger(1000, 9999);
    return `${areaCode}-${centralOfficeCode}-${lineNumber}`;
}

export const generateRandomUser = (): UserData => {
    const[firstName, lastName ] = loremIpsum.generateWords(2).split(' ');
    return {
        firstName,
        lastName,
        title: selectRandomFromArray(["Mr.", "Mrs."]),
        password: loremIpsum.generateWords(3).replaceAll(" ", "_") + loremIpsum.generator.generateRandomInteger(1000, 9999),
        email: generateEmailBasedOnName(firstName, lastName),
        address: generateRandomAddress(),
        phoneNumber: generateRandomPhoneNumber(),
    }
}