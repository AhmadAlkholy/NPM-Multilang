const fs = require('fs'),
    LangNotSet = require("./errors/LangNotSet");

class Multilang {
    constructor() {
        this.lang = '';
        this.files = [];
        this.data = {};
    }

    setLang(lang) {
        this.lang = lang;
        return this;
    }

    validate() {
        if (this.lang == '') {
            throw new LangNotSet("You must set language using setLang() method");
        }
    }

    get(keyPath) {
        this.validate();
        let pathArr = keyPath.split('.');
        const key = pathArr.pop();
        const filePath = this.lang + '/' + keyPath.replace('.' + key, '').replace('.', '/') + '.json';
        if ( this.files.indexOf(filePath) == -1 && fs.existsSync(filePath) ){
            const newData = JSON.parse( fs.readFileSync(filePath, 'utf8') );
            this.data = Object.assign(this.data, newData);
            this.files.push(filePath);
        }
        return this.data[key] || key;
    }
}

module.exports.multilang = new Multilang();