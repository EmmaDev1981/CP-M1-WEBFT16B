// ----- IMPORTANTE -----

// IMPORTANTE!: Para este checkpoint tendrán en el archivo DS.js las implementaciones ya realizadas en las
// homeworks de Queue, LinkedLis y BinarySearchTree. Sobre dicha implementación van a tener que agregar nuevos
// métodos o construir determinadas funciones explicados más abajo. Pero todos los métodos ya implementados
// en las homeowrks no es necesario que los vuelvan a definir.
// NO DEBEN MODIFICAR EL ARCHIVO DS.js SINO QUE TODO SU CÓDIGO TENDRÁ QUE ESTAR EN ESTE ARCHIVO checkpoint.js

const {
  Queue,
  Node,
  LinkedList,
  BinarySearchTree
} = require('./DS.js');

// ----------------------

//* ----- Recursión -----

//* EJERCICIO 1 --> OK
// Implementar la función isAncestor: debe determinar si dado dos nombres de personas las mismas
// son parientes o no (La primera debe ser ancestro de la segunda). La función recibira un objeto
// que va a representar sólo la parte femenina del "arbol genealogico" familiar y será de la siguiente forma:
// const genealogyTree = {
//   "Mona Simpson": [],
//   "Marge Simpson": ["Lisa Simpson", "Maggie Simpson"],
//   "Jacqueline Bouvier": [ "Patty Bouvier", "Marge Simpson", "Selma Bouvier"],
//   "Patty Bouvier": [],
//   "Selma Bouvier": ["Ling Bouvier"],
//   "Edwina": ["Abigail Simpson"],
//   "Lisa Simpson": [],
//   "Maggie Simpson": [],
//   "Ling Bouvier": []
// }
// Ejemplo:
//  - Caso que devuelve true --> isAncestor(genealogyTree, "Jacqueline Bouvier", "Maggie Simpson")
//  - Caso que devuelve false --> isAncestor(genealogyTree, "Jacqueline Bouvier", "Abigail Simpson")
//  [Observar los tests para otros casos]

var isAncestor = function(genealogyTree, ancestor, descendant) {

  // console.log(genealogyTree[ancestor].length)

  var tamañoArray = genealogyTree[ancestor].length //* tomo el valor para luego saber la longitud a iterar
  
  // console.log(genealogyTree[ancestor])
  // console.log(genealogyTree[ancestor][index])

  for (var index = 0; index < tamañoArray; index++) { //* uso un for para iterar dentro
 
    // console.log(genealogyTree[genealogyTree[ancestor][index]].length > 0)
    if (genealogyTree[genealogyTree[ancestor][index]].length > 0) { //* si la propiedad no esta vacia (osea que tiene descendientes)

      return isAncestor(genealogyTree, genealogyTree[ancestor][index], descendant); //* aplico recursividad para iterar por los array del objeto

    }

    // console.log(genealogyTree[ancestor][index] === descendant)
    else if (genealogyTree[ancestor][index] === descendant) { //* si lo encuentra, retorna TRUE

      return true;

    }

  }
// console.log(genealogyTree[ancestor].length === 0)
  if (genealogyTree[ancestor].length === 0)  return false //* caso base, corta la iteracion si no hay coincidencias, y retorna false

  return false
}


//* EJERCICIO 2 --> ME QUEDE SIN TIEMPO....
// Secuencia inventada: f(n) = f(n-1) x f(n-2) - f(n-2)
// Siendo f, secuenciaHenry.
// Donde las primeras dos posiciones son dadas por el parametro recibidos y a partir de
// la siguiente se calcula como la multiplicación de los 2 números anteriores restados al número anterior.
// object es un objeto del cual debemos obtener f(0) y f(1) siguiendo la siguiente lógica:
// f(0) será el valor de la propiedad llamada 'first'
// f(1) será un número igual a la cantidad de propiedades de obj
// Por ejemplo si recibimos: 
// var obj = {
//   1: true,
//   first: 2,
//   7: ['F','r','a','n','c','o!'],
//   h: {a: 1},
//   z: [],
//   a: 1,
//   b: 2,
//   c: 3,
//   d: 4
// }
// deberíamos tener los siguientes 2 valores iniciales
// secuenciaHenry(0) = 2 y secuenciaHenry(1) = 9
// A partir de ahí la tercera posición sería  9 x 2 - 2 = 16 y así sucesivamente
// La función secuenciaHenry debe devolver el enésimo numero de la serie, por ejemplo para el objeto
// antes mencionado:
// secuencia: 2, 9, 16, 135, 2144, 289305
// secuenciaHenry(0) // 2  ya que el elemento de la posición 0 es cero
// secuenciaHenry(1) // 9 ya que el elemento de la posición 1 es 1
// secuenciaHenry(5) // 289305 ya que el elemento de la posición 5 es 289305
// Para números negativos de n debe devolver null
// PISTA: Pueden utilizar el método Object.keys() para f(1)

function secuenciaHenry(obj, n,funcion1 = 0, funcion2 = 0 ) {
  // Tu código aca:

  for (var propiedad in obj) { //* recorro el objeto con un FOR IN para sumar la cantidad de propiedades que tenga

    // console.log(!isNaN(propiedad))
  if (!isNaN(propiedad)) { //* pregunto si la propiedad no es un numero
    funcion1++ //* SI es TRUE, incremento el valor en 1
  };
  if(Array.isArray(obj[propiedad])){ //* pregunto si la propiedad es un arreglo
    // console.log(obj[propiedad].length)
    funcion2 += obj[propiedad].length; //* sumo las longitudes de los arreglos que sean valores de alguna propiedad
  }
  }

  if(n == 0) return funcion1; //* condicion de corte

  if(n == 1) return funcion2; //* condicion de corte

  if(n < 0) return null; //* Para números negativos de n debe devolver null
  
  return secuenciaHenry(obj,n-1) * secuenciaHenry(obj,n-2) - secuenciaHenry(obj, n-2); //* Aplico recursividad

}

// ---------------------

//* ----- LinkedList -----

//* EJERCICIO 3 --> OK
// Implementar el método size dentro del prototype de LinkedList que deberá retornar el tamaño actual de
// la LinkedList. En el caso de que la lista se encuentre vacía deberá retornar cero.
// Ejemplo:
//    var lista = new LinkedList();
//    lista.size(); --> 0
//    lista.add(1);
//    lista.size(); --> 1
//    lista.add(2);
//    lista.add(3);
//    lista.size(); --> 3

LinkedList.prototype.size = function(){
  // Tu código aca:
  var puntero = this.head; //* creo una variable que voy a usar de puntero

  var contador = 0; //* creo una variable contador, que se incrementa con cada iteracion del While

  while (puntero != null) { //*mientras pueda mover un lugar el puntero avanzo, cuando llego al final, puntero === NULL y no entra mas

      contador++; //* incremento el contador en cada ciclo While

      puntero = puntero.next; //* avanzo un lugar el puntero, avanzo en la linkedlist, y evito un loop infinito cuando puntero apunta a null
  }
  return contador;//* retorno el contador con la cantidad de nodos.

}


//* EJERCICIO 4 --> OK
// Implementar el método switchPos dentro del prototype de LinkedList que deberá intercambiar
// el elemento que se encuentre en pos1 con el elemento en pos2
// En el caso de que alguna de las dos posiciones no sea válida (Supere el tamaño de la lista actual 
// o sea un número negativo) debe devolver false.
// Si los nodos fueron removidos correctamente devolver true.
// Aclaración: la posición cero corresponde al head de la LinkedList
// Ejemplo 1:
//    Suponiendo que la lista actual es: Head --> [1] --> [2] --> [3] --> [4] --> [5]
//    lista.switchPos(1,3);
//    Ahora la lista quedaría: Head --> [1] --> [4] --> [3] --> [2] --> [5]
//    y la función debería haber devuelto true
// Ejemplo 2:
//    Suponiendo que se pide una posición inválida: removeFromPos(8) --> false

LinkedList.prototype.switchPos = function(pos1, pos2){
  // Tu código aca:

  if (!this.head) return false //* si la lista esta vacia retorno False

  var contador = this.size() //* utilizo el metodo creado SIZE para validar el largo de la lista
  // console.log(contador)
  
  if (contador <= pos1 || contador <= pos2) return false //* chequeo las posiciones existan, y no sobrepasen el tamaño de la lista
  if (pos1 < 0 || pos2 < 0) return false; //* si la posicion pasada por argumento es negativa, retorno FALSE

  var nodoPos1 = this.head; //* declaro variable para manejar la posicion posterior del nodo1 
  var nodoPos2 = this.head; //* declaro variable para manejar la posicion posterior del nodo2
  
  var nodoAnt1; //* declaro variable para manejar la posicion anterior del nodo1
  var nodoAnt2; //* declaro variable para manejar la posicion anterior del nodo2
  
  for (let i=1; i <= pos1; i++) { //*igualo la posicion del notoAnt1 con nodoPos1, y el nodo posterior avanza un lugar.
    nodoAnt1 = nodoPos1;
    nodoPos1 = nodoPos1.next;
    // console.log(nodoAnt1)
    // console.log(nodoPos1)
  }
  
  for (let i=1; i <= pos2; i++) {//*igualo la posicion del notoAnt2 con nodoPos2, y el nodo posterior avanza un lugar.
    nodoAnt2 = nodoPos2;
    nodoPos2 = nodoPos2.next;
    // console.log(nodoAnt2)
    // console.log(nodoPos2)
  }
  
  //*verifico la posicion de cada marcador y si tiene head o no. Sino asigno al head al nodoPos2
  if (nodoAnt1) {
    nodoAnt1.next = nodoPos2;
  } else {
    this.head = nodoPos2;
  }
  
 //*verifico la posicion de cada marcador y si tiene head o no. Sino asigno al head al nodoPos1
  if (nodoAnt2) {
    nodoAnt2.next = nodoPos1;
  } else {
    this.head = nodoPos1;
  }

  //* hago el intercambio entre nodo1 y nodo2 (SWITCH)
  var temporal = nodoPos1.next; //* guardo el siguiente en una variable para no perderlo
  nodoPos1.next = nodoPos2.next; //* reemplazo el de 1ro con el 2do
  nodoPos2.next = temporal; //* y al 2do la variable tempraria

  return true //* como se efecto correctamente, retorno TRUE

}

//* EJERCICIO 5 --> OK

// Implementar la función mergeLinkedLists que, a partir de dos listas simplemente enlazadas 
// del mismo tamaño retorne una nueva lista con los elementos de ambas listas
// Ejemplo:
//    Lista 1: Head --> 1 --> 7 --> 20 --> null
//    Lista 2: Head --> 4 --> 13 --> 2 --> null
//    Lista nueva luego de aplicar mergeLinkedLists:
//             Head --> 1 --> 4 --> 7 --> 13 --> 20 --> 2 --> null
// Nota: las listas enlazadas mergeadas intercalandose.
// El nodo 1 de la lista 1, se conecta con el nodo 1 de la lista 2.
// Continuando con el nodo 2 de la lista 2, conectandose con el nodo 2 de la lista 2.


var mergeLinkedLists = function (linkedListOne, linkedListTwo) {
  // Tu código aca:
  const mergedList = new LinkedList(); //* creo una nueva Linkedlist, para luego ir agregando los nodos intercalados

  var lista1 = linkedListOne.head  //*creo una lista1 con la lista pasada como argumento
  // console.log(lista1) 
  var lista2 = linkedListTwo.head //*creo una lista2 con la lista pasada como argumento
  // console.log(linkedListTwo.head)

  while (lista1 && lista2) { //*mientras tenga elementos en ambas listas sigo iterando (no se rompe porque aclaran que son iguales)

    mergedList.add(lista1.value) //* agrego un nodo a la lista1
    lista1 = lista1.next; //*avanzo un nodo, para seguir iterando

    mergedList.add(lista2.value) //* agrego un nodo a la lista2
    lista2 = lista2.next; //*avanzo un nodo, para seguir iterando
  }
  // console.log(mergedList)
  return mergedList //* retorno la lista mergeada
};


// ----------------------


//* ----- QUEUE -----

//* EJERCICIO 6 --> OK
// Implementar la función cardGame: a partir de dos Queues que va a recibir como paráemtro que
// van a representar mazos de cartas de dos jugadores debemos determinar quien va a ser el ganador
// de este juego que va a tener la siguiente dinámica:
// - Los jugadores tendrán que defender su "Castillo" que contiene un total de 100 puntos de resistencia
// - Cada carta tendrá puntos de ataque (attack) y puntos de defensa (defense)
// - Ambos jugadores van a sacar las dos primeras cartas de su mazo
//      * La primera carta será su carta asignada para atacar
//      * La segunda carta será su carta asignada para defender
// - La carta asignada para atacar del jugador uno se enfrentará contra la carta asignada para defender
//   del jugador dos y viceversa. Si el ataque supera los puntos de defensa el daño sobrante será aplicado
//   sobre el castillo.
// - El juego finaliza cuando alguno de los dos castillos se quede sin puntos de resistencia o cuando los mazos
//   se acaben. En este último caso ganará aquel jugador que tenga mayor cantidad de puntos de resistencia
//   restantes en su castillo.
// La función deberá devolver un string indicando al ganador: 'PLAYER ONE' o 'PLAYER TWO' (Respetar mayúsculas) o
// 'TIE' en el caso de empate
// NOTA: Ambos mazos contienen la misma cantidad de cartas
//
// Ejemplo:
// Los jugadores levantan 2 cartas cada uno.
// La primera carta del jugador uno va a atacar a la segunda carta del jugador dos
// La primer carta del jugador dos va a atacar a la segunda carta del jugador uno
//
// Primer carta del jugador 1 (ATAQUE) vs Segunda carta del jugador 2 (DEFENSA): 
// {attack: 5, defense: 5} vs {attack: 5, defense: 26}
// Ataque 5 vs Defensa 20 --> 5 no supera 20 --> No hay daño sobre el castillo
//
// Primer carta del jugador 2 (ATAQUE) vs Segunda carta del jugador 1 (DEFENSA): 
// {attack: 20, defense: 26} vs {attack: 15, defense: 10}
// Ataque 20 vs Defensa 10 --> 20 supera a 10 --> Como hay 10 puntos de diferencia esa cantidad de daño es aplicada
// al castillo del jugador 1 
//
// Una vez terminada la ronda, se procede a repetir lo mismo con las siguientes 2 cartas de cada jugaodr hasta
// finalizar el juego.


var cardGame = function(playerOneCards, playerTwoCards) {
  // Tu código aca:

  var puntosCastillo1 = 100; //* declaro una variable con los puntos del castillo 1
  var puntosCastillo2 = 100; //* declaro una variable con los puntos del castillo 2

  while (playerOneCards.size() > 0 && playerTwoCards.size() > 0) { //* utilizo el metodo size(), para saber hasta donde sigo sacando cartas., sino salgo.

    //* Saco de la cola las 2 primeras cartas Jugador 1
    var cartaJugador1Ataque = playerOneCards.dequeue() 
    var cartaJugador1Defensa = playerOneCards.dequeue()
    
    //* Saco de la cola las 2 primeras cartas del Jugador 2
    var cartaJugador2Ataque = playerTwoCards.dequeue()
    var cartaJugador2Defensa = playerTwoCards.dequeue()
    
    //* Aplico el Ataque del Jugador 1 al Castillo del Jugador 2
    var ataquejugador1 = cartaJugador2Defensa.defense - cartaJugador1Ataque.attack
    if (ataquejugador1 < 0) { //* La diferencia de los puntos, se aplican al castillo 2
      puntosCastillo2 += ataquejugador1
      // console.log(ataquejugador1)
      // console.log("puntos castillo2 : " + puntosCastillo2)
    }
  
    //* Aplico el Ataque del Jugador 2 al Castillo del Jugador 1
    var ataqueJugador2 = cartaJugador1Defensa.defense - cartaJugador2Ataque.attack
    if (ataqueJugador2 < 0) { //* La diferencia de los puntos, se aplican al castillo 1
      puntosCastillo1 += ataqueJugador2
      // console.log(ataqueJugador2)
      // console.log("puntos castillo1 : " + puntosCastillo1)
    }

  }
  
  if (puntosCastillo1 > puntosCastillo2) return "PLAYER ONE" //* si los puntos del castillo 2 son mayores al castillo 1, gana el Jugador 1
  if(puntosCastillo1 < puntosCastillo2) return "PLAYER TWO" //* si los puntos del castillo 1 son menores al castillo 2, gana el Jugador 2
  else return "TIE" //* sino es un empate

}

// ---------------


//* ----- BST -----

//* EJERCICIO 7 --> OK
// Implementar la función height dentro del prototype de BinarySearchTree que debe devolver la "altura"
// máxima del arbol recibido por parámetro.
// Ejemplo:
//             16             ---> Nivel 1
//          /      \
//        6         23        ---> Nivel 2
//      /  \       /   \
//     2    14    17    31    ---> Nivel 3
//      \
//       5                    ---> Nivel 4
// Este arbol tiene una altura de 4
// PISTA: Una forma de resolverlo es pensarlo recursivamente y usando Math.max

BinarySearchTree.prototype.height = function() {
  // Tu código aca:

  if(!this.value) return 0 //* si no hay nodos retorno 0
  
  if(!this.left && !this.right) return 1 //* pregunto si no tiene nodos a su izquierda y a su derecha, y si es asi, esta solo, retorno 1

  if(!this.right) return 1 + this.left.height() //* si no tiene nodos a su derecha, utilizo recursiva hacia la izquierda

  if(!this.left) return 1 + this.right.height() //* si no tiene nodos a su izquierda, utilizo recursiva hacia la derecha

  return 1 + Math.max(this.left.height(), this.right.height()) //* con la pista del enunciado, utilizo el metodo Math.max para comparar las dos ramas, y para el HEIGHT (NIVEL) de la mas profunda

}


// ---------------


//* Ejercicio 8 --> OK
// Dado un arreglo ordenado, encontrar el índice de un elemento específico pasado como parámetro
// utilizando el método conocido como búsqueda binaria. En el caso de que el número buscado no se encuentre
// en el array devolver -1.
// Para mayor información sobre dicho método:
//    - https://www.khanacademy.org/computing/computer-science/algorithms/binary-search/a/binary-search
//    - https://en.wikipedia.org/wiki/Binary_search_algorithm
// Ejemplo:
//    array = [1,2,3,4,5,6,7,8,9,10];
//    binarySearch(array, 2) --> Devolvería 1 ya que array[1] = 2
//    [Donde 2 sería el número sobre el cuál queremos saber su posición en el array]


var binarySearch = function (array, posicion, inicio = 0, final = array.length - 1) {
  // Tu código aca:

  var medio = Math.floor((inicio + final) / 2); //* defino el medio del array.

  if (posicion === array[medio]) { //* si la posicion coincide con el medio, ya lo encontré, retorno la posicion.
    return medio;
  }

  if (inicio >= final) {  //* si el valor pedido, es mayor al tamaño del array, es porque no esta, retorna -1.
    return -1;
  }

  if (posicion < array[medio]){ //* si la posicion pedida, es menor que el valor del centro del arreglo, lo reccorro hacia la izquierda (menores)
    return binarySearch(array, posicion, inicio, medio - 1) //* aplico recursividad hacia la izquierda del array
  } else { //* caso contrario, es mayor, lo recorro hacia la derecha (mayores)
    return binarySearch(array, posicion, medio + 1, final) //* aplico recursividad hacia la derecha del array
  }

}


//* EJERCICIO 9 --> OK
// Ordená un arreglo de objetos usando un bubble sort pero con algunas particularidades.
// Además del arreglo a ordenar (array) la función va a recibir como parámetro una función
// que va a ser quien va a determinar si un elemento es "mayor" al otro para determinar su
// posición final
// Ejemplo:
// var array = [
//   {name: 'Franco', age: 26, height: 1.85},
//   {name: 'Toni', age: 30, height: 1.75},
//   {name: 'Mati', age: 25, height: 1.77},
//   {name: 'Leo', age: 40, height: 1.83}
// ]
//
// orderFunction(array[0], array[1]) --> Devolvera 1 si están bien ordenados o -1 si hay que intercambiarlos
// Suponiendo que la orderFunction devuelve -1 si la edad del segundo elemento es menor que la del primero
// specialSort(array, orderFunction) --> Retornaría el siguiente array:
// [
//   {name: 'Mati', age: 25, height: 1.77},
//   {name: 'Franco', age: 26, height: 1.85},
//   {name: 'Toni', age: 30, height: 1.75},
//   {name: 'Leo', age: 40, height: 1.83}
// ]

var specialSort = function(array, orderFunction) {
  // Tu código aca:

  do {
    var huboCambios = false; //* declaro una variable en false como FLAG; y la paso a FALSE, si hubo algun cambio

    for (var i = 0; i < array.length - 1; i++) { //* Itero sobre el array, length -1, para no iterar fuera del arreglo con array[i+1]
      
      // console.log(orderFunction(array[i], array[i + 1]))
      if (orderFunction(array[i], array[i + 1]) === -1) { //* Aplico el Call Back al arreglo, que devuelve 1 ó -1, si estan bien ordenador y no
        // console.log(orderFunction(array[i], array[i + 1]))
        [array[i], array[i+1]] = [array [i+1], array[i]] //* Si no esta ordenado (condicion === -1), cambio de lugar las posiciones en el array

        huboCambios = true //* vuelvo a setear "el flag" si hubo cambios, para saber cuando debo terminar de iterar con el ciclo WHILE al no entrar en la condicion del IF
      }
    }
  } while (huboCambios) //* mientras haya cambios sigo iterando.

  // console.log(array)
  return array; //* retorno el arreglo ordenado segun el CB

}

//* ----- Closures -----

//* EJERCICIO 10 --> OK
// Implementar la función closureDetect que recibe como parámetro:
//  - Un array (symptoms) que va a contener en cada posición un string representando un
//    síntoma médico de alguna enfermedad
//  - Un número (min) que va a indicar la cantidad mínima de síntomas que debe tener un
//    paciente para considerar que posee la enfermedad
// Ejemplos:
//   var symptoms = ['fever', 'dry cough', 'tiredness', 'sore throat', 'diarrhoea', 'loss of taste', 'loss of smell'];
//   var covidDetector = closureDetect(symptoms, 3);
//
//   var personOne = {
//     name: 'Franco',
//     age: 26,
//     symptoms: ['fever', 'congestion', 'loss of taste', 'tiredness']
//   }
//
//   var personTwo = {
//     name: 'Toni',
//     age: 30,
//     symptoms: ['congestion', 'tiredness']
//   }
//
//   covidDetector(personOne); --> true
//   covidDetector(personTwo); --> false
//  [Observar los tests para otros casos]

function closureDetect(symptoms, min) {
  // Tu código aca:
  
  return function(persona){ //* como es un closure, retorno una funcion.

  var contador=0; //* declaro una variable en cero
  
  for (var sintoma in symptoms) { //* utilizo un FOR IN para recorrer los sintomas del objeto y verifico cuantos sintomas tiene cada persona incrementando la variable contador
  // console.log(symptoms.includes(persona.symptoms[sintoma]))
  if(symptoms.includes(persona.symptoms[sintoma])) { //* utilizo el metodo includes() para validar si el obejeto incluye esos sintomas, si es TRUE; incremento el contador en 1
  // console.log(symptoms.includes(persona.symptoms[sintoma]))
   contador++;
  }

  }
  //console.log(contador)
  if(contador >= min) return true; //* si los sintomas que tiene, son mayores o iguales a los que se pasan como argumento para considerarlo enfermo, retorno TRUE

  return false; //* sino, retorno FALSE
}

}

// -------------------

module.exports = {
  isAncestor,
  secuenciaHenry,
  LinkedList,
  Queue,
  cardGame,
  binarySearch,
  specialSort,
  closureDetect,
  BinarySearchTree,
  mergeLinkedLists
}
