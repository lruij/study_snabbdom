import vnode from './vnode.js';
import createElement from './createElement.js';
import patchVnode from './patchVnode.js';
/**
 * 新老 vnode 比较
 * patch
 * @export
 * @param {*} oldVnode 老节点
 * @param {*} newVnode 新节点
 */
export default function patch(oldVnode, newVnode) {
  // console.log('执行 patch 方法 --> ')

  if (oldVnode.sel == '' || oldVnode.sel == undefined) {
    // console.log(':: 老 vode 为 dom 节点')
    // console.log(':: -- 转换为 vnode 节点')
    oldVnode = new vnode(oldVnode.tagName.toLowerCase(), {}, [], undefined, oldVnode)
  }

  if (oldVnode.key == newVnode.key && oldVnode.sel == newVnode.sel) {
    // console.log(':: 新老 vnode 的 sel 和 key 都相同')
    patchVnode(oldVnode, newVnode)

  } else {
    // console.log(':: 新老 vnode 的 sel 和 key 不相同')

    let newVnodeElm = createElement(newVnode)
    if (oldVnode.elm.parentNode && newVnodeElm)
      oldVnode.elm.parentNode.insertBefore(newVnodeElm, oldVnode.elm)
    oldVnode.elm.parentNode.removeChild(oldVnode.elm)
  }

}
