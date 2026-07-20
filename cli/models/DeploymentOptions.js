export default class DeploymentOptions {

    constructor({
        dryRun = false,
        save = true,
        validate = true,
        continueOnError = true,
        verbose = true

    } = {}) {
        this.dryRun = dryRun;
        this.save = save;
        this.validate = validate;
        this.continueOnError = continueOnError;
        this.verbose = verbose;
    }

}