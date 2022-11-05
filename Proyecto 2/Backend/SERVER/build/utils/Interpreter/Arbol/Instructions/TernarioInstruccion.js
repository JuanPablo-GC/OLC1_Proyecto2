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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../Abstract/Instruccion");
const Type_1 = __importStar(require("../Symbol/Type"));
const SymbolTable_1 = __importDefault(require("../Symbol/SymbolTable"));
const cloneDeep_1 = __importDefault(require("lodash/cloneDeep"));
class TernarioInstruccion extends Instruccion_1.Instruccion {
    constructor(operacion, valor1, valor2, linea, columna) {
        super(new Type_1.default(Type_1.DataType.INDEFINIDO), linea, columna);
        this.operacion = operacion;
        this.valor1 = valor1;
        this.valor2 = valor2;
    }
    interpretar(arbol, tabla) {
        const tablaLocal = new SymbolTable_1.default(tabla);
        const condition = (0, cloneDeep_1.default)(this.operacion.interpretar(arbol, tablaLocal));
        if ((condition)) {
            //ejecuta la instruccion interna 
            (0, cloneDeep_1.default)(this.valor1.interpretar(arbol, tablaLocal));
        }
        else {
            //ejecuta la instruccion interna 
            (0, cloneDeep_1.default)(this.valor2.interpretar(arbol, tablaLocal));
        }
    }
    ast(arbol) {
        const name_nodo = `node_${this.linea}_${this.columna}_`;
        arbol.add_ast(`
    ${name_nodo} [label="\\<Instruccion\\>\\n Operador ternario"];
    ${name_nodo}1[label="\\<Instruccion verdadera\\>"];
    ${name_nodo}2[label="\\<Instruccion falsa\\>"];
    ${name_nodo}->${name_nodo}1;
    ${name_nodo}->${name_nodo}2;
    ${name_nodo}->${this.operacion.ast(arbol)}
    ${name_nodo}1->node_${this.valor1.linea}_${this.valor1.columna}_;
    ${name_nodo}2->node_${this.valor2.linea}_${this.valor2.columna}_;
    `);
        this.valor1.ast(arbol);
        this.valor2.ast(arbol);
    }
}
exports.default = TernarioInstruccion;
