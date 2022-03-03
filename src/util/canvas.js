export const paintDot = (canvas, x, y) => {
  canvas.beginPath()
  canvas.arc(x, y, 5, 0, Math.PI * 2)
  canvas.fill()
}
