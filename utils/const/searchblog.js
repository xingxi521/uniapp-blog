import { createEnum } from '@/utils/tools.js'
// 搜索列表展示 枚举
export const SEARCH_STATUS = createEnum({
  SEARCH_LIST: [1, '搜索列表'],
  SEARCH_HISTORY: [2, '搜索历史'],
  SEARCH_RESULT: [3, '搜索结果']
})
