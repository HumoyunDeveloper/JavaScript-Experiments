const storageSupport = {
    getData(_key) {
        if (localStorage.getItem(_key)) {
            return localStorage.getItem(_key);
        }
        return null;
    },
    setData(_key, _data) {
        localStorage.setItem(_key, _data);
    },
    savedKeys: ["code", "lang", "size", "autosave", "consoleprint", "tabsize"],
    setFontSize(_px) {
        this.setData("size", _px);
    },
    setAutoSave(_bool) {
        this.setData("autosave", "" + _bool);
    },
    setConsolePrint(_bool) {
        this.setData("consoleprint", _bool);
    },
    setTabSize(_px) {
        this.setData("tabsize", _px);
    },
    getFontSize() {
        return this.getData("size")
    },
    getAutoSave() {
        return this.getData("autosave")
    },
    getConsolePrint() {
        return this.getData("consoleprint")
    },
    getTabSize() {
        return this.getData("tabsize")
    },
};
