import { Instruccion } from '../Abstract/Instruccion';
import Arbol from '../Symbol/Three';
import tablaSimbolo from '../Symbol/SymbolTable';
import Tipo, {DataType} from '../Symbol/Type';
import SymbolTable from '../Symbol/SymbolTable';

import cloneDeep from 'lodash/cloneDeep';

export default class If extends Instruccion {
    private operacionIf: Instruccion;
    private listaInstrucciones: Instruccion;    
    private listaElseIf: Instruccion  | undefined;
    //private listaInsElse: Instruccion  | undefined;

    constructor(
        operacionIf: Instruccion, 
        listaInstrucciones: Instruccion, 
        //listaInstrucciones: Instruccion[],
        listaElseIf: Instruccion | undefined, 
        //listaInsElse: Instruccion | undefined,
        linea: number, 
        columna: number
    ){
        super(new Tipo(DataType.INDEFINIDO), linea, columna);
        this.operacionIf = operacionIf
        this.listaInstrucciones = listaInstrucciones
        this.listaElseIf = listaElseIf
        //this.listaInsElse = listaInsElse
    }

    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        
        const tablaLocal = new SymbolTable(tabla)
        const condition = cloneDeep(this.operacionIf.interpretar(arbol, tabla))
        if((condition)){
            
            //ejecuta cada instruccion interna 
            cloneDeep(this.listaInstrucciones.interpretar(arbol,tabla))
            
            return true
        }else{

            if(this.listaElseIf){ this.listaElseIf.interpretar(arbol,tabla)  }
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
    
  public ast(arbol: Arbol) {
   
    const name_node = `node_${this.linea}_${this.columna}_`
        arbol.add_ast(`
        ${name_node}[label="Instruccion\\nIf"];
        ${name_node}1[label="True"];
        ${name_node}2[label="Else"];
        ${name_node}->${name_node}1;
        ${name_node}->${name_node}2;
        ${name_node}1->node_${this.listaInstrucciones.linea}_${this.listaInstrucciones.columna}_;`)
        this.listaInstrucciones.ast(arbol)
        if (this.listaElseIf != null) {
            arbol.add_ast(`${name_node}2->node_${this.listaElseIf.linea}_${this.listaElseIf.columna}_`)
            this.listaElseIf.ast(arbol)
        }
}
}