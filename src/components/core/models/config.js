export default class Config {
    constructor (config = {}) {
        this.id = config.id || 0
        this.currentPage = config.currentPage || 1
        this.coverImage = config.coverImage || ''
        this.client = config.client || { clientId: 0}
        this.clientId = config.clientId || 0
        this.configList = config.configList || []
        this.pageListConfig = config.pageListConfig || []
        this.pageConfig = config.pageConfig || {}
        this.bottomMenu = config.bottomMenu || {}
    }
}