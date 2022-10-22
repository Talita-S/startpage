/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "google"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/",
  duckduckgo: "https://duckduckgo.com/?q=",
  ecosia: "https://www.ecosia.org/search?q=",
  google: "https://www.google.com/search?q=",
  startpage: "https://www.startpage.com/search?q=",
  youtube: "https://www.youtube.com/results?q=",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  return engineUrls[engine] + value
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"KktXdIOmCfbbtxVo","label":"github","bookmarks":[{"id":"86tQm3GJAkt3aauM","label":"Talita-S","url":"https://github.com/Talita-S"},{"id":"aUYhLwA974JPuQQm","label":"VinoLemos","url":"https://github.com/VinoLemos"},{"id":"9WOrhqSqTJgnl1U6","label":"saneja","url":"https://github.com/VinoLemos/Projeto-Saneja"}]},{"id":"GrWkkAQ9HJx8FJRc","label":"design tools","bookmarks":[{"id":"r5Bol0POK4cOERdA","label":"pixlrx","url":"https://pixlr.com/x/"},{"id":"lO4xzbm0g4FxY14B","label":"image enlarger","url":"https://bigjpg.com/en"},{"id":"SVXaJ8DQI8b3hPKH","label":"haikei","url":"https://app.haikei.app/"},{"id":"fy5bfqpL5yn1qnGs","label":"css gradients","url":"https://larsenwork.com/easing-gradients/"}]},{"id":"TlrPBAllQ8uqv65K","label":"learning","bookmarks":[{"id":"FGplRUNe798YqyZu","label":"fatec","url":"https://www.notion.so/FATEC-528cd456983249fd863ba09c185e8fd2"},{"id":"hPzsop6tbT3ULVGS","label":"ibm","url":"https://www.notion.so/IBM-e260a03b732b48adb6af4e630858ff74"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
