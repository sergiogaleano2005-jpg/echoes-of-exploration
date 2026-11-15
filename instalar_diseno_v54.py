"""Agrega CSS y JS visual a templates/index.html sin alterar el simulador."""
from pathlib import Path
import sys, shutil
root = Path(__file__).resolve().parent
index = root / 'templates' / 'index.html'
css = root / 'static' / 'css' / 'space-redesign.css'
js = root / 'static' / 'js' / 'space-redesign.js'
if not all(p.is_file() for p in (index,css,js)):
    sys.exit('ERROR: coloca este instalador y la carpeta static del ZIP dentro de tu proyecto, junto a app.py.')
original = index.read_text(encoding='utf-8')
css_tag = "  <link rel=\"stylesheet\" href=\"{{ url_for('static', filename='css/space-redesign.css', v='54') }}\">"
js_tag = "  <script defer src=\"{{ url_for('static', filename='js/space-redesign.js', v='54') }}\"></script>"
if 'space-redesign.css' in original and 'space-redesign.js' in original:
    print('La actualización V5.4 ya está instalada; no se hicieron cambios.')
    sys.exit(0)
if '</head>' not in original or '</body>' not in original:
    sys.exit('ERROR: no se encontraron las etiquetas HTML esperadas. No se realizaron cambios.')
backup = index.with_name('index_antes_diseno_v54.bak')
if not backup.exists(): shutil.copy2(index,backup)
updated = original
if 'space-redesign.css' not in updated: updated = updated.replace('</head>', css_tag+'\n</head>',1)
if 'space-redesign.js' not in updated: updated = updated.replace('</body>', js_tag+'\n</body>',1)
index.write_text(updated,encoding='utf-8')
print('LISTO: diseño V5.4 instalado. Respaldo:',backup.name)
print('Conservamos main.js, incluidos los cambios de las ruedas.')
