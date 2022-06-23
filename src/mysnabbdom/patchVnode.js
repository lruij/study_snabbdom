
import updateChildren from './updateChildren.js'
/**
 * 当为同一个节点时进行比较
 * patchVnode
 * @export
 * @param {*} oldVnode
 * @param {*} newVnode
 */
export default function (oldVnode, newVnode) {
  if (oldVnode == newVnode) {
    // console.log(':: 新老 vnode 为同一个对象，则不比较')
    return
  }
  if (newVnode.text != undefined && (newVnode.children == undefined || newVnode.children.length == 0)) {
    // console.log(':: 新 vnode 为文本节点')
    // console.log(':: -- 文本不一致则替换文本')
    if (newVnode.text != oldVnode.text) {
      oldVnode.elm.innerText = newVnode.text;
    }
  } else {

    // console.log(':: 新 vnode 为多个节点')
    if (oldVnode.children != undefined && oldVnode.children.length > 0) {
      // console.log(':: 老 vnode 也为多个节点')
      // console.log(':: -- 需进行精细化对比...')

      updateChildren(oldVnode.elm, oldVnode.children, newVnode.children)
    } else {
      // console.log(':: 老 vnode 为文本节点')
      // console.log(':: -- 清空老 vnode 内容，新 vnode 直接添加到老 vnode 上')

      oldVnode.elm.innerHTML = ''
      for (var i = 0; i < newVnode.children; i++) {
        let dom = createElement(newVnode.children[i])
        oldVnode.elm.appendChild(dom)
      }
    }
  }
}
