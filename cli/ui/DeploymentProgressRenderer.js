export default class DeploymentProgressRenderer {

    render(progress) {
        console.log("════════════════════════════════════════════════════════════════════════════════════════════════════════");
        console.log("                                     REBATEDOR CLI");
        console.log("════════════════════════════════════════════════════════════════════════════════════════════════════════");
        console.table(
            progress.rows.map(r => ({
                Aplicação: r.name,
                Version: r.version,
                Status: r.status,
                Ação: r.action,
                PID: r.pid,
                CPU: r.cpu,
                Memória: r.memory

            }))

        );

        const completed = progress.rows.filter(

            r => r.action === "Concluído"

        ).length;

        console.log(

            `${completed}/${progress.rows.length} aplicações concluídas`

        );

    }

}