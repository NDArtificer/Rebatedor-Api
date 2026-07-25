import ProcessStatusMapper from "../mappers/ProcessStatusMapper.js";

export default class ProcessStatusService {

    constructor(pm2) {

        this.pm2 = pm2;
        this.mapper = new ProcessStatusMapper();

    }

    async list() {

        const apps = await this.pm2.list();

        return this.mapper.mapAll(apps);

    }

    async render(renderer, title = "STATUS") {

        renderer.render(

            title,

            await this.list()

        );

    }

}