browser.webNavigation.onHistoryStateUpdated.addListener(event => {
  browser.tabs.sendMessage(event.tabId, event)
}, {
  url: [
    { urlMatches: '^(?:https?://github.com/.*/.*)$' }
  ]
})
