import Pm2Service from "../services/Pm2Service.js";
import ProcessStatusMapper from "../mappers/ProcessStatusMapper.js";
import TableRenderer from "../ui/TableRender.js";

const pm2 = new Pm2Service();
const mapper = new ProcessStatusMapper();
const renderer = new TableRenderer();

try {
    await pm2.connect();
    const apps = await pm2.list();
    renderer.render("Process Status", mapper.mapAll(apps));
} finally {
    pm2.disconnect();
}