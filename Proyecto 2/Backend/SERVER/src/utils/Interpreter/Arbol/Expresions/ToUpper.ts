import { Instruccion } from "../Abstract/Instruccion";
import Arbol from '../Symbol/Three';
import tablaSimbolo from '../Symbol/SymbolTable';
import Tipo, {DataType} from "../Symbol/Type";

const controller = require('../../../../controller/parser/parser');
const errores = require('../Exceptions/Error');

export default class ToUpper extends Instruccion{
    private valor:Instruccion;
    

    constructor(valor: Instruccion, linea: number, columna: number){
        super(new Tipo(DataType.INDEFINIDO),linea,columna);
        this.valor=valor;
        this.columna=columna;
        this.linea;


    }
    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        //console.log("LLEGA AL CASTEOOOOOOOOOOOO")
        let variableAux=this.valor.interpretar(arbol,tabla);
        if(this.valor.tipoDato.getTipo()!=1){ controller.listaErrores.push(new errores.default('Error semantico','toUpper no tiene un valor de tipo string',this.linea,this.columna));
                    return null}
        
        this.tipoDato.setTipo(DataType.CADENA);
        return (variableAux).toUpperCase( );
    
    }

    public ast(arbol: Arbol) {
        const name_nodo = `node_${this.linea}_${this.columna}_`
        return `
        ${name_nodo};
        ${name_nodo}[label="ToUpper"];
        ${name_nodo}->${this.valor.ast(arbol)}`
    }
    
}