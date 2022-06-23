/**
 * vnode
 *
 * @export
 * @param {*} sel
 * @param {*} data
 * @param {*} children
 * @param {*} text
 * @param {*} elm
 * @return {*}
 */
export default function (sel, data, children, text, elm) {
  const key = data.key
  return {
    sel, data, children, text, elm, key
  }
}
