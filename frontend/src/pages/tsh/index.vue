<template lang="pug">
div.pa-2
    v-text-field(
      v-model.trim="userInputName"
      placeholder="Nhập tên"
    )
    v-date-picker(v-model="dateSelected")
    br
    v-btn(color="green" @click="onClickCalName" :disabled="!userInputName") Tạo chỉ số
    p Kết quả: {{resultTitle}}
    br
    .result(v-if="nameInput && birthInput" )
        p.font-weight-bold.text-red Số chủ đạo (Đường đời): {{chiSoTheoSinhNhat.chiSoChuDao.num}}
        span(v-html="chiSoTheoSinhNhat.chiSoChuDao.content")
        p.font-weight-bold.text-red Sứ mệnh: {{chiSoTheoTen.chiSoSuMenh.num}}
        span(v-html="chiSoTheoTen.chiSoSuMenh.content")
        p.font-weight-bold.text-red K/n đường đời sứ mệnh
        p.font-weight-bold.text-red Tâm hồn: {{chiSoTheoTen.chiSoTamHon.num}}
        span(v-html="chiSoTheoTen.chiSoTamHon.content")
        p.font-weight-bold.text-red Nhân cách {{chiSoTheoTen.chiSoTinhCach.num}}
        span(v-html="chiSoTheoTen.chiSoTinhCach.content")
        p.font-weight-bold.text-red Thái độ: {{chiSoTheoSinhNhat.chiSoThaiDo.num}}
        span(v-html="chiSoTheoSinhNhat.chiSoThaiDo.content")
        p.font-weight-bold.text-red Ngày sinh: {{chiSoTheoSinhNhat.chiSoNangLucNgaySinh.num}}
        span(v-html="chiSoTheoSinhNhat.chiSoNangLucNgaySinh.content")
        p.font-weight-bold.text-red Cân bằng: {{chiSoTheoTen.chiSoCanBang.num}}
        span(v-html="chiSoTheoTen.chiSoCanBang.content")
        p.font-weight-bold.text-red Trưởng thành: {{chiSoTruongThanh.num}}
        span(v-html="chiSoTruongThanh.content")
        p.font-weight-bold.text-red Cầu nối tình cảm: {{chiSoCauNoiTinhCam.num}}
        span(v-html="chiSoCauNoiTinhCam.content")
        p.font-weight-bold.text-red Cầu nối hạnh phúc: {{chiSoCauNoiHanhPhuc}}
        p.font-weight-bold.text-red Nợ nghiệp: {{chiSoNoNghiep.numbersShow}}
        p(v-for="chiSo in Object.keys(chiSoNoNghiep.content)" v-html="chiSoNoNghiep.content[chiSo]")
        p.font-weight-bold.text-red Nội cảm: {{chiSoTheoTen.chiSoNoiCam.num}}
        p(v-for="chiSo in Object.keys(chiSoTheoTen.chiSoNoiCam.content)" v-html="chiSoTheoTen.chiSoNoiCam.content[chiSo]")
        p.font-weight-bold.text-red Khuyết thiếu: {{chiSoTheoTen.chiSoKhuyetThieu.num}}
        p(v-for="chiSo in Object.keys(chiSoTheoTen.chiSoKhuyetThieu.content)" v-html="chiSoTheoTen.chiSoKhuyetThieu.content[chiSo]")
        p.font-weight-bold.text-red Tháng cá nhân:
        p.font-weight-bold.text-red Tháng {{chiSoTheoSinhNhat.chiSoThangCaNhan[1].month}}: {{chiSoTheoSinhNhat.chiSoThangCaNhan[1].num}}
        span(v-html="chiSoTheoSinhNhat.chiSoThangCaNhan[1].content")
        p.font-weight-bold.text-red Tháng {{chiSoTheoSinhNhat.chiSoThangCaNhan[2].month}}: {{chiSoTheoSinhNhat.chiSoThangCaNhan[2].num}}
        span(v-html="chiSoTheoSinhNhat.chiSoThangCaNhan[2].content")
        p.font-weight-bold.text-red Tháng {{chiSoTheoSinhNhat.chiSoThangCaNhan[3].month}}: {{chiSoTheoSinhNhat.chiSoThangCaNhan[3].num}}
        span(v-html="chiSoTheoSinhNhat.chiSoThangCaNhan[3].content")
        p.font-weight-bold.text-red Tháng {{chiSoTheoSinhNhat.chiSoThangCaNhan[4].month}}: {{chiSoTheoSinhNhat.chiSoThangCaNhan[4].num}}
        span(v-html="chiSoTheoSinhNhat.chiSoThangCaNhan[4].content")
        p.font-weight-bold.text-red Năm cá nhân:
        p.font-weight-bold Năm {{chiSoTheoSinhNhat.chiSoNamCaNhan[1].year}}: {{chiSoTheoSinhNhat.chiSoNamCaNhan[1].num}}
        span(v-html="chiSoTheoSinhNhat.chiSoNamCaNhan[1].content")
        p.font-weight-bold Năm {{chiSoTheoSinhNhat.chiSoNamCaNhan[2].year}}: {{chiSoTheoSinhNhat.chiSoNamCaNhan[2].num}}
        span(v-html="chiSoTheoSinhNhat.chiSoNamCaNhan[2].content")
        p.font-weight-bold Năm {{chiSoTheoSinhNhat.chiSoNamCaNhan[3].year}}: {{chiSoTheoSinhNhat.chiSoNamCaNhan[3].num}}
        span(v-html="chiSoTheoSinhNhat.chiSoNamCaNhan[3].content")
        p.font-weight-bold Năm {{chiSoTheoSinhNhat.chiSoNamCaNhan[4].year}}: {{chiSoTheoSinhNhat.chiSoNamCaNhan[4].num}}
        span(v-html="chiSoTheoSinhNhat.chiSoNamCaNhan[4].content")
        p.font-weight-bold.text-red Đỉnh cao chặng:
        p.font-weight-bold - Chỉ số Ngày: {{chiSoDinhCao.day}}
        p.font-weight-bold - Chỉ số Tháng: {{chiSoDinhCao.month}}
        p.font-weight-bold - Chỉ số Năm: {{chiSoDinhCao.year}}
        p.font-weight-bold - Đỉnh cao chặng 1: Tuổi: {{chiSoDinhCao[1].age}} - Chỉ số {{chiSoDinhCao[1].num}}
        span(v-html="chiSoDinhCao[1].content")
        p.font-weight-bold - Đỉnh cao chặng 2: Tuổi: {{chiSoDinhCao[2].age}} - Chỉ số {{chiSoDinhCao[2].num}}
        span(v-html="chiSoDinhCao[2].content")
        p.font-weight-bold - Đỉnh cao chặng 3: Tuổi: {{chiSoDinhCao[3].age}} - Chỉ số {{chiSoDinhCao[3].num}}
        span(v-html="chiSoDinhCao[3].content")
        p.font-weight-bold - Đỉnh cao chặng 4: Tuổi: {{chiSoDinhCao[4].age}} - Chỉ số {{chiSoDinhCao[4].num}}
        span(v-html="chiSoDinhCao[4].content")
        p.font-weight-bold.text-red Thách thức:
        p.font-weight-bold Thách thức 1: {{chiSoTheoSinhNhat.chiSoThachThuc[1].num}}
        span(v-html="chiSoTheoSinhNhat.chiSoThachThuc[1].content")
        p.font-weight-bold Thách thức 2: {{chiSoTheoSinhNhat.chiSoThachThuc[2].num}}
        span(v-html="chiSoTheoSinhNhat.chiSoThachThuc[2].content")
        p.font-weight-bold Thách thức 3: {{chiSoTheoSinhNhat.chiSoThachThuc[3].num}}
        span(v-html="chiSoTheoSinhNhat.chiSoThachThuc[3].content")
        p.font-weight-bold Thách thức 4: {{chiSoTheoSinhNhat.chiSoThachThuc[4].num}}
        span(v-html="chiSoTheoSinhNhat.chiSoThachThuc[4].content")
        p.font-weight-bold.text-red Tuổi trẻ: {{chiSoTheoSinhNhat.chiSoTuoiTre.num}}
        span(v-html="chiSoTheoSinhNhat.chiSoTuoiTre.content")
        p.font-weight-bold.text-red Viên mãn: {{chiSoTheoSinhNhat.chiSoVienMan.num}}
        span(v-html="chiSoTheoSinhNhat.chiSoVienMan.content")
        p.font-weight-bold.text-red Các số trong biểu đồ ngày sinh:
        p.font-weight-bold.text-red Mũi tên trong biểu đồ ngày sinh:
        p.font-weight-bold.text-red Mũi tên trong biểu đồ tên:
        p.font-weight-bold.text-red Số ưu thế:

</template>

<script>
    import {computed, defineComponent, ref} from 'vue'
    import {dayjs} from "@/plugins"
    import {
        calculateNumerologyByDate,
        calculateNumerologyByName,
        reduceToSingleDigit,
        calculateNoNghiep,
        calculateDinhCao,
        breakLineContent
    } from "@/utils/calculateTsh.js";
    import ChiSoTruongThanh from "@/utils/tsh/ChiSoTruongThanh.js";
    import ChiSoCauNoiTinhCam from "@/utils/tsh/ChiSoCauNoiTinhCam.js";
    const Test = defineComponent({
        name: 'Test',
        components: {},
        setup() {
            const userInputName = ref('Hoàng Ngọc Bảo Trân') // t fix cứng tạm để đỡ phải nhập
            const nameInput = ref()
            const birthInput = ref(null)
            const dateSelected = ref(new Date('Apr 16, 2001')) // t fix cứng tạm để đỡ phải nhập
            // const chiSoTheoTen = ref()
            // const chiSoTheoSinhNhat = ref()
            const onClickCalName= () => {
                birthInput.value = dateSelected.value
                nameInput.value = userInputName.value
                // chiSoTheoTen.value = calculateNumerologyByName(nameInput.value)
                // chiSoTheoSinhNhat.value = calculateNumerologyByDate(birthInput.value)
            }
            const chiSoTheoTen = computed(()=>{
                return calculateNumerologyByName(nameInput.value)
            })
            const chiSoTheoSinhNhat = computed(()=>{
                return calculateNumerologyByDate(birthInput.value)
            })
            const fullBirthFormat = computed(
                () => {
                    return dayjs(birthInput.value).format('DD/MM/YYYY')
                }
            )
            const resultTitle = computed(
                () => {
                    return (nameInput.value ? nameInput.value : 'Hãy nhập họ tên. ') + (birthInput.value ? fullBirthFormat.value : '')
                }
            )
            const chiSoChuDao = computed(()=>{
                return chiSoTheoSinhNhat.value.chiSoChuDao.num
            })
            const chiSoTinhCach = computed(()=>{
                return chiSoTheoTen.value.chiSoTinhCach.num
            })

            const chiSoCanBang = computed(()=>{
                return chiSoTheoTen.value.chiSoCanBang.num
            })
            const chiSoSuMenh = computed(()=>{
                return chiSoTheoTen.value.chiSoSuMenh.num
            })

            const chiSoTruongThanh = computed(()=>{
                let chiSo = reduceToSingleDigit((chiSoChuDao.value + chiSoSuMenh.value), true)
                if (chiSo === 33) {
                    chiSo = 6
                }
                return {
                    'num': chiSo,
                    'content': breakLineContent(ChiSoTruongThanh[chiSo])
                }
            })
            const chiSoCauNoiTinhCam = computed(()=>{
                const chiSo = reduceToSingleDigit(Math.abs(chiSoChuDao.value - chiSoSuMenh.value))
                return {
                  'num': chiSo,
                  'content': breakLineContent(ChiSoCauNoiTinhCam[chiSo])
                }
            })
            const chiSoCauNoiHanhPhuc = computed(()=>{
                return reduceToSingleDigit(Math.abs(chiSoTinhCach.value - chiSoCanBang.value))
            })
            const chiSoNoNghiep = computed(()=>{
                return calculateNoNghiep(birthInput.value, nameInput.value)
            })
            const chiSoDinhCao = computed(()=>{
                return calculateDinhCao(birthInput.value)
            })

            return {
                nameInput,
                birthInput,
                dateSelected,
                resultTitle,
                onClickCalName,
                chiSoTinhCach,
                chiSoCanBang,
                chiSoSuMenh,
                chiSoTruongThanh,
                chiSoCauNoiTinhCam,
                chiSoCauNoiHanhPhuc,
                chiSoNoNghiep,
                chiSoDinhCao,
                chiSoTheoSinhNhat,
                chiSoTheoTen,
                userInputName
            }
        },
    })

    export default Test
</script>
