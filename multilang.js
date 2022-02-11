const fs = require('fs'),
    LangsDirNotSet = require("./errors/LangsDirNotSet"),
    LangsDirNotFound = require("./errors/LangsDirNotFound"),
    LangNotSet = require("./errors/LangNotSet");

class Multilang {
    constructor() {
        this.langsDir = '';
        this.lang = '';
        this.files = [];
        this.data = {};
    }

    setLangsDir(langsDir) {
        if(!fs.existsSync(langsDir)) {
            throw new LangsDirNotFound("Root language directory is not found");
        }
        this.langsDir = langsDir;
        return this;
    }

    setLang(lang) {
        this.lang = lang;
        return this;
    }

    validate() {
        if (this.langsDir == '') {
            throw new LangsDirNotSet("You must set root language directory using setLangsDir() method");
        }
        if (this.lang == '') {
            throw new LangNotSet("You must set language using setLang() method");
        }
    }

    get(keyPath) {
        this.validate();
        let pathArr = keyPath.split('.');
        const key = pathArr.pop();
        const filePath = this.langsDir + '/' + this.lang + '/' + keyPath.replace('.' + key, '').replace('.', '/') + '.json';
        if ( this.files.indexOf(filePath) == -1 && fs.existsSync(filePath) ){
            const newData = JSON.parse( fs.readFileSync(filePath, 'utf8') );
            this.data = Object.assign(this.data, newData);
            this.files.push(filePath);
        }
        return this.data[key] || key;
    }
}

module.exports.multilang = new Multilang();