class MyEventEmitter {
    listeners: {}
    constructor() {
        this.listeners = {}
    }

    registerHandler(event: string, callback: (...args) => void): this {
        if (!this.listeners[event]) this.listeners[event] = []
        this.listeners[event].push(callback);
        return this
    }

    emitEvent(event: string, ...args): boolean {
        if (!this.listeners[event]) return false
        this.listeners[event].forEach(e => e(...args))
        return true
    }
}

const emitter = new MyEventEmitter();

emitter.registerHandler('usedUpdated', () => console.log(`User was updated`));

emitter.emitEvent('usedUpdated'); // User was updated
