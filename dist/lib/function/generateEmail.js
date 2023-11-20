//Generate Email address from first and last name
/**
 * Generates an email address based on the provided first name and last name.
 * @param firstname - The first name of the person.
 * @param lastname - The last name of the person.
 * @returns The generated email address.
 */
export function generateEmail(firstname, lastname) {
    const domain = "@trt-conseil.fr";
    const firstNameToLowerCase = firstname.toLowerCase().trim();
    const lastNameToLowerCase = lastname.toLowerCase().trim();
    const email = `${firstNameToLowerCase}.${lastNameToLowerCase}${domain}`;
    return email;
}
