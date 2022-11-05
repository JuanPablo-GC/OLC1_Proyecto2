import { Instruccion } from '../Abstract/Instruccion';
import Arbol from '../Symbol/Three';
import tablaSimbolo from '../Symbol/SymbolTable';
import Tipo, {DataType} from '../Symbol/Type';
import SymbolTable from '../Symbol/SymbolTable';
import cloneDeep from 'lodash/cloneDeep';

export default class ForIns extends Instruccion {
    private operacion: Instruccion;
    private condicion: Instruccion;
    private operacion2: Instruccion;
    private listaInstrucciones: Instruccion;    

    constructor(
        operacion: Instruccion, 
        condicion: Instruccion, 
        operacion2: Instruccion, 
        listaInstrucciones: Instruccion, 
        linea: number, 
        columna: number
    ){
        super(new Tipo(DataType.INDEFINIDO), linea, columna);
        this.operacion = operacion
        this.condicion = condicion
        this.operacion2 = operacion2
        this.listaInstrucciones = listaInstrucciones
    }

    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        const tablaLocal = new SymbolTable(tabla)
        this.operacion.interpretar(arbol,tabla)
        let condicion = cloneDeep(this.condicion.interpretar(arbol, tablaLocal))
        console.log(condicion)
        while(condicion){
            
            cloneDeep(this.listaInstrucciones.interpretar(arbol,tablaLocal))
            condicion=cloneDeep(this.condicion.interpretar(arbol, tablaLocal))
            cloneDeep(this.operacion2.interpretar(arbol,tablaLocal))

            //break;
        }
        return null;
    }

    public ast(arbol: Arbol) {
        
        const name_node = `node_${this.linea}_${this.columna}_`
        arbol.add_ast(`
        ${name_node}[label="Instruccion\\nFor"];
        ${name_node}->node_${this.operacion.linea}_${this.operacion.columna}_;
        ${name_node}->${this.condicion.ast(arbol)}
        ${name_node}->node_${this.operacion2.linea}_${this.operacion2.columna}_;

        `)
        this.operacion.ast(arbol);
        this.operacion2.ast(arbol);
 

    }
}