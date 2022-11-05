import { Instruccion } from '../Abstract/Instruccion';
import Errores from '../Exceptions/Error';
import tablaSimbolo from './SymbolTable';

export default class Three {
  private instrucciones: Array<Instruccion>;
  private errores: Array<Errores>;
  private consola: String;
  private tablaGlobal: tablaSimbolo;

  //variable para guardar el arbol 
  private ast: string = ""
  
  constructor(instrucciones: Array<Instruccion>) {
    this.instrucciones = instrucciones;
    this.consola = '';
    this.tablaGlobal = new tablaSimbolo();
    this.errores = new Array<Errores>();
  }
  
  //retorn la consola actiualizada 
  public getconsola(): String {
    return this.consola;
  }
  public setconsola(value: String) {
    this.consola = value;
  }
  public actualizaConsola(uptodate: String) {
    this.consola = `${this.consola}${uptodate}\n`;
  }
  public getinstrucciones(): Array<Instruccion> {
    return this.instrucciones;
  }
  public setinstrucciones(value: Array<Instruccion>) {
    this.instrucciones = value;
  }
  public getErrores(): Array<Errores> {
    return this.errores;
  }

  public seterrores(value: Array<Errores>) {
    this.errores = value;
  }
  public gettablaGlobal(): tablaSimbolo {
    return this.tablaGlobal;
  }
  public settablaGlobal(value: tablaSimbolo) {
    this.tablaGlobal = value;
  }

//añade los nodos al arbol y retorna 
  public add_ast(data: string) {
    this.ast += data
  }
  public get_ast(): string {
      return this.ast
  }
}