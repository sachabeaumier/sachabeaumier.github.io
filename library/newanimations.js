const animation = document.querySelector('.animation')
animation.style.left = '0'

let pos = 0
setInterval(() => {
  pos = (pos + 1) % window.innerWidth
  animation.style.left = `-${pos}px`
}, 10)
