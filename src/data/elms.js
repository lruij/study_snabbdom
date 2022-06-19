export default function (h, i) {
  var d = [
    h('div', {}, '文字'),
    h('ul', {}, [
      h('li', {}, '苹果'),
      h('li', {}, '香蕉'),
    ]),
    h('div', {}, h('p', {}, '内嵌文字'))
  ]
  return i === undefined ? d : d[i]
}
