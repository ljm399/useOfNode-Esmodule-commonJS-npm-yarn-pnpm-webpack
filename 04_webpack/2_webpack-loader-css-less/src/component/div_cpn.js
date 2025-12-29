import "../css/div_style.css"
import "../css/h2_style.less"

// 创建div元素
const divEl = document.createElement('div');
divEl.textContent = '这是一个div元素';
divEl.classList.add('content')
document.body.append(divEl)

// h2元素
const h2El = document.createElement('h2')
h2El.textContent = '这是一个h2元素'
divEl.append(h2El)