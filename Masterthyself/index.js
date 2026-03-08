
// ── STARFIELD ──
(function(){
  const sf = document.getElementById('starfield');
  for(let i=0;i<180;i++){
    const s=document.createElement('div');
    s.className='star';
    const size=Math.random()<0.8?1:Math.random()<0.7?1.5:2;
    const minOp=0.05+Math.random()*0.15;
    const maxOp=minOp+0.1+Math.random()*0.3;
    s.style.cssText=`width:${size}px;height:${size}px;top:${Math.random()*100}%;left:${Math.random()*100}%;--d:${3+Math.random()*7}s;--delay:${Math.random()*8}s;--min-op:${minOp};--max-op:${maxOp}`;
    sf.appendChild(s);
  }
})();

// ── SCROLL REVEAL ──
const revEls=document.querySelectorAll('.reveal');
const ro=new IntersectionObserver(entries=>{
  entries.forEach((e,i)=>{
    if(e.isIntersecting){setTimeout(()=>e.target.classList.add('visible'),i*60);ro.unobserve(e.target);}
  });
},{threshold:0.08});
revEls.forEach(el=>ro.observe(el));

// ── DAILY DATE ──
const DAYS=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const MONTHS=['January','February','March','April','May','June','July','August','September','October','November','December'];
const now=new Date();
document.getElementById('dailyDate').textContent=`${DAYS[now.getDay()]}, ${MONTHS[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;

// ── REFLECTION DATA ──
const verses=[
  {text:"For I know the plans I have for you, declares the LORD, plans to prosper you and not to harm you, plans to give you hope and a future.",source:"Jeremiah 29:11"},
  {text:"Trust in the LORD with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",source:"Proverbs 3:5–6"},
  {text:"Be strong and courageous. Do not be afraid; do not be discouraged, for the LORD your God will be with you wherever you go.",source:"Joshua 1:9"},
  {text:"The LORD is my shepherd; I shall not want. He makes me lie down in green pastures.",source:"Psalm 23:1–2"},
  {text:"Come to me, all you who are weary and burdened, and I will give you rest.",source:"Matthew 11:28"},
  {text:"For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",source:"John 3:16"},
  {text:"I can do all things through Christ who strengthens me.",source:"Philippians 4:13"},
  {text:"And we know that in all things God works for the good of those who love him.",source:"Romans 8:28"},
  {text:"The heart of man plans his way, but the LORD establishes his steps.",source:"Proverbs 16:9"},
  {text:"Be still and know that I am God.",source:"Psalm 46:10"},
  {text:"Ask and it will be given to you; seek and you will find; knock and the door will be opened to you.",source:"Matthew 7:7"},
  {text:"Do not conform to the pattern of this world, but be transformed by the renewing of your mind.",source:"Romans 12:2"},
  {text:"He heals the brokenhearted and binds up their wounds.",source:"Psalm 147:3"},
  {text:"Cast all your anxiety on him because he cares for you.",source:"1 Peter 5:7"},
  {text:"For nothing will be impossible with God.",source:"Luke 1:37"},
  {text:"The LORD your God is in your midst, a mighty one who will save; he will rejoice over you with gladness; he will quiet you by his love.",source:"Zephaniah 3:17"},
  {text:"Create in me a pure heart, O God, and renew a steadfast spirit within me.",source:"Psalm 51:10"},
  {text:"Where can I go from your Spirit? Where can I flee from your presence?",source:"Psalm 139:7"},
  {text:"Even youths grow tired and weary, and young men stumble and fall; but those who hope in the LORD will renew their strength.",source:"Isaiah 40:30–31"},
  {text:"Greater love has no one than this: to lay down one's life for one's friends.",source:"John 15:13"}
];

const histMoments=[
  {text:"On this kind of day in 1440, Johannes Gutenberg perfected movable type printing — within 50 years, 20 million books would exist in Europe.",source:"The Printing Revolution"},
  {text:"In 410 CE, Rome fell to the Visigoths for the first time in 800 years. From the ruins, Augustine wrote The City of God.",source:"The Fall of Rome"},
  {text:"On November 9, 1989, the Berlin Wall fell — not by force, but because one border guard made a single different decision.",source:"The Cold War Ends"},
  {text:"In 1517, Martin Luther posted his 95 theses. The printing press spread his words across Europe in weeks, igniting a revolution no one could stop.",source:"The Reformation"},
  {text:"In 1492, Columbus reached the Americas — beginning the most consequential collision of worlds in human history.",source:"The Age of Exploration"},
  {text:"On July 20, 1969, Neil Armstrong stepped onto the moon. 600 million people watched. For the first time, humanity had left its planet.",source:"The Space Age"},
  {text:"In ~500 BCE, within decades of each other: Buddha, Confucius, Socrates, and the Hebrew prophets all asked the deepest questions simultaneously. This has never been explained.",source:"The Axial Age"},
  {text:"In 1347, bubonic plague killed 30–60% of Europe. From the devastation emerged a new world — one that would produce the Renaissance.",source:"The Black Death"},
  {text:"In ~10,000 BCE, humans began growing food instead of following it. This single decision made cities, writing, law, and all of civilization possible.",source:"The Agricultural Revolution"},
  {text:"In 1215, English barons forced King John to sign Magna Carta — the ancestor of every constitution and bill of rights ever written.",source:"The Rule of Law"},
  {text:"Mohandas Gandhi walked 240 miles to the sea to pick up salt — a single symbolic act that helped bring down the British Empire.",source:"India's Independence"},
  {text:"In 1805, Admiral Nelson died at Trafalgar winning a battle that secured British naval supremacy for a century. His last words were reportedly: 'Thank God I have done my duty.'",source:"The Napoleonic Era"},
  {text:"On February 11, 1990, Nelson Mandela walked free after 27 years in prison. He said: 'I knew if I didn't leave my bitterness behind, I'd still be in prison.'",source:"South Africa"},
  {text:"In ~70,000 BCE, humans began making art, music, and telling stories — the Cognitive Revolution that would eventually produce everything you see around you.",source:"Prehistoric Humanity"},
  {text:"In 33 CE, a carpenter from Nazareth was crucified outside Jerusalem. Within 300 years, His movement became the official religion of Rome.",source:"The Ancient World"}
];

const questions=[
  "What is one thing you know today that you didn't know a year ago — and how did it change you?",
  "If you had to name the three most important things you believe, what would they be?",
  "What question are you most afraid to ask yourself?",
  "Who has shaped who you are — and have you ever told them?",
  "What would you do differently if you knew that God was watching your every decision today?",
  "What story from history speaks most directly to your current situation?",
  "If your life ended today, what would feel unfinished?",
  "What does your body tell you that your mind keeps ignoring?",
  "What truth are you resisting because it would require you to change?",
  "Who is someone who went back for others after escaping their own difficulties — and are you called to do the same?",
  "What does the word 'home' mean to you — and are you living toward it?",
  "If suffering has a purpose, what might yours be teaching you?",
  "What are you building that will outlast you?",
  "What habit, if you started it today, would make the most difference in ten years?",
  "When did you last feel fully alive — and what was happening?",
  "What would you do if you knew you couldn't fail — and why aren't you doing it?",
  "Who in your life is in a pit right now — and what does the story of Joseph say about that?",
  "What does it mean to you that you are made in the image of God?",
  "What wall in your life seems permanent but might be closer to falling than you think?",
  "What fire are you meant to bring to others — and what might it cost you?"
];

function getDailyIndex(arr){
  const dayOfYear=Math.floor((now-new Date(now.getFullYear(),0,0))/(1000*60*60*24));
  return dayOfYear%arr.length;
}

function loadReflection(){
  // Rotate through, slightly randomized each refresh
  const vIdx=Math.floor(Math.random()*verses.length);
  const hIdx=Math.floor(Math.random()*histMoments.length);
  const qIdx=Math.floor(Math.random()*questions.length);

  const v=verses[vIdx];
  const h=histMoments[hIdx];
  const q=questions[qIdx];

  animate('verseText',v.text);
  document.getElementById('verseSource').textContent=v.source;
  animate('histText',h.text);
  document.getElementById('histSource').textContent=h.source;
  animate('questionText',q);
}

function animate(id,text){
  const el=document.getElementById(id);
  el.style.opacity='0';
  setTimeout(()=>{el.textContent=text;el.style.transition='opacity 0.6s ease';el.style.opacity='1';},200);
}

// Load daily (deterministic on first load)
(function initDaily(){
  const v=verses[getDailyIndex(verses)];
  const h=histMoments[getDailyIndex(histMoments)];
  const q=questions[getDailyIndex(questions)];
  document.getElementById('verseText').textContent=v.text;
  document.getElementById('verseSource').textContent=v.source;
  document.getElementById('histText').textContent=h.text;
  document.getElementById('histSource').textContent=h.source;
  document.getElementById('questionText').textContent=q;
})();

// ── JOURNEY TRACKER DATA ──
const pillarsData={
  body:{
    label:'Body',
    items:['Completed Body roadmap basics','Understood sleep & recovery','Learned about nutrition foundations','Explored movement & exercise','Studied gut health & microbiome','Understood hormones & metabolism','Read at least 1 Body book']
  },
  mind:{
    label:'Mind',
    items:['Completed Mind roadmap basics','Understood how memory works','Studied cognitive biases','Explored emotional intelligence','Learned about decision-making','Practiced mindfulness or meditation','Read at least 1 Mind book']
  },
  soul:{
    label:'Soul',
    items:['Completed Soul roadmap basics','Explored core beliefs & values','Sat with the big questions','Studied a wisdom tradition','Explored the meaning of suffering','Developed a spiritual practice','Read at least 1 Soul book']
  },
  worlds:{
    label:'Worlds',
    items:['Visited The I AM','Visited The Human Story','Visited The Library','Asked the AI Historian a question','Read a full story in The Library','Generated a custom story','Saved a story to collection']
  }
};

let journeyState={checks:{},notes:'',reading:[],finished:[]};

function loadJourney(){
  try{
    const saved=localStorage.getItem('knoweverything_journey');
    if(saved)journeyState=JSON.parse(saved);
  }catch(e){}
}

function saveJourney(){
  try{
    localStorage.setItem('knoweverything_journey',JSON.stringify(journeyState));
    const msg=document.getElementById('savedMsg');
    msg.classList.add('visible');
    setTimeout(()=>msg.classList.remove('visible'),2500);
  }catch(e){}
}

function autoSave(){
  journeyState.notes=document.getElementById('journeyNotes').value;
  saveJourney();
}

function renderPillar(key){
  const data=pillarsData[key];
  const container=document.getElementById(`checks-${key}`);
  container.innerHTML='';
  const checks=journeyState.checks[key]||{};
  let done=0;
  data.items.forEach((item,i)=>{
    const checked=checks[i]||false;
    if(checked)done++;
    const row=document.createElement('div');
    row.className='pillar-check'+(checked?' done':'');
    row.innerHTML=`<div class="check-box${checked?' checked':''}" id="chk-${key}-${i}" style="${checked?`background:current;`:''}">✓</div><span class="check-label">${item}</span>`;
    row.addEventListener('click',()=>toggleCheck(key,i,data.items.length));
    container.appendChild(row);
  });
  updateBar(key,done,data.items.length);
}

function updateBar(key,done,total){
  const pct=Math.round(done/total*100);
  document.getElementById(`bar-${key}`).style.width=pct+'%';
  document.getElementById(`pct-${key}`).textContent=pct+'%';
}

function toggleCheck(key,idx,total){
  if(!journeyState.checks[key])journeyState.checks[key]={};
  journeyState.checks[key][idx]=!journeyState.checks[key][idx];
  renderPillar(key);
  saveJourney();
}

function renderBooks(){
  renderBookList('reading');
  renderBookList('finished');
  document.getElementById('journeyNotes').value=journeyState.notes||'';
}

function renderBookList(type){
  const list=document.getElementById(`${type}List`);
  list.innerHTML='';
  const books=journeyState[type]||[];
  books.forEach((book,i)=>{
    const entry=document.createElement('div');
    entry.className='book-entry';
    entry.innerHTML=`<span class="book-entry-text">${book}</span><button class="book-remove" onclick="removeBook('${type}',${i})">✕</button>`;
    list.appendChild(entry);
  });
}

function addBook(type){
  const input=document.getElementById(`${type}Input`);
  const val=input.value.trim();
  if(!val)return;
  if(!journeyState[type])journeyState[type]=[];
  journeyState[type].push(val);
  input.value='';
  renderBookList(type);
  saveJourney();
}

function removeBook(type,idx){
  journeyState[type].splice(idx,1);
  renderBookList(type);
  saveJourney();
}

function saveTracker(){
  journeyState.notes=document.getElementById('journeyNotes').value;
  saveJourney();
}

function resetTracker(){
  if(!confirm('Reset your entire journey? This cannot be undone.'))return;
  journeyState={checks:{},notes:'',reading:[],finished:[]};
  saveJourney();
  initTracker();
}

function initTracker(){
  loadJourney();
  Object.keys(pillarsData).forEach(renderPillar);
  renderBooks();
}

initTracker();