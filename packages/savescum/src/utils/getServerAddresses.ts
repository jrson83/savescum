import type { ServerAdresses } from '../types'
import { networkInterfaces } from 'node:os'

const getServerAddresses = () => {
  // get network interfaces
  const ipv4: Array<ServerAdresses> = []
  const networks = networkInterfaces()
  for (let x in networks) {
    networks[x]?.forEach((net) => {
      if (net.family === 'IPv4') {
        ipv4.push({
          address: net.address,
          internal: net.internal,
        })
      }
    })
  }

  return ipv4.sort((a, b) => {
    return a.address.localeCompare(b.address)
  })
}

export { getServerAddresses }
