const { useMemo } = require('react')
const { connect } = require('react-redux')
const qr = require('qr-image')

const h = require('../utils/h')

const ServerInspector = connect(
  state => ({
    server: state.server
  })
)(({ server }) => {
  const buffer = useMemo(() =>
    server.uri
      ? qr.imageSync(server.uri, { ec_level: 'H', type: 'png', size: 4, margin: 3, parse_url: true })
      : null,
    [server.uri])

  return buffer
    ? h(
        ['div.server-inspector', [
          ['div.server-inspector__label', 'Use your phone to direct the scene:'],
          ['div.server-inspector__value', [
            ['img', { src: `data:image/png;base64,` + buffer.toString('base64') }]
          ]]
        ]]
      )
    : null
})

module.exports = ServerInspector