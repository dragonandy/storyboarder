
let instance = null
let _keyCommands = []
let _ipcKeyCommands = []
const _removedIpcCommands = []
class KeyCommandsSingleton {

    constructor() {
        if(!instance) {
            instance = this
            _keyCommands = []
            _ipcKeyCommands = []
        }
        return instance
    }

    static getInstance(){
        return instance ? instance : new KeyCommandsSingleton()
    }


    get keyCommands() {
        return _keyCommands
    }

    get ipcKeyCommands() {
        return _ipcKeyCommands
    }

    get removedIpcCommands() {
        return _removedIpcCommands
    }

    addKeyCommand({key, keyCustomCheck, value}) {
        _keyCommands.push({key, keyCustomCheck, execute: value})
    }
    
    addIPCKeyCommand({key, keyCustomCheck, value}) {
        _ipcKeyCommands.push({key, keyCustomCheck, execute: value})
    }

    removeKeyCommand({key}) {
        let object = _keyCommands.find(object => object.key === key)
        let indexOf = _keyCommands.indexOf(object)
        _keyCommands.splice(indexOf, 1)
    }
    
    removeIPCKeyCommand({key}) {
        let object = _ipcKeyCommands.find(object => object.key === key)
        if(!object) return
        let indexOf = _ipcKeyCommands.indexOf(object)
        _removedIpcCommands.push(object)
        _ipcKeyCommands.splice(indexOf, 1)
    }
}
export default KeyCommandsSingleton