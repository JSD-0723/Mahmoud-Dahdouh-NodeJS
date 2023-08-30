import http from "http"
import fs from "fs/promises"

const host = "localhost"
const port = 8000

const requestListener = function (req, res) {
  // Log request
  logRequest(req.url)

  res.statusCode = 200
  res.setHeader("Content-Type", "text/plain")
  res.end("Hello World!")
}
const server = http.createServer(requestListener)

// Log request
// save time and URL to 'requests.txt' file
const logRequest = async (url) => {
  if (url === "/favicon.ico") return
  try {
    await fs.appendFile("requests.txt", `${new Date().toISOString()} ${url}\n`)
    console.log("done", url)
  } catch (error) {
    console.error(
      `Got an error while trying to write to a file: ${error.message}`
    )
  }
}

server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`)
})
