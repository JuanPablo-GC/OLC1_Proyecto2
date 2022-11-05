import { Instruccion } from '../Abstract/Instruccion';
import Arbol from '../Symbol/Three';
import tablaSimbolo from '../Symbol/SymbolTable';
import Tipo, {DataType} from '../Symbol/Type';
import SymbolTable from '../Symbol/SymbolTable';
import cloneDeep from 'lodash/cloneDeep';
export default class HacerMientras extends Instruccion {
    private operacion: Instruccion;
    //private listaInstrucciones: Instruccion [];    
    private listaInstrucciones: Instruccion; 

    constructor(
        operacion: Instruccion, 
        listaInstrucciones: Instruccion, 
        linea: number, 
        columna: number
    ){
        super(new Tipo(DataType.INDEFINIDO), linea, columna);
        this.operacion = operacion
        this.listaInstrucciones = listaInstrucciones
    }

    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let condition //= this.operacion.interpretar(arbol, tabla)
        //console.log(condition)
        const tablaLocal = new SymbolTable(tabla)
        do{
            //for(let i of this.listaInstrucciones){
            //    //i.interpretar(arbol, tablaLocal)
           //     i.interpretar(arbol, tabla)
            //}
            cloneDeep(this.listaInstrucciones.interpretar(arbol,tablaLocal))
            condition=cloneDeep(this.operacion.interpretar(arbol, tablaLocal))
            //console.log(condition)
            //break;
        }while(condition)

        return null;
    }

    public ast(arbol: Arbol) {
        
        const name_node = `node_${this.linea}_${this.columna}_`
        arbol.add_ast(`
        ${name_node}[label="Instruccion\\nDowhile"];
        ${name_node}->node_${this.listaInstrucciones.linea}_${this.listaInstrucciones.columna}_;  
        ${name_node}1[label="Condicion"];
        ${name_node}->${name_node}1;
        ${name_node}1->${this.operacion.ast(arbol)}
              
        `)
        this.listaInstrucciones.ast(arbol)
  

    }
}