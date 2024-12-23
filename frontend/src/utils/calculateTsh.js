import {dayjs} from "@/plugins"
import ChiSoDinhCao from "@/utils/tsh/ChiSoDinhCao.js";
import ChiSoNoNghiep from "@/utils/tsh/ChiSoNoNghiep.js";
const numerologyMap = {
  A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
  J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
  S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8, Đ: 4
};
const specialList = [11, 22, 33]
const noNghiepList = [13, 14, 16, 19]

// Danh sách nguyên âm
const vowels = ['A', 'E', 'I', 'O', 'U'];

// Hàm loại bỏ dấu
function removeAccents(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, '');
}

// Hàm giảm số về 1 chữ số
export function reduceToSingleDigit(num, checkSpecial=false, checkNoNghiep=false) {
    while (num >= 10) {
        const isSpecial = checkSpecial && specialList.includes(Number(num))
        const isNoNghiep = checkNoNghiep && noNghiepList.includes(Number(num))
        if (isSpecial || isNoNghiep) {
            break
        }
        num = num.toString().split('').map(Number).reduce((a, b) => a + b, 0);
    }
    return Number(num);
}

function calculateChiSoTamHon (nameInput, checkNoNghiep=false) {
    // Tổng nguyên âm
    const soulNumbers = nameInput
    .filter(char => vowels.includes(char))
    .map(char => numerologyMap[char] || 0);
    return reduceToSingleDigit(soulNumbers.reduce((a, b) => a + b, 0), false, checkNoNghiep);
}
function calculateChiSoTinhCach (nameInput, checkNoNghiep=false) {
    // Tổng phụ âm
    const personalityNumbers = nameInput
    .filter(char => !vowels.includes(char))
    .map(char => numerologyMap[char] || 0);
    return reduceToSingleDigit(personalityNumbers.reduce((a, b) => a + b, 0), false, checkNoNghiep);
}
function calculateChiSoCanBang (fullNameInput, checkNoNghiep=false) {
    // Tổng các chữ cái đầu tiên trong bộ tên
    const firstLetters = fullNameInput
    .split(/\s+/) // Tách từng từ
    .map(word => removeAccents(word[0]).toUpperCase()) // Lấy ký tự đầu tiên
    .filter(Boolean); // Loại bỏ các giá trị null/undefined
    const balanceNumbers = firstLetters
    .map(char => numerologyMap[char] || 0);
    return reduceToSingleDigit(balanceNumbers.reduce((a, b) => a + b, 0), false, checkNoNghiep);
}


// Hàm tính Thần số học từ họ tên
export function calculateNumerologyByName(fullName, checkNoNghiep=false) {
  const cleanName = removeAccents(fullName).replace(/\s+/g, '').toUpperCase();
  const letters = cleanName.split('');

  // chỉ số Tâm hồn
  const chiSoTamHon = calculateChiSoTamHon(letters, checkNoNghiep)

  // chỉ số Tính cách
  const chiSoTinhCach = calculateChiSoTinhCach(letters, checkNoNghiep)

  // chỉ số Cân bằng
  const chiSoCanBang = calculateChiSoCanBang(fullName, checkNoNghiep)

  // chỉ số Sứ mệnh
  const chiSoSuMenh = reduceToSingleDigit((chiSoTamHon + chiSoTinhCach), true, checkNoNghiep)

  // Kết quả
  return {
    'chiSoTamHon': chiSoTamHon,
    'chiSoTinhCach': chiSoTinhCach,
    'chiSoCanBang': chiSoCanBang,
    'chiSoSuMenh': chiSoSuMenh
  };
}

export function calculateChiSoChuDao (dateInput, checkSpecial=true, checkNoNghiep=false) {
    // Remove all non-numeric characters
    // const numericString = dateInput?.replace(/[^0-9]/g, '');
    const formattedDate = dayjs(dateInput).format('DDMMYYYY')
    return reduceToSingleDigit(formattedDate, checkSpecial, checkNoNghiep)
}
export function calculateChiSoNangLucNgaySinh (dateInput, checkNoNghiep=false) {
    const dayOnly =  dayjs(dateInput).format('DD')
    // check truong hop dac biet cho chi so ngay sinh
    if (dayOnly === '22') {
        return 22
    } else if (dayOnly === '11' || dayOnly === '29') {
        return 11
    }
    return reduceToSingleDigit(dayOnly, false, checkNoNghiep)
}
export function calculateChiSoThaiDo (dateInput, checkNoNghiep=false) {
    const dayMonthFormat = dayjs(dateInput).format('DDMM')
    return reduceToSingleDigit(dayMonthFormat, false, checkNoNghiep)
}
export function calculateNumerologyByDate(dateInput, checkNoNghiep=false) {
    // Tinh chi so nang luc ngay sinh
    const chiSoNangLucNgaySinh = calculateChiSoNangLucNgaySinh(dateInput, checkNoNghiep)

    // Tinh chi so chu dao
    const chiSoChuDao = calculateChiSoChuDao(dateInput, true, checkNoNghiep)

    // Tinh chi so thai do
    const chiSoThaiDo = calculateChiSoThaiDo(dateInput, checkNoNghiep)

    return {
        'chiSoNangLucNgaySinh': chiSoNangLucNgaySinh,
        'chiSoChuDao': chiSoChuDao,
        'chiSoThaiDo': chiSoThaiDo
    }
}

export function calculateNoNghiep (dateInput, fullname) {
    const chiSoTheoNgay = calculateNumerologyByDate(dateInput, true)
    const chiSoTheoTen = calculateNumerologyByName(fullname, true)

    const noNghiepObject = {}
    if (noNghiepList.includes(chiSoTheoNgay["chiSoChuDao"])) {
        noNghiepObject[chiSoTheoNgay["chiSoChuDao"]] = chiSoTheoNgay["chiSoChuDao"]
    }
    if (noNghiepList.includes(chiSoTheoNgay["chiSoNangLucNgaySinh"])) {
        noNghiepObject[chiSoTheoNgay["chiSoNangLucNgaySinh"]] = chiSoTheoNgay["chiSoNangLucNgaySinh"]
    }
    if (noNghiepList.includes(chiSoTheoNgay["chiSoThaiDo"])) {
        noNghiepObject[chiSoTheoNgay["chiSoThaiDo"]] = chiSoTheoNgay["chiSoThaiDo"]
    }

    if (noNghiepList.includes(chiSoTheoTen["chiSoTamHon"])) {
        noNghiepObject[chiSoTheoTen["chiSoTamHon"]] = chiSoTheoTen["chiSoTamHon"]
    }
    if (noNghiepList.includes(chiSoTheoTen["chiSoTinhCach"])) {
        noNghiepObject[chiSoTheoTen["chiSoTinhCach"]] = chiSoTheoTen["chiSoTinhCach"]
    }
    if (noNghiepList.includes(chiSoTheoTen["chiSoCanBang"])) {
        noNghiepObject[chiSoTheoTen["chiSoCanBang"]] = chiSoTheoTen["chiSoCanBang"]
    }
    if (noNghiepList.includes(chiSoTheoTen["chiSoSuMenh"])) {
        noNghiepObject[chiSoTheoTen["chiSoSuMenh"]] = chiSoTheoTen["chiSoSuMenh"]
    }

    let chiSoNoNghiepArray = []
    let content = {}
    Object.keys(noNghiepObject).forEach(chiSo => {
        chiSoNoNghiepArray.push(chiSo)
        content[chiSo] = breakLineContent(ChiSoNoNghiep[chiSo])
    })
    return {
        'numbersShow': chiSoNoNghiepArray.join(', '),
        'content': content
    }
}

export function calculateDinhCao (dateInput) {
    // Tinh chi so chu dao
    const chiSoChuDao = calculateChiSoChuDao(dateInput, false, false)
    const tuoiDinh1 = 36 - chiSoChuDao
    const tuoiDinh2 = tuoiDinh1 + 9
    const tuoiDinh3 = tuoiDinh2 + 9
    const tuoiDinh4 = tuoiDinh3 + 9

    const day = reduceToSingleDigit(dayjs(dateInput).format('DD'))
    const month = reduceToSingleDigit(dayjs(dateInput).format('MM'))
    const year = reduceToSingleDigit(dayjs(dateInput).format('YYYY'))

    const chiSoDinh1 = reduceToSingleDigit(day + month)
    const chiSoDinh2 = reduceToSingleDigit(day + year)
    const chiSoDinh3 = reduceToSingleDigit(month + day + day + year)
    const chiSoDinh4 = reduceToSingleDigit(month +  year)
    return {
        1: {
            'age': tuoiDinh1 || null,
            'num': chiSoDinh1 || null,
            'content': breakLineContent(ChiSoDinhCao[chiSoDinh1]) || null
        },
        2: {
            'age': tuoiDinh2 || null,
            'num': chiSoDinh2 || null,
            'content': breakLineContent(ChiSoDinhCao[chiSoDinh2]) || null
        },
        3: {
            'age': tuoiDinh3 || null,
            'num': chiSoDinh3 || null,
            'content': breakLineContent(ChiSoDinhCao[chiSoDinh3]) || null
        },
        4: {
            'age': tuoiDinh4 || null,
            'num': chiSoDinh4 || null,
            'content': breakLineContent(ChiSoDinhCao[chiSoDinh4]) || null
        },
        'day': day || null,
        'month': month || null,
        'year': year || null
    }
}

export function breakLineContent (content) {
    return content?.replace(/\n/g, '<br>')
}
