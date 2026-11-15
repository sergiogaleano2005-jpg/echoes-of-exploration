"""Activa SOLO la capa visual V5.6; respeta JS de conducción y CSS existentes."""
from pathlib import Path
import shutil
import sys
root = Path(__file__).resolve().parent
index = root / 'templates' / 'index.html'
css = root / 'static' / 'css' / 'space-v56.css'
js = root / 'static' / 'js' / 'space-v56.js'
assets = [root/'static'/'images'/'design'/n for n in ['rocket.svg','saturn.svg','satellite.svg']]
if not all(x.is_file() for x in [index, css, js, *assets]):
    sys.exit('ERROR: faltan archivos. Copia las carpetas css, js e images del ZIP dentro de static, y el instalador junto a app.py.')
original = index.read_text(encoding='utf-8')
if '</head>' not in original or '</body>' not in original:
    sys.exit('ERROR: index.html no tiene las etiquetas HTML esperadas. No se modificó nada.')
if 'space-redesign.css' not in original:
    print('AVISO: V5.4 no parece estar activada. Instálala primero para ver el diseño completo.')
backup = index.with_name('index_antes_diseno_v56.bak')
if not backup.exists():
    shutil.copy2(index, backup)
updated=original
css_tag='  <link rel="stylesheet" href="{{ url_for(\'static\', filename=\'css/space-v56.css\', v=\'56\') }}">'
js_tag='  <script defer src="{{ url_for(\'static\', filename=\'js/space-v56.js\', v=\'56\') }}"></script>'
if 'space-v56.css' not in updated: updated=updated.replace('</head>',css_tag+'\n</head>',1)
if 'space-v56.js' not in updated: updated=updated.replace('</body>',js_tag+'\n</body>',1)
if updated!=original: index.write_text(updated,encoding='utf-8');print('OK: Diseño V5.6 activado. Respaldo:',backup.name)
else: print('OK: Diseño V5.6 ya estaba activado; sin cambios adicionales.')
print('main.js, space-redesign.css, style.css y la lógica 3D NO se modificaron.')
