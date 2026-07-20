export default class Logger {

    constructor(verbose = true) {
        this.verbose = verbose;
    }

    line() {
        console.log("────────────────────────────────────────────────────");
    }

    blank() {
        console.log();
    }

    title(text) {
        this.blank();
        this.line();
        console.log(text);
        this.line();
    }

    info(text) {
        if (!this.verbose) return;
        console.log("ℹ", text);
    }

    success(text) {
        console.log("✔", text);
    }

    warning(text) {
        console.log("⚠", text);
    }

    error(text) {
        console.log("✖", text);
    }

    action(icon, text) {
        console.log(icon, text);
    }

    table(data) {
        console.table(data);
    }

}