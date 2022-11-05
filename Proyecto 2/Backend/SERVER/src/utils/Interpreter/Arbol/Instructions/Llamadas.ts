import { Instruccion } from "../Abstract/Instruccion";
import Arbol from '../Symbol/Three';
import tablaSimbolo from '../Symbol/SymbolTable';
import Tipo, {DataType} from "../Symbol/Type";

const controller = require('../../../../controller/parser/parser');
const errores = require('../Exceptions/Error');

export default class Llamadas extends Instruccion{
    private id: string;
    //parametros como instrucciones 
    public parametros: Array<Instruccion>
 
    
    
//constructor
    constructor(id: string,  parametros: Array<Instruccion>, linea: number, columna: number){
        super(new Tipo(DataType.INDEFINIDO),linea,columna);
        this.id =id;
        this.parametros=parametros;
        this.columna=columna;
        this.linea;



    }
    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        //console.log(this.parametros)
            
        }
    
    //cracion de ast 
    public ast(arbol: Arbol) {

        //nomnre del nodo
        const nombre_nodo=`node_${this.linea}_${this.columna}_`
        arbol.add_ast(`
        ${nombre_nodo} [label="Instruccion\\nLlamada"];
        ${nombre_nodo}1 [label="${this.id}"];
        ${nombre_nodo}2 [label="Parametros"];
        ${nombre_nodo}->${nombre_nodo}2;
        ${nombre_nodo}->${nombre_nodo}1;
        `)
        this.parametros.forEach(element => {
            arbol.add_ast(`
            ${nombre_nodo}2->${element.ast(arbol)}
            `)
        })
    }
    
}