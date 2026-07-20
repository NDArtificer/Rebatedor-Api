export default class ValidationResult {

    constructor() {
        this.errors = [];
        this.warnings = [];
    }

    addError(message) {
        this.errors.push(message);
    }

    addWarning(message) {
        this.warnings.push(message);
    }

    get valid() {
        return this.errors.length === 0;
    }

}