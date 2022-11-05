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
class HacerHastaQue extends Instruccion_1.Instruccion {
    constructor(operacion, listaInstrucciones, linea, columna) {
        super(new Type_1.default(Type_1.DataType.INDEFINIDO), linea, columna);
        this.operacion = operacion;
        this.listaInstrucciones = listaInstrucciones;
    }
    interpretar(arbol, tabla) {
        let condition; //= this.operacion.interpretar(arbol, tabla)
        //console.log(condition)
        const tablaLocal = new SymbolTable_1.default(tabla);
        do {
            //for(let i of this.listaInstrucciones){
            //    //i.interpretar(arbol, tablaLocal)
            //     i.interpretar(arbol, tabla)
            //}
            (0, cloneDeep_1.default)(this.listaInstrucciones.interpretar(arbol, tablaLocal));
            condition = (0, cloneDeep_1.default)(!(this.operacion.interpretar(arbol, tablaLocal)));
            //console.log(condition)
            //break;
        } while (condition);
        return null;
    }
    ast(arbol) {
        const name_node = `node_${this.linea}_${this.columna}_`;
        arbol.add_ast(`
        ${name_node}[label="Instruccion\\nDoInit"];
        ${name_node}->node_${this.listaInstrucciones.linea}_${this.listaInstrucciones.columna}_;  
        ${name_node}1[label="Condicion"];
        ${name_node}->${name_node}1;
        ${name_node}1->${this.operacion.ast(arbol)}
              
        `);
        this.listaInstrucciones.ast(arbol);
    }
}
exports.default = HacerHastaQue;
