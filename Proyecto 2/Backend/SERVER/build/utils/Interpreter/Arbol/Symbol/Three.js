"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SymbolTable_1 = __importDefault(require("./SymbolTable"));
class Three {
    constructor(instrucciones) {
        //variable para guardar el arbol 
        this.ast = "";
        this.instrucciones = instrucciones;
        this.consola = '';
        this.tablaGlobal = new SymbolTable_1.default();
        this.errores = new Array();
    }
    //retorn la consola actiualizada 
    getconsola() {
        return this.consola;
    }
    setconsola(value) {
        this.consola = value;
    }
    actualizaConsola(uptodate) {
        this.consola = `${this.consola}${uptodate}\n`;
    }
    getinstrucciones() {
        return this.instrucciones;
    }
    setinstrucciones(value) {
        this.instrucciones = value;
    }
    getErrores() {
        return this.errores;
    }
    seterrores(value) {
        this.errores = value;
    }
    gettablaGlobal() {
        return this.tablaGlobal;
    }
    settablaGlobal(value) {
        this.tablaGlobal = value;
    }
    //añade los nodos al arbol y retorna 
    add_ast(data) {
        this.ast += data;
    }
    get_ast() {
        return this.ast;
    }
}
exports.default = Three;
