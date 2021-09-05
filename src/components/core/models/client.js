export default class Client {
    constructor (client = {}) {
        this.id = client.id || 0
        this.company = client.company || ''
        this.phone = client.phone || ''
        this.address = client.address || ''
        this.nickname = client.nickname || ''
    }
}