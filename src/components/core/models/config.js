export default class Config {
    constructor (config = {}) {
        this.id = config.id || 0
        this.client = config.client || { clientId: 0}
        this.clientId = config.clientId || 0
        this.configList = config.configList || []
    }
}