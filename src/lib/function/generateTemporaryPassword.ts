//Function to generate a temporary password durign the creation of a consultant
/**
 * Generates a temporary password of the specified length.
 * @param length The length of the temporary password.
 * @returns The generated temporary password.
 */

export function generateTemporaryPassword(length: number): string {
    let result: string = "";
    const characters: string =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!?@#$%&*()_+=-";

    const charactersLength: number = characters.length;

    for (let i: number = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
    }

    return result;
}
