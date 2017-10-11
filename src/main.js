/* global fetch DOMParser */

const createDesktopSummaryElement = (html) => {
  const el = document.createElement('div')
  el.classList.add('desktop-license-summary')
  el.innerHTML = html
  return el
}

const createDesktopNameElement = (licenseName) => {
  const el = document.createElement('span')
  el.classList.add('desktop-license-name')
  el.innerText = licenseName
  return el
}

const getInfo = async (url) => {
  const response = await fetch(url) // Fetch the license page's HTML
  const html = await response.text()

  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')

  return {
    licenseName: doc.getElementById('LC1').innerText,
    summaryHTML: doc.querySelector('.Box .column').parentElement.innerHTML
  }
}

// For desktop view
document
  .querySelectorAll('.js-navigation-item > .content > span > a') // select files
  .forEach(async (licenseElement) => {
    // check if is LICENSE file
    if (licenseElement.innerText !== 'LICENSE') {
      return
    }

    // get license summary
    const url = 'https://github.com/' + licenseElement.getAttribute('href')
    const info = await getInfo(url)

    // // Add to UI
    const parentElement = licenseElement.parentElement
    parentElement.appendChild(createDesktopNameElement(info.licenseName))
    parentElement.appendChild(createDesktopSummaryElement(info.summaryHTML))
  })
