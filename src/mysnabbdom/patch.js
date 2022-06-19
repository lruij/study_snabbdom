import vnode from './vnode.js';
import createElement from './createElement.js';

/**
 *
 *
 * @export
 * @param {*} oldVnode 老节点
 * @param {*} newVnode 新节点
 */
export default function (oldVnode, newVnode) {
  console.log('patch', oldVnode, newVnode)
  // dom 节点
  if (oldVnode.sel == '' || oldVnode.sel == undefined) {
    console.log('dom => vnode')
    oldVnode = new vnode(oldVnode.tagName.toLowerCase(), {}, [], undefined, oldVnode)
  }

  if (oldVnode.key == newVnode.key && oldVnode.sel == newVnode.sel) {
    console.log('同一个节点')
  } else {
    let newVnodeElm = createElement(newVnode)
    if (oldVnode.elm.parentNode && newVnodeElm)
      oldVnode.elm.parentNode.insertBefore(newVnodeElm, oldVnode.elm)
    oldVnode.elm.parentNode.removeChild(oldVnode.elm)
  }

}
