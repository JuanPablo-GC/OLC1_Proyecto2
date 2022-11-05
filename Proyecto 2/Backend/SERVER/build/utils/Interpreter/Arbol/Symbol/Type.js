"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataType = void 0;
class Type {
    constructor(tipo) {
        this.tipo = tipo;
    }
    getTipo() {
        return this.tipo;
    }
    setTipo(tipo) {
        this.tipo = tipo;
    }
    //para retornar el tipo en formato string
    getTipo2() {
        let tipo = "";
        switch (this.tipo) {
            case 0:
                // statement 1
                tipo = "Int";
                return tipo;
            case 1:
                // statement 2
                tipo = "String";
                return tipo;
            case 2:
                // statement 3
                tipo = "Boleano";
                return tipo;
            case 3:
                // statement 4
                tipo = "Char";
                return tipo;
            case 4:
                // statement 4
                tipo = "Decimal";
                return tipo;
        }
        return tipo;
    }
}
exports.default = Type;
var DataType;
(function (DataType) {
    DataType[DataType["ENTERO"] = 0] = "ENTERO";
    DataType[DataType["CADENA"] = 1] = "CADENA";
    DataType[DataType["BOOLEAN"] = 2] = "BOOLEAN";
    DataType[DataType["CARACTER"] = 3] = "CARACTER";
    DataType[DataType["DECIMAL"] = 4] = "DECIMAL";
    DataType[DataType["INDEFINIDO"] = 5] = "INDEFINIDO";
})(DataType = exports.DataType || (exports.DataType = {}));
