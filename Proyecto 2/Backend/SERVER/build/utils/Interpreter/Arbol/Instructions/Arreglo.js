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
class Arreglo extends Instruccion_1.Instruccion {
    constructor(id, tipo, arrayInstruccion, contenido, linea, columna) {
        super(new Type_1.default(Type_1.DataType.INDEFINIDO), linea, columna);
        this.id = id;
        this.tipo = tipo;
        this.arrayInstruccion = arrayInstruccion;
        this.contenido = contenido;
        this.columna = columna;
        this.linea;
        this.tam = -1;
    }
    interpretar(arbol, tabla) {
        if (this.arrayInstruccion) {
            this.arrayInstruccion.forEach(element => {
                const expre = element.interpretar(arbol, tabla);
                //if (expre.type != get_num(this.tipo)) throw new error("Semantico", `Tipo no valido, el contenido de este array tiene que ser tipo [${this.tipo}] `, this.line, this.column)
                this.contenido.push(expre);
                this.tam = this.arrayInstruccion.length;
            });
        }
        //if (!env.guardar_arreglo(this.id, this)) throw new error("Semantico", `Este nombre {${this.id}} ya existe en este ambito`, this.line, this.column)
        tabla.guardar_arreglo(this.id, this);
    }
    ast(arbol) {
        const name_node = `node_${this.linea}_${this.columna}_`;
        arbol.add_ast(`
        ${name_node}[label="Instruccion\\nDeclaracion de Vector "];
        ${name_node}1[label="Nombre\\n${this.id}"];
        ${name_node}2[label="Tipo\\n${this.tipo.getTipo2()}"];
        ${name_node}3[label="Contenido"];
        ${name_node}->${name_node}1;
        ${name_node}->${name_node}2;
        ${name_node}->${name_node}3;
        `);
        //guarda los valores del la lista
        if (this.arrayInstruccion) {
            this.arrayInstruccion.forEach(element => {
                arbol.add_ast(`
            ${name_node}3->${element.ast(arbol)}
            `);
            });
        }
    }
}
exports.default = Arreglo;
