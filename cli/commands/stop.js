import EcosystemGenerator from "../services/EcosystemGenerator.js";
import FileService from "../services/FileService.js";
import Pm2Service from "../services/Pm2Service.js";
import ProcessStatusMapper from "../mappers/ProcessStatusMapper.js";
import TableRenderer from "../ui/TableRender.js";

const pm2 = new Pm2Service();
const mapper = new ProcessStatusMapper();
const renderer = new TableRenderer();

await pm2.connect();

const generator = new EcosystemGenerator();
const fileService = new FileService();
const apps = generator.generate();

for (const app of apps) {
    console.log(`Parando ${app.name}`);
    await pm2.stop(app.name);

}

renderer.render("Process Status", mapper.mapAll(await pm2.list()));
pm2.disconnect();
fileService.removeDirectory("./logs");
console.log("Todos os rebatedores foram parados com sucesso!");