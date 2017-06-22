
# [MysticFDI](https://vmorante.github.io/MysticFDI/)

https://vmorante.github.io/MysticFDI/ --> ¿Te atreves a jugarlo y a salvar a la facultad?

Juego en javascript con motor Quintus

**Ficha de Juego**                                     


**Título:**					Mystic FDI

**Género:**				RGP

**Plataformas:**		Multiplataforma

**Modos:**					Un jugador

**Edad:**					7+

**Autores:**  Verónica Morante Pindado y Alejandro Pidal Gallego




### **Descripción**
Mystic FDI es un juego en el que tendrás que ir recorriendo mapas de la facultad de informática de la UCM, a través de los cuales tendrás que ir venciendo a profesores para sobrevivir.
Para ser más poderoso tendrás que tener de aliados a otros alumnos e ir mejorandolos hasta que sean alumnos de último curso.

Tendrás que mejorar tus habilidades en informática si quieres llegar al fin. Podrás recorrer diferentes mapas con enemigos más difíciles.



### **Ambientación**
Tras las vacaciones de verano, nombre del personaje, regresa a la facultad para comenzar las clases, pero no la recordaba así. En esta aventura ,nombre, tendrá que aliarse con otros alumnos, mejorar sus conocimientos en informática y luchar para  que todo vuelva a la normalidad. No lo tendrá fácil, ya que los profesores harán todo lo posible para interponerse en su camino.

## Objetivo del juego

El usuario **gana si vence al boss final** que se encuentra en el mapa,se puede luchar contra él, cuando vences a un numero determinado de profesores

El usuario **pierde** , si cuando está en el mapa se queda **sin energía o si pierda contra cualquier enemigo**. Al perder regresa a la pantalla principal



## **Mecánicas Centrales**
**Escenario**: El escenario donde transcurre la acción está formado por un mapa que representará la facultad de informática.

**Acción**: El jugador dispondrá de diferentes pantallas,en unas podrás comprar diferentes recursos,en otra mejorar a tus aliados y la principal será el mapa.El jugador se puede desplazar a través de el en cualquier dirección.

**Enemigos**: Los enemigos, irán apareciendo de manera aleatoria cuando el personaje colisione con ellos. Los enemigos serán invisibles.

**Aliados**: Los aliados serán otros alumnos,dependiendo del nivel serán alumnos de un curso mayor por tanto tendrán más vida y más conocimiento

**Combate**: Aparece la cara del enemigo en un primer plano y deberás elegir los ataques que usarás para enfrentarte. Según sea el enemigo, tus ataques serán más o menos efectivos.Solo podrás pulsar el botón dependiendo de tu velocidad, al igual que el enemigo que te atacará cada cierto tiempo con el poder y la velocidad que tenga.

**Habilidades**: A lo largo del juego el personaje deberá ir aumentando sus habilidades para poder vencer a los enemigos. Contará con salas especiales donde mejorar esas habilidades y mejorar a su ejército.

**Energía**: El jugador irá perdiendo energía conforme vaya avanzando por el mapa. De llegar el punto que se quede sin energía no podrá seguir avanzando y tendrá que proveerse de energía.

**Quiz**: El alumno también se podrá enfrentar a los enemigos respondiendo preguntas relacionadas con la informática, si acierta una pregunta quita 3 puntos de vida al enemigo, si falla pierde el tres puntos de vida.

**Quiz**: El alumno se enfrenta a un profesor. El profesor cada x segundos(dependiendo de la velocidad del profesor) le quitará tanta vida al alumno como poder tenga el profesor. Según los alumnos que tengas reclutados aparecerán tantos botones, y estos serán la manera de atacar. Solo se podrá accionar el boton cada x segundos(dependiendo de la velocidad del alumno).

### **Diseño e implementación**
**Tecnología**: Quintus
#### **Clases y componentes**

**Alumno**: Tres clases diferentes con sus puntos de vida, poder y velocidad.

**Profesor**: Cada profesor tiene vida, poder y velocidad diferente, pero tienen las mismas funciones generales.

**ProfesorJefe**: Similar al profesor normal, pero con mas vida y con la característica de jefe.


### **Pantallas principal**
**Alquimia**: Si das clic puedas conseguir monedas.

**Edificios**:

  * Clase: Cada vez que compres una, desbloqueas a tres trabajadores.
  * Cocina: Desbloquea a los cocineros
  * Cafeteria: Desbloquea a los camareros
  
**Aprender**

Podrás comprar diferentes conocimientos para mejorar a los alumnos

**Reclutar**

Podrás comprar tres tipos de alumnos gracias a los conocimientos adquiridos

**Casa**
Podrás asignar a los trabajadores:
  * Cocinero: Produce uno de comida
  * Camarero : Produce 1 de energia y consume 2 de comida
  * Recolector : Produce 1 de monedas y consume 1 de energía
  
 **Expedición**
  Podrás seleccionar los alumnos con los que quieres explorar el mapa, en el nivel 1 **máximo 2 alumnos**

### Equipo de trabajo y reparto de tareas


### **Referentes y fuentes**
**Mystic castle**: Es el juego principal en el que nos basamos. Es un RGP basado en mapas que tienes que ir recorriendo, mientras mejoras a tu ejército y consigues recursos para subsistir.

**Fuentes:**
* http://spritedatabase.net/
* Juego 999
* Juego Phoenix Wright
* https://es.pinterest.com/pin/413838653237917594/

