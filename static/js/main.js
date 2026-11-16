import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const $=id=>document.getElementById(id);

const missions = [
  {
    id:'apollo',year:'1972',name:'Apollo 17',place:'LUNA',title:'Lunar Roving Vehicle',subtitle:'The vehicle that expanded lunar exploration',
    quote:'“I carried human explorers across a world where only a few footsteps had reached before.”',
    stats:[['1972','MISSION YEAR'],['Moon','DESTINATION']],
    chapters:[
      ['A vehicle for another world','Apollo 17 was the last crewed Apollo mission to land on the Moon. Its astronauts used an electric lunar rover to travel across the surface and study different sites.'],
      ['Geological exploration','The rover carried tools, cameras, and samples, extending the reach of human exploration and helping scientists study the Moon’s geological history.'],
      ['What was left behind','The Lunar Roving Vehicle remains on the Moon. Although it is no longer in use, it is a physical reminder of crewed exploration and scientific progress.']
    ],
    quiz:{question:'What was the main purpose of the Apollo 17 lunar rover?',answers:['To transport astronauts and scientific equipment','To travel from the Moon to Mars','To produce oxygen on the Moon'],correct:0,explain:'The rover let astronauts travel farther and made collecting samples easier.'},
    source:[['NASA — Apollo 17','https://www.nasa.gov/mission/apollo-17/'],['NASA — Apollo Lunar Roving Vehicle','https://www.nasa.gov/history/alsj/alsj-LRV.html']]
  },
  {
    id:'spirit',year:'2004',name:'Spirit',place:'MARTE',title:'Spirit Rover',subtitle:'The explorer that exceeded expectations',
    quote:'“My journey ended, but the discoveries I helped make lived on.”',
    stats:[['2004','LANDING'],['2010','LAST SIGNAL']],
    chapters:[
      ['Welcome to Mars','Spirit landed on Mars in January 2004 along with its twin rover Opportunity to study Martian geology and look for signs of ancient water activity.'],
      ['Scientific discoveries','Spirit found evidence of ancient Martian environments shaped by water, providing important clues about the planet’s geological history.'],
      ['The final chapter','The rover became stuck in soft soil in 2009. It continued observing its surroundings but stopped communicating in 2010; NASA ended contact attempts in 2011.']
    ],
    quiz:{question:'What were Spirit and Opportunity sent to investigate?',answers:['The origin of stars','Geology and evidence of ancient water on Mars','The clouds of Venus'],correct:1,explain:'Both rovers studied rocks and soil to understand ancient Martian environments.'},
    source:[['NASA Science — Spirit','https://science.nasa.gov/mission/spirit/']]
  },
  {
    id:'opportunity',year:'2004–2019',name:'Opportunity',place:'MARTE',title:'Opportunity Rover',subtitle:'Planned for 90 sols. Nearly 15 years of exploration.',
    quote:'“I was designed to last 90 Martian days; my story continued for almost fifteen years.”',
    stats:[['2004','LANDING'],['90 sols','ORIGINAL PLAN'],['2019','MISSION END']],
    chapters:[
      ['An unexpected beginning','Opportunity arrived on Mars in January 2004. The mission was designed to last 90 sols, but the rover continued exploring the Martian surface for almost 15 years.'],
      ['A planet with a past','By studying rocks, sedimentary layers, and minerals, Opportunity found evidence of liquid water on ancient Mars and helped reveal its past environments.'],
      ['Silence on Mars','In June 2018, a major dust storm reduced sunlight reaching its solar panels. Contact was lost, and NASA declared the mission complete in February 2019.'],
      ['An enduring legacy','The rover remains on Mars. Its observations continue to help researchers understand the planet’s history and show how a robotic mission can matter long after its last signal.']
    ],
    quiz:{question:'What contributed to Opportunity losing contact in 2018?',answers:['A dust storm that blocked sunlight','A volcanic eruption near the rover','A launch failure on Earth'],correct:0,explain:'Opportunity relied on solar panels, and a global dust storm cut its power supply. NASA ended the mission in 2019.'},
    source:[['NASA Science — Opportunity','https://science.nasa.gov/mission/opportunity/'],['NASA JPL — Opportunity Mission Complete','https://www.jpl.nasa.gov/news/nasas-opportunity-rover-mission-on-mars-comes-to-end/']]
  }
];


// Historias de cinco misiones añadidas; en V5 todas tienen modelos educativos aproximados.
const archiveMissions = [
 {id:'surveyor3',year:'1967',name:'Surveyor 3',place:'LUNA',archive:false,title:'Surveyor 3 · Lunar lander',subtitle:'The robot that tested the lunar surface',
 quote:'“Before walking on the Moon, we needed to know whether the ground could support us.”',
 stats:[['1967','LANDING'],['1969','VISITED BY APOLLO 12']],
 chapters:[['First contact with the ground','Surveyor 3 landed on the Moon on April 20, 1967. Its camera and sampling device helped scientists study the lunar surface before crewed landings.'],['An experiment with a legacy','Surface tests helped scientists understand the lunar soil. Apollo 12 astronauts later visited the site and retrieved parts of the lander.']],
 quiz:{question:'What did Surveyor 3 study directly on the Moon?',answers:['Lunar soil','Jupiter’s atmosphere','Earth’s oceans'],correct:0,explain:'Surveyor 3 used a surface sampler to examine lunar soil.'},source:[['NASA Science — Surveyor 3','https://science.nasa.gov/mission/surveyor-3/']]},
 {id:'apollo11',year:'1969',name:'Apollo 11 · Eagle',place:'LUNA',archive:false,title:'Eagle · Descent stage',subtitle:'The spacecraft section left on the Moon',
 quote:'“When the astronauts departed, part of their spacecraft stayed here.”',stats:[['1969','MOON LANDING'],['JUL 20','FIRST CREWED LANDING']],
 chapters:[['A historic landing','Apollo 11 landed in the Sea of Tranquility on July 20, 1969. The Eagle lunar module carried Armstrong and Aldrin to the surface.'],['What remains','Eagle’s descent stage remained on the Moon when the ascent stage lifted off to rejoin the command module.']],
 quiz:{question:'Which part of the Eagle lunar module stayed on the Moon?',answers:['The descent stage','The Columbia command module','The entire Saturn V rocket'],correct:0,explain:'The lower stage served as the launch platform for the ascent stage.'},source:[['NASA — Apollo 11 Mission Overview','https://www.nasa.gov/wp-content/uploads/static/history/alsj/a11/a11ov.html']]},
 {id:'viking1',year:'1976',name:'Viking 1',place:'MARTE',archive:false,title:'Viking 1 · Lander',subtitle:'Images and experiments from Mars',
 quote:'“I was among NASA’s first laboratories to work directly on Mars.”',stats:[['1976','LANDING'],['1982','LANDER MISSION END']],
 chapters:[['Arrival on Mars','Viking 1 landed in Chryse Planitia on July 20, 1976, and transmitted images of the Martian surface.'],['A remote laboratory','The lander carried experiments to study the environment and search for signs of biological processes. Its findings helped shape future Mars research.']],
 quiz:{question:'What kind of vehicle was Viking 1 on the surface?',answers:['A stationary lander','A helicopter','A six-wheeled rover'],correct:0,explain:'Viking 1 included a stationary lander and an orbiter.'},source:[['NASA Science — Viking Project','https://science.nasa.gov/mission/viking/']]},
 {id:'sojourner',year:'1997',name:'Sojourner',place:'MARTE',archive:false,title:'Sojourner · NASA’s first Mars rover',subtitle:'Small rover, giant technological leap',
 quote:'“My short journey paved the way for ever more capable vehicles.”',stats:[['1997','LANDING'],['83 DAYS','MARS OPERATIONS']],
 chapters:[['A new way to explore','Sojourner arrived with Mars Pathfinder on July 4, 1997. It showed that a robotic rover could move around and study its surroundings on Mars.'],['Studying rocks','The rover used a spectrometer to investigate the composition of rocks and soil, while the lander provided images and communications.']],
 quiz:{question:'Which mission brought Sojourner to Mars?',answers:['Mars Pathfinder','Apollo 11','Viking 1'],correct:0,explain:'Sojourner was part of the 1997 Mars Pathfinder mission.'},source:[['NASA Science — Mars Pathfinder','https://science.nasa.gov/mission/mars-pathfinder/']]},
 {id:'ingenuity',year:'2021–2024',name:'Ingenuity',place:'MARTE',archive:false,title:'Ingenuity · Mars helicopter',subtitle:'The first powered flight on another planet',
 quote:'“I lifted off above Mars and showed that a new way of exploring was possible.”',stats:[['2021','FIRST FLIGHT'],['72','FLIGHTS'],['2024','LAST FLIGHT']],
 chapters:[['An unprecedented takeoff','Ingenuity arrived on Mars with Perseverance and made its first flight on April 19, 2021. It was the first powered, controlled flight on another planet.'],['Beyond the demonstration','Designed for up to five test flights, Ingenuity completed 72. Its last flight was in January 2024, demonstrating the value of aerial vehicles for exploring other worlds.']],
 quiz:{question:'How many flights did Ingenuity complete?',answers:['5','72','150'],correct:1,explain:'NASA confirmed 72 flights during its Mars mission.'},source:[['NASA Science — Ingenuity','https://science.nasa.gov/mission/mars-2020-perseverance/ingenuity-mars-helicopter/']]}
];
missions.push(...archiveMissions);
missions.sort((a,b)=>parseInt(a.year)-parseInt(b.year));


// V5.1: situaciones educativas hipotéticas. No reproducen decisiones operativas de NASA.
const decisions = {
  surveyor3: {title:'Study the strength of lunar soil',role:'Surface engineering',steps:[
    {q:'Surveyor 3 needs to test the soil. Which instrument would be useful?',opts:['The surface sampler','An Earth television antenna','An ascent thruster'],correct:0,why:'Its sampler could dig into and move lunar material, helping scientists study its properties.'},
    {q:'After examining the terrain, what evidence would you record?',opts:['Images and how the soil responds to the sampler','Only the color of a flag','The temperature of Earth’s ocean'],correct:0,why:'Images and mechanical tests helped scientists better understand the soil. This choice is part of an educational simulation.'}
  ]},
  apollo11: {title:'Discover what Eagle left on the Moon',role:'Lunar engineering',steps:[
    {q:'The astronauts must leave the Moon. Which part stays behind as a launch platform?',opts:['The descent stage','The command module in orbit','The entire Saturn V rocket'],correct:0,why:'The ascent stage launched from the descent stage, which remains on the surface.'},
    {q:'What should you identify in a reconstruction of what remains?',opts:['The legs and structure of the descent stage','The Earth-return capsule','The Hubble telescope'],correct:0,why:'The lower structure and its landing legs remained on the Moon. The 3D model is a simplified illustration.'}
  ]},
  apollo: {title:'Plan a lunar geology expedition',role:'Lunar geology',steps:[
    {q:'Which rover feature lets astronauts explore farther?',opts:['Transporting astronauts and equipment','An engine to leave lunar orbit','An underwater laboratory'],correct:0,why:'The Lunar Roving Vehicle let astronauts travel farther and carry tools and samples.'},
    {q:'When visiting a geological site, what would you record?',opts:['Photos and samples with their location context','Only the rover’s speed','Earth’s weather'],correct:0,why:'Documenting sites and samples provides context for interpreting lunar geology.'}
  ]},
  viking1: {title:'Operate a stationary laboratory on Mars',role:'Surface science',steps:[
    {q:'To study soil beside the lander, what would be a reasonable action?',opts:['Collect a sample with the robotic arm','Drive to another crater','Deploy a helicopter'],correct:0,why:'Viking 1 was a stationary lander with an arm for collecting surface material.'},
    {q:'Why must biological experiment results be interpreted carefully?',opts:['Because experiments require careful analysis and context','Because the camera alone proves life exists','Because detecting any gas confirms organisms'],correct:0,why:'Experiments that investigate possible biological processes do not, on their own, prove life exists.'}
  ]},
  sojourner: {title:'Investigate a rock with a small rover',role:'Martian geochemistry',steps:[
    {q:'Which instrument helps measure a rock’s composition?',opts:['APXS spectrometer','A solar panel used as a camera','A radio antenna'],correct:0,why:'The Alpha Particle X-ray Spectrometer (APXS) helped analyze the elemental composition of rocks and soil.'},
    {q:'Before approaching a rock, what should you check?',opts:['The terrain and a safe path','The brightness of stars seen from Earth','The color of the website interface'],correct:0,why:'Choosing a safe route is important when driving a small rover over uneven ground.'}
  ]},
  spirit: {title:'Explore challenging Martian terrain',role:'Geology and mobility',steps:[
    {q:'You spot an interesting rock in the distance. How would you assess it?',opts:['With images and previous observations','With a photo of another planet','By ignoring nearby terrain'],correct:0,why:'The rover’s cameras and observations helped scientists choose targets and routes.'},
    {q:'If the wheels lose traction in soft soil, what would you prioritize?',opts:['Carefully evaluate risks and possible movements','Speed up without checking the terrain','Permanently turn off all instruments'],correct:0,why:'Spirit became stuck in 2009; its team evaluated possible movements, then continued doing stationary science.'}
  ]},
  opportunity: {title:'Choose how to study signs of ancient water',role:'Geological research',steps:[
    {q:'You notice layers in a rock formation. How would you interpret them?',opts:['Document the layers and minerals','Calculate the depth of Earth’s oceans','Discard all images'],correct:0,why:'Studying layers and minerals helped Opportunity reconstruct ancient Martian environments.'},
    {q:'A dust storm blocks sunlight. Which resource becomes critical?',opts:['Energy available to the rover','Helicopter fuel','Oxygen for a human crew'],correct:0,why:'Opportunity relied on solar panels, and the great 2018 dust storm reduced its access to solar energy.'}
  ]},
  ingenuity: {title:'Prepare an experimental flight on Mars',role:'Aeronautical engineering',steps:[
    {q:'Before takeoff, what is essential?',opts:['Check systems and flight conditions','Connect a power cable to Earth','Expect Mars to have air as dense as Earth’s'],correct:0,why:'Ingenuity had to fly in Mars’s very thin atmosphere using carefully planned flight controls.'},
    {q:'What did Ingenuity demonstrate with its flights?',opts:['Powered, controlled flight on another planet','Transporting astronauts','Extracting oxygen from rocks'],correct:0,why:'Ingenuity demonstrated powered, controlled flight on Mars and completed 72 flights between 2021 and 2024.'}
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
 surveyor3:['Lunar soil sampler','Image documentation'],apollo11:['Descent platform','Engineering legacy'],
 apollo:['Terrain exploration','Sample collection site'],viking1:['Sampling arm','Science laboratory'],
 sojourner:['Rock for APXS analysis','Safe route'],spirit:['Mysterious rock','Low-traction terrain'],
 opportunity:['Rock layers','Dust storm'],ingenuity:['First flight zone','Second landing site']
};
function currentSteps(){return decisions[missions[selected].id].steps;}
function isStationary(){return driveKind()==='static';}
function missionPointsKey(){return missions[selected].id;}
function renderExpedition(){
 const steps=currentSteps();const idx=Math.min(expedition.stage,steps.length-1);
 const finished=expedition.phase==='complete';
 $('space-score').textContent=expedition.score;
 $('stars-earned').textContent=`${expedition.stage} / ${steps.length} discoveries`;
 $('expedition-progress').textContent=finished?'MISSION COMPLETE!':`OBJECTIVE ${idx+1} OF ${steps.length}`;
 $('expedition-title').textContent=finished?'Star explorer!':decisions[missions[selected].id].title;
 const markers=$('mission-stepper').querySelectorAll('.step');
 markers.forEach((node,i)=>{node.classList.toggle('done',i<expedition.stage || finished);node.classList.toggle('current',!finished&&i===idx);});
 $('activity-next').hidden=true;
 $('activity-choices').replaceChildren();$('activity-choices').hidden=true;
 $('activity-feedback').hidden=true;
 $('activity-reward').textContent='✦ +100 points';
 if(finished){
   $('objective-icon').textContent='★';$('objective-status').textContent='EXPEDITION COMPLETE!';$('objective-name').textContent='Two discoveries made';
   $('objective-help').textContent='You helped uncover the science behind this mission!';
   $('activity-kind').textContent='BADGE EARNED';$('activity-title').textContent='🏅 Guardian of the Stars!';
   $('activity-question').textContent='Your knowledge helps exploration move forward. Ready to visit another mission?';
   $('activity-next').textContent='Explore another mission →';$('activity-next').hidden=false;
   pointOfInterest.visible=false;return;
 }
 const name=waypointNames[missionPointsKey()][idx];
 $('objective-name').textContent=name;
 if(expedition.phase==='travel'){
  $('objective-icon').textContent='◎';$('objective-status').textContent=isStationary()?'SCIENTIFIC INSPECTION':'GO TO THE GLOWING BEACON';
  $('objective-help').textContent=isStationary()?'Inspect the blue hotspots on the spacecraft to begin the challenge.':'Drive or fly to the glowing circle marking your next stop.';
  $('activity-kind').textContent='CHALLENGE LOCKED';$('activity-title').textContent=`Stop ${idx+1}: ${name}`;
  $('activity-question').textContent=isStationary()?'Click a blue hotspot on the spacecraft to unlock the question.':'Once you reach the target, the question appears right here. No scrolling needed!';
 }else if(expedition.phase==='question'){
  $('objective-icon').textContent='🔎';$('objective-status').textContent='TARGET REACHED';
  $('objective-help').textContent='You can now answer in Mission Control!';
  $('activity-kind').textContent='SCIENCE QUESTION';$('activity-title').textContent=`Challenge ${idx+1}: ${name}`;
  const step=steps[idx];$('activity-question').textContent=step.q;
  $('activity-choices').hidden=false;
  step.opts.forEach((option,i)=>{
    const btn=document.createElement('button');btn.className='activity-choice';btn.type='button';
    btn.textContent=String.fromCharCode(65+i)+'. '+option;
    btn.addEventListener('click',()=>answerExpedition(i));$('activity-choices').appendChild(btn);
  });
 }else if(expedition.phase==='feedback'){
  $('objective-icon').textContent='★';$('objective-status').textContent='DISCOVERY MADE!';
  $('objective-help').textContent='You just learned something new about this spacecraft.';
  $('activity-kind').textContent='KNOWLEDGE UNLOCKED';$('activity-title').textContent='Great job, explorer!';
  $('activity-question').textContent='Your discovery has been recorded.';
  $('activity-feedback').hidden=false;
  $('activity-feedback').textContent=expedition.feedback;
  $('activity-next').hidden=false;
  $('activity-next').textContent=idx===steps.length-1?'View my reward ★':'Go to the next target →';
 }
}
function reachObjective(){
 if(expedition.phase!=='travel')return;
 expedition.phase='question';driving.arrived=true;pointOfInterest.visible=false;
 setDriveStatus('Target reached! Answer the question in Mission Control, right beside you.');
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
  expedition.phase='feedback';expedition.feedback=`🌟 Correct answer! ${newlyAwarded?'+'+bonus+' star points.':'You have already earned points for this challenge.'} ${step.why}`;
  renderExpedition();
 }else{
  $('activity-feedback').hidden=false;
  $('activity-feedback').textContent=`💡 Good try. ${step.why} Choose the correct answer and try again.`;
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
 else{expedition.phase='travel';expedition.tries=0;driving.arrived=false;positionWaypoint();setDriveStatus(isStationary()?'Inspect another instrument to begin the second challenge.':'Great job! Now head to the next glowing beacon.');$('drive-console').classList.remove('drive-success');}
 renderExpedition();
}
$('activity-next').addEventListener('click',advanceExpedition);
$('restart-expedition').addEventListener('click',()=>{resetExpedition();if(!isStationary()){resetMovement();positionWaypoint();}});

let selected=0,chapter=0;
let destinationFilter='MARTE';

function drawTimeline(){
  $('timeline').innerHTML=missions.map((m,i)=>({...m,i})).filter(m=>destinationFilter==='TODOS'||m.place===destinationFilter).map(m=>`<button class="time-item ${m.i===selected?'active':''}" data-index="${m.i}" aria-pressed="${m.i===selected}"><span class="time-year">${m.year}</span><span class="time-name">${m.name}</span><small class="time-type">🚀 Explore mission</small></button>`).join('');
  document.querySelectorAll('.time-item').forEach(b=>b.addEventListener('click',()=>selectMission(Number(b.dataset.index))));
}
function selectMission(i){selected=i;chapter=0;const m=missions[i];drawTimeline();$('mission-meta').textContent=`${m.place==='LUNA'?'MOON':'MARS'} / ${m.year}`;$('mission-title').textContent=m.title;$('mission-subtitle').textContent=m.subtitle;$('mission-quote').textContent=m.quote;$('mission-stats').innerHTML=m.stats.map(([v,l])=>`<div><div class="stat-value">${v}</div><div class="stat-label">${l}</div></div>`).join('');$('viewer-label').textContent=`${m.name.toUpperCase()} · EDUCATIONAL 3D RECREATION`; $('model-status').textContent='● INTERACTIVE 3D MODEL';renderChapter();drawSources();rebuildModel(m.id);resetExpedition();}
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
  {label:'Television camera',pos:[.10,2.39,.28],description:'The camera photographed the lunar surface and helped scientists study its texture and terrain.'},
  {label:'Surface sampler',pos:[1.39,.36,1.42],description:'A robotic arm with a scoop dug into and moved the soil to study its behavior.'},
  {label:'Landing legs',pos:[1.74,.22,0],description:'Three landing legs spread the lander’s weight across the lunar soil.'}
 ],
 apollo11:[
  {label:'Etapa de descenso',pos:[0,1.62,.94],description:'This stage supported the Moon landing and remained on the lunar surface after the upper stage lifted off.'},
  {label:'Landing leg and footpad',pos:[1.68,.18,1.65],description:'The landing gear spread the force of touchdown across the surface.'},
  {label:'Access ladder',pos:[.60,.80,1.15],description:'Astronauts climbed down a ladder from the lunar module to the surface.'}
 ],
 viking1:[
  {label:'High-gain antenna',pos:[-.72,2.18,-.03],description:'The communications system transmitted scientific data from Mars.'},
  {label:'Sample collection arm',pos:[1.57,.45,1.18],description:'The sampling device collected Martian material for analysis by the lander’s experiments.'},
  {label:'Thermoelectric generators',pos:[.83,1.72,.35],description:'The RTGs generated electricity using heat from radioactive decay.'}
 ],
 sojourner:[
  {label:'Solar panel',pos:[0,1.02,0],description:'Sojourner used solar cells as its main power source and also carried batteries.'},
  {label:'Six-wheel system',pos:[-.75,.36,.72],description:'The mobility system helped the small rover move across uneven ground near Pathfinder.'},
  {label:'APXS spectrometer',pos:[-.90,.62,.04],description:'The Alpha Proton X-Ray Spectrometer studied the elemental makeup of rocks and soil.'}
 ],
 ingenuity:[
  {label:'Coaxial rotors',pos:[1.15,2.04,0],description:'Two sets of counter-rotating blades generated lift in Mars’s thin atmosphere.'},
  {label:'Solar panel',pos:[0,2.34,.07],description:'This panel charged the batteries that powered Ingenuity’s flights and systems.'},
  {label:'Body and cameras',pos:[.10,.90,.41],description:'The body housed electronics, sensors, and cameras for navigation and terrain photography.'}
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
    {label:'Pancam: panoramic cameras',pos:[.14,2.27,.37],description:'Pancam captured stereo panoramas and images at different wavelengths to study minerals and terrain. Source: NASA Mars Exploration Rovers / Science Instruments.'},
    {label:'Solar panels',pos:[-1.48,1.40,.05],description:'They converted sunlight into electricity. Dust storms could reduce available power and affect operations.'},
    {label:'Instrument arm',pos:[-1.53,.60,1.13],description:'It positioned instruments next to rocks and soil to take scientific measurements, including with a rock abrasion tool.'}
  ],
  spirit:[
    {label:'Pancam: panoramic cameras',pos:[.14,2.27,.37],description:'Its stereo cameras helped observe the landscape and choose study sites.'},
    {label:'Solar panels',pos:[-1.48,1.40,.05],description:'Solar panels powered the rover’s scientific instruments and mobility systems.'},
    {label:'Science arm',pos:[-1.53,.60,1.13],description:'Instruments on the arm examined surface materials to learn about ancient Martian environments.'}
  ],
  apollo:[
    {label:'Astronaut seats',pos:[-.52,1.46,-.22],description:'The lunar rover carried two astronauts and scientific equipment during Apollo 17 excursions.'},
    {label:'Wheels for lunar soil',pos:[-1.18,.50,.84],description:'Four wheels designed to travel across the lunar regolith.'},
    {label:'Equipment area',pos:[1.07,1.10,.40],description:'The rover carried tools and instruments to extend astronauts’ scientific exploration.'}
  ]
};
Object.assign(instrumentData,newInstrumentData);
const infoPanel=document.createElement('div');infoPanel.id='instrument-info';infoPanel.setAttribute('role','status');
infoPanel.innerHTML='<button id="close-instrument" aria-label="Close information">×</button><strong id="instrument-title"></strong><p id="instrument-description"></p>';
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
 $('lighting-toggle').textContent=isSunset?'☀ Day view':'◐ Sunset';
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
 apollo:'Lunar geology station',spirit:'Geologically interesting rock',opportunity:'Sedimentary outcrop',sojourner:'APXS study rock',ingenuity:'Experimental flight zone'
};
const POI={x:6,z:-3.0};
let lastFrame=performance.now();
function driveKind(){const id=missions[selected].id;return id==='ingenuity'?'flight':mobileVehicles.has(id)?'ground':'static';}
function resetMovement(){
 driving.x=0;driving.z=0;driving.yaw=0;driving.altitude=0;driving.distance=0;driving.arrived=false;
 modelGroup.position.set(0,0,0);modelGroup.rotation.y=0;keys.clear();heldButtons.clear();
 $('drive-distance').textContent='Distance: 0.0 m (sim.)';$('drive-height').textContent='Altitude: 0.0 m (sim.)';
 setDriveStatus(driveKind()==='flight'?'Press E to take off, then head toward the beacon.':'Find the glowing science beacon on the terrain.');
}
function setDriveStatus(message){$('drive-status').textContent=message;}
function configureDrive(){
 const kind=driveKind();driving.active=false;controls.enabled=true;resetMovement();
 const stationary=kind==='static';
 $('drive-console').classList.toggle('drive-static',stationary);
 $('drive-title').textContent=kind==='flight'?'Pilot Ingenuity':stationary?'Inspect a stationary spacecraft':'Drive the exploration rover';
 $('drive-mode').hidden=stationary;$('drive-body').hidden=true;$('drive-mode').textContent=kind==='flight'?'Start flight':'Start driving';
 $('drive-flight').hidden=kind!=='flight';
 $('drive-instructions').textContent=kind==='flight'?'WASD/arrow keys: move and turn · E: ascend · Q: descend · M: change camera':'WASD/arrow keys: forward, backward, and turn · M: change camera';
 if(stationary)setDriveStatus('This spacecraft did not move. Explore its blue hotspots to learn about it.');
 else {setDriveStatus('Start the simulator to reach the science beacon.');}
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
 $('drive-mode').textContent=driving.active?'Exit simulator':driveKind()==='flight'?'Start flight':'Start driving';
 if(driving.active){setDriveStatus('Head toward the glowing beacon to unlock a discovery.');updateFollowCamera(true);}
 else {setDriveStatus('Inspection mode: rotate the model and select its instruments.');controls.target.copy(modelGroup.position).add(new THREE.Vector3(0,1,0));controls.update();}
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
 if(e.code==='KeyM'&&!e.repeat){driving.active=false;controls.enabled=true;$('drive-body').hidden=true;$('drive-mode').textContent=driveKind()==='flight'?'Start flight':'Start driving';setDriveStatus('Inspection mode enabled.');keys.clear();}
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

  } else setDriveStatus('Exploration zone boundary: change direction.');
 }
 const lunar=missions[selected].place==='LUNA';
 const ground=terrainHeight(driving.x,driving.z,lunar)-terrainHeight(0,0,lunar);
 modelGroup.position.set(driving.x,ground+(kind==='flight'?driving.altitude:0),driving.z);
 modelGroup.rotation.y=driving.yaw;
 if(kind==='flight'&&driving.altitude>.04){for(let i=0;i<ingenuityRotors.length;i++)ingenuityRotors[i].rotation.y+=(i?1:-1)*dt*28;}
 $('drive-distance').textContent=`Distance: ${driving.distance.toFixed(1)} m (sim.)`;
 $('drive-height').textContent=`Altitude: ${driving.altitude.toFixed(1)} m (sim.)`;
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
  document.getElementById('destination-status').textContent=`${missions.filter(m=>m.place===destinationFilter).length} stories on ${destinationFilter==='LUNA'?'the Moon':'Mars'}`;
}));
selectMission(missions.findIndex(m=>m.id==='opportunity'));resize();animate();
