import { Instruccion } from "../Abstract/Instruccion";
import Arbol from '../Symbol/Three';
import tablaSimbolo from '../Symbol/SymbolTable';
import Tipo, {DataType} from "../Symbol/Type";

export default class Transferencia extends Instruccion{
    private romper:boolean;
    private continuar: boolean

    
    

    constructor(romper:boolean,continuar: boolean,linea: number, columna: number){
        super(new Tipo(DataType.INDEFINIDO),linea,columna);
        this.romper=romper;
        this.continuar=continuar;
        this.columna=columna;
        this.linea;



    }
    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        //console.log(this.Instruccion)
            
        }
    

    public ast(arbol: Arbol) {
        const nombre_nodo=`node_${this.linea}_${this.columna}_`
        if(this.romper==true){
            arbol.add_ast(`
        ${nombre_nodo};
        ${nombre_nodo} [label="Instruccion\\nTransferencia"];
        ${nombre_nodo}1[label="Break"];
        ${nombre_nodo}->${nombre_nodo}1;
        `)
        return
        }
        arbol.add_ast(`
        ${nombre_nodo};
        ${nombre_nodo} [label="Instruccion\\Transferencia"];
        ${nombre_nodo}1[label="Continue"];
        ${nombre_nodo}->${nombre_nodo}1;
        `)
        
    }
}