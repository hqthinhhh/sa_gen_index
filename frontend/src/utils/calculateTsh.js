export function sumToOneDigit(input, checkSpecial=false) {
    // check truong hop dac biet cho chi so ngay sinh
    if (checkSpecial) {
        if (input === '22') {
            return '22/4'
        } else if (input === '11' || input === '29') {
            return '11/2'
        }
    }
    // Remove all non-numeric characters
    const numericString = input?.replace(/[^0-9]/g, '');

    // Calculate the sum of digits repeatedly until it's a single digit
    let sum = numericString?.split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);
    console.log('1', sum);

    while (sum >= 10) {
        // so chu dao 11,22,33
        if (checkSpecial) {
            if (sum === 11) {
                return '11/2'
            } else if (sum === 22) {
                return '22/4'
            } else if (sum === 33) {
                return '33/6'
            }
        }
        sum = sum
            .toString()
            .split('')
            .reduce((acc, digit) => acc + parseInt(digit, 10), 0);
    }

    return sum;
}
