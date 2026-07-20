import fs from "fs";
import path from "path";

export default class FileService {

    removeDirectory(directory) {

        const dir = path.resolve(directory);

        if (!fs.existsSync(dir))
            return;

        fs.rmSync(dir, {
            recursive: true,
            force: true
        });

    }

    recreateDirectory(directory) {

        const dir = path.resolve(directory);

        this.removeDirectory(dir);

        fs.mkdirSync(dir, {
            recursive: true
        });

    }

}