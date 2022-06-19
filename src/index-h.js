
import data from './data/elms-my.js'
import h from './mysnabbdom/h.js'
var typeCheck = data(h)

for (var i = 0; i < typeCheck.length; i++) {
  var mynode = typeCheck[i];
  console.log(mynode)
}
