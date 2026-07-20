import EnvConfig from "../../EnvConfig.js";
import Validator from "../services/Validator.js";

const envConfig = new EnvConfig();
const validator = new Validator();

const result = validator.validate(envConfig.config);

console.log("\n========= VALIDAÇÃO =========\n");

if (result.valid) {

    console.log("✅ Configuração válida.");

} else {

    console.log(`❌ Foram encontrados ${result.errors.length} erro(s):\n`);

    result.errors.forEach(error => {
        console.log(` - ${error}`);
    });

}

console.log();