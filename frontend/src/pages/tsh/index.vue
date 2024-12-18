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
    p.font-weight-bold Số chủ đạo (Đường đời): {{chiSoChuDao}}
    span(v-html="soChuDaoContent")
    p.font-weight-bold Sứ mệnh {{chiSoSuMenh}}
    span(v-html="chiSoSuMenhContent")
    p.font-weight-bold K/n đường đời sứ mệnh
    p.font-weight-bold Linh hồn {{chiSoTamHon}}
    span(v-html="chiSoTamHonContent")
    p.font-weight-bold Nhân cách {{chiSoTinhCach}}
    span(v-html="chiSoTinhCachContent")
    p.font-weight-bold Thái độ: {{soThaiDo}}
    span(v-html="chiSoThaiDoContent")
    p.font-weight-bold Đam mê
    p.font-weight-bold Tư duy trải nghiệm
    p.font-weight-bold Tư duy Cảm xúc
    p.font-weight-bold Tư duy trực giác
    p.font-weight-bold Ngày sinh: {{chiSoNgaySinh}}
    span(v-html="soNgaySinhContent")
    p.font-weight-bold Cân bằng: {{chiSoCanBang}}
    p.font-weight-bold Trưởng thành {{chiSoTruongThanh}}
    p.font-weight-bold Tháng cá nhân
    p.font-weight-bold Năm cá nhân
    p.font-weight-bold Đỉnh cao chặng
    p.font-weight-bold Thách thức

</template>

<script>
    import {computed, defineComponent, ref} from 'vue'
    import {dayjs} from "@/plugins"
    import {calculateNumerologyByDate, calculateNumerologyByName, reduceToSingleDigit} from "@/utils/calculateTsh.js";
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
                return reduceToSingleDigit(chiSoChuDao.value + chiSoSuMenh.value)
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
                chiSoTruongThanh
            }
        },
    })

    export default Test
</script>
