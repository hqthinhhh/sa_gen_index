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
    p.font-weight-bold.text-red Số chủ đạo (Đường đời): {{chiSoChuDao}}
    span(v-html="soChuDaoContent")
    p.font-weight-bold.text-red Sứ mệnh: {{chiSoSuMenh}}
    span(v-html="chiSoSuMenhContent")
    p.font-weight-bold.text-red K/n đường đời sứ mệnh
    p.font-weight-bold.text-red Linh hồn: {{chiSoTamHon}}
    span(v-html="chiSoTamHonContent")
    p.font-weight-bold.text-red Nhân cách {{chiSoTinhCach}}
    span(v-html="chiSoTinhCachContent")
    p.font-weight-bold.text-red Thái độ: {{soThaiDo}}
    span(v-html="chiSoThaiDoContent")
    p.font-weight-bold.text-red Ngày sinh: {{chiSoNgaySinh}}
    span(v-html="soNgaySinhContent")
    p.font-weight-bold.text-red Cân bằng: {{chiSoCanBang}}
    p.font-weight-bold.text-red Trưởng thành: {{chiSoTruongThanh}}
    p.font-weight-bold.text-red Cầu nối tình cảm: {{chiSoCauNoiTinhCam}}
    p.font-weight-bold.text-red Cầu nối hạnh phúc: {{chiSoCauNoiHanhPhuc}}
    p.font-weight-bold.text-red Nợ nghiệp: {{chiSoNoNghiep}}
    p.font-weight-bold.text-red Nội cảm
    p.font-weight-bold.text-red Tháng cá nhân
    p.font-weight-bold.text-red Năm cá nhân
    p.font-weight-bold.text-red Đỉnh cao chặng
    p.font-weight-bold.text-red Thách thức

</template>

<script>
    import {computed, defineComponent, ref} from 'vue'
    import {dayjs} from "@/plugins"
    import {calculateNumerologyByDate, calculateNumerologyByName, reduceToSingleDigit, calculateNoNghiep} from "@/utils/calculateTsh.js";
    import ChiSoDuongDoi from "@/utils/tsh/index.js";
    import ChiSoThaiDo from "@/utils/tsh/ChiSoThaiDo.js";
    import SoNangLucNgaySinh from "@/utils/tsh/SoNangLucNgaySinh.js";
    import ChiSoLinhHon from "@/utils/tsh/ChiSoLinhHon.js";
    import ChiSoTinhCach from "@/utils/tsh/ChiSoTinhCach.js";
    import ChiSoSuMenh from "@/utils/tsh/ChiSoSuMenh.js";
    const Test = defineComponent({
        name: 'Test',
        components: {},
        setup() {
            const nameInput = ref('Hoàng Ngọc Bảo Trân') // t fix cứng tạm để đỡ phải nhập
            const birthInput = ref(null)
            const dateSelected = ref(new Date('Jun 12, 2012')) // t fix cứng tạm để đỡ phải nhập
            const chiSoTheoTen = ref()
            const chiSoTheoSinhNhat = ref()
            const onClickCalName= () => {
                birthInput.value = dateSelected.value
                chiSoTheoTen.value = calculateNumerologyByName(nameInput.value)
                chiSoTheoSinhNhat.value = calculateNumerologyByDate(birthInput.value)
            }
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
                return chiSoTheoSinhNhat.value ? chiSoTheoSinhNhat.value["chiSoChuDao"] : null
            })
            const soChuDaoContent = computed(() => {
                return ChiSoDuongDoi[chiSoChuDao.value]?.replace(/\n/g, '<br>')
            })
            const chiSoNgaySinh = computed(()=>{
                return chiSoTheoSinhNhat.value ? chiSoTheoSinhNhat.value["chiSoNangLucNgaySinh"] : null
            })
            const soNgaySinhContent = computed(() => {
                return SoNangLucNgaySinh[chiSoNgaySinh.value]?.replace(/\n/g, '<br>')
            })
            const soThaiDo = computed(()=>{
                return chiSoTheoSinhNhat.value ? chiSoTheoSinhNhat.value["chiSoThaiDo"] : null
            })
            const chiSoThaiDoContent = computed(() => {
                return ChiSoThaiDo[soThaiDo.value]?.replace(/\n/g, '<br>')
            })
            const chiSoTinhCach = computed(()=>{
                return chiSoTheoTen.value ? chiSoTheoTen.value["chiSoTinhCach"] : null
            })
            const chiSoTinhCachContent = computed(() => {
                return ChiSoTinhCach[chiSoTinhCach.value]?.replace(/\n/g, '<br>')
            })
            const chiSoTamHon = computed(()=>{
                return chiSoTheoTen.value ? chiSoTheoTen.value["chiSoTamHon"] : null
            })
            const chiSoTamHonContent = computed(() => {
                return ChiSoLinhHon[chiSoTamHon.value]?.replace(/\n/g, '<br>')
            })
            const chiSoCanBang = computed(()=>{
                return chiSoTheoTen.value ? chiSoTheoTen.value["chiSoCanBang"] : null
            })
            const chiSoSuMenh = computed(()=>{
                return chiSoTheoTen.value ? chiSoTheoTen.value["chiSoSuMenh"] : null
            })
            const chiSoSuMenhContent = computed(()=>{
                return ChiSoSuMenh[chiSoSuMenh.value]?.replace(/\n/g, '<br>')
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
                const allChiSo = calculateNoNghiep(birthInput.value, nameInput.value)
                let chiSoNoNghiepArray = []
                Object.keys(allChiSo).forEach(chiSo => {
                    chiSoNoNghiepArray.push(chiSo)
                })
                return chiSoNoNghiepArray.join(', ')
            })

            return {
                nameInput,
                birthInput,
                dateSelected,
                resultTitle,
                chiSoChuDao,
                chiSoNgaySinh,
                soThaiDo,
                soChuDaoContent,
                chiSoThaiDoContent,
                soNgaySinhContent,
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
                chiSoNoNghiep
            }
        },
    })

    export default Test
</script>
