//Generate Email address from first and last name
export function generateEmail(firstname: string, lastname: string): string {
    const domain: string = "@trt-conseil.fr";
    const firstNameToLowerCase: string = firstname.toLowerCase().trim();
    const lastNameToLowerCase: string = lastname.toLowerCase().trim();
    const email: string = `${firstNameToLowerCase}.${lastNameToLowerCase}${domain}`;

    return email;
}
