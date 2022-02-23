import * as os from 'os';
import * as si from 'systeminformation'
import _process from "process";

const freq = Number(_process.argv[2])
if (isNaN(freq) || freq < 0) {
    console.log('incorrect frequency value')
    _process.exit(1)
}

const ticks = [
    () =>  `operating system: ${os.platform}`,
    () => `architecture: ${os.arch}`,
    () => `current user name: ${os.userInfo().username}`,
    () => `cpu cores models: ${os.cpus().map(e => e.model)}`,
    async () => `cpu temperature: ${JSON.stringify(await si.cpuTemperature())}`,
    async () => {
        return `graphic controllers vendors and models: ${(await si.graphics()).controllers.map(e => e.vendor)}; ${(await si.graphics()).controllers.map(e => e.model)}`
    },
    async () => {
        return `total memory, used memory, free memory in GBs: ${os.totalmem()}; ${(await si.mem()).used}; ${os.freemem()}`
    },
    async () => {
        return (await si.battery()).hasBattery ?
            `battery info (charging, percent, remaining time): ${(await si.battery()).isCharging}; ${(await si.battery()).percent}; ${(await si.battery()).timeRemaining}`
            :
            'battery info (charging, percent, remaining time): N/A'
    }
]

let i = 0;
const loop = setInterval(async () => {
    console.log(await ticks[i++]());
    if (i+1 > ticks.length) {
        clearInterval(loop)
    }
}, freq * 1000)