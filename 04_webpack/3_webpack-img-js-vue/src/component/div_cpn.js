import "../css/div_style.css"
import "../css/h2_style.less"
//导入图片/背景图片模块
import imgUrl from "../img/xinan.jpg"//不能是import "../img/xinan.jpg"
import "../css/bg.css"


export const multiple = (a, b) => {
  return a * b
  console.log('1234444444444444444444444')
}

// 创建div元素
const divEl = document.createElement('div');
divEl.textContent = '这是一个div元素';
divEl.classList.add('content')
document.body.append(divEl)

// h2元素
const h2El = document.createElement('h2')
h2El.textContent = '这是一个h2元素'
divEl.append(h2El)

// 图片
const imgEl = document.createElement('img')
imgEl.src = imgUrl
divEl.append(imgEl)


// 背景图片
const bgEl = document.createElement('div')
bgEl.classList.add('bg')
document.body.append(bgEl)