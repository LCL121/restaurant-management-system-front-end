import { ref } from 'vue'

export const homeDOM = ref<HTMLDivElement>()
export const circleULDOM = ref<HTMLUListElement>()

export const homeDOMEvent: () => void = () => {
  if (homeDOM.value) {
    const keyframes: Keyframe[] = [
      {
        transform: 'scale3d(0, 0, 0)  translate3d(0, 0, 0)',
        opacity: 1
      },
      {
        transform: 'scale3d(5, 5, 5) translate3d(0, -50vh, 0)',
        opacity: 0
      }
    ]

    let addLi = true

    const move: (e: MouseEvent) => void = (e) => {
      const options: KeyframeAnimationOptions = {
        duration: Math.random() * 1500 + 3500,
        easing: 'linear',
        iterations: Infinity
      }
      if (addLi && circleULDOM.value && typeof options.duration === 'number') {
        addLi = false
        const li = document.createElement('li')
        li.style.listStyle = 'none'
        li.style.background = '#fff'
        li.style.height = '.3rem'
        li.style.width = '.3rem'
        li.style.position = 'absolute'
        li.style.top = `${e.pageY}px`
        li.style.left = `${e.pageX}px`
        li.style.borderRadius = '50%'
        li.animate(keyframes, options)
        circleULDOM.value.append(li)
        setTimeout(() => {
          li.remove()
        }, options.duration)
        setTimeout(() => {
          addLi = true
        }, Math.random() * 200 + 800)
      }
    }

    homeDOM.value.addEventListener('mousemove', move, false)
  }
}
