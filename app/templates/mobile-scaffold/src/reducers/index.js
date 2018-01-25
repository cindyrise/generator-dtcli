import { event } from './event'
import { home } from './home'
import { search } from './search'
import {user} from './user'
const rootReducer = {
  event,
  home, //首页相关
  search, //搜索相关
  global,
  user
}
export default rootReducer
