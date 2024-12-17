<template lang="pug">
div.pa-2
    v-text-field(
      v-model="nameInput"
      placeholder="Nhập tên"
    )
    v-date-picker(v-model="birthInput" )
    br
    v-btn(color="green") Tạo chỉ số
    p Kết quả {{resultTitle}}
    br
    p.font-weight-bold Số chủ đạo (Đường đời): {{soChuDao}}
    span(v-html="soChuDaoContent")
    p.font-weight-bold Sứ mệnh
    p.font-weight-bold K/n đường đời sứ mệnh
    p.font-weight-bold Linh hồn
    p.font-weight-bold Nhân cách
    p.font-weight-bold Thái độ: {{chiSoThaiDo}}
    p.font-weight-bold Đam mê
    p.font-weight-bold Tư duy trải nghiệm
    p.font-weight-bold Tư duy trực giác
    p.font-weight-bold Ngày sinh: {{chiSoNgaySinh}}
    p.font-weight-bold Trưởng thành
    p.font-weight-bold Tháng cá nhân
    p.font-weight-bold Năm cá nhân
    p.font-weight-bold Đỉnh cao chặng
    p.font-weight-bold Thách thức

</template>

<script>
    import {computed, defineComponent, ref} from 'vue'
    import {dayjs} from "@/plugins"
    import {sumToOneDigit} from "@/utils/calculateTsh.js";
    import ChiSoDuongDoi from "@/utils/tsh/index.js";

    const Test = defineComponent({
        name: 'Test',
        components: {},
        setup() {
            const nameInput = ref('')
            const birthInput = ref(new Date('June 12, 2012'))
            const fullBirthFormat = computed(
                () => {
                    return dayjs(birthInput.value).format('DD/MM/YYYY')
                }
            )
            const birthOnlyDay = computed(
                () => {
                    return dayjs(birthInput.value).format('DD')
                }
            )
            const birthDayMonth = computed(
                () => {
                    return dayjs(birthInput.value).format('DD/MM')
                }
            )
            const resultTitle = computed(
                () => {
                    return nameInput.value + fullBirthFormat.value
                }
            )
            const soChuDao = computed(()=>{
                return sumToOneDigit(fullBirthFormat.value, true)
            })
            const soChuDaoContent = computed(() => {
                return ChiSoDuongDoi[soChuDao.value]?.replace(/\n/g, '<br>')
            })
            const chiSoNgaySinh = computed(()=>{
                return sumToOneDigit(birthOnlyDay.value, true)
                // return birthOnlyDay.value
            })
            const chiSoThaiDo = computed(()=>{
                return sumToOneDigit(birthDayMonth.value)
            })
            return {
                nameInput,
                birthInput,
                resultTitle,
                soChuDao,
                chiSoNgaySinh,
                chiSoThaiDo,
                soChuDaoContent
            }
        },
    })

    export default Test
</script>
