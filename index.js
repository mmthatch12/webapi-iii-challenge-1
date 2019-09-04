// code away!
const server = require('./api/server')

const port = 6500;

server.listen(port, () => console.log(`\n** API on port ${port} **\n`))