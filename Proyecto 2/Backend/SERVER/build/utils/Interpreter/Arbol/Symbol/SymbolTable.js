"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SymbolTable {
    constructor(anterior) {
        this.tablaAnterior = anterior;
        this.tablaActual = new Map();
        this.tablaArreglos = new Map();
    }
    /*
      public getValor(id: String): any{
        let valor = this.tablaActual.get(id);
        return valor;
      }*/
    getValor(id) {
        let valor = this.tablaActual.get(id);
        if (!valor) {
            let actual = this.getAnterior();
            while (actual && !valor) {
                valor = actual.getValor(id);
                actual = actual.getAnterior();
            }
        }
        return valor;
    }
    setValor(id, valor) {
        this.tablaActual.set(id, valor);
        //console.log(id+"="+this.tablaActual.get(id)?.getvalor())
        return null;
    }
    getAnterior() {
        return this.tablaAnterior;
    }
    setAnterior(anterior) {
        this.tablaAnterior = anterior;
    }
    getTabla() {
        return this.tablaActual;
    }
    setTabla(Tabla) {
        this.tablaActual = Tabla;
    }
    //para guardar los arreglos
    guardar_arreglo(id, tmp) {
        //if (this.revisarRepetido(id)) return false
        this.tablaArreglos.set(id, tmp);
        //console.log("ya lo guardooo")
        return null;
    }
    getValorArreglo(id) {
        //console.log("LO ESTA BUSCANDOOO: "+id)
        let valor2 = this.tablaArreglos.get(id);
        return valor2;
    }
    getTablaArreglo() {
        return this.tablaArreglos;
    }
}
exports.default = SymbolTable;
