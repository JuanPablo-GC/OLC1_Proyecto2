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
class If extends Instruccion_1.Instruccion {
    //private listaInsElse: Instruccion  | undefined;
    constructor(operacionIf, listaInstrucciones, 
    //listaInstrucciones: Instruccion[],
    listaElseIf, 
    //listaInsElse: Instruccion | undefined,
    linea, columna) {
        super(new Type_1.default(Type_1.DataType.INDEFINIDO), linea, columna);
        this.operacionIf = operacionIf;
        this.listaInstrucciones = listaInstrucciones;
        this.listaElseIf = listaElseIf;
        //this.listaInsElse = listaInsElse
    }
    interpretar(arbol, tabla) {
        const tablaLocal = new SymbolTable_1.default(tabla);
        const condition = (0, cloneDeep_1.default)(this.operacionIf.interpretar(arbol, tabla));
        if ((condition)) {
            //ejecuta cada instruccion interna 
            (0, cloneDeep_1.default)(this.listaInstrucciones.interpretar(arbol, tabla));
            return true;
        }
        else {
            if (this.listaElseIf) {
                this.listaElseIf.interpretar(arbol, tabla);
            }
            /*if(this.listaElseIf){
                for(let i of this.listaElseIf){
                    const operation = i.interpretar(arbol, tabla);
                    if(operation){
                        return false;
                    }
                }
            }
            if(this.listaInsElse){
                const tablaLocal = new SymbolTable(tabla)
                //for(let i of this.listaInsElse){
                //    i.interpretar(arbol, tablaLocal)
                //}
                this.listaInsElse.interpretar(arbol,tabla)
                return false
            }*/
        }
    }
    ast(arbol) {
        const name_node = `node_${this.linea}_${this.columna}_`;
        arbol.add_ast(`
        ${name_node}[label="Instruccion\\nIf"];
        ${name_node}1[label="True"];
        ${name_node}2[label="Else"];
        ${name_node}->${name_node}1;
        ${name_node}->${name_node}2;
        ${name_node}1->node_${this.listaInstrucciones.linea}_${this.listaInstrucciones.columna}_;`);
        this.listaInstrucciones.ast(arbol);
        if (this.listaElseIf != null) {
            arbol.add_ast(`${name_node}2->node_${this.listaElseIf.linea}_${this.listaElseIf.columna}_`);
            this.listaElseIf.ast(arbol);
        }
    }
}
exports.default = If;
