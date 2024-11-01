# DamePizzas

# Gimme Gimme Pizzas (versión Phaser)

**Gimme Gimme Pizzas** es un divertido juego desarrollado originalmente en **Tkinter** y luego mejorado utilizando **Phaser**, un motor de juegos en JavaScript para crear experiencias 2D de alta calidad. Este proyecto demuestra cómo optimizar y modernizar un juego sencillo aprovechando las capacidades avanzadas de Phaser, logrando una experiencia de juego más fluida, visualmente atractiva y con una jugabilidad mejorada.

## Descripción del Juego

En **Gimme Gimme Pizzas**, el jugador controla una cesta con el objetivo de atrapar pizzas que caen del cielo, mientras evita objetos peligrosos (basura) que también descienden. Con cada pizza atrapada, el puntaje aumenta y la velocidad de caída incrementa, haciendo el juego cada vez más desafiante. Si el jugador falla en atrapar una pizza o atrapa un objeto peligroso, pierde una vida. ¡Cuando se acaban las vidas, el juego termina!

## Características

### Conversiones y Mejoras Clave con Phaser

Este juego representa una conversión significativa desde su versión en Tkinter, aprovechando las siguientes mejoras de Phaser:

- **Motor de Física Integrado**: Phaser permite implementar gravedad, colisiones y velocidad de caída sin necesidad de cálculos manuales. Esto simplifica el desarrollo y hace la jugabilidad más realista.
  
- **Gráficos y Gestión de Sprites**: Phaser facilita la manipulación y actualización de sprites con una API intuitiva. Los elementos del juego, como la cesta, las pizzas y la basura, son gestionados en grupos de objetos que permiten un manejo más eficiente y una experiencia de juego más fluida.

- **Eventos de Entrada (Controles Mejorados)**: El juego responde a entradas tanto del teclado como del ratón o pantalla táctil. El jugador puede controlar la cesta con las teclas de flecha o arrastrarla usando el ratón o el toque en dispositivos móviles.

- **Sonido y Música de Fondo**: Phaser integra efectos de sonido y música de fondo, mejorando la experiencia del jugador. Se incluyen efectos de sonido específicos para atrapar pizzas, colisionar con basura y la pantalla de Game Over.

- **Reinicio Automático y Game Over Visual**: Al perder todas las vidas, el juego muestra un mensaje de "Game Over" y luego se reinicia automáticamente tras una breve pausa. Esto es posible gracias a la flexibilidad de Phaser para manejar escenas, eliminando la necesidad de ventanas emergentes adicionales y proporcionando un flujo de juego ininterrumpido.

## Instalación y Ejecución

1. **Descarga o Clona el Repositorio**:
   ```bash
   git clone https://github.com/tuusuario/gimmegimmepizzas
   cd gimmegimmepizzas

2. **Requisitos: Asegúrate de tener un servidor local para ejecutar archivos HTML y JavaScript. Puedes usar Live Server en Visual Studio Code o cualquier otro servidor local**.

3. **Ejecución:**

- **Inicia el servidor local en la carpeta del proyecto.**
- **Abre index.html en tu navegador para comenzar a jugar.**
  
4. **Controles**
   
- **Teclado: Usa las teclas de flecha izquierda y derecha para mover la cesta.
- **Ratón o Pantalla Táctil: Haz clic o arrastra la cesta con el ratón o el toque en la pantalla.

5. **Recursos**
   
- **Sprites: img/pizza-img.png (pizza), img/aserrinfondorojo.png (fondo), img/me_catcher.png (cesta), img/basura.png (basura).
- **Sonido y Música: music/background-music.wav, sound/catch.wav (atrapar pizza), sound/ouch.wav (colisión con basura), sound/game_over.mp3 (Game Over).
- **Créditos
  
Proyecto basado en la versión original desarrollada en Tkinter https://github.com/matiassenia/catchpizza.git y luego tambien convertido con pygame https://github.com/matiassenia/gimmegimmepizzas.git y modernizada con Phaser(este)  para ofrecer una experiencia de juego mejorada.
