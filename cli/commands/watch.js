import Pm2Service from "../services/Pm2Service.js";
import WatchService from "../services/WatchService.js";

const pm2 = new Pm2Service();

const watch = new WatchService(pm2);

await watch.start();