export default class TableRenderer {

    render(title, rows) {
        console.log();
        console.log("════════════════════════════════════════════════════════════════════════════════════════════════════════");
        console.log(`                                     REBATEDOR CLI - ${title}`);
        console.log("═══════════════════════════════════════════════════════════════════════════════════════════════════════");
        console.table(rows);

    }

}