
import data from './data/elms.js'
import h from './mysnabbdom/h.js'
import patch from './mysnabbdom/patch.js';


var typeCheck = data(h, 1)
var container = document.querySelector(".container")
patch(container, typeCheck)
