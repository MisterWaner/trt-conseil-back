//Generate Email address from first and last name
/**
 * Generates an email address based on the provided first name and last name.
 * @param firstname - The first name of the person.
 * @param lastname - The last name of the person.
 * @returns The generated email address.
 */

export function generateEmail(firstname: string, lastname: string): string {
    const domain: string = "@trt-conseil.fr";
    const firstNameToLowerCase: string = firstname.toLowerCase().trim();
    const lastNameToLowerCase: string = lastname.toLowerCase().trim();
    const email: string = `${firstNameToLowerCase}.${lastNameToLowerCase}${domain}`;

    return email;
}
