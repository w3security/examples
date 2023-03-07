// The bypass token can be a randomly generated string of at least 32 characters.
// This is meant to be *private* - DO NOT expose this value on the client-side.
const bypassToken = '87734ad8259d67c3c11747d3e4e112d0'

module.exports = (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  const isPreviewMode =
    typeof req.headers.cookie === 'string' &&
    req.headers.cookie.includes(`__prerender_bypass=${bypassToken}`)
  const contents = isPreviewMode
    ? 'Preview Mode is <strong>ENABLED</strong>. Notice how the "Server time" below gets updated every time you refresh!'
    : 'Preview Mode is <strong>DISABLED</strong>. The "server time" below will only get updated once per minute.'
  const enable = isPreviewMode
    ? '<a href="/logout">Deactivate Preview Mode</a>'
    : '<a href="/login">Enable Preview Mode</a>'
  res.end(`
<h1>Preview Mode Example</h1>
<p>${contents}</p>
<p>Server time: ${new Date().toISOString()}</p>
<p>${enable}</p>
`)
}
