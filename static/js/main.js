import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const $=id=>document.getElementById(id);

const missions = [
  {
    id:'apollo',year:'1972',name:'Apollo 17',place:'LUNA',title:'Lunar Roving Vehicle',subtitle:'El vehículo que amplió la exploración lunar',
    quote:'«Transporté exploradores humanos por un mundo donde antes solo habían llegado unos pocos pasos».',
    stats:[['1972','AÑO DE MISIÓN'],['Luna','DESTINO']],
    chapters:[
      ['Un vehículo para otro mundo','Apollo 17 fue la última misión tripulada del programa Apollo que aterrizó en la Luna. Sus astronautas utilizaron un vehículo lunar eléctrico para desplazarse por la superficie y estudiar distintos lugares.'],
      ['Exploración geológica','El vehículo permitió transportar herramientas, cámaras y muestras, ampliando el alcance de la exploración humana y ayudando a estudiar la historia geológica de la Luna.'],
      ['Lo que quedó atrás','El Lunar Roving Vehicle permanece en la superficie lunar. Aunque ya no se utiliza, es un testimonio físico de la exploración tripulada y sus avances científicos.']
    ],
    quiz:{question:'¿Para qué ayudaba principalmente el vehículo lunar de Apollo 17?',answers:['Para transportar astronautas y material científico','Para viajar desde la Luna hasta Marte','Para producir oxígeno en la Luna'],correct:0,explain:'El rover aumentó la distancia que podían recorrer los astronautas y facilitó la recolección de muestras.'},
    source:[['NASA — Apollo 17','https://www.nasa.gov/mission/apollo-17/'],['NASA — Apollo Lunar Roving Vehicle','https://www.nasa.gov/history/alsj/alsj-LRV.html']]
  },
  {
    id:'spirit',year:'2004',name:'Spirit',place:'MARTE',title:'Spirit Rover',subtitle:'El explorador que superó sus límites',
    quote:'«Mi viaje se detuvo, pero los descubrimientos que ayudé a realizar continuaron su camino».',
    stats:[['2004','ATERRIZAJE'],['2010','ÚLTIMA SEÑAL']],
    chapters:[
      ['Bienvenido a Marte','Spirit aterrizó en Marte en enero de 2004 junto con su rover gemelo Opportunity, con el objetivo de investigar la geología marciana y buscar señales de actividad antigua del agua.'],
      ['Huella científica','Spirit halló evidencias de ambientes marcianos antiguos relacionados con agua, aportando información fundamental a la historia geológica del planeta.'],
      ['El último capítulo','El rover quedó atrapado en suelo blando en 2009. Continuó realizando observaciones, pero dejó de comunicarse en 2010; NASA terminó los intentos de contacto en 2011.']
    ],
    quiz:{question:'¿Qué buscaban investigar Spirit y Opportunity?',answers:['El origen de las estrellas','La geología y las evidencias de agua antigua en Marte','Las nubes de Venus'],correct:1,explain:'Ambos rovers estudiaron rocas y suelos para reconstruir ambientes antiguos de Marte.'},
    source:[['NASA Science — Spirit','https://science.nasa.gov/mission/spirit/']]
  },
  {
    id:'opportunity',year:'2004–2019',name:'Opportunity',place:'MARTE',title:'Opportunity Rover',subtitle:'90 soles planeados. Casi 15 años de exploración.',
    quote:'«Fui diseñado para durar 90 días marcianos; mi historia se extendió durante casi quince años».',
    stats:[['2004','ATERRIZAJE'],['90 soles','PLAN ORIGINAL'],['2019','FIN DE MISIÓN']],
    chapters:[
      ['Un comienzo inesperado','Opportunity llegó a Marte en enero de 2004. Su misión estaba diseñada para operar durante 90 soles, pero el rover siguió recorriendo la superficie marciana durante casi 15 años.'],
      ['Un planeta con historia','Al estudiar rocas, capas sedimentarias y minerales, Opportunity aportó evidencias de que Marte tuvo agua líquida en el pasado y ayudó a describir sus antiguos ambientes.'],
      ['El silencio de Marte','En junio de 2018, una gran tormenta de polvo redujo la luz solar disponible para sus paneles. Se perdió la comunicación y NASA declaró finalizada la misión en febrero de 2019.'],
      ['Un legado que permanece','El rover sigue en Marte. Sus observaciones ayudan a los investigadores a comprender la historia del planeta y muestran el impacto que una misión robótica puede tener mucho después de su último contacto.']
    ],
    quiz:{question:'¿Qué factor contribuyó a que Opportunity dejara de comunicarse en 2018?',answers:['Una tormenta de polvo que redujo la luz solar','Una erupción volcánica en el lugar del rover','Una falla en el lanzamiento desde la Tierra'],correct:0,explain:'Opportunity utilizaba paneles solares y una tormenta global de polvo redujo la energía disponible. NASA concluyó la misión en 2019.'},
    source:[['NASA Science — Opportunity','https://science.nasa.gov/mission/opportunity/'],['NASA JPL — Opportunity Mission Complete','https://www.jpl.nasa.gov/news/nasas-opportunity-rover-mission-on-mars-comes-to-end/']]
  }
];


// Historias de cinco misiones añadidas; en V5 todas tienen modelos educativos aproximados.
const archiveMissions = [
 {id:'surveyor3',year:'1967',name:'Surveyor 3',place:'LUNA',archive:false,title:'Surveyor 3 · Aterrizador lunar',subtitle:'El robot que probó cómo era la superficie lunar',
 quote:'«Antes de caminar sobre la Luna, necesitábamos saber si el suelo podría sostenernos».',
 stats:[['1967','ATERRIZAJE'],['1969','VISITADO POR APOLO 12']],
 chapters:[['Primer contacto con el suelo','Surveyor 3 aterrizó en la Luna el 20 de abril de 1967. Su cámara y su dispositivo de muestreo permitieron investigar la superficie lunar antes de los alunizajes tripulados.'],['Un experimento con legado','Las pruebas de la superficie contribuyeron a estudiar la consistencia del suelo lunar. Los astronautas de Apollo 12 visitaron después el lugar y recuperaron componentes del módulo.']],
 quiz:{question:'¿Qué estudió Surveyor 3 directamente en la Luna?',answers:['El suelo lunar','La atmósfera de Júpiter','Los océanos terrestres'],correct:0,explain:'Surveyor 3 contó con un muestreador de superficie para examinar el suelo lunar.'},source:[['NASA Science — Surveyor 3','https://science.nasa.gov/mission/surveyor-3/']]},
 {id:'apollo11',year:'1969',name:'Apollo 11 · Eagle',place:'LUNA',archive:false,title:'Eagle · Etapa de descenso',subtitle:'La estructura que permaneció en la Luna',
 quote:'«Cuando los astronautas partieron, una parte de su vehículo siguió aquí».',stats:[['1969','ALUNIZAJE'],['20 JUL','PRIMERA LLEGADA TRIPULADA']],
 chapters:[['Un aterrizaje histórico','Apollo 11 alunizó en el Mar de la Tranquilidad el 20 de julio de 1969. El módulo lunar Eagle transportó a Armstrong y Aldrin hasta la superficie.'],['Lo que permanece','La etapa de descenso del módulo Eagle quedó sobre la Luna cuando su etapa de ascenso despegó para reunirse con el módulo de mando.']],
 quiz:{question:'¿Qué parte del módulo lunar Eagle quedó sobre la Luna?',answers:['La etapa de descenso','El módulo de mando Columbia','Todo el cohete Saturn V'],correct:0,explain:'La etapa inferior sirvió como plataforma de lanzamiento de la etapa de ascenso.'},source:[['NASA — Apollo 11 Mission Overview','https://www.nasa.gov/wp-content/uploads/static/history/alsj/a11/a11ov.html']]},
 {id:'viking1',year:'1976',name:'Viking 1',place:'MARTE',archive:false,title:'Viking 1 · Aterrizador',subtitle:'Imágenes y experimentos desde Marte',
 quote:'«Fui uno de los primeros laboratorios de NASA en trabajar directamente sobre Marte».',stats:[['1976','ATERRIZAJE'],['1982','FIN DEL ATERRIZADOR']],
 chapters:[['La llegada','Viking 1 aterrizó en Chryse Planitia el 20 de julio de 1976 y transmitió imágenes de la superficie marciana.'],['Un laboratorio remoto','El módulo llevó experimentos para estudiar el ambiente y buscar señales de procesos biológicos. Sus resultados dieron forma a futuras investigaciones sobre Marte.']],
 quiz:{question:'¿Qué tipo de vehículo era Viking 1 en la superficie?',answers:['Un aterrizador estacionario','Un helicóptero','Un rover de seis ruedas'],correct:0,explain:'Viking 1 contaba con un aterrizador fijo y un orbitador.'},source:[['NASA Science — Viking Project','https://science.nasa.gov/mission/viking/']]},
 {id:'sojourner',year:'1997',name:'Sojourner',place:'MARTE',archive:false,title:'Sojourner · Primer rover de NASA en Marte',subtitle:'Pequeño vehículo, gran paso tecnológico',
 quote:'«Mi pequeño recorrido abrió el camino para vehículos cada vez más capaces».',stats:[['1997','ATERRIZAJE'],['83 DÍAS','OPERACIÓN EN MARTE']],
 chapters:[['Una nueva forma de explorar','Sojourner llegó junto a Mars Pathfinder el 4 de julio de 1997. Demostró que un vehículo robótico podía desplazarse y estudiar el entorno de Marte.'],['Estudiar rocas','El rover utilizó un espectrómetro para investigar la composición de rocas y suelos, mientras el aterrizador aportaba imágenes y comunicaciones.']],
 quiz:{question:'¿Qué misión llevó a Sojourner a Marte?',answers:['Mars Pathfinder','Apollo 11','Viking 1'],correct:0,explain:'Sojourner fue parte de la misión Mars Pathfinder de 1997.'},source:[['NASA Science — Mars Pathfinder','https://science.nasa.gov/mission/mars-pathfinder/']]},
 {id:'ingenuity',year:'2021–2024',name:'Ingenuity',place:'MARTE',archive:false,title:'Ingenuity · Helicóptero marciano',subtitle:'El primer vuelo motorizado en otro planeta',
 quote:'«Despegué sobre Marte y demostré que una nueva forma de explorar era posible».',stats:[['2021','PRIMER VUELO'],['72','VUELOS'],['2024','ÚLTIMO VUELO']],
 chapters:[['Un despegue sin precedentes','Ingenuity llegó a Marte junto a Perseverance y realizó su primer vuelo el 19 de abril de 2021. Fue el primer vuelo motorizado y controlado en otro planeta.'],['Más allá de la demostración','Diseñado para realizar hasta cinco vuelos de prueba, completó 72. Su último vuelo ocurrió en enero de 2024 y ayudó a demostrar la utilidad de los vehículos aéreos para explorar otros mundos.']],
 quiz:{question:'¿Cuántos vuelos completó Ingenuity?',answers:['5','72','150'],correct:1,explain:'NASA confirmó 72 vuelos durante su misión en Marte.'},source:[['NASA Science — Ingenuity','https://science.nasa.gov/mission/mars-2020-perseverance/ingenuity-mars-helicopter/']]}
];
missions.push(...archiveMissions);
missions.sort((a,b)=>parseInt(a.year)-parseInt(b.year));


// V5.1: situaciones educativas hipotéticas. No reproducen decisiones operativas de NASA.
const decisions = {
  surveyor3: {title:'Estudia la resistencia del suelo lunar',role:'Ingeniería de superficie',steps:[
    {q:'Surveyor 3 necesita conocer la consistencia del suelo. ¿Qué instrumento sería útil?',opts:['El muestreador de superficie','Una antena de televisión terrestre','Un propulsor de ascenso'],correct:0,why:'Su muestreador pudo excavar y manipular el material de la superficie lunar; ayudó a estudiar sus propiedades.'},
    {q:'Después de examinar el terreno, ¿qué evidencia documentarías?',opts:['Imágenes y respuesta del suelo al muestreador','Solo el color de una bandera','La temperatura del océano terrestre'],correct:0,why:'Las imágenes junto con la interacción mecánica ayudaban a comprender mejor el suelo. Esta elección es una simulación educativa.'}
  ]},
  apollo11: {title:'Comprende cómo Eagle dejó parte de sí en la Luna',role:'Ingeniería lunar',steps:[
    {q:'Los astronautas deben despegar de la Luna. ¿Qué parte permanece como plataforma?',opts:['La etapa de descenso','El módulo de mando en órbita','El cohete Saturn V entero'],correct:0,why:'La etapa de ascenso salió desde la etapa de descenso, que permanece en la superficie.'},
    {q:'¿Qué conviene identificar en una reconstrucción de lo que quedó?',opts:['Patas y estructura de la etapa de descenso','La cápsula de retorno terrestre','El satélite Hubble'],correct:0,why:'La estructura inferior con sus patas quedó en la Luna. El modelo 3D es una representación simplificada.'}
  ]},
  apollo: {title:'Planifica una excursión geológica lunar',role:'Geología lunar',steps:[
    {q:'¿Qué recurso del vehículo permite ampliar el alcance de una excursión?',opts:['Transporte de astronautas y equipo','Un motor para salir de la órbita lunar','Un laboratorio submarino'],correct:0,why:'El Lunar Roving Vehicle permitió recorrer mayores distancias y llevar herramientas y muestras.'},
    {q:'En una visita a un sitio geológico, ¿qué registrarías?',opts:['Fotografías y muestras con contexto del lugar','Solo la velocidad del vehículo','El clima de la Tierra'],correct:0,why:'La documentación del sitio y las muestras aportan contexto para interpretar la geología lunar.'}
  ]},
  viking1: {title:'Opera un laboratorio estacionario en Marte',role:'Ciencia de superficie',steps:[
    {q:'Para estudiar el suelo junto al aterrizador, ¿qué acción sería razonable?',opts:['Recoger una muestra con el brazo','Conducir hasta otro cráter','Desplegar un helicóptero'],correct:0,why:'Viking 1 era un aterrizador fijo con un brazo para recolectar material de la superficie.'},
    {q:'¿Por qué la interpretación de resultados biológicos exige prudencia?',opts:['Porque los experimentos requieren análisis y contexto','Porque la cámara prueba vida por sí sola','Porque cualquier gas detectado confirma organismos'],correct:0,why:'Los resultados de experimentos relacionados con posibles procesos biológicos no equivalen por sí solos a demostrar la existencia de vida.'}
  ]},
  sojourner: {title:'Investiga una roca con un pequeño rover',role:'Geoquímica marciana',steps:[
    {q:'¿Qué instrumento ayuda a medir la composición de una roca?',opts:['Espectrómetro APXS','Un panel solar usado como cámara','Una antena de transmisión'],correct:0,why:'El espectrómetro de rayos X de partículas alfa (APXS) ayudó a analizar la composición elemental de rocas y suelo.'},
    {q:'Antes de acercarte a una roca, ¿qué revisarías?',opts:['La seguridad del terreno y la trayectoria','El brillo de las estrellas terrestres','El color de la interfaz web'],correct:0,why:'Elegir una trayectoria segura es relevante para operar un rover pequeño sobre terreno irregular.'}
  ]},
  spirit: {title:'Investiga un terreno marciano difícil',role:'Geología y movilidad',steps:[
    {q:'Ves una roca prometedora a distancia. ¿Cómo evaluarías el objetivo?',opts:['Con imágenes y observaciones previas','Con una foto de otro planeta','Ignorando el relieve circundante'],correct:0,why:'Las cámaras y observaciones del rover ayudaban a elegir objetivos científicos y rutas.'},
    {q:'Si las ruedas pierden tracción en suelo blando, ¿qué priorizarías?',opts:['Evaluar riesgos y movimientos con cuidado','Acelerar sin observar el terreno','Apagar todos los instrumentos definitivamente'],correct:0,why:'Spirit quedó atascado en 2009; los equipos estudiaron opciones de movimiento y después continuaron haciendo ciencia estacionaria.'}
  ]},
  opportunity: {title:'Decide cómo estudiar señales de agua antigua',role:'Investigación geológica',steps:[
    {q:'Observas capas en una formación rocosa. ¿Qué harías para interpretarlas?',opts:['Documentar estratos y minerales','Calcular la profundidad del océano terrestre','Descartar todas las imágenes'],correct:0,why:'El estudio de capas y minerales ayudó a Opportunity a reconstruir ambientes marcianos antiguos.'},
    {q:'Una tormenta de polvo reduce la luz solar. ¿Qué recurso resulta crítico?',opts:['Energía disponible para el rover','Combustible de un helicóptero','Oxígeno para una tripulación humana'],correct:0,why:'Opportunity dependía de paneles solares y la gran tormenta de polvo de 2018 redujo su acceso a la energía solar.'}
  ]},
  ingenuity: {title:'Prepara un vuelo experimental en Marte',role:'Ingeniería aeronáutica',steps:[
    {q:'Antes de despegar, ¿qué condición es esencial?',opts:['Comprobar sistemas y condiciones de vuelo','Conectar un cable eléctrico a la Tierra','Esperar que Marte tenga aire tan denso como la Tierra'],correct:0,why:'Ingenuity debía volar en una atmósfera marciana muy tenue, con controles de vuelo cuidadosamente planificados.'},
    {q:'¿Qué logro verificó Ingenuity con sus vuelos?',opts:['Vuelo motorizado y controlado en otro planeta','Transporte de astronautas','Extracción de oxígeno de rocas'],correct:0,why:'Ingenuity demostró el vuelo motorizado controlado en Marte y completó 72 vuelos entre 2021 y 2024.'}
  ]}
};
// V5.3: cada parada científica abre su propia pregunta junto al visor 3D.
const PROGRESS_KEY='echoes_expedition_v53';
function loadSpaceProgress(){try{const raw=JSON.parse(localStorage.getItem(PROGRESS_KEY)||'{}');return {score:Number(raw.score)||0,awarded:new Set(Array.isArray(raw.awarded)?raw.awarded:[])}}catch{return {score:0,awarded:new Set()}}}
const savedSpaceProgress=loadSpaceProgress();
const expedition={stage:0,phase:'travel',score:savedSpaceProgress.score,tries:0,awarded:savedSpaceProgress.awarded};
function saveSpaceProgress(){try{localStorage.setItem(PROGRESS_KEY,JSON.stringify({score:expedition.score,awarded:[...expedition.awarded]}))}catch{}}
const waypointPositions=[{x:6,z:-3},{x:9,z:4}];
const waypointNames={
 surveyor3:['Muestreador del suelo lunar','Registro de imágenes'],apollo11:['Plataforma de descenso','Huellas de la ingeniería'],
 apollo:['Exploración del terreno','Campamento de muestras'],viking1:['Brazo de muestreo','Laboratorio científico'],
 sojourner:['Roca para análisis APXS','Ruta segura'],spirit:['Roca misteriosa','Terreno de difícil tracción'],
 opportunity:['Capas de roca','Tormenta de polvo'],ingenuity:['Primera zona de vuelo','Segundo punto de aterrizaje']
};
function currentSteps(){return decisions[missions[selected].id].steps;}
function isStationary(){return driveKind()==='static';}
function missionPointsKey(){return missions[selected].id;}
function renderExpedition(){
 const steps=currentSteps();const idx=Math.min(expedition.stage,steps.length-1);
 const finished=expedition.phase==='complete';
 $('space-score').textContent=expedition.score;
 $('stars-earned').textContent=`${expedition.stage} / ${steps.length} descubrimientos`;
 $('expedition-progress').textContent=finished?'¡MISIÓN SUPERADA!':`OBJETIVO ${idx+1} DE ${steps.length}`;
 $('expedition-title').textContent=finished?'¡Explorador estelar!':decisions[missions[selected].id].title;
 const markers=$('mission-stepper').querySelectorAll('.step');
 markers.forEach((node,i)=>{node.classList.toggle('done',i<expedition.stage || finished);node.classList.toggle('current',!finished&&i===idx);});
 $('activity-next').hidden=true;
 $('activity-choices').replaceChildren();$('activity-choices').hidden=true;
 $('activity-feedback').hidden=true;
 $('activity-reward').textContent='✦ +100 puntos';
 if(finished){
   $('objective-icon').textContent='★';$('objective-status').textContent='¡EXPEDICIÓN COMPLETA!';$('objective-name').textContent='Dos descubrimientos conseguidos';
   $('objective-help').textContent='¡Ya ayudaste a descubrir la ciencia detrás de esta misión!';
   $('activity-kind').textContent='INSIGNIA CONSEGUIDA';$('activity-title').textContent='🏅 ¡Guardián de las estrellas!';
   $('activity-question').textContent='Tus conocimientos hacen avanzar la exploración. ¿Qué tal si visitas otra misión?';
   $('activity-next').textContent='Explorar otra misión →';$('activity-next').hidden=false;
   pointOfInterest.visible=false;return;
 }
 const name=waypointNames[missionPointsKey()][idx];
 $('objective-name').textContent=name;
 if(expedition.phase==='travel'){
  $('objective-icon').textContent='◎';$('objective-status').textContent=isStationary()?'INSPECCIÓN CIENTÍFICA':'VE A LA BALIZA LUMINOSA';
  $('objective-help').textContent=isStationary()?'Examina los puntos azules del equipo para empezar el reto.':'Conduce o vuela hasta el círculo luminoso que marca la siguiente parada.';
  $('activity-kind').textContent='RETO BLOQUEADO';$('activity-title').textContent=`Parada ${idx+1}: ${name}`;
  $('activity-question').textContent=isStationary()?'Pulsa uno de los puntos azules sobre la nave para abrir esta pregunta.':'Cuando llegues al objetivo, la pregunta aparecerá aquí mismo. ¡No tienes que bajar!';
 }else if(expedition.phase==='question'){
  $('objective-icon').textContent='🔎';$('objective-status').textContent='OBJETIVO ALCANZADO';
  $('objective-help').textContent='¡Ya puedes responder en el Centro de control!';
  $('activity-kind').textContent='PREGUNTA CIENTÍFICA';$('activity-title').textContent=`Desafío ${idx+1}: ${name}`;
  const step=steps[idx];$('activity-question').textContent=step.q;
  $('activity-choices').hidden=false;
  step.opts.forEach((option,i)=>{
    const btn=document.createElement('button');btn.className='activity-choice';btn.type='button';
    btn.textContent=String.fromCharCode(65+i)+'. '+option;
    btn.addEventListener('click',()=>answerExpedition(i));$('activity-choices').appendChild(btn);
  });
 }else if(expedition.phase==='feedback'){
  $('objective-icon').textContent='★';$('objective-status').textContent='¡DESCUBRIMIENTO CONSEGUIDO!';
  $('objective-help').textContent='Ya conoces algo nuevo sobre este equipo espacial.';
  $('activity-kind').textContent='CONOCIMIENTO DESBLOQUEADO';$('activity-title').textContent='¡Gran trabajo, explorador!';
  $('activity-question').textContent='Tu descubrimiento ha quedado registrado.';
  $('activity-feedback').hidden=false;
  $('activity-feedback').textContent=expedition.feedback;
  $('activity-next').hidden=false;
  $('activity-next').textContent=idx===steps.length-1?'Ver mi recompensa ★':'Ir al siguiente objetivo →';
 }
}
function reachObjective(){
 if(expedition.phase!=='travel')return;
 expedition.phase='question';driving.arrived=true;pointOfInterest.visible=false;
 setDriveStatus('¡Objetivo alcanzado! Responde la pregunta del Centro de control, justo a la derecha.');
 $('drive-console').classList.add('drive-success');
 renderExpedition();
}
function answerExpedition(choice){
 if(expedition.phase!=='question')return;
 const step=currentSteps()[expedition.stage];const correct=choice===step.correct;
 expedition.tries++;
 const buttons=[...$('activity-choices').children];
 buttons.forEach((b,i)=>{b.disabled=true;b.classList.toggle('lab-right',i===step.correct);b.classList.toggle('lab-wrong',i===choice&&!correct);});
 if(correct){
  const bonus=expedition.tries===1?100:60;
  const scoreKey=`${missionPointsKey()}:${expedition.stage}`;
  const newlyAwarded=!expedition.awarded.has(scoreKey);
  if(newlyAwarded){expedition.score+=bonus;expedition.awarded.add(scoreKey);saveSpaceProgress();}
  expedition.phase='feedback';expedition.feedback=`🌟 ¡Respuesta correcta! ${newlyAwarded?'+'+bonus+' puntos estelares.':'Ya habías ganado los puntos de este reto.'} ${step.why}`;
  renderExpedition();
 }else{
  $('activity-feedback').hidden=false;
  $('activity-feedback').textContent=`💡 Buen intento. ${step.why} Vuelve a elegir la respuesta que corresponde.`;
  buttons.forEach((b,i)=>{if(i!==choice)b.disabled=false;});
  expedition.feedback='';
 }
 $('space-score').textContent=expedition.score;
}
function resetExpedition(){expedition.stage=0;expedition.phase='travel';expedition.tries=0;driving.arrived=false;pointOfInterest.visible=!isStationary();positionWaypoint();renderExpedition();}
function positionWaypoint(){
 if(isStationary()){pointOfInterest.visible=false;return;}
 const target=waypointPositions[Math.min(expedition.stage,waypointPositions.length-1)];
 pointOfInterest.position.set(target.x,terrainHeight(target.x,target.z,missions[selected].place==='LUNA'),target.z);
 pointOfInterest.visible=expedition.phase==='travel';
}
function advanceExpedition(){
 if(expedition.phase==='complete'){
  const options=missions.map((m,i)=>({...m,i})).filter(m=>m.place===missions[selected].place);
  const here=options.findIndex(m=>m.i===selected);
  selectMission(options[(here+1)%options.length].i);return;
 }
 if(expedition.phase!=='feedback')return;
 expedition.stage++;
 if(expedition.stage>=currentSteps().length){expedition.phase='complete';}
 else{expedition.phase='travel';expedition.tries=0;driving.arrived=false;positionWaypoint();setDriveStatus(isStationary()?'Inspecciona otro instrumento para comenzar el segundo reto.':'¡Buen trabajo! Ahora ve a la siguiente baliza luminosa.');$('drive-console').classList.remove('drive-success');}
 renderExpedition();
}
$('activity-next').addEventListener('click',advanceExpedition);
$('restart-expedition').addEventListener('click',()=>{resetExpedition();if(!isStationary()){resetMovement();positionWaypoint();}});

let selected=0,chapter=0;
let destinationFilter='MARTE';

function drawTimeline(){
  $('timeline').innerHTML=missions.map((m,i)=>({...m,i})).filter(m=>destinationFilter==='TODOS'||m.place===destinationFilter).map(m=>`<button class="time-item ${m.i===selected?'active':''}" data-index="${m.i}" aria-pressed="${m.i===selected}"><span class="time-year">${m.year}</span><span class="time-name">${m.name}</span><small class="time-type">🚀 Explorar misión</small></button>`).join('');
  document.querySelectorAll('.time-item').forEach(b=>b.addEventListener('click',()=>selectMission(Number(b.dataset.index))));
}
function selectMission(i){selected=i;chapter=0;const m=missions[i];drawTimeline();$('mission-meta').textContent=`${m.place} / ${m.year}`;$('mission-title').textContent=m.title;$('mission-subtitle').textContent=m.subtitle;$('mission-quote').textContent=m.quote;$('mission-stats').innerHTML=m.stats.map(([v,l])=>`<div><div class="stat-value">${v}</div><div class="stat-label">${l}</div></div>`).join('');$('viewer-label').textContent=`${m.name.toUpperCase()} · RECREACIÓN 3D EDUCATIVA`; $('model-status').textContent='● MODELO 3D INTERACTIVO';renderChapter();drawSources();rebuildModel(m.id);resetExpedition();}
function renderChapter(){const m=missions[selected],c=m.chapters[chapter];$('chapter-title').textContent=c[0];$('chapter-text').textContent=c[1];$('chapter-count').textContent=`${chapter+1} / ${m.chapters.length}`;$('prev-chapter').disabled=chapter===0;$('next-chapter').disabled=chapter===m.chapters.length-1;}
$('prev-chapter').addEventListener('click',()=>{if(chapter>0){chapter--;renderChapter();}});
$('next-chapter').addEventListener('click',()=>{if(chapter<missions[selected].chapters.length-1){chapter++;renderChapter();}});
function drawSources(){const sources=[...new Map(missions.flatMap(m=>m.source).map(s=>[s[1],s])).values()];$('sources-list').innerHTML='';for(const [title,url] of sources){const li=document.createElement('li');const a=document.createElement('a');a.href=url;a.target='_blank';a.rel='noopener noreferrer';a.textContent=title+' ↗';li.appendChild(a);$('sources-list').appendChild(li);}}

// ESCENA V3: reconstrucción visual interpretativa de rovers MER (NO es modelo oficial NASA).
const host=$('scene');
const scene=new THREE.Scene();
const renderer=new THREE.WebGLRenderer({antialias:true,alpha:true});
renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.8));
renderer.outputColorSpace=THREE.SRGBColorSpace;
renderer.toneMapping=THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure=1.25;
renderer.shadowMap.enabled=true;
renderer.shadowMap.type=THREE.PCFSoftShadowMap;
host.appendChild(renderer.domElement);
const camera=new THREE.PerspectiveCamera(46,1,.1,130);
camera.position.set(5.6,3.6,6.7);
const controls=new OrbitControls(camera,renderer.domElement);
controls.enableDamping=true;controls.minDistance=2.5;controls.maxDistance=15;
controls.maxPolarAngle=Math.PI/2.04;controls.target.set(0,1,0);
const hemi=new THREE.HemisphereLight(0xb3d9ff,0x7b4836,1.4);scene.add(hemi);
const sun=new THREE.DirectionalLight(0xffe3c5,3.4);sun.position.set(-3,10,6);sun.castShadow=true;
sun.shadow.mapSize.set(1024,1024);sun.shadow.camera.left=-9;sun.shadow.camera.right=9;
sun.shadow.camera.top=9;sun.shadow.camera.bottom=-9;sun.shadow.bias=-.0008;
scene.add(sun);
const skyDay=0x192a43,skySunset=0x472722;
let modelGroup=new THREE.Group(), terrainGroup=new THREE.Group();scene.add(modelGroup,terrainGroup);
let wheelParts=[];
const mat=(color,metalness=.05,roughness=.75)=>new THREE.MeshStandardMaterial({color,metalness,roughness});
const silver=mat(0xaab5bb,.66,.38),dark=mat(0x202830,.23,.8),gold=mat(0xbca26b,.6,.46);
const blue=mat(0x1c4c8b,.26,.36),white=mat(0xd8d9d4,.34,.48),copper=mat(0x8b6550,.4,.59);
function mesh(geo,m,x,y,z,parent=modelGroup){const o=new THREE.Mesh(geo,m);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;parent.add(o);return o;}
function box(w,h,d,x,y,z,m=white,parent=modelGroup){return mesh(new THREE.BoxGeometry(w,h,d),m,x,y,z,parent);}
function rod(a,b,r,m=silver,parent=modelGroup){const va=new THREE.Vector3(...a),vb=new THREE.Vector3(...b),v=vb.clone().sub(va);const o=mesh(new THREE.CylinderGeometry(r,r,v.length(),10),m,0,0,0,parent);o.position.copy(va.add(vb).multiplyScalar(.5));o.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),v.normalize());return o;}

function wheel(x, z, y = .39, r = .29) {
  const wheelGroup = new THREE.Group();
  wheelGroup.position.set(x, y, z);
  modelGroup.add(wheelGroup);

  const tire = mesh(
    new THREE.CylinderGeometry(r, r, .19, 24),
    dark, 0, 0, 0, wheelGroup
  );
  tire.rotation.x = Math.PI / 2;

  for (let i = 0; i < 12; i++) {
    const a = i * Math.PI / 6;
    const grip = box(
      .12, .04, .205,
      Math.cos(a) * r,
      Math.sin(a) * r,
      0, dark, wheelGroup
    );
    grip.rotation.z = a;
  }

  const hub = mesh(
    new THREE.CylinderGeometry(r * .44, r * .44, .21, 20),
    silver, 0, 0, 0, wheelGroup
  );
  hub.rotation.x = Math.PI / 2;

  const hubCenter = mesh(
    new THREE.CylinderGeometry(r * .18, r * .18, .225, 16),
    copper, 0, 0, 0, wheelGroup
  );
  hubCenter.rotation.x = Math.PI / 2;

  rod([x, y, z], [x * .65, .94, z * .60], .037, silver);

  wheelParts.push({
    pivot: wheelGroup,
    radius: r
  });
}

function solarCellGrid(cx,cy,cz,w,d){box(w,.045,d,cx,cy,cz,blue);const lines=mat(0xa5a8b2,.45,.45);
 for(let i=-2;i<=2;i++)box(.012,.049,d,cx+i*w/6,cy+.026,cz,lines);
 for(let j=-1;j<=1;j++)box(w,.05,.01,cx,cy+.028,cz+j*d/4,lines);
}
function roboticRover(){
  // Construcción educativa aproximada basada en la arquitectura de Spirit y Opportunity.
  box(1.65,.4,1.05,0,.99,0,gold);
  box(1.48,.13,.95,0,1.23,0,white);
  box(1.4,.11,.86,0,.75,0,copper);
  // Aletas solares plegadas a los costados y plataforma central.
  solarCellGrid(0,1.36,0,1.85,.85);
  solarCellGrid(-1.42,1.30,0,.98,1.3);solarCellGrid(1.42,1.30,0,.98,1.3);
  solarCellGrid(0,1.30,-.87,1.65,.72);
  for(const side of [-1,1]){rod([side*.82,1.29,0],[side*1.10,1.31,0],.042,silver);}
  // Mástil de cámaras con dos lentes y cuerpo de sensor.
  rod([.1,1.32,-.05],[.1,2.22,-.05],.055,silver);
  box(.69,.28,.29,.1,2.24,.08,white);
  for(const x of [-.12,.32]){const lens=mesh(new THREE.CylinderGeometry(.093,.093,.085,24),dark,x,2.24,.27);lens.rotation.x=Math.PI/2;
    mesh(new THREE.SphereGeometry(.050,16,12),mat(0x406e96,.1,.2),x,2.24,.32);}
  box(.29,.22,.26,-.42,1.17,.45,white);
  // Brazo articulado y cabeza instrumental hacia delante.
  rod([-.54,.99,.4],[-1.05,.78,.87],.052,silver);rod([-1.05,.78,.87],[-1.49,.54,1.06],.045,silver);
  for(const p of [[-1.05,.78,.87],[-1.49,.54,1.06]])mesh(new THREE.SphereGeometry(.085,12,12),copper,...p);
  box(.27,.19,.27,-1.52,.52,1.07,white);
  for(const x of [-1.13,0,1.13])for(const z of [-.76,.76])wheel(x,z);
  rod([-1.15,.90,-.38],[1.15,.90,-.38],.038,silver);
  rod([-1.15,.90,.38],[1.15,.90,.38],.038,silver);
  // Placas y cableado de instrumentación: ornamentación visual, no piezas exactas.
  for(let i=0;i<5;i++)rod([-.52+i*.24,.80,-.54],[-.42+i*.24,1.04,-.62],.014,dark);
}
function lunarVehicle(){
  // Recreación geométrica de LRV Apollo: no es reproducción exacta.
  box(2.4,.13,1.20,0,.93,0,silver);box(2.2,.09,1.08,0,.80,0,gold);
  for(const x of [-.52,.52]){box(.78,.13,.56,x,1.14,-.13,dark);box(.77,.50,.09,x,1.43,-.41,white);}
  box(.66,.07,.57,0,1.04,.43,white);
  rod([.9,.96,-.34],[.92,2.03,-.45],.034,silver);box(.36,.24,.25,.92,2.07,-.45,white);
  box(.48,.2,.37,1.08,.94,.38,gold);
  for(const x of [-1.16,1.16])for(const z of [-.79,.79])wheel(x,z,.47,.35);
  rod([-1.05,.87,0],[1.05,.87,0],.037,silver);
}

// V5: REPRESENTACIONES EDUCATIVAS construidas con geometría, NO modelos oficiales ni a escala.
function tripod(radius=1.25, topY=1.15, footY=.15){
 for(let i=0;i<3;i++){
  let a=i*Math.PI*2/3, x=Math.cos(a)*radius,z=Math.sin(a)*radius;
  rod([Math.cos(a)*.46,topY,Math.sin(a)*.46],[x,footY,z],.048,silver);
  mesh(new THREE.CylinderGeometry(.20,.23,.075,20),dark,x,footY,z);
 }
}
function bowl(x,y,z,r=.50){
 const dish=mesh(new THREE.SphereGeometry(r,26,14,0,Math.PI*2,0,Math.PI*.43),white,x,y,z);
 dish.rotation.x=Math.PI/2.4;return dish;
}
function surveyorLander(){
 // Plataformas triangulares, tres patas, cámara y pala de muestreo.
 const base=mesh(new THREE.CylinderGeometry(.76,.68,.28,3),silver,0,1.14,0);base.rotation.y=Math.PI/6;
 tripod(1.72,1.22,.19);
 box(.65,.30,.65,0,1.40,0,gold);
 rod([.04,1.5,-.06],[.08,2.40,-.06],.05,silver);
 box(.43,.36,.38,.08,2.36,-.07,white);
 mesh(new THREE.CylinderGeometry(.115,.115,.055,24),dark,.10,2.39,.16).rotation.x=Math.PI/2;
 box(.94,.055,.70,-.56,1.71,-.31,blue);
 rod([.43,1.14,.22],[1.18,.67,1.12],.045,silver);
 rod([1.18,.67,1.12],[1.39,.31,1.40],.040,silver);
 box(.25,.08,.29,1.39,.31,1.40,copper);
 rod([-.20,1.45,0],[-.50,2.01,.14],.030,silver);
}
function eagleDescent(){
 // Solo etapa de descenso del módulo lunar Eagle; la etapa de ascenso NO permanece allí.
 box(1.95,.98,1.75,0,1.23,0,gold);
 box(2.24,.10,2.04,0,1.75,0,silver);
 for(const x of [-1,1])for(const z of [-1,1]){
   const px=x*1.68,pz=z*1.65;
   rod([x*.83,1.45,z*.74],[px,.18,pz],.060,silver);
   rod([x*.80,.88,z*.75],[px,.18,pz],.038,silver);
   mesh(new THREE.CylinderGeometry(.28,.28,.08,24),silver,px,.15,pz);
 }
 for(const x of [-.67,.67])for(const z of [-.63,.63])box(.41,.83,.09,x,.98,z,gold);
 // Descenso y motor, detalles exteriores simplificados.
 mesh(new THREE.CylinderGeometry(.36,.51,.54,22),dark,0,.54,0);
 box(.30,.95,.12,.60,.68,1.02,white);
 for(let i=0;i<5;i++)box(.35,.055,.12,.60,.23+i*.15,1.12+i*.06,silver);
}
function vikingLander(){
 // Viking: plataforma hexagonal, tres patas, antena de plato y brazo muestreador.
 mesh(new THREE.CylinderGeometry(1.03,1.01,.33,6),silver,0,1.16,0).rotation.y=Math.PI/6;
 tripod(1.96,1.15,.18);
 box(.83,.24,.65,0,1.44,-.1,gold);
 rod([-.55,1.32,0],[-.72,2.1,-.15],.055,silver);
 bowl(-.72,2.16,-.15,.48);
 rod([.68,1.24,-.35],[.9,2.02,-.42],.034,silver);
 box(.20,.33,.22,.9,2.06,-.42,dark);
 for(const x of [-.83,.83]){
  const rtg=mesh(new THREE.CylinderGeometry(.32,.32,.68,18),copper,x,1.65,.30);
  rtg.rotation.z=Math.PI/2;
 }
 rod([.54,1.20,.5],[1.22,.62,.9],.050,silver);
 rod([1.22,.62,.9],[1.57,.42,1.19],.038,silver);
 box(.30,.12,.25,1.56,.41,1.19,gold);
}
function sojournerRover(){
 // Sojourner: cuerpo pequeño, panel superior, 6 ruedas y APXS atrás.
 box(1.45,.34,.87,0,.68,0,gold);
 solarCellGrid(0,.93,0,1.65,1.04);
 for(const x of [-.73,0,.73])for(const z of [-.69,.69]) wheel(x,z,.34,.22);
 rod([-.72,.63,-.34],[.72,.63,-.34],.027,silver);
 rod([-.72,.63,.34],[.72,.63,.34],.027,silver);
 box(.40,.28,.18,.72,.70,.44,white);
 for(const x of [.58,.83]) mesh(new THREE.SphereGeometry(.055,12,12),dark,x,.74,.55);
 box(.25,.18,.24,-.87,.60,.03,copper);
}
let ingenuityRotors=[];
function ingenuityHelicopter(){
 // Ingenuity: dos rotores coaxiales, panel solar y cuatro patas.
 const body=box(.70,.47,.51,0,.84,0,silver);
 box(.72,.12,.51,0,.61,0,gold);
 for(const x of [-1,1])for(const z of [-1,1]){
   rod([x*.23,.69,z*.20],[x*.84,.14,z*.72],.035,silver);
   mesh(new THREE.SphereGeometry(.09,12,12),dark,x*.84,.14,z*.72);
 }
 rod([0,1.10,0],[0,2.23,0],.042,silver);
 for(let i=0;i<2;i++){
   const y=1.68+i*.35;const group=new THREE.Group();group.position.set(0,y,0);modelGroup.add(group);
   // Aspas estilizadas en dos niveles contra-rotatorios, inmóviles al aterrizar.
   const blade1=new THREE.Mesh(new THREE.BoxGeometry(2.58,.035,.16),dark);
   const blade2=new THREE.Mesh(new THREE.BoxGeometry(.16,.035,2.58),dark);
   group.add(i===0?blade1:blade2); ingenuityRotors.push(group);
 }
 solarCellGrid(0,2.27,0,.88,.78);
 box(.27,.22,.30,.02,.86,.30,white);
}
const newInstrumentData={
 surveyor3:[
  {label:'Cámara de televisión',pos:[.10,2.39,.28],description:'La cámara registró fotografías de la superficie de la Luna y apoyó los estudios de textura y relieve.'},
  {label:'Muestreador de superficie',pos:[1.39,.36,1.42],description:'Un brazo equipado con pala excavó y manipuló el suelo para estudiar su comportamiento.'},
  {label:'Patas de aterrizaje',pos:[1.74,.22,0],description:'Tres patas con apoyos distribuyeron la carga del aterrizador sobre el regolito lunar.'}
 ],
 apollo11:[
  {label:'Etapa de descenso',pos:[0,1.62,.94],description:'Esta etapa sostuvo el alunizaje y quedó sobre el suelo lunar tras el despegue de la etapa superior.'},
  {label:'Pata y platillo de apoyo',pos:[1.68,.18,1.65],description:'El tren de aterrizaje distribuyó las fuerzas al entrar en contacto con la superficie.'},
  {label:'Escalera de acceso',pos:[.60,.80,1.15],description:'Los astronautas descendieron del módulo lunar hacia la superficie mediante una escalera.'}
 ],
 viking1:[
  {label:'Antena de alta ganancia',pos:[-.72,2.18,-.03],description:'El sistema de comunicaciones permitió transmitir información científica desde Marte.'},
  {label:'Brazo recolector de muestras',pos:[1.57,.45,1.18],description:'El dispositivo de muestreo recogió material marciano para analizarlo en los experimentos del aterrizador.'},
  {label:'Generadores termoeléctricos',pos:[.83,1.72,.35],description:'Los RTG proporcionaron energía eléctrica utilizando el calor de la desintegración radiactiva.'}
 ],
 sojourner:[
  {label:'Panel solar',pos:[0,1.02,0],description:'Sojourner utilizaba células solares como fuente principal de energía y contaba también con baterías.'},
  {label:'Sistema de seis ruedas',pos:[-.75,.36,.72],description:'El sistema de movilidad ayudó al pequeño rover a recorrer el terreno irregular cerca de Pathfinder.'},
  {label:'Espectrómetro APXS',pos:[-.90,.62,.04],description:'El instrumento Alpha Proton X-Ray Spectrometer estudiaba la composición elemental de rocas y suelo.'}
 ],
 ingenuity:[
  {label:'Rotores coaxiales',pos:[1.15,2.04,0],description:'Dos conjuntos de aspas contrarrotatorias generaban sustentación en la atmósfera tenue de Marte.'},
  {label:'Panel solar',pos:[0,2.34,.07],description:'Este panel recargaba las baterías que impulsaban los vuelos y sistemas de Ingenuity.'},
  {label:'Cuerpo y cámaras',pos:[.10,.90,.41],description:'El cuerpo alojaba electrónica, sensores y cámaras de navegación y fotografía del terreno.'}
 ]
};

let seed=97231;function rnd(){seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;}
function terrainHeight(x,z,lunar){
  const dunes=.18*Math.sin(x*.34)*Math.cos(z*.4)+.08*Math.sin(1.25*x+.5*z);
  const basin=-.18*Math.exp(-((x+3)**2+(z-1)**2)/3.5);
  const ridge=.48*Math.exp(-((x-4)**2+(z+4)**2)/16);
  const moonRidge=lunar?.14*Math.cos(x*.62-z*.27):0;
  return dunes+basin+ridge+moonRidge-.12;
}
function makeTerrain(lunar){seed=lunar?4321:97231;
  const soil=mat(lunar?0x858590:0x9e6650,.0,1);
  const geometry=new THREE.PlaneGeometry(40,40,105,105);geometry.rotateX(-Math.PI/2);
  const position=geometry.attributes.position;
  for(let i=0;i<position.count;i++)position.setY(i,terrainHeight(position.getX(i),position.getZ(i),lunar));
  position.needsUpdate=true;geometry.computeVertexNormals();
  const ground=mesh(geometry,soil,0,0,0,terrainGroup);ground.castShadow=false;
  const rockMats=[mat(lunar?0x727581:0x84513f),mat(lunar?0xa6a5aa:0xbc7956),mat(lunar?0x555865:0x754434)];
  for(let i=0;i<145;i++){
    const x=(rnd()-.5)*30,z=(rnd()-.5)*30;
    if(Math.abs(x)<2.5&&Math.abs(z)<2.4)continue;
    const r=.06+rnd()*.31;
    const rock=mesh(new THREE.DodecahedronGeometry(r,0),rockMats[i%rockMats.length],x,terrainHeight(x,z,lunar)+r*.45,z,terrainGroup);
    rock.rotation.set(rnd()*1.8,rnd()*Math.PI*2,rnd()*1.8);rock.scale.set(.7+rnd(),.45+rnd()*.45,.7+rnd());
  }
  // Mesetas y horizonte; no se utilizan datos de elevación medidos.
  for(let i=0;i<16;i++){
    const theta=i/16*Math.PI*2,x=Math.sin(theta)*21,z=Math.cos(theta)*21,r=1.8+rnd()*2.8;
    const b=mesh(new THREE.DodecahedronGeometry(r,1),rockMats[i%3],x,r*.03-.32,z,terrainGroup);
    b.scale.set(1.7,.42,1.1);b.castShadow=false;
  }
}
const instrumentData={
  opportunity:[
    {label:'Pancam: cámaras panorámicas',pos:[.14,2.27,.37],description:'La Pancam captaba panoramas estéreo y fotografías en distintas longitudes de onda para estudiar minerales y terreno. Fuente: NASA Mars Exploration Rovers / Science Instruments.'},
    {label:'Paneles solares',pos:[-1.48,1.40,.05],description:'Convertían la luz del Sol en energía. Las tormentas de polvo podían reducir la energía disponible y afectar las operaciones.'},
    {label:'Brazo instrumental',pos:[-1.53,.60,1.13],description:'Permitía acercar instrumentos a las rocas y el suelo para obtener mediciones científicas. Incluía un instrumento de abrasión de rocas.'}
  ],
  spirit:[
    {label:'Pancam: cámaras panorámicas',pos:[.14,2.27,.37],description:'Sus cámaras estereoscópicas permitían observar el paisaje y apoyar la selección de sitios de estudio.'},
    {label:'Paneles solares',pos:[-1.48,1.40,.05],description:'Los paneles solares alimentaban los sistemas científicos y de movilidad del rover.'},
    {label:'Brazo científico',pos:[-1.53,.60,1.13],description:'Los instrumentos del brazo examinaban materiales de la superficie para reconstruir antiguos ambientes marcianos.'}
  ],
  apollo:[
    {label:'Asientos de astronautas',pos:[-.52,1.46,-.22],description:'El vehículo lunar transportó a dos astronautas y equipo científico durante las excursiones de Apollo 17.'},
    {label:'Ruedas para suelo lunar',pos:[-1.18,.50,.84],description:'Cuatro ruedas diseñadas para desplazarse en el regolito lunar.'},
    {label:'Área de equipamiento',pos:[1.07,1.10,.40],description:'El rover transportaba herramientas e instrumentos para ampliar el recorrido científico de los astronautas.'}
  ]
};
Object.assign(instrumentData,newInstrumentData);
const infoPanel=document.createElement('div');infoPanel.id='instrument-info';infoPanel.setAttribute('role','status');
infoPanel.innerHTML='<button id="close-instrument" aria-label="Cerrar información">×</button><strong id="instrument-title"></strong><p id="instrument-description"></p>';
host.appendChild(infoPanel);
infoPanel.querySelector('#close-instrument').addEventListener('click',()=>infoPanel.classList.remove('shown'));
let markers=[];
function addInstrumentMarkers(id){markers=[];
 for(const item of instrumentData[id]){
  const halo=mesh(new THREE.SphereGeometry(.102,16,12),new THREE.MeshBasicMaterial({color:0x6ce3ff}),...item.pos);
  halo.userData.instrument=item;
  const ring=mesh(new THREE.TorusGeometry(.165,.017,8,32),new THREE.MeshBasicMaterial({color:0xe5faff,side:THREE.DoubleSide}),...item.pos);
  markers.push({halo,ring});
 }
}
const raycaster=new THREE.Raycaster(),pointer=new THREE.Vector2();let pressedAt=null;
renderer.domElement.addEventListener('pointerdown',e=>pressedAt={x:e.clientX,y:e.clientY});
renderer.domElement.addEventListener('pointerup',e=>{
 if(driving.active || !pressedAt)return;
 const moved=Math.hypot(e.clientX-pressedAt.x,e.clientY-pressedAt.y);pressedAt=null;if(moved>8)return;
 const rect=renderer.domElement.getBoundingClientRect();
 pointer.set((e.clientX-rect.left)/rect.width*2-1,-((e.clientY-rect.top)/rect.height*2-1));
 raycaster.setFromCamera(pointer,camera);
 const hit=raycaster.intersectObjects(markers.map(m=>m.halo));
 if(hit.length){const item=hit[0].object.userData.instrument;
  infoPanel.querySelector('#instrument-title').textContent=item.label;
  infoPanel.querySelector('#instrument-description').textContent=item.description;
  infoPanel.classList.add('shown');
  if(isStationary() && expedition.phase==='travel')reachObjective();
 }
});
let isSunset=false;
function setLighting(){const lunar=missions[selected].place==='LUNA';
 scene.background=new THREE.Color(lunar?0x111a2d:isSunset?skySunset:skyDay);
 scene.fog=new THREE.Fog(scene.background,18,54);
 hemi.intensity=isSunset?1:1.4;
 sun.color.set(lunar?0xeaf0ff:isSunset?0xffa261:0xffe3c5);
 sun.intensity=isSunset?2.7:3.4;
 $('lighting-toggle').textContent=isSunset?'☀ Vista diurna':'◐ Atardecer';
}
function rebuildModel(id){scene.remove(modelGroup);scene.remove(terrainGroup);
 modelGroup=new THREE.Group();terrainGroup=new THREE.Group();scene.add(modelGroup,terrainGroup);
 ingenuityRotors=[];wheelParts=[];
 if(id==='apollo')lunarVehicle();else if(id==='spirit'||id==='opportunity')roboticRover();
 else if(id==='surveyor3')surveyorLander();else if(id==='apollo11')eagleDescent();
 else if(id==='viking1')vikingLander();else if(id==='sojourner')sojournerRover();
 else if(id==='ingenuity')ingenuityHelicopter();
 makeTerrain(missions[selected].place==='LUNA');addInstrumentMarkers(id);
 $('archive-note').hidden=true;
 infoPanel.classList.remove('shown');setLighting();
 camera.position.set(5.6,3.6,6.7);controls.target.set(0,1,0);controls.update();configureDrive();$('drive-console').classList.remove('drive-success');
}


// V5.2 · Movimiento didáctico local: NO es conducción remota ni telemetría histórica.
const mobileVehicles=new Set(['apollo','spirit','opportunity','sojourner']);
const staticVehicles=new Set(['surveyor3','apollo11','viking1']);
const driving={active:false,x:0,z:0,yaw:0,altitude:0,distance:0,arrived:false};
const keys=new Set();const heldButtons=new Set();
const pointOfInterest=new THREE.Group();scene.add(pointOfInterest);
const driveLabels={
 apollo:'Estación geológica lunar',spirit:'Roca de interés geológico',opportunity:'Afloramiento sedimentario',sojourner:'Roca de estudio APXS',ingenuity:'Zona de vuelo experimental'
};
const POI={x:6,z:-3.0};
let lastFrame=performance.now();
function driveKind(){const id=missions[selected].id;return id==='ingenuity'?'flight':mobileVehicles.has(id)?'ground':'static';}
function resetMovement(){
 driving.x=0;driving.z=0;driving.yaw=0;driving.altitude=0;driving.distance=0;driving.arrived=false;
 modelGroup.position.set(0,0,0);modelGroup.rotation.y=0;keys.clear();heldButtons.clear();
 $('drive-distance').textContent='Recorrido: 0.0 m (sim.)';$('drive-height').textContent='Altura: 0.0 m (sim.)';
 setDriveStatus(driveKind()==='flight'?'Usa E para despegar y luego avanza hasta la baliza.':'Encuentra la baliza científica luminosa en el terreno.');
}
function setDriveStatus(message){$('drive-status').textContent=message;}
function configureDrive(){
 const kind=driveKind();driving.active=false;controls.enabled=true;resetMovement();
 const stationary=kind==='static';
 $('drive-console').classList.toggle('drive-static',stationary);
 $('drive-title').textContent=kind==='flight'?'Pilota Ingenuity':stationary?'Inspección de equipo estacionario':'Conduce el vehículo de exploración';
 $('drive-mode').hidden=stationary;$('drive-body').hidden=true;$('drive-mode').textContent=kind==='flight'?'Iniciar vuelo':'Activar conducción';
 $('drive-flight').hidden=kind!=='flight';
 $('drive-instructions').textContent=kind==='flight'?'WASD/flechas: moverse y girar · E: ascender · Q: descender · M: cambiar cámara':'WASD/flechas: avanzar, retroceder y girar · M: cambiar cámara';
 if(stationary)setDriveStatus('Este equipo no se desplazaba. Explora sus puntos azules para conocerlo.');
 else {setDriveStatus('Activa el simulador para llegar a la baliza científica.');}
 pointOfInterest.clear();pointOfInterest.visible=!stationary;
 if(!stationary){
  const ring=new THREE.Mesh(new THREE.TorusGeometry(.7,.055,10,40),new THREE.MeshBasicMaterial({color:0x6ae6ff}));ring.rotation.x=Math.PI/2;ring.position.y=.18;
  const column=new THREE.Mesh(new THREE.CylinderGeometry(.045,.045,2.1,12),new THREE.MeshBasicMaterial({color:0x90ebff,transparent:true,opacity:.7}));column.position.y=1.2;
  const glow=new THREE.Mesh(new THREE.SphereGeometry(.26,16,12),new THREE.MeshBasicMaterial({color:0xb7f5ff}));glow.position.y=2.35;
  pointOfInterest.add(ring,column,glow);
  positionWaypoint();
 }
}
function toggleDrive(){if(driveKind()==='static')return;
 driving.active=!driving.active;controls.enabled=!driving.active;keys.clear();heldButtons.clear();
 $('drive-body').hidden=!driving.active;
 $('drive-mode').textContent=driving.active?'Salir del simulador':driveKind()==='flight'?'Iniciar vuelo':'Activar conducción';
 if(driving.active){setDriveStatus('Desplázate hacia la baliza luminosa para desbloquear un descubrimiento.');updateFollowCamera(true);}
 else {setDriveStatus('Modo inspección: gira el modelo y selecciona sus instrumentos.');controls.target.copy(modelGroup.position).add(new THREE.Vector3(0,1,0));controls.update();}
}
$('drive-mode').addEventListener('click',toggleDrive);
$('drive-reset').addEventListener('click',()=>{resetMovement();if(driving.active)updateFollowCamera(true);});
window.addEventListener('blur',()=>{keys.clear();heldButtons.clear();});
const movementCodes={forward:['KeyW','ArrowUp'],back:['KeyS','ArrowDown'],left:['KeyA','ArrowLeft'],right:['KeyD','ArrowRight'],up:['KeyE'],down:['KeyQ']};
function down(action){return heldButtons.has(action)||movementCodes[action].some(code=>keys.has(code));}
document.addEventListener('keydown',e=>{
 if(!driving.active || e.altKey||e.ctrlKey||e.metaKey||['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName))return;
 const supported=[...Object.values(movementCodes).flat(),'KeyM'];
 if(supported.includes(e.code)){e.preventDefault();keys.add(e.code);}
 if(e.code==='KeyM'&&!e.repeat){driving.active=false;controls.enabled=true;$('drive-body').hidden=true;$('drive-mode').textContent=driveKind()==='flight'?'Iniciar vuelo':'Activar conducción';setDriveStatus('Modo inspección activado.');keys.clear();}
});
document.addEventListener('keyup',e=>keys.delete(e.code));
for(const button of document.querySelectorAll('[data-drive]')){
 const action=button.dataset.drive;
 button.addEventListener('pointerdown',e=>{if(!driving.active)return;e.preventDefault();button.setPointerCapture(e.pointerId);heldButtons.add(action);});
 const release=()=>heldButtons.delete(action);
 button.addEventListener('pointerup',release);button.addEventListener('pointercancel',release);button.addEventListener('lostpointercapture',release);
}
function updateFollowCamera(instant=false){
 const forward=new THREE.Vector3(Math.cos(driving.yaw),0,-Math.sin(driving.yaw));
 const anchor=modelGroup.position.clone().add(new THREE.Vector3(0,1.1,0));
 const targetCamera=anchor.clone().addScaledVector(forward,-5.8).add(new THREE.Vector3(0,2.5,1.3));
 if(instant){camera.position.copy(targetCamera);controls.target.copy(anchor);}
 else {camera.position.lerp(targetCamera,.11);controls.target.lerp(anchor,.14);}
 camera.lookAt(controls.target);
}
function updateMovement(dt){
 if(!driving.active)return;
 const kind=driveKind();const steer=(down('left')?1:0)-(down('right')?1:0);
 driving.yaw+=steer*dt*1.1;
 const speed=kind==='flight'?2.4:1.85;
 const throttle=(down('forward')?1:0)-(down('back')?1:0);
 const canTranslate=kind!=='flight'||driving.altitude>.30;
 if(kind==='flight'){
  driving.altitude=Math.max(0,Math.min(3.2,driving.altitude+((down('up')?1:0)-(down('down')?1:0))*dt*1.25));
 }
 if(canTranslate&&throttle){
  const ds=throttle*speed*dt;
  const nx=driving.x+Math.cos(driving.yaw)*ds;
  const nz=driving.z-Math.sin(driving.yaw)*ds;
  if(Math.abs(nx)<14&&Math.abs(nz)<14){driving.x=nx;driving.z=nz;driving.distance+=Math.abs(ds);

if (kind === 'ground') {
  for (const wheel of wheelParts) {
    wheel.pivot.rotation.z -= ds / wheel.radius;
  }
}

  } else setDriveStatus('Límite de la zona de exploración: cambia de dirección.');
 }
 const lunar=missions[selected].place==='LUNA';
 const ground=terrainHeight(driving.x,driving.z,lunar)-terrainHeight(0,0,lunar);
 modelGroup.position.set(driving.x,ground+(kind==='flight'?driving.altitude:0),driving.z);
 modelGroup.rotation.y=driving.yaw;
 if(kind==='flight'&&driving.altitude>.04){for(let i=0;i<ingenuityRotors.length;i++)ingenuityRotors[i].rotation.y+=(i?1:-1)*dt*28;}
 $('drive-distance').textContent=`Recorrido: ${driving.distance.toFixed(1)} m (sim.)`;
 $('drive-height').textContent=`Altura: ${driving.altitude.toFixed(1)} m (sim.)`;
 const wp=waypointPositions[Math.min(expedition.stage,waypointPositions.length-1)];
 if(expedition.phase==='travel' && Math.hypot(driving.x-wp.x,driving.z-wp.z)<1.55 && (kind!=='flight'||driving.altitude>.35)){reachObjective();}
 updateFollowCamera();
}

$('lighting-toggle').addEventListener('click',()=>{isSunset=!isSunset;setLighting();});
$('reset-camera').addEventListener('click',()=>{if(driving.active){updateFollowCamera(true);}else{camera.position.set(5.6,3.6,6.7);controls.target.set(0,1,0);controls.update();}});
function resize(){const w=host.clientWidth,h=host.clientHeight;camera.aspect=w/Math.max(h,1);camera.updateProjectionMatrix();renderer.setSize(w,h,false);}
new ResizeObserver(resize).observe(host);
function animate(){requestAnimationFrame(animate);const now=performance.now(),dt=Math.min((now-lastFrame)/1000,.05);lastFrame=now;updateMovement(dt);if(!driving.active)controls.update();const t=performance.now()*.003;
 for(const {halo,ring} of markers){ring.lookAt(camera.position);halo.scale.setScalar(1+.12*Math.sin(t));}
 renderer.render(scene,camera);
}
document.querySelectorAll('[data-destination]').forEach(b=>b.addEventListener('click',()=>{
  destinationFilter=b.dataset.destination;
  document.querySelectorAll('[data-destination]').forEach(x=>{
    const active=x===b; x.classList.toggle('selected',active); x.setAttribute('aria-pressed',String(active));
  });
  const current=missions[selected];
  if(current.place!==destinationFilter){
    const idx=missions.findIndex(m=>m.place===destinationFilter);if(idx>=0)selectMission(idx);
  } else drawTimeline();
  document.getElementById('destination-status').textContent=`${missions.filter(m=>m.place===destinationFilter).length} historias en ${destinationFilter==='LUNA'?'la Luna':'Marte'}`;
}));
selectMission(missions.findIndex(m=>m.id==='opportunity'));resize();animate();
