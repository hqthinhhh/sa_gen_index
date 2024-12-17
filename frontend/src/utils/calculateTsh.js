import {dayjs} from "@/plugins"

const numerologyMap = {
  A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
  J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
  S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8,
};
const specialList = [11, 22, 33]

// Danh sách nguyên âm
const vowels = ['A', 'E', 'I', 'O', 'U'];

// Hàm loại bỏ dấu
function removeAccents(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, '');
}

// Hàm giảm số về 1 chữ số
function reduceToSingleDigit(num, checkSpecial=false) {
  while (num >= 10) {
    if (checkSpecial && specialList.includes(num)) {
        break
    }
    num = num.toString().split('').map(Number).reduce((a, b) => a + b, 0);
  }
  return Number(num);
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

export function calculateChiSoChuDao (dateInput) {
    // Remove all non-numeric characters
    // const numericString = dateInput?.replace(/[^0-9]/g, '');
    const formattedDate = dayjs(dateInput).format('DDMMYYYY')
    let chiSoChuDao = reduceToSingleDigit(formattedDate, true)

    while (chiSoChuDao >= 10) {
        // so chu dao 11,22,33
        if (specialList.includes(chiSoChuDao)) {
            return chiSoChuDao
        }
        chiSoChuDao = reduceToSingleDigit(chiSoChuDao)
    }
    return chiSoChuDao
}
export function calculateChiSoNangLucNgaySinh (dateInput) {
    const dayOnly =  dayjs(dateInput).format('DD')
    // check truong hop dac biet cho chi so ngay sinh
    if (dayOnly === '22') {
        return 22
    } else if (dayOnly === '11' || dayOnly === '29') {
        return 11
    }
    return reduceToSingleDigit(dayOnly)
}
export function calculateChiSoThaiDo (dateInput) {
    const dayMonthFormat = dayjs(dateInput).format('DDMM')
    return reduceToSingleDigit(dayMonthFormat)
}
export function calculateNumerologyByDate(dateInput) {
    // Tinh chi so nang luc ngay sinh
    const chiSoNangLucNgaySinh = calculateChiSoNangLucNgaySinh(dateInput)

    // Tinh chi so chu dao
    const chiSoChuDao = calculateChiSoChuDao(dateInput)

    // Tinh chi so thai do
    const chiSoThaiDo = calculateChiSoThaiDo(dateInput)

    return {
        'chiSoNangLucNgaySinh': chiSoNangLucNgaySinh,
        'chiSoChuDao': chiSoChuDao,
        'chiSoThaiDo': chiSoThaiDo
    }
}
