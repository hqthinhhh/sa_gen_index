const numerologyMap = {
  A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
  J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
  S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8,
};

// Danh sách nguyên âm
const vowels = ['A', 'E', 'I', 'O', 'U'];

// Hàm loại bỏ dấu
function removeAccents(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, '');
}

// Hàm giảm số về 1 chữ số
function reduceToSingleDigit(num) {
  while (num >= 10) {
    num = num.toString().split('').map(Number).reduce((a, b) => a + b, 0);
  }
  return num;
}

// Hàm tính Thần số học từ họ tên
export function calculateNumerologyByName(fullName) {
  const cleanName = removeAccents(fullName).replace(/\s+/g, '').toUpperCase();
  const letters = cleanName.split('');

  // Tâm hồn (nguyên âm)
  const soulNumbers = letters
    .filter(char => vowels.includes(char))
    .map(char => numerologyMap[char] || 0);
  const soulNumber = reduceToSingleDigit(soulNumbers.reduce((a, b) => a + b, 0));

  // Tính cách (phụ âm)
  const personalityNumbers = letters
    .filter(char => !vowels.includes(char))
    .map(char => numerologyMap[char] || 0);
  const personalityNumber = reduceToSingleDigit(personalityNumbers.reduce((a, b) => a + b, 0));

  // Cân bằng (tổng các chữ cái đầu tiên trong bộ tên)
  const firstLetters = fullName
    .split(/\s+/) // Tách từng từ
    .map(word => removeAccents(word[0]).toUpperCase()) // Lấy ký tự đầu tiên
    .filter(Boolean); // Loại bỏ các giá trị null/undefined
  const balanceNumbers = firstLetters
    .map(char => numerologyMap[char] || 0);
  const balanceNumber = reduceToSingleDigit(balanceNumbers.reduce((a, b) => a + b, 0));

  // Kết quả
  return {
    'chiSoTamHon': soulNumber,          // Tâm hồn
    'chiSoTinhCach': personalityNumber,   // Tính cách
    'chiSoCanBang': balanceNumber        // Cân bằng
  };
}


export function calculateNumerologyByDate(input, checkSpecial=false) {
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
