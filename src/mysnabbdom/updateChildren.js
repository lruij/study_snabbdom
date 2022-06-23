import patchVnode from './patchVnode.js'
import createElement from './createElement.js'
/**
 * 是否同一节点
 *
 * @param {*} a
 * @param {*} b
 * @return {*}
 */
function isSameNode(a, b) {
  return a.sel == b.sel && a.key == b.key
}

/**
 * diff 核心算法
 *
 * @export
 * @param {*} parentElm
 * @param {*} oldCh
 * @param {*} newCh
 */
export default function updateChildren(parentElm, oldCh, newCh) {
  // console.log(oldCh, newCh);

  // 标号
  let oldStartIdx = 0
  let newStartIdx = 0

  let oldEndIdx = oldCh.length - 1
  let newEndIdx = newCh.length - 1

  // 标记
  let oldStartVnode = oldCh[0]
  let newStartVnode = newCh[0]

  let oldEndVnode = oldCh[oldEndIdx]
  let newEndVnode = newCh[newEndIdx]

  // oldCh key Map
  let oldKeyMap = null

  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {

    if (oldStartVnode == null) {
      oldStartVnode = oldCh[++oldStartIdx];
    } else if (oldEndVnode == null) {
      oldEndVnode = oldCh[--oldEndIdx];
    } else if (newStartVnode == null) {
      newStartVnode = newCh[++newStartIdx];
    } else if (newEndVnode == null) {
      newEndVnode = newCh[--newEndIdx];
    } else if (isSameNode(oldStartVnode, newStartVnode)) {
      console.log('【1】新前 vs 旧前')
      patchVnode(oldStartVnode, newStartVnode);

      oldStartVnode = oldCh[++oldStartIdx];
      newStartVnode = newCh[++newStartIdx];

    } else if (isSameNode(oldEndVnode, newEndVnode)) {
      console.log('【2】新后 vs 旧后');

      patchVnode(oldEndVnode, newEndVnode);

      oldEndVnode = oldCh[--oldEndIdx];
      newEndVnode = newCh[--newEndIdx];
    } else if (isSameNode(oldStartVnode, newEndVnode)) {
      console.log('【3】新后 vs 旧前');

      patchVnode(oldStartVnode, newEndVnode);
      parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling);

      oldStartVnode = oldCh[++oldStartIdx];
      newEndVnode = newCh[--newEndIdx];
    } else if (isSameNode(oldEndVnode, newStartVnode)) {
      console.log('【4】新前 vs 旧后');

      patchVnode(oldEndVnode, newStartVnode);
      parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm);
      oldEndVnode = oldCh[--oldEndIdx];
      newStartVnode = newCh[++newStartIdx];
    } else {
      console.log('【5】循环遍历匹配', newStartVnode);
      if (!oldKeyMap) {
        oldKeyMap = {}
        for (let i = oldStartIdx; i <= oldEndIdx; i++) {
          const key = oldCh[i].key;
          if (key !== undefined) {
            oldKeyMap[key] = i
          }
        }
      }
      let idxInOld = oldKeyMap[newStartVnode.key];

      if (idxInOld == undefined) {
        console.log('【5+】新节点')
        parentElm.insertBefore(createElement(newStartVnode), oldStartVnode.elm)

      } else {
        console.log('【5<>】更新节点')
        let elmToMove = oldCh[idxInOld]
        if (elmToMove.sel !== newStartVnode.sel) {
          parentElm.insertBefore(createElement(newStartVnode), oldStartVnode.elm)
        } else {
          patchVnode(elmToMove, newStartVnode)

          oldCh[idxInOld] = undefined
          parentElm.insertBefore(elmToMove.elm, oldStartVnode.elm)
        }
      }
      newStartVnode = newCh[++newStartIdx]
    }
  }

  if (newStartIdx <= newEndIdx) {

    for (let i = newStartIdx; i <= newEndIdx; i++) {
      console.log('【+】新增节点', i)
      parentElm.insertBefore(createElement(newCh[i]), oldCh[oldStartIdx].elm)
    }
  }

  if (oldStartIdx <= oldEndIdx) {
    for (let i = oldStartIdx; i <= oldEndIdx; i++) {
      console.log('【-】删除节点', i)
      parentElm.removeChild(oldCh[i].elm);
    }
  }
}
