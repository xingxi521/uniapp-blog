export function createEnum(definition) {
  const strToValueMap = {}
  const numToDescMap = {}
  for (const enumName of Object.keys(definition)) {
    const [value, desc] = definition[enumName]
    strToValueMap[enumName] = value
    numToDescMap[value] = desc
  }
  return {
    ...strToValueMap,
    getDesc(enumName) {
      return (definition[enumName] && definition[enumName][1]) || ''
    },
    getDescFromValue(value) {
      return numToDescMap[value] || ''
    },
    // 返回一个枚举映射表
    getMapping() {
      return numToDescMap
    },
    // 返回一个数组对象 key-value形式的
    getLabelData(label, value, isNum = true) {
      const tempArr = Object.entries(numToDescMap)
      const result = []
      tempArr.forEach(item => {
        result.push({
          [label || 'label']: item[1],
          [value || 'value']: isNum ? Number(item[0]) : item[0]
        })
      })
      return result || []
    }
  }
}