const http = require('http')
const os = require('os')
const chalk = require('chalk')

function getIP() {
    const ifaces = os.networkInterfaces()

    const ips = {}

    Object.keys(ifaces).forEach(ifname => {
        const response = ifaces[ifname].filter(iface => iface.family === 'IPv4' && iface.internal === false)

        if (response.length)
            ips[ifname] = response
    })

    return ips
}

function createServer(app, port, serverType) {
    http
        .createServer(app)
        .listen(port, () => {
            console.log(chalk.blue(`${serverType} server is running on:`))
            console.log(chalk.blue(`http://localhost:${port}`))

            const ips = getIP()

            for (const [ifname, ifaces] of Object.entries(ips))
                ifaces.forEach(iface => console.log(chalk.blue(`http://${iface.address}:${port} | ${ifname}`)))
        })
}

module.exports = createServer
