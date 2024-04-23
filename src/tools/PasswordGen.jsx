const numbers = "0123456789";
const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
const specialChars = "!^+%&/()=?_#$§{[]}|;:>÷<.*-@é";
const charLength = 20;
const charList = numbers + upperCaseLetters + lowerCaseLetters + specialChars;

export default function PasswordGen() {

    let password =''

    const charListLength = charList.length;

    for (let i = 0; i < charLength; i++) {
        const characterIndex = Math.round(Math.random() * charListLength);
        password += charList.charAt(characterIndex);
    }
    return password

}
