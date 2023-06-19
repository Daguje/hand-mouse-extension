export function scrollTo(x: number, y: number, lastPosition: {x: number, y: number}) {
  if (lastPosition.y > y) {
      window.scrollBy(0, -(lastPosition.y - y)/10)
  }
  else if (lastPosition.y < y) {
      window.scrollBy(0, (y - lastPosition.y)/10)
  }
  if(lastPosition.x > x) {
      window.scrollBy(-(lastPosition.x - x)/10, 0)
  }
  else if(lastPosition.x < x) {
      window.scrollBy((x-lastPosition.x)/10, 0)
  }
}

export function scrollUp() {
  window.scrollBy(0, -10)
}

export function scrollDown() {
  window.scrollBy(0, 10)
}