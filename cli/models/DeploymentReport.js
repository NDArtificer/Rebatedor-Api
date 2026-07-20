export default class DeploymentReport {

    constructor() {
        this.startedAt = Date.now();
        this.finishedAt = null;
        this.success = [];
        this.failed = [];
        this.skipped = [];
    }

    addSuccess(action) {
        this.success.push(action);
    }

    addFailure(action, error) {
        this.failed.push({
            action,
            error
        });

    }

    addSkipped(action) {
        this.skipped.push(action);
    }

    finish() {
        this.finishedAt = Date.now();
    }

    get duration() {
        return this.finishedAt - this.startedAt;
    }

    get hasErrors() {
        return this.failed.length > 0;
    }

}