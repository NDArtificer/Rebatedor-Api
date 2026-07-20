export default class TableRenderer {

    render(title, rows) {
        console.log();
        console.log("========================================");
        console.log(title);
        console.log("========================================");
        console.table(rows);

    }

}