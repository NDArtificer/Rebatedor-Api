export default class DiffEngine {

    compare(current, desired) {
        const fields = [
            "AMBIENTE",
            "CLIENTE",
            "IP",
            "PREFIXO",
            "PORTA",
            "PORTA_CLIENTE"
        ];

        const changes = [];

        for (const field of fields) {
            if (current[field] !== desired[field]) {
                changes.push({
                    field,
                    oldValue: current[field],
                    newValue: desired[field]
                });
            }
        }
        return changes;
    }

}