import { LoremIpsum } from "lorem-ipsum"


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

export const generateRandomNameAndEmail = () => {
    const name = loremIpsum.generateWords(2);
    const email = `${name.replace(/\s+/g, '.').toLowerCase()}@example.com`;
    return { name, email };

}