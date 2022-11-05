import { Instruccion } from "../Abstract/Instruccion";
import Arbol from '../Symbol/Three';
import tablaSimbolo from '../Symbol/SymbolTable';
import Tipo, {DataType} from "../Symbol/Type";


export default class Run extends Instruccion{
    private Instrucciones: Instruccion

    
    

    constructor(Instrucciones:Instruccion,tipo: Tipo, linea: number, columna: number){
        super(new Tipo(DataType.INDEFINIDO),linea,columna);

        this.Instrucciones=Instrucciones;
        this.columna=columna;
        this.linea;



    }
    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
            
        }
    

    public ast(arbol: Arbol) {

        const nombre_nodo=`node_${this.linea}_${this.columna}_`
        arbol.add_ast(`
        ${nombre_nodo};
        ${nombre_nodo} [label="Instruccion\\nRun"];
        ${nombre_nodo}->node_${this.Instrucciones.linea}_${this.Instrucciones.columna}_;
        `)
        this.Instrucciones.ast(arbol);
    }
    
}