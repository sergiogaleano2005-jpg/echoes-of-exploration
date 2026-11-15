# Echoes of Exploration — Prototipo inicial

Sitio educativo sobre equipos de exploración espacial que han quedado en la Luna y Marte, desarrollado para probar una idea del NASA Space Apps Challenge.

## Requisitos
- Python 3.10 o superior
- Internet para cargar Three.js desde jsDelivr
- Navegador moderno (Chrome o Edge)

## Instalación en PyCharm
1. Descomprime la carpeta y abre `echoes_of_exploration` con **Open** en PyCharm.
2. Abre la terminal (parte inferior de PyCharm).
3. Ejecuta `python -m pip install -r requirements.txt` (en Windows, también puedes usar `py -m pip install -r requirements.txt`).
4. Ejecuta `python app.py` (o `py app.py`).
5. En el navegador abre `http://127.0.0.1:5000/`.
6. Para detener el servidor pulsa Ctrl+C en la terminal.

## Estructura
- `app.py`: servidor Flask
- `templates/index.html`: interfaz de la web
- `static/css/style.css`: estilos
- `static/js/main.js`: datos de misiones, navegación, cuestionarios y 3D

## Limitaciones del prototipo
- Los rovers son modelos ilustrativos construidos con figuras geométricas; no son reproducciones precisas.
- Los textos en primera persona son dramatizaciones, no citas o transmisiones reales.
- Las fechas y afirmaciones científicas deben contrastarse de nuevo antes de la entrega oficial.
- Three.js se carga por CDN, por lo que el equipo debe tener conexión a Internet para visualizar el 3D.
- Flask con `debug=True` es solamente para desarrollo local; no publicar así en producción.

## Próximos pasos
- Sustituir ilustraciones por modelos 3D obtenidos de fuentes NASA, verificando licencias.
- Agregar una pantalla de selección de destino (Luna / Marte).
- Añadir audio, subtítulos y accesibilidad de teclado.
- Incorporar los enlaces de datasets oficiales incluidos en la pestaña Resources del reto.
- Ensayar una demostración corta de la aplicación con el equipo.
