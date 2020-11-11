import { ref, reactive } from 'vue'

interface BubbleItem {
  id: number;
  style: {
    left: string;
    top: string;
    transition: string | null;
    animationDuration: string;
  };
}

export const homeDOM = ref<HTMLDivElement>()
export const bubbleList = reactive<Array<BubbleItem>>([])

export const homeDOMEvent: () => void = () => {
  let addLi = true
  let index = 0

  const move: (e: MouseEvent) => void = (e) => {
    if (addLi) {
      addLi = false
      const time = Math.random() * 3500 + 1500
      const item = {
        id: index++,
        style: {
          left: `${e.pageX}px`,
          top: `${e.pageY}px`,
          transition: null,
          animationDuration: `${time}ms`
        }
      }
      bubbleList.push(item)
      setTimeout(() => {
        const idx = bubbleList.indexOf(item)
        bubbleList.splice(idx, 1)
      }, time)
      setTimeout(() => {
        addLi = true
      }, Math.random() * 200 + 800)
    }
  }

  if (homeDOM.value) {
    homeDOM.value.addEventListener('mousemove', move, false)
  }
}
