import dayjs from 'dayjs'
import 'dayjs/locale/vi'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import isBetween from 'dayjs/plugin/isBetween'
dayjs.extend(localizedFormat)
dayjs.extend(isBetween)
dayjs.locale('vi')
export default dayjs
