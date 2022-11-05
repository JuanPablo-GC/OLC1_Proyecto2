
  /* Definición de las reglas lexicas */
  %{
const controller = require('../../../controller/parser/parser')
    const errores = require('./Exceptions/Error')
  %}
%lex

%options case-insensitive

%%

[ \t\r\n\f]+    %{ /*se ignoran*/ %}							                // espacios en blanco
"//".*		{ /*estos caracteres se omiten*/  }								              // comentario simple
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]	{ /*estos caracteres se omiten*/  }		// comentario multiple líneas


// esto se ignora
[ \r\t]+     { /*estos caracteres se omiten*/  }
\n          { /*estos caracteres se omiten*/  }

//Palabras reservadas

//tipo de dato
'string' return 'string';
'int' return 'int';
'double' return 'double';
'char' return 'char';
'boolean' return 'boolean';




//funciones y metodos 
'void' return 'void';
'run' return 'run';



//funciones de unn vector 
'new' return 'new';
'push' return 'push';
'pop' return 'pop';

//funciones del lenguaje
'toLower' return 'toLower';
'toUpper' return 'toUpper';
'round' return 'round';

'length' return 'length';
'typeof' return 'typeof';
'toString' return 'toStringA';
'toCharArray' return 'toCharArray';


//ciclo if 
'if' return 'if';
'elif' return 'elif';
'else' return 'else';


'true' return 'true';
'false' return 'false';


//para switch
'switch' return 'switch';
'case' return 'case';
'default' return 'default';

//para el ciclo while
'while' return 'while';
'do' return 'do';
'until' return 'until';

//para el ciclo for 
'for' return 'for';
'in' return 'in';
'of' return 'of';

'Array' return 'Array';

//Signos
';' return 'punto_coma';
',' return 'coma';
':' return 'dos_puntos';
'{' return 'llave_izq';
'}' return 'llave_der';
'(' return 'par_izq';
')' return 'par_der';
'[' return 'cor_izq';
']' return 'cor_der';
'¿' return 'interrogacion';
'?' return 'interrogacion2';
'.' return 'punto';

//Operadores Aritmeticos
'++' return 'mas_mas'
'+' return 'mas';
'--' return 'menos_menos'
'-' return 'menos';
'^' return 'potencia';
'*' return 'por';
'/' return 'div';
'%' return 'mod';

//Operadores Relacionales
'<=' return 'menor_igual';
'>=' return 'mayor_igual';
'>' return 'mayor';
'<' return 'menor';
'==' return 'igual_que';
'=' return 'igual';
'!=' return 'dif_que';

//Operadores Lógicos
'&&' return 'and';
'||' return 'or';
'!' return 'not';

//transferecia 
'break' return 'break';
'continue' return 'continue';
'return' return 'return';

//IMPRIMIR
'print' return 'print';
'println' return 'println';

//caracteres
\'.{1}\'			{yytext=yytext.substr(1,yyleng-2); return 'caracter';}  
\".{1}\"			{yytext=yytext.substr(1,yyleng-2); return 'caracter';}  
//Patrones (Expresiones regulares)
\"[^\"]*\"			 {yytext=yytext.substr(1,yyleng-2); return 'cadena';} 
\'[^\']*\'			{ yytext = yytext.substr(1,yyleng-2); return 'cadena'; }
\`[^\`]*\`			{ yytext = yytext.substr(1,yyleng-2); return 'cadena'; }


([0-9]+)[\.]([0-9]+) 	return 'decimal';
[0-9]+  	return 'numero';

([a-zA-Z])[a-zA-Z0-9_]* return 'id';

//Fin del archivo
<<EOF>>				return 'EOF';
//Errores lexicos
.	
    {controller.listaErrores.push(new errores.default('Error Lexico', yytext,yylineno+1, yylloc.first_column + 1));}
   // return 'INVALID';
  //console.log('error lexico ',` linea: ${yylineno + 1}`, ` El valor "${yytext}" no es valido, columna: ${yylloc.first_column + 1}` );

  





/lex
%{
    //codigo js
    const nativo = require('./Expresions/Native');
    const Tipo = require('./Symbol/Type');
    const impresion = require('./Instructions/imprimir');
    const declaracion = require('./Instructions/Declaracion');
    //const controller = require('../../../controller/parser/parser')
    //const errores = require('./Exceptions/Error')

    const aritmetico=require('./Expresions/Aritmetica');
    const relacional = require('./Expresions/Relacional');
    const logica = require('./Expresions/Logica');
    const asignacion =require('./Instructions/Asignacion');

    
    const Acceso = require('./Expresions/Acceso');
    const Si = require('./Instructions/Si');
    const mientras = require('./Instructions/Mientras'); 
    const estados = require('./Instructions/Estados'); 
    const IncreDecre = require('./Instructions/IncrementoDecremento'); 
    const IncreDecre2 = require('./Expresions/IncreDecre');
    const ForIns = require('./Instructions/ForIns');

    const HacerMientras = require('./Instructions/HacerMientras');
    const Arreglo = require('./Instructions/Arreglo');
    const ExpresionesArreglo = require('./Expresions/ExpresionesArreglo');

    const ArregloAsignacion = require('./Instructions/ArregloAsignacion');
    const ArregloAccion = require('./Instructions/ArregloAccion');
    const HacerHastaQue = require('./Instructions/HacerHastaQue');
    const Ternario = require('./Instructions/Ternario');
    const TernarioInstruccion = require('./Instructions/TernarioInstruccion');
    const Casteo = require('./Instructions/Casteo');
    const TipoDatoIns = require('./Instructions/TipoDatoIns');

    const Funcion = require('./Instructions/Funcion');
    const Llamadas= require('./Instructions/Llamadas');
    const Retornar = require('./Instructions/Retornar');
    const Transferencia = require('./Instructions/Transferencia');
    const Metodo = require('./Instructions/Metodo');
    const Run = require('./Instructions/Run');

    const ToLower= require('./Expresions/ToLower');
    const ToUpper= require('./Expresions/ToUpper');
    const Length = require('./Expresions/Length');
    const Redondear = require('./Expresions/Redondear');
%}

/* Asociación de operadores y precedencia */
%left 'or'
%left 'and'
%left 'not'
%left 'igual_que' 'dif_que'
%left 'mayor' 'menor' 'mayor_igual' 'menor_igual'
%left 'mas' 'menos'
%left 'por' 'div' 
%right 'potencia' 'mod'
%left 'mas_mas' 'menos_menos'

%start INICIO

%%

//definicion de la gramatica

INICIO : INSTRUCCIONES EOF 
            {return $1;}
;

INSTRUCCIONES : INSTRUCCIONES INSTRUCCION {$1.push($2); $$=$1;}
                |INSTRUCCION {$$=[$1];}
;

INSTRUCCION : 
        VECTOR                      { $$ = $1;}
        |DECLARACION                { $$ = $1;}
        |ASIGNACION                 { $$ = $1;}
        |SENTENCIA_CASTEO           { $$ = $1;}
        |SENTENCIA_IF               { $$ = $1;}
        |SENTENCIA_SWITCH
        |SENTENCIA_WHILE            { $$ = $1;}
        |SENTENCIA_FOR              { $$ = $1;}
        |SENTENCIA_DO_WHILE         { $$ = $1;}
        |SENTENCIA_DO_UNTIL         { $$ = $1;}
        |SENTENCIA_RETURN               { $$ = $1;}
        |FUNCION                        { $$ = $1;}
        |METODO                         { $$ = $1;}
        |SENTENCIA_LLAMADA              { $$ = $1;}
        |SENTENCIA_IMPRIMIR         { $$ = $1;}
        |FUNCION_TYPEOF             { $$ = $1;}
        |FUNCION_TOSTRING           { $$ = $1;}
        |FUNCION_TOCHARARRAY
        |SENTENCIA_INCREMENTO       { $$ = $1;}
        |SENTENCIA_TRANSFERECIA         { $$ = $1;}
        |SENTENCIA_PUSH             { $$ = $1;}
        |SENTENCIA_POP              { $$ = $1;}
        |SENTENCIA_RUN                  { $$ = $1;}
        //|SENTENCIA_TERNARIA2        { $$ = $1;}
        | error  punto_coma {controller.listaErrores.push(new errores.default('Error Sintactico','Se esperaba un token distinto',@1.first_line, @1.first_column));}
        | error  {controller.listaErrores.push(new errores.default('Error Sintactico','Se esperaba un token distinto',@1.first_line, @1.first_column));}
        //| error EOF {controller.listaErrores.push(new errores.default('Error Sintactico','Se esperaba un token distinto',@1.first_line, @1.first_column));}
;

DECLARACION :
        TIPO_VARIABLE LISTA_ID punto_coma 
            {$$=new declaracion.default($2, $1, null, @3.first_line, @3.first_column );}
        |TIPO_VARIABLE LISTA_ID igual OPERACION punto_coma
            {$$=new declaracion.default($2, $1, $4, @3.first_line, @3.first_column );}
        |TIPO_VARIABLE LISTA_ID igual SENTENCIA_TERNARIA  punto_coma
            {$$=new declaracion.default($2, $1, $4, @3.first_line, @3.first_column );}
        
        
;

ASIGNACION :
        LISTA_ID igual OPERACION punto_coma
            {$$=new asignacion.default($1, $3, @2.first_line, @2.first_column );}
        |id cor_izq OPERACION cor_der igual OPERACION punto_coma
            {$$ = new ArregloAsignacion.default($1,null, $3, $6, @1.first_line,@1.first_column)}
        |LISTA_ID igual SENTENCIA_TERNARIA punto_coma
            {$$=new asignacion.default($1, $3, @2.first_line, @2.first_column );}
        
;
SENTENCIA_CASTEO :
    TIPO_VARIABLE LISTA_ID igual par_izq TIPO_VARIABLE par_der OPERACION punto_coma
            {$$=new Casteo.default($1, $2, $5,$7, @3.first_line, @3.first_column );}
;

TIPO_VARIABLE :
        string      {$$= new Tipo.default(Tipo.DataType.CADENA);}
        |int        { $$=new Tipo.default(Tipo.DataType.ENTERO); }
        |double     { $$=new Tipo.default(Tipo.DataType.DECIMAL); }
        |boolean   { $$=new Tipo.default(Tipo.DataType.BOOLEAN); }
        |char       {$$= new Tipo.default(Tipo.DataType.CARACTER); }
;

OPERACION :
        //OPERACIONES ARITMETICAS
         'menos'  OPERACION %prec UMENOS    {$$= new aritmetico.default(aritmetico.tipoOp.NEGACION,$2,$2,@1.first_line, @1.first_column);}
        |OPERACION mas OPERACION            {$$= new aritmetico.default(aritmetico.tipoOp.SUMA,$1,$3,@2.first_line, @2.first_column);}
        |OPERACION menos OPERACION          {$$= new aritmetico.default(aritmetico.tipoOp.RESTA,$1,$3,@2.first_line, @2.first_column);}
        |OPERACION por OPERACION            {$$= new aritmetico.default(aritmetico.tipoOp.MULTIPLICACION,$1,$3,@2.first_line, @2.first_column);}
        |OPERACION div OPERACION            {$$= new aritmetico.default(aritmetico.tipoOp.DIVISION,$1,$3,@2.first_line, @2.first_column);}
        |OPERACION mod OPERACION            {$$= new aritmetico.default(aritmetico.tipoOp.MODULO,$1,$3,@2.first_line, @2.first_column);}
        |OPERACION potencia OPERACION       {$$= new aritmetico.default(aritmetico.tipoOp.POTENCIA,$1,$3,@2.first_line, @2.first_column);}
        |par_izq OPERACION par_der          {  $$ = $2; } 

        //OPERACIONES DE INCREMENTO
        |id mas_mas         { $$ = new IncreDecre2.default(IncreDecre.tipoOp.INCREMENTO1,$2, @1.first_line, @2.first_column); }
        |id menos_menos     { $$ = new IncreDecre2.default(IncreDecre.tipoOp.DECREMENTO1,$2, @1.first_line, @2.first_column); }
        
        //valores primitivos
        |id                 {$$= new Acceso.default($1, @1.first_line, @1.first_column);}
        |numero             {$$= new nativo.default(new Tipo.default(Tipo.DataType.ENTERO),$1, @1.first_line, @1.first_column);}
        |decimal            {$$= new nativo.default(new Tipo.default(Tipo.DataType.DECIMAL),$1, @1.first_line, @1.first_column);}
        |cadena             {$$= new nativo.default(new Tipo.default(Tipo.DataType.CADENA),$1, @1.first_line, @1.first_column);}
        |caracter           {$$= new nativo.default(new Tipo.default(Tipo.DataType.CARACTER),$1, @1.first_line, @1.first_column);}
        |true               {$$= new nativo.default(new Tipo.default(Tipo.DataType.BOOLEAN),$1, @1.first_line, @1.first_column);}
        |false              {$$= new nativo.default(new Tipo.default(Tipo.DataType.BOOLEAN),$1, @1.first_line, @1.first_column);}
        |LLAMADA_ARITMETICA

        //OPERADORES RELACIONALES
        |OPERACION mayor OPERACION              {$$= new relacional.default(relacional.tipoOp.MAYOR,$1,$3,@2.first_line, @2.first_column);}
        |OPERACION menor OPERACION              {$$= new relacional.default(relacional.tipoOp.MENOR,$1,$3,@2.first_line, @2.first_column);}
        |OPERACION mayor_igual OPERACION        {$$= new relacional.default(relacional.tipoOp.MAYOR_IGUAL,$1,$3,@2.first_line, @2.first_column);}
        |OPERACION menor_igual OPERACION        {$$= new relacional.default(relacional.tipoOp.MENOR_IGUAL,$1,$3,@2.first_line, @2.first_column);}
        |OPERACION igual_que OPERACION          {$$= new relacional.default(relacional.tipoOp.IGUAL_QUE,$1,$3,@2.first_line, @2.first_column);}
        |OPERACION dif_que OPERACION            {$$= new relacional.default(relacional.tipoOp.DIFENTE_QUE,$1,$3,@2.first_line, @2.first_column);}

        //OPERADORES LOGICOS
        |OPERACION and OPERACION    {$$= new logica.default(logica.tipoOp.AND,$1,$3,@2.first_line, @2.first_column);}
        |OPERACION or OPERACION     {$$= new logica.default(logica.tipoOp.OR,$1,$3,@2.first_line, @2.first_column);}
        |not OPERACION              {$$= new logica.default(logica.tipoOp.NOT,$2,$2,@2.first_line, @2.first_column);}

        //ACCESO A VECTORES
        |id cor_izq OPERACION cor_der   { $$ = new ExpresionesArreglo.default($1,false,true,$3, @1.first_line, @1.first_column); }
        //|id cor_izq OPERACION_ARITMETICA cor_der cor_izq OPERACION_ARITMETICA cor_der
        |id punto length  par_izq par_der    { $$ = new ExpresionesArreglo.default($1,false,false,null, @1.first_line, @1.first_column); }
        |id punto pop   par_izq par_der      { $$ = new ExpresionesArreglo.default($1,true,false,null, @1.first_line, @1.first_column); }
        //tolower   toupper
        |toLower par_izq OPERACION par_der    { $$ = new ToLower.default($3, @2.first_line, @2.first_column); }
        |toUpper par_izq OPERACION par_der    { $$ = new ToUpper.default($3, @2.first_line, @2.first_column); }
        //lengt tamaño de cadenas 
        |length par_izq OPERACION par_der     { $$ = new Length.default($3, @2.first_line, @2.first_column); }
        |round  par_izq OPERACION par_der     { $$ = new Redondear.default($3, @2.first_line, @2.first_column); }
;

LISTA_ID : 
        LISTA_ID coma id
        |id
            { $$ = $1;}

;

SENTENCIA_INCREMENTO:
        id mas_mas punto_coma       { $$ = new IncreDecre.default(IncreDecre.tipoOp.INCREMENTO1,$1, @3.first_line, @3.first_column); }
        //| mas_mas id punto_coma
        |id menos_menos  punto_coma { $$ = new IncreDecre.default(IncreDecre.tipoOp.DECREMENTO1,$1, @3.first_line, @3.first_column); }
        //| menos_menos id punto_coma
;

VECTOR : 
    TIPO_VARIABLE cor_izq cor_der id igual new TIPO_VARIABLE cor_izq PARAMETROS_LLAMADA cor_der punto_coma
            {$$ = new Arreglo.default($4,$7,$9,[], @5.first_line,@5.first_column)}
    |TIPO_VARIABLE cor_izq cor_der id igual new TIPO_VARIABLE cor_izq  cor_der punto_coma
            {$$ = new Arreglo.default($4,$7,null,[], @5.first_line,@5.first_column)}
    | TIPO_VARIABLE cor_izq cor_der cor_izq cor_der  id igual llave_izq llave_izq PARAMETROS_LLAMADA llave_der  coma  llave_izq PARAMETROS_LLAMADA llave_der llave_der punto_coma
    | TIPO_VARIABLE cor_izq cor_der cor_izq cor_der  id igual llave_izq llave_izq  llave_der  coma  llave_izq llave_der llave_der punto_coma
;



//CICLO IF 
SENTENCIA_IF :
    if par_izq OPERACION par_der llave_izq BLOQUE llave_der LISTA_ELIF 
            {$$=new Si.default($3,$6,$8, @2.first_line, @2.first_column);}
    |if par_izq OPERACION par_der llave_izq BLOQUE llave_der 
            {$$=new Si.default($3,$6,undefined, @2.first_line, @2.first_column);}
;
LISTA_ELIF : 
    else llave_izq BLOQUE llave_der
            {$$=$3;}
    |elif par_izq OPERACION par_der llave_izq BLOQUE llave_der LISTA_ELIF
            {$$=new Si.default($3,$6,$8, @2.first_line, @2.first_column);}
    |elif par_izq OPERACION par_der llave_izq BLOQUE llave_der 
            {$$=new Si.default($3,$6,undefined, @2.first_line, @2.first_column);}
;


// ciclo switch 
SENTENCIA_SWITCH :
    switch par_izq OPERACION par_der llave_izq CASOS llave_der 
;
CASOS :
        CASOS case OPERACION dos_puntos INSTRUCCIONES 
        |case OPERACION dos_puntos INSTRUCCIONES
        |CASOS default dos_puntos INSTRUCCIONES
;



//CICLO WHILE 
SENTENCIA_WHILE :
    while par_izq OPERACION par_der llave_izq BLOQUE llave_der
        {$$ = new mientras.default($3,$6,@2.first_line,@2.first_column)}
;

SENTENCIA_DO_WHILE :
    do llave_izq BLOQUE llave_der while par_izq OPERACION par_der punto_coma
        {$$ = new HacerMientras.default($7,$3,@2.first_line,@2.first_column)}
;

SENTENCIA_DO_UNTIL :
        do llave_izq BLOQUE llave_der until par_izq OPERACION par_der punto_coma
        {$$ = new HacerHastaQue.default($7,$3,@2.first_line,@2.first_column)}
;



//ciclo for 
SENTENCIA_FOR :
        for par_izq SENTENCIA_FOR1  OPERACION punto_coma SENTENCIA_FOR2 par_der llave_izq BLOQUE llave_der
            {$$ = new ForIns.default($3,$4,$6,$9, @1.first_line,@1.first_column);}
        //|for par_izq ASIGNACION OPERACION punto_coma ASIGNACION par_der llave_izq INSTRUCCIONES llave_der
;
SENTENCIA_FOR1 :
    DECLARACION  {$$=$1;}
    |ASIGNACION  {$$=$1;}
;
SENTENCIA_FOR2 :
     id mas_mas         { $$ = new IncreDecre.default(IncreDecre.tipoOp.INCREMENTO1,$1, @1.first_line, @1.first_column); }
    |id menos_menos     { $$ = new IncreDecre.default(IncreDecre.tipoOp.DECREMENTO1,$1, @1.first_line, @1.first_column); }
    |id igual OPERACION {$$=new asignacion.default($1, $3, @2.first_line, @2.first_column );}
;


// OPERADOR TERNARIO
SENTENCIA_TERNARIA :
         OPERACION interrogacion2 OPERACION dos_puntos OPERACION 
                {$$=new Ternario.default($1, $3,$5, @2.first_line, @2.first_column );}
;
SENTENCIA_TERNARIA2 :
         OPERACION interrogacion2 INSTRUCCION dos_puntos INSTRUCCION 
                //{$$=new Ternario.default($1, $3,$5, @2.first_line, @2.first_column );}
;


SENTENCIA_RETURN :
    return OPERACION punto_coma
        {$$=new Retornar.default($2, @3.first_line, @3.first_column );}
    |return  punto_coma
        {$$=new Retornar.default(null, @2.first_line, @2.first_column );}
;

FUNCION :
    id par_izq PARAMETROS_FUNCION par_der dos_puntos TIPO_VARIABLE llave_izq BLOQUE llave_der
             {$$=new Funcion.default($1, $3,$8,$6, @2.first_line, @2.first_column );}
    |id par_izq par_der dos_puntos TIPO_VARIABLE llave_izq BLOQUE llave_der
            {$$=new Funcion.default($1, [],$7,$5, @2.first_line, @2.first_column );}
;

PARAMETROS_FUNCION :
        PARAMETROS_FUNCION coma TIPO_VARIABLE id  
            { $1.push($4); $$ = $1;  }
        | TIPO_VARIABLE id 
            { $$ = [$2];             }
;


METODO :
    id par_izq par_der dos_puntos void llave_izq BLOQUE llave_der
            {$$=new Metodo.default($1,[],$7,$5, @2.first_line, @2.first_column );}
    |id par_izq PARAMETROS_FUNCION par_der dos_puntos void llave_izq BLOQUE llave_der
            {$$=new Metodo.default($1,$3,$8,$6, @2.first_line, @2.first_column );}
    |id par_izq par_der llave_izq BLOQUE llave_der
            {$$=new Metodo.default($1,[],$5,"", @2.first_line, @2.first_column );}
;


SENTENCIA_LLAMADA :
    id par_izq par_der punto_coma
        {$$=new Llamadas.default($1,[],@2.first_line,@2.first_column);}
    |id par_izq PARAMETROS_LLAMADA par_der punto_coma
        {$$=new Llamadas.default($1,$3,@2.first_line,@2.first_column);}
;
LLAMADA_ARITMETICA :
    id par_izq par_der
    |id par_izq PARAMETROS_LLAMADA par_der
;

PARAMETROS_LLAMADA :
    PARAMETROS_LLAMADA coma OPERACION   {    $1.push($3);    $$ = $1;   }
    |OPERACION                          {    $$ = [$1];                 }
;

SENTENCIA_IMPRIMIR :
    print par_izq OPERACION par_der punto_coma
        {$$=new impresion.default($3,@2.first_line,@2.first_column);}
    |println par_izq OPERACION par_der punto_coma
        {$$=new impresion.default($3,@2.first_line,@2.first_column);}


;

SENTENCIA_TRANSFERECIA:
    break punto_coma
        {$$=new Transferencia.default(true,false, @2.first_line,@2.first_column);}
    |continue punto_coma
        {$$=new Transferencia.default(false,true, @2.first_line,@2.first_column);}
;


FUNCION_TYPEOF :
    TIPO_VARIABLE LISTA_ID igual typeof par_izq OPERACION par_der  punto_coma
        {$$=new TipoDatoIns.default($1, $2,$6, @3.first_line, @3.first_column );}
;

FUNCION_TOSTRING :
    TIPO_VARIABLE LISTA_ID igual toStringA par_izq OPERACION par_der punto_coma
        {$$=new Casteo.default($1, $2, new Tipo.default(Tipo.DataType.CADENA),$6, @3.first_line, @3.first_column );}
;

FUNCION_TOCHARARRAY :
    TIPO_VARIABLE cor_izq cor_der id igual toCharArray par_izq cadena par_der punto_coma
;

SENTENCIA_PUSH :
    id punto push par_izq OPERACION par_der punto_coma
        {$$ = new ArregloAccion.default($1,$5, true, false, @3.first_line,@3.first_column)}
;
SENTENCIA_POP :
    id punto pop par_izq par_der punto_coma
        {$$ = new ArregloAccion.default($1,null, false, true, @3.first_line,@3.first_column)}
;

SENTENCIA_RUN :
        run SENTENCIA_LLAMADA   {$$ = new Run.default($2,@1.first_line,@1.first_column)}
;

//bloque de instruciones de un ciclo o una funcion
BLOQUE
    :  INSTRUCCIONES  { $$ = new estados.default($1, @1.first_line, @1.first_column); }
    |             { $$ = new estados.default(new Array(), @1.first_line, @1.first_column); }
;
