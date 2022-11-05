import { Instruccion } from '../Abstract/Instruccion';
import Arbol from '../Symbol/Three';
import tablaSimbolo from '../Symbol/SymbolTable';
import Tipo, {DataType} from '../Symbol/Type';
import SymbolTable from '../Symbol/SymbolTable';

import cloneDeep from 'lodash/cloneDeep';

export default class Ternario extends Instruccion {
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
            
            let a=cloneDeep(this.valor1.interpretar(arbol,tablaLocal))
            if(this.valor2.tipoDato.getTipo()==0){
                this.tipoDato.setTipo(DataType.ENTERO);
                return a 
            }
            else if(this.valor2.tipoDato.getTipo()==1){
                this.tipoDato.setTipo(DataType.CADENA);
                return a 
            }
            else if(this.valor2.tipoDato.getTipo()==2){
                this.tipoDato.setTipo(DataType.BOOLEAN);
                return a 
            }
            
        }else{
            //console.log(this.valor2.interpretar(arbol,tablaLocal))
            let a=cloneDeep(this.valor2.interpretar(arbol,tablaLocal))
            if(this.valor2.tipoDato.getTipo()==0){
                this.tipoDato.setTipo(DataType.ENTERO);
                return a 
            }
            else if(this.valor2.tipoDato.getTipo()==1){
                this.tipoDato.setTipo(DataType.CADENA);
                return a 
            }
            else if(this.valor2.tipoDato.getTipo()==2){
                this.tipoDato.setTipo(DataType.BOOLEAN);
                return a 
            }
            
            //cloneDeep(this.valor2.interpretar(arbol,tablaLocal))
               
        }
    }
    
  public ast(arbol: Arbol) {
   
    const name_nodo = `node_${this.linea}_${this.columna}_`
// ${name_nodo}1->node_${this.valor1.ast(arbol)}
 //   ${name_nodo}2->node_${this.valor2.ast(arbol)}
    return(`
    ${name_nodo};
    ${name_nodo} [label="Instruccion\\n Operador ternario"];
    ${name_nodo}1[label="Instruccion True"];
    ${name_nodo}2[label="Instruccion false"];
    ${name_nodo}->${name_nodo}1;
    ${name_nodo}->${name_nodo}2;
    ${name_nodo}->${this.operacion.ast(arbol)}
    ${name_nodo}1->${this.valor1.ast(arbol)}
    ${name_nodo}2->${this.valor2.ast(arbol)}
    `)
    
    }
}