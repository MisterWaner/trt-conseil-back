//Function to get the first letters of the society name
function getFirstLettersOfSocietyName(societyName) {
    const societyNameWithoutSpaces = societyName.split(/\s+/).join("");
    const societyNameInUpperCase = societyNameWithoutSpaces.toUpperCase();
    const firstLettersOfSocietyName = societyNameInUpperCase.slice(0, 6);
    return firstLettersOfSocietyName;
}
//Function to generate the offer reference with the first letters of the society name, the actual year, the actual month and a random number
/**
 * Generates an offer reference based on the society name.
 *
 * @param societyName - The name of the society.
 * @returns The generated offer reference.
 */
export function generateOfferReference(societyName) {
    const letters = getFirstLettersOfSocietyName(societyName);
    const actualYear = new Date().getFullYear();
    const actualMonth = new Date().getMonth() + 1;
    const randomNumbers = Math.floor(150 + Math.random() * 900);
    const offerReference = `${letters}/${actualYear}-${actualMonth}-${randomNumbers}`;
    return offerReference;
}
