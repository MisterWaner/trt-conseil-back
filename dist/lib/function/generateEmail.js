//Generate Email address from first and last name
export function generateEmail(firstname, lastname) {
    const domain = "@trt-conseil.fr";
    const firstNameToLowerCase = firstname.toLowerCase().trim();
    const lastNameToLowerCase = lastname.toLowerCase().trim();
    const email = `${firstNameToLowerCase}.${lastNameToLowerCase}${domain}`;
    return email;
}
