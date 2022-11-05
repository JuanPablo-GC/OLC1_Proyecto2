import Simbolo from './Symbol';
import Arreglo from '../Instructions/Arreglo';

export default class SymbolTable {
  private tablaAnterior: SymbolTable | any;
  private tablaActual: Map<String, Simbolo>;

  //Para guardar los arreglos
  private tablaArreglos: Map<String, Arreglo>;

  constructor(anterior?: SymbolTable) {
    this.tablaAnterior = anterior;
    this.tablaActual = new Map<String, Simbolo>();

    this.tablaArreglos=new Map<String, Arreglo>();
  }
/*
  public getValor(id: String): any{
    let valor = this.tablaActual.get(id);
    return valor;
  }*/
  public getValor(id: String): any{
    let valor = this.tablaActual.get(id);
    if(!valor) {
      let actual: SymbolTable = this.getAnterior();
      while(actual && !valor){
        valor = actual.getValor(id);
        actual = actual.getAnterior();
      }
    }
    return valor;
  }

  public setValor(id: String, valor: Simbolo): any{
    this.tablaActual.set(id, valor);

    //console.log(id+"="+this.tablaActual.get(id)?.getvalor())
    return null;
  }

  public getAnterior() {
    return this.tablaAnterior;
  }
  public setAnterior(anterior: SymbolTable) {
    this.tablaAnterior = anterior;
  }
  public getTabla() {
    return this.tablaActual;
  }
  public setTabla(Tabla: Map<String, Simbolo>) {
    this.tablaActual = Tabla;
  }


  //para guardar los arreglos
  public guardar_arreglo(id: string, tmp: Arreglo): any {

    //if (this.revisarRepetido(id)) return false
    this.tablaArreglos.set(id, tmp)
    //console.log("ya lo guardooo")
    return null;
  }
  public getValorArreglo(id: String): any{
    //console.log("LO ESTA BUSCANDOOO: "+id)
    let valor2 = this.tablaArreglos.get(id);
    return valor2;
  }
  public getTablaArreglo() {
    return this.tablaArreglos;
  }


}