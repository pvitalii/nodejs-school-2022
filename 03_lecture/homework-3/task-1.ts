import * as os from 'os';
import * as si from 'systeminformation'
import _process from "process";

const freq = Number(_process.argv[2])
if (isNaN(freq) || freq < 0) {
    console.log('incorrect frequency value')
    _process.exit(1)
}

const ticks = [
    os.platform,
    os.arch,
    () => os.userInfo().username,
    () => os.cpus().map(e => e.model),
    si.cpuTemperature,
    async () => {
        return `${(await si.graphics()).controllers.map(e => e.vendor)}; ${(await si.graphics()).controllers.map(e => e.model)}`
    },
    async () => {
        return `${os.totalmem()}; ${(await si.mem()).used}; ${os.freemem()}`
    },
    async () => {
        return (await si.battery()).hasBattery ?
            `${(await si.battery()).isCharging}; ${(await si.battery()).percent}; ${(await si.battery()).timeRemaining}`
            :
            'N/A'
    }
]

let i = 0;
async function loop() {
    console.log(await ticks[i]())
    if (++i < ticks.length) {
        setTimeout(loop, freq * 1000);
    }
}
setTimeout(loop, freq * 1000)

