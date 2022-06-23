
import h from './mysnabbdom/h.js'
import patch from './mysnabbdom/patch.js';


var oldVnode = h('ul', {}, [
  h('li', { key: 1 }, '苹果 - 1'),
  h('li', { key: 2 }, '香蕉 - 2'),
  h('li', { key: 3 }, '芒果 - 3'),
])

var container = document.querySelector(".container")
patch(container, oldVnode)

var menus = document.querySelector(".menus")
const btnVnode = h('button', {}, '点我更改DOM')
patch(menus, btnVnode);

var newVnode = h('ul', {}, [
  h('li', { key: 4 }, '4 - 4'),
])

var undateBtn = document.querySelector("button")
undateBtn.onclick = function () {
  patch(oldVnode, newVnode);
}
