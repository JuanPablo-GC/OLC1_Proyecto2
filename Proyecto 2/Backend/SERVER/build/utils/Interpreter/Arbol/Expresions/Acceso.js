"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../Abstract/Instruccion");
const Type_1 = __importStar(require("../Symbol/Type"));
const controller = require('../../../../controller/parser/parser');
const errores = require('../Exceptions/Error');
class Acceso extends Instruccion_1.Instruccion {
    constructor(id, fila, columna) {
        super(new Type_1.default(Type_1.DataType.INDEFINIDO), fila, columna);
        this.id = id;
    }
    interpretar(arbol, tabla) {
        const value = tabla.getValor(this.id);
        if (!value) {
            controller.listaErrores.push(new errores.default('Error semantico', 'La variable no existe en el sistema', this.linea, this.columna));
            return null;
        }
        //console.log("ESPACIOOOOOOOOOOO A VER EL VALOR DE LA VARIABLE")
        let tipoDato = value.tipo.getTipo();
        let a = value.getvalor();
        //console.log("VALOR DE LA VARIABLE: "+a);
        if (value && tipoDato == 0) {
            this.tipoDato.setTipo(Type_1.DataType.ENTERO);
            return a;
        }
        if (value && tipoDato == 1) {
            this.tipoDato.setTipo(Type_1.DataType.CADENA);
            return a;
        }
        if (value && tipoDato == 2) {
            this.tipoDato.setTipo(Type_1.DataType.BOOLEAN);
            return a;
        }
        if (value && tipoDato == 3) {
            this.tipoDato.setTipo(Type_1.DataType.CARACTER);
            return a;
        }
        if (value && tipoDato == 4) {
            this.tipoDato.setTipo(Type_1.DataType.DECIMAL);
            return a;
        }
        return null;
    }
    //para crear el arbol ast 
    ast(arbol) {
        const name_nodo = `node_${this.linea}_${this.columna}_`;
        return `
    ${name_nodo};
    ${name_nodo}[label="${this.id}"];
    `;
    }
}
exports.default = Acceso;
