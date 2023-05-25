export const validateDate = (value: str) : boolean => {
    const pattern = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!pattern.test(value)) {
        return false;
    }

    const date = new Date(value);
    if (isNaN(date.getTime())) {
        return false;
    }

    return true;
}

export const validateVnId = (id: str): boolean => {
    const pattern = /^\d{9}$|^\d{12}$/;
    if (!pattern.test(id)) {
        return false;
    }

    const checkDigit = id[id.length - 1];
    const weight = [2, 3, 4, 5, 6, 7, 8, 9, 10];
    let total = 0;
    for (let i = 0; i < id.length - 1; i++) {
        total += id[i] * weight[i % weight.length];
    }
    let remainder = total % 11;
    let expectedCheckDigit = remainder === 10 ? "X" : remainder;

    return checkDigit === expectedCheckDigit;
}

export const validateVnPhone = (phone: str): boolean => {
    const pattern = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
    return pattern.test(phone);
}