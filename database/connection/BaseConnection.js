export default class BaseConnection {

    constructor(connectFn) {
        this.connectFn = connectFn;
    }

    async connect(config) {
        return await this.connectFn(config);
    }

}
