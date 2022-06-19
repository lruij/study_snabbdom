import {
  init,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
  h,
  toVNode,
} from "snabbdom";
const patch = init([
  // Init patch function with chosen modules
  classModule, // makes it easy to toggle classes
  propsModule, // for setting properties on DOM elements
  styleModule, // handles styling on elements with support for animations
  eventListenersModule, // attaches event listeners
]);

const vNodes1 = h('button', { class: { 'update-btn': true } }, '点我更改DOM')
patch(toVNode(document.querySelector(".menus")), vNodes1);

const vNodes2 = h('div', {}, [
  h('p', {}, '水果系列'),
  h('ul', {}, [
    h('li', { key: 1 }, '苹果'),
    h('li', { key: 2 }, '香蕉'),
  ]),
])
patch(toVNode(document.querySelector(".container")), vNodes2);


const vNodes3 = h('div', {}, [
  h('p', {}, '水果系列'),
  h('ul', {}, [
    h('li', { key: 1 }, '苹果'),
    h('li', { key: 2 }, '香蕉'),
    h('li', { key: 3 }, '榴莲'),
  ]),
])

document.querySelector(".update-btn").onclick = function () {
  patch(vNodes2, vNodes3)
}



