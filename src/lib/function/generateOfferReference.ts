//Function to get the first letters of the society name
function getFirstLettersOfSocietyName(societyName: string): string {
    const societyNameWithoutSpaces: string = societyName.split(/\s+/).join("");
    const societyNameInUpperCase: string = societyNameWithoutSpaces.toUpperCase();
    const firstLettersOfSocietyName: string = societyNameInUpperCase.slice(0, 6);

    return firstLettersOfSocietyName;
}

//Function to generate the offer reference with the first letters of the society name, the actual year, the actual month and a random number
/**
 * Generates an offer reference based on the society name.
 * 
 * @param societyName - The name of the society.
 * @returns The generated offer reference.
 */
export function generateOfferReference(societyName: string): string {
    const letters = getFirstLettersOfSocietyName(societyName);
    const actualYear: number = new Date().getFullYear();
    const actualMonth: number = new Date().getMonth() + 1;
    const randomNumbers: number = Math.floor(150 + Math.random() * 900);
    
    const offerReference: string = `${letters}/${actualYear}-${actualMonth}-${randomNumbers}`;

    return offerReference;
}