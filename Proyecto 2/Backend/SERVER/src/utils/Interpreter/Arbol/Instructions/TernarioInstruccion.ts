import { Instruccion } from '../Abstract/Instruccion';
import Arbol from '../Symbol/Three';
import tablaSimbolo from '../Symbol/SymbolTable';
import Tipo, {DataType} from '../Symbol/Type';
import SymbolTable from '../Symbol/SymbolTable';

import cloneDeep from 'lodash/cloneDeep';

export default class TernarioInstruccion extends Instruccion {
    private operacion: Instruccion;
    private valor1: Instruccion;    
    private valor2: Instruccion 


    constructor(
        operacion: Instruccion, 
        valor1: Instruccion, 
        valor2: Instruccion, 
        linea: number, 
        columna: number
    ){
        super(new Tipo(DataType.INDEFINIDO), linea, columna);
        this.operacion = operacion
        this.valor1 = valor1
        this.valor2 = valor2
    }

    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        const tablaLocal = new SymbolTable(tabla)
        const condition = cloneDeep(this.operacion.interpretar(arbol, tablaLocal))
        if((condition)){
            
            //ejecuta la instruccion interna 
            cloneDeep(this.valor1.interpretar(arbol,tablaLocal))
            
        }else{
            //ejecuta la instruccion interna 
            cloneDeep(this.valor2.interpretar(arbol,tablaLocal))

               
        }
    }
    
  public ast(arbol: Arbol) {
   
    const name_nodo = `node_${this.linea}_${this.columna}_`
    arbol.add_ast(`
    ${name_nodo} [label="\\<Instruccion\\>\\n Operador ternario"];
    ${name_nodo}1[label="\\<Instruccion verdadera\\>"];
    ${name_nodo}2[label="\\<Instruccion falsa\\>"];
    ${name_nodo}->${name_nodo}1;
    ${name_nodo}->${name_nodo}2;
    ${name_nodo}->${this.operacion.ast(arbol)}
    ${name_nodo}1->node_${this.valor1.linea}_${this.valor1.columna}_;
    ${name_nodo}2->node_${this.valor2.linea}_${this.valor2.columna}_;
    `)
    this.valor1.ast(arbol);
    this.valor2.ast(arbol);
    
    }
}