const fs = require('fs'),
    LangNotSet = require("./errors/LangNotSet");

class Multilang {
    #lang = '';
    #langDir = '';
    #files = [];
    #data = {};
    #memoryCache = false;

    constructor() {
        this.reset();
    }

    reset() {
        this.#lang = '';
        if (!this.#memoryCache) {
            this.#files = [];
            this.#data = {};
        }
    }

    setMemoryCache(memoryCache) {
        this.#memoryCache = memoryCache;
        return this;
    }

    setLang(langDir) {
        this.reset();
        this.#langDir = langDir;
        this.#lang = langDir.split('/').pop();
        return this;
    }

    getLang() {
        return this.#lang;
    }

    get(keyPath) {
        this.#validate();

        const key = this.#getKey(keyPath);
        const keyFullPath = `${ this.#langDir.replaceAll("/", ".") }.${keyPath}`;
        const filePath = `${keyFullPath.replace('.' + key, '').replaceAll('.', '/')}.json`;

        if ( this.#files.indexOf(filePath) === -1 && fs.existsSync(filePath) ) this.#addFileData(filePath);

        return this.#data[keyFullPath] || key;
    }

    #validate() {
        if (this.#langDir == '') throw new LangNotSet("You must set language using setLang() method");
    }

    #getKey(keyPath) {
        let pathArr = keyPath.split('.');
        return pathArr.pop();
    }

    #addFileData(filePath) {
        const newData = JSON.parse( fs.readFileSync(filePath, 'utf8') );
        const fileKey = filePath.slice(0, -5).replaceAll('/', '.');
        for (let newKey in newData) this.#data[ `${fileKey}.${newKey}` ] = newData[newKey];
        this.#files.push(filePath);
    }
}

module.exports = new Multilang();