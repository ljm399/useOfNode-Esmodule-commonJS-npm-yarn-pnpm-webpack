let flag = true
console.log(import.meta)
if (flag) {
  const importlyric = import('./lyric.js')
  const foo = import('./foo.js')
  //拿到默认导出的返回值
  importlyric.then((res) => {
    console.log(res.default())
  })
  //拿到具名导出的返回值
  foo.then((res) => {
    console.log(res.name)
  })
}