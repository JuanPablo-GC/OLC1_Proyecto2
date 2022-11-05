import { Instruccion } from "../Abstract/Instruccion";
import Arbol from '../Symbol/Three';
import tablaSimbolo from '../Symbol/SymbolTable';
import Tipo, {DataType} from "../Symbol/Type";


//para ver los errores al no ser una expresion 
const controller = require('../../../../controller/parser/parser');
const errores = require('../Exceptions/Error');

export default class Retornar extends Instruccion{
    private Instruccion: Instruccion | null

    
    

    constructor(Instruccion:Instruccion,linea: number, columna: number){
        super(new Tipo(DataType.INDEFINIDO),linea,columna);
        this.Instruccion=Instruccion;
        this.columna=columna;
        this.linea;



    }
    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        //console.log(this.Instruccion)
            
        }
    

    public ast(arbol: Arbol) {
        const nombre_nodo=`node_${this.linea}_${this.columna}_`
        if(this.Instruccion){
            arbol.add_ast(`
        ${nombre_nodo};
        ${nombre_nodo} [label="Instruccion\\nReturn"];
        ${nombre_nodo}1[label="Return"];
        ${nombre_nodo}->${nombre_nodo}1;
        ${nombre_nodo}->${this.Instruccion.ast(arbol)}
        `)
        return
        }
        arbol.add_ast(`
        ${nombre_nodo};
        ${nombre_nodo} [label="Instruccion\\nReturn"];
        ${nombre_nodo}1[label="Return"];
        ${nombre_nodo}->${nombre_nodo}1;
        `)
        
    }
}