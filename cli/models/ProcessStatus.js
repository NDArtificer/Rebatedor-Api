export default class ProcessStatus {

    constructor(
        name,
        version,
        status,
        pid,
        cpu,
        memory,
        uptime
    ) {

        this.Nome = name;
        this.Version = version;
        this.Status = status;
        this.PID = pid;
        this.CPU = cpu;
        this.Memória = memory;
        this.Uptime = uptime;

    }

}