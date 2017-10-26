const getAncestor = (element, step) => {
  let target = element
  for (let i = 0; i < step; ++i) {
    target = target.parentElement
  }
  return target
}

const getSummary = async (url) => {
  const response = await fetch(url) // Fetch the license page's HTML
  const html = await response.text()

  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')
  const iconElement = doc.getElementsByClassName('octicon-law').item(0)
  return getAncestor(iconElement, 2)
}

const createLoaderElement = () => {
  const loaderElement = document.createElement('div')
  loaderElement.className = 'Box desktop-license-summary-loader'

  const loaderImgElement = document.createElement('img')
  loaderImgElement.className = 'octospinner'
  loaderImgElement.src = 'https://assets-cdn.github.com/images/spinners/octocat-spinner-128.gif'
  loaderImgElement.width = 64
  loaderImgElement.height = 64
  loaderElement.appendChild(loaderImgElement)

  return loaderElement
}

const loadDesktopView = async () => {
  // Find license summary element from the law icon
  const iconElement = document.getElementsByClassName('octicon-law').item(0)
  if (iconElement) {
    try {
      // Get file-navigation element and its ancestor
      const fileNavElement = document.getElementsByClassName('file-navigation').item(0)
      const ancestor = getAncestor(fileNavElement, 1)
      const licenseElement = getAncestor(iconElement, 1)

      // Check if license information is available
      if (!licenseElement || !licenseElement.getAttribute('href')) {
        return
      }

      // Get license information url
      const url = 'https://github.com' + licenseElement.getAttribute('href')

      // Create summary element
      const parentSummaryElement = document.createElement('div')
      parentSummaryElement.className = 'desktop-license-summary'
      ancestor.insertBefore(parentSummaryElement, fileNavElement)

      // Create loader element
      const loaderElement = createLoaderElement()
      parentSummaryElement.appendChild(loaderElement)

      // Get and insert license summary element
      const summaryElement = await getSummary(url)
      loaderElement.style.display = 'none'
      parentSummaryElement.appendChild(summaryElement)
    } catch (err) {
      console.error(err)
    }
  }
}

const loadMobileView = async () => {
}

// For desktop view, will replace 'true' with check is desktop later
if (true) { // eslint-disable-line no-constant-condition
  loadDesktopView()
} else {
  loadMobileView()
}
