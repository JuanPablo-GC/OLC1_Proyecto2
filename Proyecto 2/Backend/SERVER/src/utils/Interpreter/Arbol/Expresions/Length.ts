import { Instruccion } from "../Abstract/Instruccion";
import Arbol from '../Symbol/Three';
import tablaSimbolo from '../Symbol/SymbolTable';
import Tipo, {DataType} from "../Symbol/Type";

const controller = require('../../../../controller/parser/parser');
const errores = require('../Exceptions/Error');

export default class Length extends Instruccion{
    private valor:Instruccion;
    

    constructor(valor: Instruccion, linea: number, columna: number){
        super(new Tipo(DataType.INDEFINIDO),linea,columna);
        this.valor=valor;
        this.columna=columna;
        this.linea;


    }
    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        
        let variableAux=this.valor.interpretar(arbol,tabla);
        if(this.valor.tipoDato.getTipo()==1){
            this.tipoDato.setTipo(DataType.ENTERO);
                    return (variableAux).length
        }else{
            controller.listaErrores.push(new errores.default('Error semantico','length no tiene un valor de tipo string o vector',this.linea,this.columna));
                    return null
        } 
                    
        
    
    }

    public ast(arbol: Arbol) {
        const name_nodo = `node_${this.linea}_${this.columna}_`
        return `
        ${name_nodo};
        ${name_nodo}[label="Length"];
        ${name_nodo}->${this.valor.ast(arbol)}`
    }
    
}