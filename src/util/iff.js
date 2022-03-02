const IFFSequence = 'TO_BE_INITIALIZED_ON_THE_FLY'

const destroyEverythingAndShowFakeErrorMessage = () => {
  delete document.getElementById('root')
  document.body.innerHTML = '<h4>网页遇到内部错误，请尝试刷新</h4>'
}

const checkIFF = () => {
  fetch('/api/iff')
    .then(res => res.json())
    .then(data => {
      const decoded = atob(data.data)
      if (decoded !== `${IFFSequence}${new Date() / Math.floor(new Date() / 10000)}`) {
        destroyEverythingAndShowFakeErrorMessage()
      }
    })
    .catch(() => destroyEverythingAndShowFakeErrorMessage())
}

const setupIFF = () => {
  setTimeout(() => {
    checkIFF()
    setTimeout(() => {
      setupIFF()
    }, 5000)
  }, 5000)
}

export default setupIFF
