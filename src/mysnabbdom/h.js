import vnode from './vnode.js'



/**
 * h('div', {}, '内容')
 * h('div', {}, [])
 * h('div', {}, h())
 * @export
 * @param {*} sel
 * @param {*} data
 * @param {*} c
 */
export default function (sel, data, c) {
  if (arguments.length !== 3) {
    throw new Error('sorry, the h function must be 3 arguments!')
  }

  if (typeof c === 'string') {
    return new vnode(sel, data, undefined, c, undefined)

  } else if (Array.isArray(c)) {
    var children = []
    for (var i = 0; i < c.length; i++) {
      if (!(typeof c[i] === 'object' && c[i].hasOwnProperty('sel'))) {
        throw new Error('the third array argument some item not be h function!')
      }
      children.push(c[i])
    }
    return new vnode(sel, data, children, undefined, undefined)
  } else if (typeof c === 'object' && c.hasOwnProperty('sel')) {
    return new vnode(sel, data, [c], undefined, undefined)
  } else {
    throw new Error('the third argument type not supported!')
  }
}

