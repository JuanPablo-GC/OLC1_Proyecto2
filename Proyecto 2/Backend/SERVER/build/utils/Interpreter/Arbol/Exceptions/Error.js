"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Error {
    constructor(tipo, desc, fila, columna) {
        this.tipoError = tipo;
        this.desc = desc;
        this.fila = fila;
        this.columna = columna;
    }
    getDesc() {
        return this.desc;
    }
    getTipoError() {
        return this.tipoError;
    }
    getcolumna() {
        return this.columna;
    }
    getFila() {
        return this.fila;
    }
    returnError() {
        return (this.tipoError +
            ' ' +
            this.desc +
            '  Fila: ' +
            this.fila +
            '  Columna: ' +
            this.columna);
    }
    returTabla() {
        return ('<tr>' +
            '<td>' + this.tipoError + '</td>\n' +
            '<td>' + this.desc + '</td>\n' +
            '<td>' + this.fila + '</td>\n' +
            '<td>' + this.columna + '</td>\n' +
            '</tr>');
    }
}
exports.default = Error;
