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

const loadDesktopView = async () => {
  // Find license summary element from the law icon
  const iconElement = document.getElementsByClassName('octicon-law').item(0)
  if (iconElement) {
    try {
      const licenseElement = getAncestor(iconElement, 1)
      const url = 'https://github.com' + licenseElement.getAttribute('href')
      const summaryElement = await getSummary(url)
      summaryElement.classList.add('desktop-license-summary')

      const fileNavElement = document.getElementsByClassName('file-navigation').item(0)
      getAncestor(fileNavElement, 1).insertBefore(summaryElement, fileNavElement)
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
