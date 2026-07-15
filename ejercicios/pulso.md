# El pulso de mi operación · Ejercicio de Claude Code

Copia todo el bloque de abajo y pégalo en Claude Code (pestaña Code de la app de escritorio de Claude, o en la terminal).

```
Vas a construirme una herramienta local llamada "El pulso de mi operación".
Sigue estos pasos en orden y no te saltes ninguno:

1. Antes de escribir código, pregúntame dos cosas y espera mi respuesta:
   mi nombre y el área de la empresa que dirijo.

2. Crea una carpeta nueva llamada pulso-operacion y trabaja todo adentro.

3. Descarga este archivo de ventas ficticias y guárdalo en la carpeta:
   https://raw.githubusercontent.com/cgomez123/tallerGDL/main/ejercicios/ventas.csv
   Si no puedes descargarlo, dímelo y genera tú un CSV equivalente con
   ventas ficticias de un distribuidor de autopartes (mes, región, línea
   de producto, unidades, monto en MXN).

4. Construye una página web local (HTML, CSS y JavaScript, sin frameworks)
   que muestre:
   a) Un encabezado con mi nombre, mi área y la fecha de hoy.
   b) El tipo de cambio USD/MXN en tiempo real, tomado de una API pública
      gratuita que no requiera llave (por ejemplo open.er-api.com o
      frankfurter.dev). Verifica que la API responda antes de dar por
      terminado. Muestra el dato en grande, con la hora de consulta.
   c) Una tabla con los datos del CSV y, arriba de la tabla, tres números
      resumen: venta total, la región con más venta y la línea de producto
      con más venta.
   Estilo: fondo oscuro, limpio, tipo tablero ejecutivo. Todo en español.

5. Levanta un servidor local y abre la página en mi navegador.

6. Al final, dime en tres líneas y sin tecnicismos qué construiste, dónde
   vive en mi computadora y cómo vuelvo a abrirla mañana sin tu ayuda.

No me pidas decisiones técnicas: elige tú lo más simple que funcione.
```
