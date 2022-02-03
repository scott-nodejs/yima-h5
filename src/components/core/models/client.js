export default class Client {
    constructor (client = {}) {
        this.id = client.id || 0
        this.name = client.name || ''
        this.phone = client.phone || ''
        this.address = client.address || ''
        this.nickname = client.nickname || ''
        this.avatar = client.avatar || ''
        this.labelId = client.labelId || 0
        this.status = client.status
    }
}