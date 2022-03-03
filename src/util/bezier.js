const delta = 0.00025

const square = x => x * x

const cube = x => x * x * x

export const computeBezier2 = ({ x1, y1 }, { x2, y2 }) => {
  const track = []
  for (let t = 0.0; t <= 1.0; t += delta) {
    const coeff1 = 2 * t * (1 - t)
    const coeff2 = square(t)

    const x = coeff1 * x1 + coeff2 * x2
    const y = coeff1 * y1 + coeff2 * y2
    track.push({ x, y })
  }
  return track
}

export const computeBezier3 = ({ x1, y1 }, { x2, y2 }, { x3, y3 }) => {
  const track = []
  for (let t = 0.0; t <= 1.0; t += delta) {
    const coeff1 = 3 * t * square(1 - t)
    const coeff2 = 3 * square(t) * (1 - t)
    const coeff3 = cube(t)

    const x = coeff1 * x1 + coeff2 * x2 + coeff3 * x3
    const y = coeff1 * y1 + coeff2 * y2 + coeff3 * y3

    track.push({ x, y })
  }
  return track
}

export const computeBezier3Fast = async ([x1, y1], [x2, y2], [x3, y3]) => {

}

export const processTrack = track => {
  for (let i = 0; i < track.length - 1; i++) {
    if (track[i + 1].x < track[i].x) {
      return null
    }
  }

  const xMax = track[track.length - 1].x
  let xDelimiter = 0.1
  let dataInThisWindow = []
  const result = []
  for (let i = 0; i < track.length && xDelimiter <= xMax;) {
    if (track[i].x > xDelimiter) {
      if (dataInThisWindow.length === 0) {
        dataInThisWindow.push(track[i].y)
      }

      const y = dataInThisWindow.reduce((acc, cur) => acc + cur, 0) / dataInThisWindow.length
      result.push(y)
      dataInThisWindow = []
      xDelimiter += 0.1
    } else {
      dataInThisWindow.push(track[i].y)
      i++
    }
  }

  return result
}
