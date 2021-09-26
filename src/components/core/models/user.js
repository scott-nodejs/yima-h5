export default class User {
    constructor (user = {}) {
        this.id = user.id || 0
        this.userName = user.userName || ''
        this.phone = user.phone || ''
        this.nickName = user.nickName || ''
    }
}