export function formatPhoneNumberToShow(phoneNumber: string) {
    const countryCode = phoneNumber.substr(0,2);
    const ddd = phoneNumber.substr(2,2);
    const preffix = phoneNumber.substr(4,1);
    const firstPart = phoneNumber.substr(5,4);
    const secondPart = phoneNumber.substr(9,4);

    return `+${countryCode} (${ddd}) ${preffix}${firstPart}-${secondPart}`;
}