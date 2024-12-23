<template lang="pug">
div.pa-2
    v-text-field(
      v-model.trim="nameInput"
      placeholder="Nhập tên"
    )
    v-date-picker(v-model="dateSelected")
    br
    v-btn(color="green" @click="onClickCalName" :disabled="!nameInput") Tạo chỉ số
    p Kết quả: {{resultTitle}}
    br
    p.font-weight-bold.text-red Số chủ đạo (Đường đời): {{chiSoTheoSinhNhat.chiSoChuDao.num}}
    span(v-html="chiSoTheoSinhNhat.chiSoChuDao.content")
    p.font-weight-bold.text-red Sứ mệnh: {{chiSoSuMenh}}
    span(v-html="chiSoSuMenhContent")
    p.font-weight-bold.text-red K/n đường đời sứ mệnh
    p.font-weight-bold.text-red Linh hồn: {{chiSoTamHon}}
    span(v-html="chiSoTamHonContent")
    p.font-weight-bold.text-red Nhân cách {{chiSoTinhCach}}
    span(v-html="chiSoTinhCachContent")
    p.font-weight-bold.text-red Thái độ: {{chiSoTheoSinhNhat.chiSoThaiDo.num}}
    span(v-html="chiSoTheoSinhNhat.chiSoThaiDo.content")
    p.font-weight-bold.text-red Ngày sinh: {{chiSoTheoSinhNhat.chiSoNangLucNgaySinh.num}}
    span(v-html="chiSoTheoSinhNhat.chiSoNangLucNgaySinh.content")
    p.font-weight-bold.text-red Cân bằng: {{chiSoCanBang}}
    p.font-weight-bold.text-red Trưởng thành: {{chiSoTruongThanh}}
    p.font-weight-bold.text-red Cầu nối tình cảm: {{chiSoCauNoiTinhCam}}
    p.font-weight-bold.text-red Cầu nối hạnh phúc: {{chiSoCauNoiHanhPhuc}}
    p.font-weight-bold.text-red Nợ nghiệp: {{chiSoNoNghiep.numbersShow}}
    p(v-for="chiSo in Object.keys(chiSoNoNghiep.content)" v-html="chiSoNoNghiep.content[chiSo]")
    p.font-weight-bold.text-red Nội cảm
    p.font-weight-bold.text-red Khuyết thiếu:
    p.font-weight-bold.text-red Tháng cá nhân
    p.font-weight-bold.text-red Năm cá nhân
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
    p.font-weight-bold.text-red Thách thức
    p.font-weight-bold.text-red Tuổi trẻ:
    p.font-weight-bold.text-red Viên mãn:
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
    import ChiSoLinhHon from "@/utils/tsh/ChiSoLinhHon.js";
    import ChiSoTinhCach from "@/utils/tsh/ChiSoTinhCach.js";
    import ChiSoSuMenh from "@/utils/tsh/ChiSoSuMenh.js";
    const Test = defineComponent({
        name: 'Test',
        components: {},
        setup() {
            const nameInput = ref('Hoàng Ngọc Bảo Trân') // t fix cứng tạm để đỡ phải nhập
            const birthInput = ref(null)
            const dateSelected = ref(new Date('Apr 16, 2001')) // t fix cứng tạm để đỡ phải nhập
            const chiSoTheoTen = ref()
            // const chiSoTheoSinhNhat = ref()
            const onClickCalName= () => {
                birthInput.value = dateSelected.value
                chiSoTheoTen.value = calculateNumerologyByName(nameInput.value)
                // chiSoTheoSinhNhat.value = calculateNumerologyByDate(birthInput.value)
            }
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
                return chiSoTheoTen.value ? chiSoTheoTen.value["chiSoTinhCach"] : null
            })
            const chiSoTinhCachContent = computed(() => {
                return breakLineContent(ChiSoTinhCach[chiSoTinhCach.value])
            })
            const chiSoTamHon = computed(()=>{
                return chiSoTheoTen.value ? chiSoTheoTen.value["chiSoTamHon"] : null
            })
            const chiSoTamHonContent = computed(() => {
                return breakLineContent(ChiSoLinhHon[chiSoTamHon.value])
            })
            const chiSoCanBang = computed(()=>{
                return chiSoTheoTen.value ? chiSoTheoTen.value["chiSoCanBang"] : null
            })
            const chiSoSuMenh = computed(()=>{
                return chiSoTheoTen.value ? chiSoTheoTen.value["chiSoSuMenh"] : null
            })
            const chiSoSuMenhContent = computed(()=>{
                return breakLineContent(ChiSoSuMenh[chiSoSuMenh.value])
            })
            const chiSoTruongThanh = computed(()=>{
                return reduceToSingleDigit((chiSoChuDao.value + chiSoSuMenh.value), true)
            })
            const chiSoCauNoiTinhCam = computed(()=>{
                return reduceToSingleDigit(Math.abs(chiSoChuDao.value - chiSoSuMenh.value))
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
                chiSoTamHonContent,
                chiSoTinhCachContent,
                chiSoSuMenhContent,
                onClickCalName,
                chiSoTinhCach,
                chiSoTamHon,
                chiSoCanBang,
                chiSoSuMenh,
                chiSoTruongThanh,
                chiSoCauNoiTinhCam,
                chiSoCauNoiHanhPhuc,
                chiSoNoNghiep,
                chiSoDinhCao,
                chiSoTheoSinhNhat
            }
        },
    })

    export default Test
</script>
