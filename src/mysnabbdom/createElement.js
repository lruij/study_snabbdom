/**
 * 添加节点
 *
 * @export
 * @param {*} vnode 虚拟节点
 */
export default function createElement(vnode) {
  // console.log(':: -- vnode 转 dom')
  // 创建一个 Dom 节点
  let domNode = document.createElement(vnode.sel);

  if (vnode.text != '' && (vnode.children == undefined || vnode.children.length == 0)) {
    // 内部只有文字
    domNode.innerText = vnode.text;

  } else if (Array.isArray(vnode.children) && vnode.children.length > 0) {
    // 内部有多个节点
    for (let i = 0; i < vnode.children.length; i++) {
      let ch = vnode.children[i];
      let chDom = createElement(ch)
      domNode.appendChild(chDom)
    }
  } else { }
  vnode.elm = domNode

  return vnode.elm
}
