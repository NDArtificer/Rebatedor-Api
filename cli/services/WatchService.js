import ProcessStatusService from "./ProcessStatusService.js";
import TableRender from "../ui/TableRender.js";

export default class WatchService {

    constructor(pm2) {

        this.pm2 = pm2;
        this.statusService = new ProcessStatusService(pm2);
        this.renderer = new TableRender();

    }

    async start(interval = 20000) {
        await this.pm2.connect();
        const refresh = async () => {
            process.stdout.write("\x1Bc");
            await this.statusService.render(
                this.renderer,
                "REBATEDOR WATCH"
            );

        };
        await refresh();
        this.timer = setInterval(refresh, interval);

    }

    stop() {
        clearInterval(this.timer);
        this.pm2.disconnect();
    }

}