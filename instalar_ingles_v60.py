# Echoes of Exploration - English Language Pack V6.0
# Works on top of the current local project. Preserves all existing JS logic and CSS.
from pathlib import Path
from datetime import datetime
import shutil

T = {' Vuelve a elegir la respuesta que corresponde.': ' Choose the correct answer and try again.',
 ' puntos estelares.': ' star points.',
 "$('mission-meta').textContent=`${m.place} / ${m.year}`": "$('mission-meta').textContent=`${m.place==='LUNA'?'MOON':'MARS'} "
                                                           '/ ${m.year}`',
 '${driving.distance.toFixed(1)} m (sim.)': '${driving.distance.toFixed(1)} m (sim.)',
 '${expedition.stage} / ${steps.length} descubrimientos': '${expedition.stage} / ${steps.length} discoveries',
 '${missions.filter(m=>m.place===destinationFilter).length} historias en ': '${missions.filter(m=>m.place===destinationFilter).length} '
                                                                            'stories on ',
 "${missions.filter(m=>m.place===destinationFilter).length} historias en ${destinationFilter==='LUNA'?'la Luna':'Marte'}": '${missions.filter(m=>m.place===destinationFilter).length} '
                                                                                                                           'stories '
                                                                                                                           'on '
                                                                                                                           "${destinationFilter==='LUNA'?'the "
                                                                                                                           "Moon':'Mars'}",
 "'Luna'": "'Moon'",
 "'Marte'": "'Mars'",
 "+bonus+' puntos estelares.'": "+bonus+' star points.'",
 '20 JUL': 'JUL 20',
 '83 DÍAS': '83 DAYS',
 '90 soles': '90 sols',
 '90 soles planeados. Casi 15 años de exploración.': 'Planned for 90 sols. Nearly 15 years of exploration.',
 'ALUNIZAJE': 'MOON LANDING',
 'ATERRIZAJE': 'LANDING',
 'Acelerar sin observar el terreno': 'Speed up without checking the terrain',
 'Activa el simulador para llegar a la baliza científica.': 'Start the simulator to reach the science beacon.',
 'Activar conducción': 'Start driving',
 'Afloramiento sedimentario': 'Sedimentary outcrop',
 'Al estudiar rocas, capas sedimentarias y minerales, Opportunity aportó evidencias de que Marte tuvo agua líquida en el pasado y ayudó a describir sus antiguos ambientes.': 'By '
                                                                                                                                                                              'studying '
                                                                                                                                                                              'rocks, '
                                                                                                                                                                              'sedimentary '
                                                                                                                                                                              'layers, '
                                                                                                                                                                              'and '
                                                                                                                                                                              'minerals, '
                                                                                                                                                                              'Opportunity '
                                                                                                                                                                              'found '
                                                                                                                                                                              'evidence '
                                                                                                                                                                              'of '
                                                                                                                                                                              'liquid '
                                                                                                                                                                              'water '
                                                                                                                                                                              'on '
                                                                                                                                                                              'ancient '
                                                                                                                                                                              'Mars '
                                                                                                                                                                              'and '
                                                                                                                                                                              'helped '
                                                                                                                                                                              'reveal '
                                                                                                                                                                              'its '
                                                                                                                                                                              'past '
                                                                                                                                                                              'environments.',
 'Altura: ': 'Altitude: ',
 'Ambos rovers estudiaron rocas y suelos para reconstruir ambientes antiguos de Marte.': 'Both rovers studied rocks '
                                                                                         'and soil to understand '
                                                                                         'ancient Martian '
                                                                                         'environments.',
 'Antena de alta ganancia': 'High-gain antenna',
 'Antes de acercarte a una roca, ¿qué revisarías?': 'Before approaching a rock, what should you check?',
 'Antes de despegar, ¿qué condición es esencial?': 'Before takeoff, what is essential?',
 'Apagar todos los instrumentos definitivamente': 'Permanently turn off all instruments',
 'Apollo 11 alunizó en el Mar de la Tranquilidad el 20 de julio de 1969. El módulo lunar Eagle transportó a Armstrong y Aldrin hasta la superficie.': 'Apollo '
                                                                                                                                                      '11 '
                                                                                                                                                      'landed '
                                                                                                                                                      'in '
                                                                                                                                                      'the '
                                                                                                                                                      'Sea '
                                                                                                                                                      'of '
                                                                                                                                                      'Tranquility '
                                                                                                                                                      'on '
                                                                                                                                                      'July '
                                                                                                                                                      '20, '
                                                                                                                                                      '1969. '
                                                                                                                                                      'The '
                                                                                                                                                      'Eagle '
                                                                                                                                                      'lunar '
                                                                                                                                                      'module '
                                                                                                                                                      'carried '
                                                                                                                                                      'Armstrong '
                                                                                                                                                      'and '
                                                                                                                                                      'Aldrin '
                                                                                                                                                      'to '
                                                                                                                                                      'the '
                                                                                                                                                      'surface.',
 'Apollo 17 fue la última misión tripulada del programa Apollo que aterrizó en la Luna. Sus astronautas utilizaron un vehículo lunar eléctrico para desplazarse por la superficie y estudiar distintos lugares.': 'Apollo '
                                                                                                                                                                                                                  '17 '
                                                                                                                                                                                                                  'was '
                                                                                                                                                                                                                  'the '
                                                                                                                                                                                                                  'last '
                                                                                                                                                                                                                  'crewed '
                                                                                                                                                                                                                  'Apollo '
                                                                                                                                                                                                                  'mission '
                                                                                                                                                                                                                  'to '
                                                                                                                                                                                                                  'land '
                                                                                                                                                                                                                  'on '
                                                                                                                                                                                                                  'the '
                                                                                                                                                                                                                  'Moon. '
                                                                                                                                                                                                                  'Its '
                                                                                                                                                                                                                  'astronauts '
                                                                                                                                                                                                                  'used '
                                                                                                                                                                                                                  'an '
                                                                                                                                                                                                                  'electric '
                                                                                                                                                                                                                  'lunar '
                                                                                                                                                                                                                  'rover '
                                                                                                                                                                                                                  'to '
                                                                                                                                                                                                                  'travel '
                                                                                                                                                                                                                  'across '
                                                                                                                                                                                                                  'the '
                                                                                                                                                                                                                  'surface '
                                                                                                                                                                                                                  'and '
                                                                                                                                                                                                                  'study '
                                                                                                                                                                                                                  'different '
                                                                                                                                                                                                                  'sites.',
 'Asientos de astronautas': 'Astronaut seats',
 'AÑO DE MISIÓN': 'MISSION YEAR',
 'Bienvenido a Marte': 'Welcome to Mars',
 'Brazo científico': 'Science arm',
 'Brazo de muestreo': 'Sampling arm',
 'Brazo instrumental': 'Instrument arm',
 'Brazo recolector de muestras': 'Sample collection arm',
 'CONOCIMIENTO DESBLOQUEADO': 'KNOWLEDGE UNLOCKED',
 'Calcular la profundidad del océano terrestre': 'Calculate the depth of Earth’s oceans',
 'Campamento de muestras': 'Sample collection site',
 'Capas de roca': 'Rock layers',
 'Cerrar información': 'Close information',
 'Ciencia de superficie': 'Surface science',
 'Combustible de un helicóptero': 'Helicopter fuel',
 'Comprende cómo Eagle dejó parte de sí en la Luna': 'Discover what Eagle left on the Moon',
 'Comprobar sistemas y condiciones de vuelo': 'Check systems and flight conditions',
 'Con imágenes y observaciones previas': 'With images and previous observations',
 'Con una foto de otro planeta': 'With a photo of another planet',
 'Conduce el vehículo de exploración': 'Drive the exploration rover',
 'Conduce o vuela hasta el círculo luminoso que marca la siguiente parada.': 'Drive or fly to the glowing circle '
                                                                             'marking your next stop.',
 'Conducir hasta otro cráter': 'Drive to another crater',
 'Conectar un cable eléctrico a la Tierra': 'Connect a power cable to Earth',
 'Convertían la luz del Sol en energía. Las tormentas de polvo podían reducir la energía disponible y afectar las operaciones.': 'They '
                                                                                                                                 'converted '
                                                                                                                                 'sunlight '
                                                                                                                                 'into '
                                                                                                                                 'electricity. '
                                                                                                                                 'Dust '
                                                                                                                                 'storms '
                                                                                                                                 'could '
                                                                                                                                 'reduce '
                                                                                                                                 'available '
                                                                                                                                 'power '
                                                                                                                                 'and '
                                                                                                                                 'affect '
                                                                                                                                 'operations.',
 'Cuando llegues al objetivo, la pregunta aparecerá aquí mismo. ¡No tienes que bajar!': 'Once you reach the target, '
                                                                                        'the question appears right '
                                                                                        'here. No scrolling needed!',
 'Cuatro ruedas diseñadas para desplazarse en el regolito lunar.': 'Four wheels designed to travel across the lunar '
                                                                   'regolith.',
 'Cuerpo y cámaras': 'Body and cameras',
 'Cámara de televisión': 'Television camera',
 'DESTINO': 'DESTINATION',
 'Decide cómo estudiar señales de agua antigua': 'Choose how to study signs of ancient water',
 'Desafío ': 'Challenge ',
 'Desafío ${idx+1}: ${name}': 'Challenge ${idx+1}: ${name}',
 'Descartar todas las imágenes': 'Discard all images',
 'Desplegar un helicóptero': 'Deploy a helicopter',
 'Desplázate hacia la baliza luminosa para desbloquear un descubrimiento.': 'Head toward the glowing beacon to '
                                                                            'unlock a discovery.',
 'Después de examinar el terreno, ¿qué evidencia documentarías?': 'After examining the terrain, what evidence would '
                                                                  'you record?',
 'Diseñado para realizar hasta cinco vuelos de prueba, completó 72. Su último vuelo ocurrió en enero de 2024 y ayudó a demostrar la utilidad de los vehículos aéreos para explorar otros mundos.': 'Designed '
                                                                                                                                                                                                   'for '
                                                                                                                                                                                                   'up '
                                                                                                                                                                                                   'to '
                                                                                                                                                                                                   'five '
                                                                                                                                                                                                   'test '
                                                                                                                                                                                                   'flights, '
                                                                                                                                                                                                   'Ingenuity '
                                                                                                                                                                                                   'completed '
                                                                                                                                                                                                   '72. '
                                                                                                                                                                                                   'Its '
                                                                                                                                                                                                   'last '
                                                                                                                                                                                                   'flight '
                                                                                                                                                                                                   'was '
                                                                                                                                                                                                   'in '
                                                                                                                                                                                                   'January '
                                                                                                                                                                                                   '2024, '
                                                                                                                                                                                                   'demonstrating '
                                                                                                                                                                                                   'the '
                                                                                                                                                                                                   'value '
                                                                                                                                                                                                   'of '
                                                                                                                                                                                                   'aerial '
                                                                                                                                                                                                   'vehicles '
                                                                                                                                                                                                   'for '
                                                                                                                                                                                                   'exploring '
                                                                                                                                                                                                   'other '
                                                                                                                                                                                                   'worlds.',
 'Documentar estratos y minerales': 'Document the layers and minerals',
 'Dos conjuntos de aspas contrarrotatorias generaban sustentación en la atmósfera tenue de Marte.': 'Two sets of '
                                                                                                    'counter-rotating '
                                                                                                    'blades '
                                                                                                    'generated lift '
                                                                                                    'in Mars’s thin '
                                                                                                    'atmosphere.',
 'Dos descubrimientos conseguidos': 'Two discoveries made',
 'Eagle · Etapa de descenso': 'Eagle · Descent stage',
 'El Lunar Roving Vehicle permanece en la superficie lunar. Aunque ya no se utiliza, es un testimonio físico de la exploración tripulada y sus avances científicos.': 'The '
                                                                                                                                                                      'Lunar '
                                                                                                                                                                      'Roving '
                                                                                                                                                                      'Vehicle '
                                                                                                                                                                      'remains '
                                                                                                                                                                      'on '
                                                                                                                                                                      'the '
                                                                                                                                                                      'Moon. '
                                                                                                                                                                      'Although '
                                                                                                                                                                      'it '
                                                                                                                                                                      'is '
                                                                                                                                                                      'no '
                                                                                                                                                                      'longer '
                                                                                                                                                                      'in '
                                                                                                                                                                      'use, '
                                                                                                                                                                      'it '
                                                                                                                                                                      'is '
                                                                                                                                                                      'a '
                                                                                                                                                                      'physical '
                                                                                                                                                                      'reminder '
                                                                                                                                                                      'of '
                                                                                                                                                                      'crewed '
                                                                                                                                                                      'exploration '
                                                                                                                                                                      'and '
                                                                                                                                                                      'scientific '
                                                                                                                                                                      'progress.',
 'El Lunar Roving Vehicle permitió recorrer mayores distancias y llevar herramientas y muestras.': 'The Lunar Roving '
                                                                                                   'Vehicle let '
                                                                                                   'astronauts '
                                                                                                   'travel farther '
                                                                                                   'and carry tools '
                                                                                                   'and samples.',
 'El brillo de las estrellas terrestres': 'The brightness of stars seen from Earth',
 'El clima de la Tierra': 'Earth’s weather',
 'El cohete Saturn V entero': 'The entire Saturn V rocket',
 'El color de la interfaz web': 'The color of the website interface',
 'El cuerpo alojaba electrónica, sensores y cámaras de navegación y fotografía del terreno.': 'The body housed '
                                                                                              'electronics, sensors, '
                                                                                              'and cameras for '
                                                                                              'navigation and '
                                                                                              'terrain photography.',
 'El dispositivo de muestreo recogió material marciano para analizarlo en los experimentos del aterrizador.': 'The '
                                                                                                              'sampling '
                                                                                                              'device '
                                                                                                              'collected '
                                                                                                              'Martian '
                                                                                                              'material '
                                                                                                              'for '
                                                                                                              'analysis '
                                                                                                              'by '
                                                                                                              'the '
                                                                                                              'lander’s '
                                                                                                              'experiments.',
 'El espectrómetro de rayos X de partículas alfa (APXS) ayudó a analizar la composición elemental de rocas y suelo.': 'The '
                                                                                                                      'Alpha '
                                                                                                                      'Particle '
                                                                                                                      'X-ray '
                                                                                                                      'Spectrometer '
                                                                                                                      '(APXS) '
                                                                                                                      'helped '
                                                                                                                      'analyze '
                                                                                                                      'the '
                                                                                                                      'elemental '
                                                                                                                      'composition '
                                                                                                                      'of '
                                                                                                                      'rocks '
                                                                                                                      'and '
                                                                                                                      'soil.',
 'El estudio de capas y minerales ayudó a Opportunity a reconstruir ambientes marcianos antiguos.': 'Studying layers '
                                                                                                    'and minerals '
                                                                                                    'helped '
                                                                                                    'Opportunity '
                                                                                                    'reconstruct '
                                                                                                    'ancient Martian '
                                                                                                    'environments.',
 'El explorador que superó sus límites': 'The explorer that exceeded expectations',
 'El instrumento Alpha Proton X-Ray Spectrometer estudiaba la composición elemental de rocas y suelo.': 'The Alpha '
                                                                                                        'Proton '
                                                                                                        'X-Ray '
                                                                                                        'Spectrometer '
                                                                                                        'studied the '
                                                                                                        'elemental '
                                                                                                        'makeup of '
                                                                                                        'rocks and '
                                                                                                        'soil.',
 'El muestreador de superficie': 'The surface sampler',
 'El módulo de mando Columbia': 'The Columbia command module',
 'El módulo de mando en órbita': 'The command module in orbit',
 'El módulo llevó experimentos para estudiar el ambiente y buscar señales de procesos biológicos. Sus resultados dieron forma a futuras investigaciones sobre Marte.': 'The '
                                                                                                                                                                       'lander '
                                                                                                                                                                       'carried '
                                                                                                                                                                       'experiments '
                                                                                                                                                                       'to '
                                                                                                                                                                       'study '
                                                                                                                                                                       'the '
                                                                                                                                                                       'environment '
                                                                                                                                                                       'and '
                                                                                                                                                                       'search '
                                                                                                                                                                       'for '
                                                                                                                                                                       'signs '
                                                                                                                                                                       'of '
                                                                                                                                                                       'biological '
                                                                                                                                                                       'processes. '
                                                                                                                                                                       'Its '
                                                                                                                                                                       'findings '
                                                                                                                                                                       'helped '
                                                                                                                                                                       'shape '
                                                                                                                                                                       'future '
                                                                                                                                                                       'Mars '
                                                                                                                                                                       'research.',
 'El origen de las estrellas': 'The origin of stars',
 'El primer vuelo motorizado en otro planeta': 'The first powered flight on another planet',
 'El robot que probó cómo era la superficie lunar': 'The robot that tested the lunar surface',
 'El rover aumentó la distancia que podían recorrer los astronautas y facilitó la recolección de muestras.': 'The '
                                                                                                             'rover '
                                                                                                             'let '
                                                                                                             'astronauts '
                                                                                                             'travel '
                                                                                                             'farther '
                                                                                                             'and '
                                                                                                             'made '
                                                                                                             'collecting '
                                                                                                             'samples '
                                                                                                             'easier.',
 'El rover quedó atrapado en suelo blando en 2009. Continuó realizando observaciones, pero dejó de comunicarse en 2010; NASA terminó los intentos de contacto en 2011.': 'The '
                                                                                                                                                                         'rover '
                                                                                                                                                                         'became '
                                                                                                                                                                         'stuck '
                                                                                                                                                                         'in '
                                                                                                                                                                         'soft '
                                                                                                                                                                         'soil '
                                                                                                                                                                         'in '
                                                                                                                                                                         '2009. '
                                                                                                                                                                         'It '
                                                                                                                                                                         'continued '
                                                                                                                                                                         'observing '
                                                                                                                                                                         'its '
                                                                                                                                                                         'surroundings '
                                                                                                                                                                         'but '
                                                                                                                                                                         'stopped '
                                                                                                                                                                         'communicating '
                                                                                                                                                                         'in '
                                                                                                                                                                         '2010; '
                                                                                                                                                                         'NASA '
                                                                                                                                                                         'ended '
                                                                                                                                                                         'contact '
                                                                                                                                                                         'attempts '
                                                                                                                                                                         'in '
                                                                                                                                                                         '2011.',
 'El rover sigue en Marte. Sus observaciones ayudan a los investigadores a comprender la historia del planeta y muestran el impacto que una misión robótica puede tener mucho después de su último contacto.': 'The '
                                                                                                                                                                                                               'rover '
                                                                                                                                                                                                               'remains '
                                                                                                                                                                                                               'on '
                                                                                                                                                                                                               'Mars. '
                                                                                                                                                                                                               'Its '
                                                                                                                                                                                                               'observations '
                                                                                                                                                                                                               'continue '
                                                                                                                                                                                                               'to '
                                                                                                                                                                                                               'help '
                                                                                                                                                                                                               'researchers '
                                                                                                                                                                                                               'understand '
                                                                                                                                                                                                               'the '
                                                                                                                                                                                                               'planet’s '
                                                                                                                                                                                                               'history '
                                                                                                                                                                                                               'and '
                                                                                                                                                                                                               'show '
                                                                                                                                                                                                               'how '
                                                                                                                                                                                                               'a '
                                                                                                                                                                                                               'robotic '
                                                                                                                                                                                                               'mission '
                                                                                                                                                                                                               'can '
                                                                                                                                                                                                               'matter '
                                                                                                                                                                                                               'long '
                                                                                                                                                                                                               'after '
                                                                                                                                                                                                               'its '
                                                                                                                                                                                                               'last '
                                                                                                                                                                                                               'signal.',
 'El rover transportaba herramientas e instrumentos para ampliar el recorrido científico de los astronautas.': 'The '
                                                                                                               'rover '
                                                                                                               'carried '
                                                                                                               'tools '
                                                                                                               'and '
                                                                                                               'instruments '
                                                                                                               'to '
                                                                                                               'extend '
                                                                                                               'astronauts’ '
                                                                                                               'scientific '
                                                                                                               'exploration.',
 'El rover utilizó un espectrómetro para investigar la composición de rocas y suelos, mientras el aterrizador aportaba imágenes y comunicaciones.': 'The '
                                                                                                                                                    'rover '
                                                                                                                                                    'used '
                                                                                                                                                    'a '
                                                                                                                                                    'spectrometer '
                                                                                                                                                    'to '
                                                                                                                                                    'investigate '
                                                                                                                                                    'the '
                                                                                                                                                    'composition '
                                                                                                                                                    'of '
                                                                                                                                                    'rocks '
                                                                                                                                                    'and '
                                                                                                                                                    'soil, '
                                                                                                                                                    'while '
                                                                                                                                                    'the '
                                                                                                                                                    'lander '
                                                                                                                                                    'provided '
                                                                                                                                                    'images '
                                                                                                                                                    'and '
                                                                                                                                                    'communications.',
 'El satélite Hubble': 'The Hubble telescope',
 'El silencio de Marte': 'Silence on Mars',
 'El sistema de comunicaciones permitió transmitir información científica desde Marte.': 'The communications system '
                                                                                         'transmitted scientific '
                                                                                         'data from Mars.',
 'El sistema de movilidad ayudó al pequeño rover a recorrer el terreno irregular cerca de Pathfinder.': 'The '
                                                                                                        'mobility '
                                                                                                        'system '
                                                                                                        'helped the '
                                                                                                        'small rover '
                                                                                                        'move across '
                                                                                                        'uneven '
                                                                                                        'ground near '
                                                                                                        'Pathfinder.',
 'El suelo lunar': 'Lunar soil',
 'El tren de aterrizaje distribuyó las fuerzas al entrar en contacto con la superficie.': 'The landing gear spread '
                                                                                          'the force of touchdown '
                                                                                          'across the surface.',
 'El vehículo lunar transportó a dos astronautas y equipo científico durante las excursiones de Apollo 17.': 'The '
                                                                                                             'lunar '
                                                                                                             'rover '
                                                                                                             'carried '
                                                                                                             'two '
                                                                                                             'astronauts '
                                                                                                             'and '
                                                                                                             'scientific '
                                                                                                             'equipment '
                                                                                                             'during '
                                                                                                             'Apollo '
                                                                                                             '17 '
                                                                                                             'excursions.',
 'El vehículo permitió transportar herramientas, cámaras y muestras, ampliando el alcance de la exploración humana y ayudando a estudiar la historia geológica de la Luna.': 'The '
                                                                                                                                                                             'rover '
                                                                                                                                                                             'carried '
                                                                                                                                                                             'tools, '
                                                                                                                                                                             'cameras, '
                                                                                                                                                                             'and '
                                                                                                                                                                             'samples, '
                                                                                                                                                                             'extending '
                                                                                                                                                                             'the '
                                                                                                                                                                             'reach '
                                                                                                                                                                             'of '
                                                                                                                                                                             'human '
                                                                                                                                                                             'exploration '
                                                                                                                                                                             'and '
                                                                                                                                                                             'helping '
                                                                                                                                                                             'scientists '
                                                                                                                                                                             'study '
                                                                                                                                                                             'the '
                                                                                                                                                                             'Moon’s '
                                                                                                                                                                             'geological '
                                                                                                                                                                             'history.',
 'El vehículo que amplió la exploración lunar': 'The vehicle that expanded lunar exploration',
 'El último capítulo': 'The final chapter',
 'Elegir una trayectoria segura es relevante para operar un rover pequeño sobre terreno irregular.': 'Choosing a '
                                                                                                     'safe route is '
                                                                                                     'important when '
                                                                                                     'driving a '
                                                                                                     'small rover '
                                                                                                     'over uneven '
                                                                                                     'ground.',
 'En junio de 2018, una gran tormenta de polvo redujo la luz solar disponible para sus paneles. Se perdió la comunicación y NASA declaró finalizada la misión en febrero de 2019.': 'In '
                                                                                                                                                                                    'June '
                                                                                                                                                                                    '2018, '
                                                                                                                                                                                    'a '
                                                                                                                                                                                    'major '
                                                                                                                                                                                    'dust '
                                                                                                                                                                                    'storm '
                                                                                                                                                                                    'reduced '
                                                                                                                                                                                    'sunlight '
                                                                                                                                                                                    'reaching '
                                                                                                                                                                                    'its '
                                                                                                                                                                                    'solar '
                                                                                                                                                                                    'panels. '
                                                                                                                                                                                    'Contact '
                                                                                                                                                                                    'was '
                                                                                                                                                                                    'lost, '
                                                                                                                                                                                    'and '
                                                                                                                                                                                    'NASA '
                                                                                                                                                                                    'declared '
                                                                                                                                                                                    'the '
                                                                                                                                                                                    'mission '
                                                                                                                                                                                    'complete '
                                                                                                                                                                                    'in '
                                                                                                                                                                                    'February '
                                                                                                                                                                                    '2019.',
 'En una visita a un sitio geológico, ¿qué registrarías?': 'When visiting a geological site, what would you record?',
 'Encuentra la baliza científica luminosa en el terreno.': 'Find the glowing science beacon on the terrain.',
 'Energía disponible para el rover': 'Energy available to the rover',
 'Escalera de acceso': 'Access ladder',
 'Espectrómetro APXS': 'APXS spectrometer',
 'Esperar que Marte tenga aire tan denso como la Tierra': 'Expect Mars to have air as dense as Earth’s',
 'Esta etapa sostuvo el alunizaje y quedó sobre el suelo lunar tras el despegue de la etapa superior.': 'This stage '
                                                                                                        'supported '
                                                                                                        'the Moon '
                                                                                                        'landing and '
                                                                                                        'remained on '
                                                                                                        'the lunar '
                                                                                                        'surface '
                                                                                                        'after the '
                                                                                                        'upper stage '
                                                                                                        'lifted off.',
 'Estación geológica lunar': 'Lunar geology station',
 'Este equipo no se desplazaba. Explora sus puntos azules para conocerlo.': 'This spacecraft did not move. Explore '
                                                                            'its blue hotspots to learn about it.',
 'Este panel recargaba las baterías que impulsaban los vuelos y sistemas de Ingenuity.': 'This panel charged the '
                                                                                         'batteries that powered '
                                                                                         'Ingenuity’s flights and '
                                                                                         'systems.',
 'Estudia la resistencia del suelo lunar': 'Study the strength of lunar soil',
 'Estudiar rocas': 'Studying rocks',
 'Evaluar riesgos y movimientos con cuidado': 'Carefully evaluate risks and possible movements',
 'Examina los puntos azules del equipo para empezar el reto.': 'Inspect the blue hotspots on the spacecraft to begin '
                                                               'the challenge.',
 'Exploración del terreno': 'Terrain exploration',
 'Exploración geológica': 'Geological exploration',
 'Explorar otra misión →': 'Explore another mission →',
 'Extracción de oxígeno de rocas': 'Extracting oxygen from rocks',
 'FIN DE MISIÓN': 'MISSION END',
 'FIN DEL ATERRIZADOR': 'LANDER MISSION END',
 'Fotografías y muestras con contexto del lugar': 'Photos and samples with their location context',
 'Generadores termoeléctricos': 'Thermoelectric generators',
 'Geología lunar': 'Lunar geology',
 'Geología y movilidad': 'Geology and mobility',
 'Geoquímica marciana': 'Martian geochemistry',
 'Huella científica': 'Scientific discoveries',
 'Huellas de la ingeniería': 'Engineering legacy',
 'INSIGNIA CONSEGUIDA': 'BADGE EARNED',
 'INSPECCIÓN CIENTÍFICA': 'SCIENTIFIC INSPECTION',
 'Ignorando el relieve circundante': 'By ignoring nearby terrain',
 'Imágenes y experimentos desde Marte': 'Images and experiments from Mars',
 'Imágenes y respuesta del suelo al muestreador': 'Images and how the soil responds to the sampler',
 'Ingeniería aeronáutica': 'Aeronautical engineering',
 'Ingeniería de superficie': 'Surface engineering',
 'Ingeniería lunar': 'Lunar engineering',
 'Ingenuity debía volar en una atmósfera marciana muy tenue, con controles de vuelo cuidadosamente planificados.': 'Ingenuity '
                                                                                                                   'had '
                                                                                                                   'to '
                                                                                                                   'fly '
                                                                                                                   'in '
                                                                                                                   'Mars’s '
                                                                                                                   'very '
                                                                                                                   'thin '
                                                                                                                   'atmosphere '
                                                                                                                   'using '
                                                                                                                   'carefully '
                                                                                                                   'planned '
                                                                                                                   'flight '
                                                                                                                   'controls.',
 'Ingenuity demostró el vuelo motorizado controlado en Marte y completó 72 vuelos entre 2021 y 2024.': 'Ingenuity '
                                                                                                       'demonstrated '
                                                                                                       'powered, '
                                                                                                       'controlled '
                                                                                                       'flight on '
                                                                                                       'Mars and '
                                                                                                       'completed 72 '
                                                                                                       'flights '
                                                                                                       'between 2021 '
                                                                                                       'and 2024.',
 'Ingenuity llegó a Marte junto a Perseverance y realizó su primer vuelo el 19 de abril de 2021. Fue el primer vuelo motorizado y controlado en otro planeta.': 'Ingenuity '
                                                                                                                                                                'arrived '
                                                                                                                                                                'on '
                                                                                                                                                                'Mars '
                                                                                                                                                                'with '
                                                                                                                                                                'Perseverance '
                                                                                                                                                                'and '
                                                                                                                                                                'made '
                                                                                                                                                                'its '
                                                                                                                                                                'first '
                                                                                                                                                                'flight '
                                                                                                                                                                'on '
                                                                                                                                                                'April '
                                                                                                                                                                '19, '
                                                                                                                                                                '2021. '
                                                                                                                                                                'It '
                                                                                                                                                                'was '
                                                                                                                                                                'the '
                                                                                                                                                                'first '
                                                                                                                                                                'powered, '
                                                                                                                                                                'controlled '
                                                                                                                                                                'flight '
                                                                                                                                                                'on '
                                                                                                                                                                'another '
                                                                                                                                                                'planet.',
 'Ingenuity · Helicóptero marciano': 'Ingenuity · Mars helicopter',
 'Iniciar vuelo': 'Start flight',
 'Inspecciona otro instrumento para comenzar el segundo reto.': 'Inspect another instrument to begin the second '
                                                                'challenge.',
 'Inspección de equipo estacionario': 'Inspect a stationary spacecraft',
 'Investiga un terreno marciano difícil': 'Explore challenging Martian terrain',
 'Investiga una roca con un pequeño rover': 'Investigate a rock with a small rover',
 'Investigación geológica': 'Geological research',
 'Ir al siguiente objetivo →': 'Go to the next target →',
 'La Pancam captaba panoramas estéreo y fotografías en distintas longitudes de onda para estudiar minerales y terreno. Fuente: NASA Mars Exploration Rovers / Science Instruments.': 'Pancam '
                                                                                                                                                                                     'captured '
                                                                                                                                                                                     'stereo '
                                                                                                                                                                                     'panoramas '
                                                                                                                                                                                     'and '
                                                                                                                                                                                     'images '
                                                                                                                                                                                     'at '
                                                                                                                                                                                     'different '
                                                                                                                                                                                     'wavelengths '
                                                                                                                                                                                     'to '
                                                                                                                                                                                     'study '
                                                                                                                                                                                     'minerals '
                                                                                                                                                                                     'and '
                                                                                                                                                                                     'terrain. '
                                                                                                                                                                                     'Source: '
                                                                                                                                                                                     'NASA '
                                                                                                                                                                                     'Mars '
                                                                                                                                                                                     'Exploration '
                                                                                                                                                                                     'Rovers '
                                                                                                                                                                                     '/ '
                                                                                                                                                                                     'Science '
                                                                                                                                                                                     'Instruments.',
 'La atmósfera de Júpiter': 'Jupiter’s atmosphere',
 'La cámara registró fotografías de la superficie de la Luna y apoyó los estudios de textura y relieve.': 'The '
                                                                                                          'camera '
                                                                                                          'photographed '
                                                                                                          'the lunar '
                                                                                                          'surface '
                                                                                                          'and '
                                                                                                          'helped '
                                                                                                          'scientists '
                                                                                                          'study its '
                                                                                                          'texture '
                                                                                                          'and '
                                                                                                          'terrain.',
 'La cápsula de retorno terrestre': 'The Earth-return capsule',
 'La documentación del sitio y las muestras aportan contexto para interpretar la geología lunar.': 'Documenting '
                                                                                                   'sites and '
                                                                                                   'samples provides '
                                                                                                   'context for '
                                                                                                   'interpreting '
                                                                                                   'lunar geology.',
 'La estructura inferior con sus patas quedó en la Luna. El modelo 3D es una representación simplificada.': 'The '
                                                                                                            'lower '
                                                                                                            'structure '
                                                                                                            'and its '
                                                                                                            'landing '
                                                                                                            'legs '
                                                                                                            'remained '
                                                                                                            'on the '
                                                                                                            'Moon. '
                                                                                                            'The 3D '
                                                                                                            'model '
                                                                                                            'is a '
                                                                                                            'simplified '
                                                                                                            'illustration.',
 'La estructura que permaneció en la Luna': 'The spacecraft section left on the Moon',
 'La etapa de ascenso salió desde la etapa de descenso, que permanece en la superficie.': 'The ascent stage launched '
                                                                                          'from the descent stage, '
                                                                                          'which remains on the '
                                                                                          'surface.',
 'La etapa de descenso': 'The descent stage',
 'La etapa de descenso del módulo Eagle quedó sobre la Luna cuando su etapa de ascenso despegó para reunirse con el módulo de mando.': 'Eagle’s '
                                                                                                                                       'descent '
                                                                                                                                       'stage '
                                                                                                                                       'remained '
                                                                                                                                       'on '
                                                                                                                                       'the '
                                                                                                                                       'Moon '
                                                                                                                                       'when '
                                                                                                                                       'the '
                                                                                                                                       'ascent '
                                                                                                                                       'stage '
                                                                                                                                       'lifted '
                                                                                                                                       'off '
                                                                                                                                       'to '
                                                                                                                                       'rejoin '
                                                                                                                                       'the '
                                                                                                                                       'command '
                                                                                                                                       'module.',
 'La etapa inferior sirvió como plataforma de lanzamiento de la etapa de ascenso.': 'The lower stage served as the '
                                                                                    'launch platform for the ascent '
                                                                                    'stage.',
 'La geología y las evidencias de agua antigua en Marte': 'Geology and evidence of ancient water on Mars',
 'La llegada': 'Arrival on Mars',
 'La seguridad del terreno y la trayectoria': 'The terrain and a safe path',
 'La temperatura del océano terrestre': 'The temperature of Earth’s ocean',
 'Laboratorio científico': 'Science laboratory',
 'Las cámaras y observaciones del rover ayudaban a elegir objetivos científicos y rutas.': 'The rover’s cameras and '
                                                                                           'observations helped '
                                                                                           'scientists choose '
                                                                                           'targets and routes.',
 'Las imágenes junto con la interacción mecánica ayudaban a comprender mejor el suelo. Esta elección es una simulación educativa.': 'Images '
                                                                                                                                    'and '
                                                                                                                                    'mechanical '
                                                                                                                                    'tests '
                                                                                                                                    'helped '
                                                                                                                                    'scientists '
                                                                                                                                    'better '
                                                                                                                                    'understand '
                                                                                                                                    'the '
                                                                                                                                    'soil. '
                                                                                                                                    'This '
                                                                                                                                    'choice '
                                                                                                                                    'is '
                                                                                                                                    'part '
                                                                                                                                    'of '
                                                                                                                                    'an '
                                                                                                                                    'educational '
                                                                                                                                    'simulation.',
 'Las nubes de Venus': 'The clouds of Venus',
 'Las pruebas de la superficie contribuyeron a estudiar la consistencia del suelo lunar. Los astronautas de Apollo 12 visitaron después el lugar y recuperaron componentes del módulo.': 'Surface '
                                                                                                                                                                                         'tests '
                                                                                                                                                                                         'helped '
                                                                                                                                                                                         'scientists '
                                                                                                                                                                                         'understand '
                                                                                                                                                                                         'the '
                                                                                                                                                                                         'lunar '
                                                                                                                                                                                         'soil. '
                                                                                                                                                                                         'Apollo '
                                                                                                                                                                                         '12 '
                                                                                                                                                                                         'astronauts '
                                                                                                                                                                                         'later '
                                                                                                                                                                                         'visited '
                                                                                                                                                                                         'the '
                                                                                                                                                                                         'site '
                                                                                                                                                                                         'and '
                                                                                                                                                                                         'retrieved '
                                                                                                                                                                                         'parts '
                                                                                                                                                                                         'of '
                                                                                                                                                                                         'the '
                                                                                                                                                                                         'lander.',
 'Lo que permanece': 'What remains',
 'Lo que quedó atrás': 'What was left behind',
 'Los RTG proporcionaron energía eléctrica utilizando el calor de la desintegración radiactiva.': 'The RTGs '
                                                                                                  'generated '
                                                                                                  'electricity using '
                                                                                                  'heat from '
                                                                                                  'radioactive '
                                                                                                  'decay.',
 'Los astronautas deben despegar de la Luna. ¿Qué parte permanece como plataforma?': 'The astronauts must leave the '
                                                                                     'Moon. Which part stays behind '
                                                                                     'as a launch platform?',
 'Los astronautas descendieron del módulo lunar hacia la superficie mediante una escalera.': 'Astronauts climbed '
                                                                                             'down a ladder from the '
                                                                                             'lunar module to the '
                                                                                             'surface.',
 'Los instrumentos del brazo examinaban materiales de la superficie para reconstruir antiguos ambientes marcianos.': 'Instruments '
                                                                                                                     'on '
                                                                                                                     'the '
                                                                                                                     'arm '
                                                                                                                     'examined '
                                                                                                                     'surface '
                                                                                                                     'materials '
                                                                                                                     'to '
                                                                                                                     'learn '
                                                                                                                     'about '
                                                                                                                     'ancient '
                                                                                                                     'Martian '
                                                                                                                     'environments.',
 'Los océanos terrestres': 'Earth’s oceans',
 'Los paneles solares alimentaban los sistemas científicos y de movilidad del rover.': 'Solar panels powered the '
                                                                                       'rover’s scientific '
                                                                                       'instruments and mobility '
                                                                                       'systems.',
 'Los resultados de experimentos relacionados con posibles procesos biológicos no equivalen por sí solos a demostrar la existencia de vida.': 'Experiments '
                                                                                                                                              'that '
                                                                                                                                              'investigate '
                                                                                                                                              'possible '
                                                                                                                                              'biological '
                                                                                                                                              'processes '
                                                                                                                                              'do '
                                                                                                                                              'not, '
                                                                                                                                              'on '
                                                                                                                                              'their '
                                                                                                                                              'own, '
                                                                                                                                              'prove '
                                                                                                                                              'life '
                                                                                                                                              'exists.',
 'Límite de la zona de exploración: cambia de dirección.': 'Exploration zone boundary: change direction.',
 'Modo inspección activado.': 'Inspection mode enabled.',
 'Modo inspección: gira el modelo y selecciona sus instrumentos.': 'Inspection mode: rotate the model and select its '
                                                                   'instruments.',
 'Muestreador de superficie': 'Surface sampler',
 'Muestreador del suelo lunar': 'Lunar soil sampler',
 'Más allá de la demostración': 'Beyond the demonstration',
 'NASA confirmó 72 vuelos durante su misión en Marte.': 'NASA confirmed 72 flights during its Mars mission.',
 'OBJETIVO ': 'OBJECTIVE ',
 'OBJETIVO ${idx+1} DE ${steps.length}': 'OBJECTIVE ${idx+1} OF ${steps.length}',
 'OBJETIVO ALCANZADO': 'TARGET REACHED',
 'OPERACIÓN EN MARTE': 'MARS OPERATIONS',
 'Observas capas en una formación rocosa. ¿Qué harías para interpretarlas?': 'You notice layers in a rock formation. '
                                                                             'How would you interpret them?',
 'Opera un laboratorio estacionario en Marte': 'Operate a stationary laboratory on Mars',
 'Opportunity dependía de paneles solares y la gran tormenta de polvo de 2018 redujo su acceso a la energía solar.': 'Opportunity '
                                                                                                                     'relied '
                                                                                                                     'on '
                                                                                                                     'solar '
                                                                                                                     'panels, '
                                                                                                                     'and '
                                                                                                                     'the '
                                                                                                                     'great '
                                                                                                                     '2018 '
                                                                                                                     'dust '
                                                                                                                     'storm '
                                                                                                                     'reduced '
                                                                                                                     'its '
                                                                                                                     'access '
                                                                                                                     'to '
                                                                                                                     'solar '
                                                                                                                     'energy.',
 'Opportunity llegó a Marte en enero de 2004. Su misión estaba diseñada para operar durante 90 soles, pero el rover siguió recorriendo la superficie marciana durante casi 15 años.': 'Opportunity '
                                                                                                                                                                                      'arrived '
                                                                                                                                                                                      'on '
                                                                                                                                                                                      'Mars '
                                                                                                                                                                                      'in '
                                                                                                                                                                                      'January '
                                                                                                                                                                                      '2004. '
                                                                                                                                                                                      'The '
                                                                                                                                                                                      'mission '
                                                                                                                                                                                      'was '
                                                                                                                                                                                      'designed '
                                                                                                                                                                                      'to '
                                                                                                                                                                                      'last '
                                                                                                                                                                                      '90 '
                                                                                                                                                                                      'sols, '
                                                                                                                                                                                      'but '
                                                                                                                                                                                      'the '
                                                                                                                                                                                      'rover '
                                                                                                                                                                                      'continued '
                                                                                                                                                                                      'exploring '
                                                                                                                                                                                      'the '
                                                                                                                                                                                      'Martian '
                                                                                                                                                                                      'surface '
                                                                                                                                                                                      'for '
                                                                                                                                                                                      'almost '
                                                                                                                                                                                      '15 '
                                                                                                                                                                                      'years.',
 'Opportunity utilizaba paneles solares y una tormenta global de polvo redujo la energía disponible. NASA concluyó la misión en 2019.': 'Opportunity '
                                                                                                                                        'relied '
                                                                                                                                        'on '
                                                                                                                                        'solar '
                                                                                                                                        'panels, '
                                                                                                                                        'and '
                                                                                                                                        'a '
                                                                                                                                        'global '
                                                                                                                                        'dust '
                                                                                                                                        'storm '
                                                                                                                                        'cut '
                                                                                                                                        'its '
                                                                                                                                        'power '
                                                                                                                                        'supply. '
                                                                                                                                        'NASA '
                                                                                                                                        'ended '
                                                                                                                                        'the '
                                                                                                                                        'mission '
                                                                                                                                        'in '
                                                                                                                                        '2019.',
 'Oxígeno para una tripulación humana': 'Oxygen for a human crew',
 'PLAN ORIGINAL': 'ORIGINAL PLAN',
 'PREGUNTA CIENTÍFICA': 'SCIENCE QUESTION',
 'PRIMER VUELO': 'FIRST FLIGHT',
 'PRIMERA LLEGADA TRIPULADA': 'FIRST CREWED LANDING',
 'Pancam: cámaras panorámicas': 'Pancam: panoramic cameras',
 'Panel solar': 'Solar panel',
 'Paneles solares': 'Solar panels',
 'Para estudiar el suelo junto al aterrizador, ¿qué acción sería razonable?': 'To study soil beside the lander, what '
                                                                              'would be a reasonable action?',
 'Para producir oxígeno en la Luna': 'To produce oxygen on the Moon',
 'Para transportar astronautas y material científico': 'To transport astronauts and scientific equipment',
 'Para viajar desde la Luna hasta Marte': 'To travel from the Moon to Mars',
 'Parada ': 'Stop ',
 'Parada ${idx+1}: ${name}': 'Stop ${idx+1}: ${name}',
 'Pata y platillo de apoyo': 'Landing leg and footpad',
 'Patas de aterrizaje': 'Landing legs',
 'Patas y estructura de la etapa de descenso': 'The legs and structure of the descent stage',
 'Pequeño vehículo, gran paso tecnológico': 'Small rover, giant technological leap',
 'Permitía acercar instrumentos a las rocas y el suelo para obtener mediciones científicas. Incluía un instrumento de abrasión de rocas.': 'It '
                                                                                                                                           'positioned '
                                                                                                                                           'instruments '
                                                                                                                                           'next '
                                                                                                                                           'to '
                                                                                                                                           'rocks '
                                                                                                                                           'and '
                                                                                                                                           'soil '
                                                                                                                                           'to '
                                                                                                                                           'take '
                                                                                                                                           'scientific '
                                                                                                                                           'measurements, '
                                                                                                                                           'including '
                                                                                                                                           'with '
                                                                                                                                           'a '
                                                                                                                                           'rock '
                                                                                                                                           'abrasion '
                                                                                                                                           'tool.',
 'Pilota Ingenuity': 'Pilot Ingenuity',
 'Planifica una excursión geológica lunar': 'Plan a lunar geology expedition',
 'Plataforma de descenso': 'Descent platform',
 'Porque cualquier gas detectado confirma organismos': 'Because detecting any gas confirms organisms',
 'Porque la cámara prueba vida por sí sola': 'Because the camera alone proves life exists',
 'Porque los experimentos requieren análisis y contexto': 'Because experiments require careful analysis and context',
 'Prepara un vuelo experimental en Marte': 'Prepare an experimental flight on Mars',
 'Primer contacto con el suelo': 'First contact with the ground',
 'Primera zona de vuelo': 'First flight zone',
 'Pulsa uno de los puntos azules sobre la nave para abrir esta pregunta.': 'Click a blue hotspot on the spacecraft '
                                                                           'to unlock the question.',
 'RECREACIÓN 3D EDUCATIVA': 'EDUCATIONAL 3D RECREATION',
 'RETO BLOQUEADO': 'CHALLENGE LOCKED',
 'Recoger una muestra con el brazo': 'Collect a sample with the robotic arm',
 'Recorrido: ': 'Distance: ',
 'Registro de imágenes': 'Image documentation',
 'Roca de estudio APXS': 'APXS study rock',
 'Roca de interés geológico': 'Geologically interesting rock',
 'Roca misteriosa': 'Mysterious rock',
 'Roca para análisis APXS': 'Rock for APXS analysis',
 'Rotores coaxiales': 'Coaxial rotors',
 'Ruedas para suelo lunar': 'Wheels for lunar soil',
 'Ruta segura': 'Safe route',
 'Salir del simulador': 'Exit simulator',
 'Segundo punto de aterrizaje': 'Second landing site',
 'Si las ruedas pierden tracción en suelo blando, ¿qué priorizarías?': 'If the wheels lose traction in soft soil, '
                                                                       'what would you prioritize?',
 'Sistema de seis ruedas': 'Six-wheel system',
 'Sojourner fue parte de la misión Mars Pathfinder de 1997.': 'Sojourner was part of the 1997 Mars Pathfinder '
                                                              'mission.',
 'Sojourner llegó junto a Mars Pathfinder el 4 de julio de 1997. Demostró que un vehículo robótico podía desplazarse y estudiar el entorno de Marte.': 'Sojourner '
                                                                                                                                                       'arrived '
                                                                                                                                                       'with '
                                                                                                                                                       'Mars '
                                                                                                                                                       'Pathfinder '
                                                                                                                                                       'on '
                                                                                                                                                       'July '
                                                                                                                                                       '4, '
                                                                                                                                                       '1997. '
                                                                                                                                                       'It '
                                                                                                                                                       'showed '
                                                                                                                                                       'that '
                                                                                                                                                       'a '
                                                                                                                                                       'robotic '
                                                                                                                                                       'rover '
                                                                                                                                                       'could '
                                                                                                                                                       'move '
                                                                                                                                                       'around '
                                                                                                                                                       'and '
                                                                                                                                                       'study '
                                                                                                                                                       'its '
                                                                                                                                                       'surroundings '
                                                                                                                                                       'on '
                                                                                                                                                       'Mars.',
 'Sojourner utilizaba células solares como fuente principal de energía y contaba también con baterías.': 'Sojourner '
                                                                                                         'used solar '
                                                                                                         'cells as '
                                                                                                         'its main '
                                                                                                         'power '
                                                                                                         'source and '
                                                                                                         'also '
                                                                                                         'carried '
                                                                                                         'batteries.',
 'Sojourner · Primer rover de NASA en Marte': 'Sojourner · NASA’s first Mars rover',
 'Solo el color de una bandera': 'Only the color of a flag',
 'Solo la velocidad del vehículo': 'Only the rover’s speed',
 'Spirit aterrizó en Marte en enero de 2004 junto con su rover gemelo Opportunity, con el objetivo de investigar la geología marciana y buscar señales de actividad antigua del agua.': 'Spirit '
                                                                                                                                                                                        'landed '
                                                                                                                                                                                        'on '
                                                                                                                                                                                        'Mars '
                                                                                                                                                                                        'in '
                                                                                                                                                                                        'January '
                                                                                                                                                                                        '2004 '
                                                                                                                                                                                        'along '
                                                                                                                                                                                        'with '
                                                                                                                                                                                        'its '
                                                                                                                                                                                        'twin '
                                                                                                                                                                                        'rover '
                                                                                                                                                                                        'Opportunity '
                                                                                                                                                                                        'to '
                                                                                                                                                                                        'study '
                                                                                                                                                                                        'Martian '
                                                                                                                                                                                        'geology '
                                                                                                                                                                                        'and '
                                                                                                                                                                                        'look '
                                                                                                                                                                                        'for '
                                                                                                                                                                                        'signs '
                                                                                                                                                                                        'of '
                                                                                                                                                                                        'ancient '
                                                                                                                                                                                        'water '
                                                                                                                                                                                        'activity.',
 'Spirit halló evidencias de ambientes marcianos antiguos relacionados con agua, aportando información fundamental a la historia geológica del planeta.': 'Spirit '
                                                                                                                                                          'found '
                                                                                                                                                          'evidence '
                                                                                                                                                          'of '
                                                                                                                                                          'ancient '
                                                                                                                                                          'Martian '
                                                                                                                                                          'environments '
                                                                                                                                                          'shaped '
                                                                                                                                                          'by '
                                                                                                                                                          'water, '
                                                                                                                                                          'providing '
                                                                                                                                                          'important '
                                                                                                                                                          'clues '
                                                                                                                                                          'about '
                                                                                                                                                          'the '
                                                                                                                                                          'planet’s '
                                                                                                                                                          'geological '
                                                                                                                                                          'history.',
 'Spirit quedó atascado en 2009; los equipos estudiaron opciones de movimiento y después continuaron haciendo ciencia estacionaria.': 'Spirit '
                                                                                                                                      'became '
                                                                                                                                      'stuck '
                                                                                                                                      'in '
                                                                                                                                      '2009; '
                                                                                                                                      'its '
                                                                                                                                      'team '
                                                                                                                                      'evaluated '
                                                                                                                                      'possible '
                                                                                                                                      'movements, '
                                                                                                                                      'then '
                                                                                                                                      'continued '
                                                                                                                                      'doing '
                                                                                                                                      'stationary '
                                                                                                                                      'science.',
 'Su muestreador pudo excavar y manipular el material de la superficie lunar; ayudó a estudiar sus propiedades.': 'Its '
                                                                                                                  'sampler '
                                                                                                                  'could '
                                                                                                                  'dig '
                                                                                                                  'into '
                                                                                                                  'and '
                                                                                                                  'move '
                                                                                                                  'lunar '
                                                                                                                  'material, '
                                                                                                                  'helping '
                                                                                                                  'scientists '
                                                                                                                  'study '
                                                                                                                  'its '
                                                                                                                  'properties.',
 'Surveyor 3 aterrizó en la Luna el 20 de abril de 1967. Su cámara y su dispositivo de muestreo permitieron investigar la superficie lunar antes de los alunizajes tripulados.': 'Surveyor '
                                                                                                                                                                                 '3 '
                                                                                                                                                                                 'landed '
                                                                                                                                                                                 'on '
                                                                                                                                                                                 'the '
                                                                                                                                                                                 'Moon '
                                                                                                                                                                                 'on '
                                                                                                                                                                                 'April '
                                                                                                                                                                                 '20, '
                                                                                                                                                                                 '1967. '
                                                                                                                                                                                 'Its '
                                                                                                                                                                                 'camera '
                                                                                                                                                                                 'and '
                                                                                                                                                                                 'sampling '
                                                                                                                                                                                 'device '
                                                                                                                                                                                 'helped '
                                                                                                                                                                                 'scientists '
                                                                                                                                                                                 'study '
                                                                                                                                                                                 'the '
                                                                                                                                                                                 'lunar '
                                                                                                                                                                                 'surface '
                                                                                                                                                                                 'before '
                                                                                                                                                                                 'crewed '
                                                                                                                                                                                 'landings.',
 'Surveyor 3 contó con un muestreador de superficie para examinar el suelo lunar.': 'Surveyor 3 used a surface '
                                                                                    'sampler to examine lunar soil.',
 'Surveyor 3 necesita conocer la consistencia del suelo. ¿Qué instrumento sería útil?': 'Surveyor 3 needs to test '
                                                                                        'the soil. Which instrument '
                                                                                        'would be useful?',
 'Surveyor 3 · Aterrizador lunar': 'Surveyor 3 · Lunar lander',
 'Sus cámaras estereoscópicas permitían observar el paisaje y apoyar la selección de sitios de estudio.': 'Its '
                                                                                                          'stereo '
                                                                                                          'cameras '
                                                                                                          'helped '
                                                                                                          'observe '
                                                                                                          'the '
                                                                                                          'landscape '
                                                                                                          'and '
                                                                                                          'choose '
                                                                                                          'study '
                                                                                                          'sites.',
 'Terreno de difícil tracción': 'Low-traction terrain',
 'Todo el cohete Saturn V': 'The entire Saturn V rocket',
 'Tormenta de polvo': 'Dust storm',
 'Transporte de astronautas': 'Transporting astronauts',
 'Transporte de astronautas y equipo': 'Transporting astronauts and equipment',
 'Tres patas con apoyos distribuyeron la carga del aterrizador sobre el regolito lunar.': 'Three landing legs spread '
                                                                                          'the lander’s weight '
                                                                                          'across the lunar soil.',
 'Tu descubrimiento ha quedado registrado.': 'Your discovery has been recorded.',
 'Tus conocimientos hacen avanzar la exploración. ¿Qué tal si visitas otra misión?': 'Your knowledge helps '
                                                                                     'exploration move forward. '
                                                                                     'Ready to visit another '
                                                                                     'mission?',
 'Un aterrizador estacionario': 'A stationary lander',
 'Un aterrizaje histórico': 'A historic landing',
 'Un brazo equipado con pala excavó y manipuló el suelo para estudiar su comportamiento.': 'A robotic arm with a '
                                                                                           'scoop dug into and moved '
                                                                                           'the soil to study its '
                                                                                           'behavior.',
 'Un comienzo inesperado': 'An unexpected beginning',
 'Un despegue sin precedentes': 'An unprecedented takeoff',
 'Un experimento con legado': 'An experiment with a legacy',
 'Un helicóptero': 'A helicopter',
 'Un laboratorio remoto': 'A remote laboratory',
 'Un laboratorio submarino': 'An underwater laboratory',
 'Un legado que permanece': 'An enduring legacy',
 'Un motor para salir de la órbita lunar': 'An engine to leave lunar orbit',
 'Un panel solar usado como cámara': 'A solar panel used as a camera',
 'Un planeta con historia': 'A planet with a past',
 'Un propulsor de ascenso': 'An ascent thruster',
 'Un rover de seis ruedas': 'A six-wheeled rover',
 'Un vehículo para otro mundo': 'A vehicle for another world',
 'Una antena de televisión terrestre': 'An Earth television antenna',
 'Una antena de transmisión': 'A radio antenna',
 'Una erupción volcánica en el lugar del rover': 'A volcanic eruption near the rover',
 'Una falla en el lanzamiento desde la Tierra': 'A launch failure on Earth',
 'Una nueva forma de explorar': 'A new way to explore',
 'Una tormenta de polvo que redujo la luz solar': 'A dust storm that blocked sunlight',
 'Una tormenta de polvo reduce la luz solar. ¿Qué recurso resulta crítico?': 'A dust storm blocks sunlight. Which '
                                                                             'resource becomes critical?',
 'Usa E para despegar y luego avanza hasta la baliza.': 'Press E to take off, then head toward the beacon.',
 'VE A LA BALIZA LUMINOSA': 'GO TO THE GLOWING BEACON',
 'VISITADO POR APOLO 12': 'VISITED BY APOLLO 12',
 'VUELOS': 'FLIGHTS',
 'Ver mi recompensa ★': 'View my reward ★',
 'Ves una roca prometedora a distancia. ¿Cómo evaluarías el objetivo?': 'You spot an interesting rock in the '
                                                                        'distance. How would you assess it?',
 'Viking 1 aterrizó en Chryse Planitia el 20 de julio de 1976 y transmitió imágenes de la superficie marciana.': 'Viking '
                                                                                                                 '1 '
                                                                                                                 'landed '
                                                                                                                 'in '
                                                                                                                 'Chryse '
                                                                                                                 'Planitia '
                                                                                                                 'on '
                                                                                                                 'July '
                                                                                                                 '20, '
                                                                                                                 '1976, '
                                                                                                                 'and '
                                                                                                                 'transmitted '
                                                                                                                 'images '
                                                                                                                 'of '
                                                                                                                 'the '
                                                                                                                 'Martian '
                                                                                                                 'surface.',
 'Viking 1 contaba con un aterrizador fijo y un orbitador.': 'Viking 1 included a stationary lander and an orbiter.',
 'Viking 1 era un aterrizador fijo con un brazo para recolectar material de la superficie.': 'Viking 1 was a '
                                                                                             'stationary lander with '
                                                                                             'an arm for collecting '
                                                                                             'surface material.',
 'Viking 1 · Aterrizador': 'Viking 1 · Lander',
 'Vuelo motorizado y controlado en otro planeta': 'Powered, controlled flight on another planet',
 'WASD/flechas: avanzar, retroceder y girar · M: cambiar cámara': 'WASD/arrow keys: forward, backward, and turn · M: '
                                                                  'change camera',
 'WASD/flechas: moverse y girar · E: ascender · Q: descender · M: cambiar cámara': 'WASD/arrow keys: move and turn · '
                                                                                   'E: ascend · Q: descend · M: '
                                                                                   'change camera',
 'Ya conoces algo nuevo sobre este equipo espacial.': 'You just learned something new about this spacecraft.',
 'Ya habías ganado los puntos de este reto.': 'You have already earned points for this challenge.',
 'Zona de vuelo experimental': 'Experimental flight zone',
 "destinationFilter==='LUNA'?'la Luna':'Marte'": "destinationFilter==='LUNA'?'the Moon':'Mars'",
 '¡Buen trabajo! Ahora ve a la siguiente baliza luminosa.': 'Great job! Now head to the next glowing beacon.',
 '¡DESCUBRIMIENTO CONSEGUIDO!': 'DISCOVERY MADE!',
 '¡EXPEDICIÓN COMPLETA!': 'EXPEDITION COMPLETE!',
 '¡Explorador estelar!': 'Star explorer!',
 '¡Gran trabajo, explorador!': 'Great job, explorer!',
 '¡MISIÓN SUPERADA!': 'MISSION COMPLETE!',
 '¡No tienes que bajar!': 'No scrolling needed!',
 '¡Objetivo alcanzado! Responde la pregunta del Centro de control, justo a la derecha.': 'Target reached! Answer the '
                                                                                         'question in Mission '
                                                                                         'Control, right beside you.',
 '¡Ya ayudaste a descubrir la ciencia detrás de esta misión!': 'You helped uncover the science behind this mission!',
 '¡Ya puedes responder en el Centro de control!': 'You can now answer in Mission Control!',
 '«Antes de caminar sobre la Luna, necesitábamos saber si el suelo podría sostenernos».': '“Before walking on the '
                                                                                          'Moon, we needed to know '
                                                                                          'whether the ground could '
                                                                                          'support us.”',
 '«Cuando los astronautas partieron, una parte de su vehículo siguió aquí».': '“When the astronauts departed, part '
                                                                              'of their spacecraft stayed here.”',
 '«Despegué sobre Marte y demostré que una nueva forma de explorar era posible».': '“I lifted off above Mars and '
                                                                                   'showed that a new way of '
                                                                                   'exploring was possible.”',
 '«Fui diseñado para durar 90 días marcianos; mi historia se extendió durante casi quince años».': '“I was designed '
                                                                                                   'to last 90 '
                                                                                                   'Martian days; my '
                                                                                                   'story continued '
                                                                                                   'for almost '
                                                                                                   'fifteen years.”',
 '«Fui uno de los primeros laboratorios de NASA en trabajar directamente sobre Marte».': '“I was among NASA’s first '
                                                                                         'laboratories to work '
                                                                                         'directly on Mars.”',
 '«Mi pequeño recorrido abrió el camino para vehículos cada vez más capaces».': '“My short journey paved the way for '
                                                                                'ever more capable vehicles.”',
 '«Mi viaje se detuvo, pero los descubrimientos que ayudé a realizar continuaron su camino».': '“My journey ended, '
                                                                                               'but the discoveries '
                                                                                               'I helped make lived '
                                                                                               'on.”',
 '«Transporté exploradores humanos por un mundo donde antes solo habían llegado unos pocos pasos».': '“I carried '
                                                                                                     'human '
                                                                                                     'explorers '
                                                                                                     'across a world '
                                                                                                     'where only a '
                                                                                                     'few footsteps '
                                                                                                     'had reached '
                                                                                                     'before.”',
 '¿Cuántos vuelos completó Ingenuity?': 'How many flights did Ingenuity complete?',
 '¿Para qué ayudaba principalmente el vehículo lunar de Apollo 17?': 'What was the main purpose of the Apollo 17 '
                                                                     'lunar rover?',
 '¿Por qué la interpretación de resultados biológicos exige prudencia?': 'Why must biological experiment results be '
                                                                         'interpreted carefully?',
 '¿Qué buscaban investigar Spirit y Opportunity?': 'What were Spirit and Opportunity sent to investigate?',
 '¿Qué conviene identificar en una reconstrucción de lo que quedó?': 'What should you identify in a reconstruction '
                                                                     'of what remains?',
 '¿Qué estudió Surveyor 3 directamente en la Luna?': 'What did Surveyor 3 study directly on the Moon?',
 '¿Qué factor contribuyó a que Opportunity dejara de comunicarse en 2018?': 'What contributed to Opportunity losing '
                                                                            'contact in 2018?',
 '¿Qué instrumento ayuda a medir la composición de una roca?': 'Which instrument helps measure a rock’s composition?',
 '¿Qué logro verificó Ingenuity con sus vuelos?': 'What did Ingenuity demonstrate with its flights?',
 '¿Qué misión llevó a Sojourner a Marte?': 'Which mission brought Sojourner to Mars?',
 '¿Qué parte del módulo lunar Eagle quedó sobre la Luna?': 'Which part of the Eagle lunar module stayed on the Moon?',
 '¿Qué recurso del vehículo permite ampliar el alcance de una excursión?': 'Which rover feature lets astronauts '
                                                                           'explore farther?',
 '¿Qué tipo de vehículo era Viking 1 en la superficie?': 'What kind of vehicle was Viking 1 on the surface?',
 'Área de equipamiento': 'Equipment area',
 'ÚLTIMA SEÑAL': 'LAST SIGNAL',
 'ÚLTIMO VUELO': 'LAST FLIGHT',
 '● MODELO 3D INTERACTIVO': '● INTERACTIVE 3D MODEL',
 '◐ Atardecer': '◐ Sunset',
 '☀ Vista diurna': '☀ Day view',
 '✦ +100 puntos': '✦ +100 points',
 '🌟 ¡Respuesta correcta! ': '🌟 Correct answer! ',
 '🏅 ¡Guardián de las estrellas!': '🏅 Guardian of the Stars!',
 '💡 Buen intento. ': '💡 Good try. ',
 '🚀 Explorar misión': '🚀 Explore mission'}
H = {', no transmisiones auténticas. Los ocho modelos 3D y sus terrenos son recreaciones artísticas construidas con geometría, no reconstrucciones exactas ni modelos oficiales de NASA. Las actividades y los desplazamientos son simulaciones didácticas; sus velocidades, distancias y vuelos no representan telemetría real de NASA.': ', '
                                                                                                                                                                                                                                                                                                                                       'not '
                                                                                                                                                                                                                                                                                                                                       'authentic '
                                                                                                                                                                                                                                                                                                                                       'transmissions. '
                                                                                                                                                                                                                                                                                                                                       'The '
                                                                                                                                                                                                                                                                                                                                       'eight '
                                                                                                                                                                                                                                                                                                                                       '3D '
                                                                                                                                                                                                                                                                                                                                       'spacecraft '
                                                                                                                                                                                                                                                                                                                                       'models '
                                                                                                                                                                                                                                                                                                                                       'and '
                                                                                                                                                                                                                                                                                                                                       'landscapes '
                                                                                                                                                                                                                                                                                                                                       'are '
                                                                                                                                                                                                                                                                                                                                       'artistic '
                                                                                                                                                                                                                                                                                                                                       'geometric '
                                                                                                                                                                                                                                                                                                                                       'illustrations, '
                                                                                                                                                                                                                                                                                                                                       'not '
                                                                                                                                                                                                                                                                                                                                       'exact '
                                                                                                                                                                                                                                                                                                                                       'reconstructions '
                                                                                                                                                                                                                                                                                                                                       'or '
                                                                                                                                                                                                                                                                                                                                       'official '
                                                                                                                                                                                                                                                                                                                                       'NASA '
                                                                                                                                                                                                                                                                                                                                       'models. '
                                                                                                                                                                                                                                                                                                                                       'Activities '
                                                                                                                                                                                                                                                                                                                                       'and '
                                                                                                                                                                                                                                                                                                                                       'movements '
                                                                                                                                                                                                                                                                                                                                       'are '
                                                                                                                                                                                                                                                                                                                                       'educational '
                                                                                                                                                                                                                                                                                                                                       'simulations; '
                                                                                                                                                                                                                                                                                                                                       'their '
                                                                                                                                                                                                                                                                                                                                       'speeds, '
                                                                                                                                                                                                                                                                                                                                       'distances, '
                                                                                                                                                                                                                                                                                                                                       'and '
                                                                                                                                                                                                                                                                                                                                       'flights '
                                                                                                                                                                                                                                                                                                                                       'are '
                                                                                                                                                                                                                                                                                                                                       'not '
                                                                                                                                                                                                                                                                                                                                       'actual '
                                                                                                                                                                                                                                                                                                                                       'NASA '
                                                                                                                                                                                                                                                                                                                                       'telemetry.',
 '0 / 2 descubrimientos': '0 / 2 discoveries',
 '01 / EXPLORA EL PASADO': '01 / EXPLORE THE PAST',
 '02 / EXPEDICIÓN INTERACTIVA': '02 / INTERACTIVE EXPEDITION',
 '04 / CONOCIMIENTO VERIFICABLE': '04 / VERIFIABLE SCIENCE',
 '3 historias · Explorar misiones': '3 stories · Explore missions',
 '5 historias en Marte': '5 stories on Mars',
 '5 historias · Explorar misiones': '5 stories · Explore missions',
 '<html lang="es">': '<html lang="en">',
 '>Marte<': '>Mars<',
 'Activar conducción': 'Start driving',
 'Acércate a la baliza brillante para comenzar.': 'Approach the glowing beacon to begin.',
 'Altura: 0.0 m (sim.)': 'Altitude: 0.0 m (sim.)',
 'Avanzar': 'Forward',
 'Aventura educativa inspirada en misiones reales. Recorridos, puntuaciones y posiciones son ficticios.': 'Educational '
                                                                                                          'adventure '
                                                                                                          'inspired '
                                                                                                          'by real '
                                                                                                          'missions. '
                                                                                                          'Routes, '
                                                                                                          'scores, '
                                                                                                          'and '
                                                                                                          'positions '
                                                                                                          'are '
                                                                                                          'fictional.',
 'CENTRO DE CONTROL · A TU LADO': 'MISSION CONTROL · BY YOUR SIDE',
 'Conduce hasta el objetivo y responde a su lado. No tendrás que salir del simulador.': 'Reach the target and answer '
                                                                                        'questions beside the '
                                                                                        'simulator. No need to leave '
                                                                                        'the action!',
 'Continuar →': 'Continue →',
 'Controles de desplazamiento': 'Movement controls',
 'DESCUBRE SU HISTORIA': 'DISCOVER ITS STORY',
 'E · Ascender': 'E · Ascend',
 'ENCUENTRA EL OBJETIVO': 'FIND THE TARGET',
 'EXPLORACIÓN 3D · MODELO ILUSTRATIVO': '3D EXPLORATION · ILLUSTRATIVE MODEL',
 'EXPLORACIÓN LUNAR': 'LUNAR EXPLORATION',
 'EXPLORACIÓN MARCIANA': 'MARS EXPLORATION',
 'En inspección: arrastra para girar · Pulsa los puntos azules para conocer instrumentos': 'Inspection mode: drag to '
                                                                                           'rotate · Click blue '
                                                                                           'hotspots to learn about '
                                                                                           'instruments',
 'Escenario tridimensional del destino espacial': '3D scene of your space destination',
 'Explora la superficie': 'Explore the surface',
 'Exploración basada en ciencia real': 'Exploration based on real science',
 'Fuentes NASA': 'NASA Sources',
 'Girar derecha': 'Turn right',
 'Girar izquierda': 'Turn left',
 'HISTORIA DE LA MISIÓN': 'MISSION HISTORY',
 'La Luna': 'The Moon',
 'La Luna vista desde el espacio, con sus cráteres': 'The Moon seen from space, showing its craters',
 'Las misiones terminan.': 'Missions end.',
 'Los hechos y fechas proceden de fuentes oficiales. Los diálogos en primera persona son ': 'Facts and dates come '
                                                                                            'from official sources. '
                                                                                            'First-person dialogue '
                                                                                            'is ',
 'Los vehículos y el terreno son modelos ilustrativos, no reconstrucciones exactas.': 'The spacecraft and terrain '
                                                                                      'are illustrations, not exact '
                                                                                      'reconstructions.',
 'MODELO INTERACTIVO': 'INTERACTIVE MODEL',
 'Marte visto desde el espacio, con su superficie rojiza': 'Mars seen from space, with its reddish surface',
 'NASA SPACE APPS CHALLENGE · EXPERIENCIA INTERACTIVA': 'NASA SPACE APPS CHALLENGE · INTERACTIVE EXPERIENCE',
 'Objetivo 1 de 2': 'Objective 1 of 2',
 'Opciones del reto': 'Challenge answers',
 'PROTOTIPO EDUCATIVO': 'EDUCATIONAL PROTOTYPE',
 'PUNTOS ESTELARES': 'STAR POINTS',
 'Primero alcanza el objetivo marcado en el terreno.': 'First, reach the target marked on the terrain.',
 'Progreso de la expedición': 'Expedition progress',
 'Prototipo independiente creado para fines educativos. No es una aplicación oficial de NASA.': 'Independent '
                                                                                                'educational '
                                                                                                'prototype. Not an '
                                                                                                'official NASA '
                                                                                                'application.',
 'Punto científico': 'Science waypoint',
 'Q · Descender': 'Q · Descend',
 'RECREACIÓN EDUCATIVA': 'EDUCATIONAL RECREATION',
 'RETO CIENTÍFICO': 'SCIENCE CHALLENGE',
 'Recentrar vista ↺': 'Recenter view ↺',
 'Recorrido: 0.0 m (sim.)': 'Distance: 0.0 m (sim.)',
 'Retroceder': 'Reverse',
 'Selecciona el modo para comenzar.': 'Choose a mode to begin.',
 'Selecciona una misión para viajar hasta su historia.': 'Choose a mission and travel back through its history.',
 'Seleccionar destino espacial': 'Choose a space destination',
 'Seleccionar misión': 'Choose a mission',
 'Siguiente capítulo →': 'Next chapter →',
 'Simulador interactivo de desplazamiento': 'Interactive driving simulator',
 'Sus historias permanecen.': 'Their stories live on.',
 'Tu siguiente descubrimiento': 'Your next discovery',
 'Una línea del tiempo. Infinitas historias.': 'One timeline. Endless stories.',
 'Viaja a través del tiempo, explora los equipos que quedaron en otros mundos y descubre cómo cambiaron nuestra comprensión del universo.': 'Travel '
                                                                                                                                            'through '
                                                                                                                                            'time, '
                                                                                                                                            'explore '
                                                                                                                                            'the '
                                                                                                                                            'spacecraft '
                                                                                                                                            'left '
                                                                                                                                            'on '
                                                                                                                                            'other '
                                                                                                                                            'worlds, '
                                                                                                                                            'and '
                                                                                                                                            'discover '
                                                                                                                                            'how '
                                                                                                                                            'they '
                                                                                                                                            'changed '
                                                                                                                                            'our '
                                                                                                                                            'understanding '
                                                                                                                                            'of '
                                                                                                                                            'the '
                                                                                                                                            'universe.',
 'WASD o flechas: conducir. M: cambiar cámara.': 'WASD or arrows: drive. M: switch camera.',
 'recreaciones narrativas': 'narrative recreations',
 '¡Explora, investiga y gana estrellas!': 'Explore, investigate, and earn stars!',
 '¡Tu misión está lista!': 'Your mission is ready!',
 '← Anterior': '← Previous',
 '↺ Reiniciar posición': '↺ Reset position',
 '↺ Repetir expedición': '↺ Restart expedition',
 '◐ Atardecer': '◐ Sunset'}
AUX = {
    'static/js/space-redesign.js': {
      '🚀 Explorar misión →': '🚀 Explore mission →',
      'Misiones anteriores': 'Previous missions',
      'Siguientes misiones': 'Next missions'
    },
    'static/js/space-v56.js': {
      'Tu próximo descubrimiento ✦': 'Your next discovery ✦'
    }
}

def rewrite(path, changes):
    if not path.exists():
        print(f'SKIPPED (not found): {path}')
        return
    original=path.read_text(encoding='utf-8')
    updated=original
    hits=0
    for old,new in sorted(changes.items(), key=lambda pair: len(pair[0]), reverse=True):
        if old in updated:
            updated=updated.replace(old,new)
            hits+=1
    if updated == original:
        print(f'NO CHANGES: {path.name} (already translated or different version)')
        return
    backup=path.with_name(path.name + '.before_english_v60.bak')
    if not backup.exists():
        shutil.copy2(path, backup)
    path.write_text(updated,encoding='utf-8')
    print(f'UPDATED: {path} ({hits} translation entries applied); backup: {backup.name}')

root=Path(__file__).resolve().parent
if not (root/'app.py').exists() or not (root/'templates/index.html').exists():
    raise SystemExit('Please place this script next to app.py in the echoes_of_exploration project directory.')

rewrite(root/'templates/index.html', H)
rewrite(root/'static/js/main.js', T)
for rel,changes in AUX.items():
    rewrite(root/rel,changes)
print('\nEnglish Language Pack installed. Your 3D models, wheel fixes, missions, and CSS were preserved.')
print('Run: python app.py  |  Refresh the page with Ctrl+F5')
