// ── PROGRESS BAR ──
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const total = document.body.scrollHeight - window.innerHeight;
  document.getElementById('progressBar').style.width = (scrolled / total * 100) + '%';
});

// ── SCROLL REVEAL ──
const revealEls = document.querySelectorAll('.reveal');
const revObs = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 55);
      revObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
revealEls.forEach(el => revObs.observe(el));

// ── FACTS ──
const facts = [
  "Cleopatra lived closer in time to the Moon landing than to the construction of the Great Pyramid — the pyramids are that old.",
  "If human history were compressed into a single day, agriculture would appear at 11:54 PM, Jesus at 11:58 PM, and the internet at 11:59:59 PM.",
  "The population of Earth was around 1 million people 70,000 years ago. Today it is 8 billion. The difference is mostly the last 200 years.",
  "The Library of Alexandria may have contained up to 700,000 scrolls. Its destruction meant the ancient world's knowledge was largely lost — we may never know what was in it.",
  "The Roman Empire, at its peak, had roads so well-built that many still exist as the foundation of modern European highways 2,000 years later.",
  "Genghis Khan killed so many people that carbon levels in the atmosphere dropped measurably as forests regrew on depopulated farmland.",
  "Mansa Musa of Mali, who ruled in the 1300s, was so wealthy that his pilgrimage to Mecca carrying so much gold caused inflation in Egypt for a decade.",
  "The Black Death killed so many European workers that surviving peasants could demand higher wages — accidentally launching the end of feudalism.",
  "Johannes Gutenberg's printing press made the Bible so widely available that within 50 years, ordinary people could read it for themselves — which made the Reformation inevitable.",
  "World War I started because a driver took a wrong turn — the assassination of Archduke Franz Ferdinand happened because the driver accidentally went the wrong way, giving an assassin a second chance.",
  "The same year Columbus reached America (1492), the Aztec capital Tenochtitlan was the largest city in the world — larger than any city in Europe.",
  "The Apollo 11 computer that landed on the Moon had less processing power than a modern pocket calculator. Humanity went to the moon essentially on mathematics and daring.",
  "More people have been lifted out of extreme poverty in the last 30 years than in the previous 30,000 years combined.",
  "The Internet was originally a US military project designed to survive nuclear war — its ability to route around damage is why it became the most resilient communication system ever built.",
  "Every human alive today shares a single female ancestor who lived in Africa roughly 150,000–200,000 years ago — scientists call her 'Mitochondrial Eve.'"
];

let factIndex = 0;
function showFact() {
  const el = document.getElementById('factText');
  el.style.opacity = 0;
  setTimeout(() => {
    el.textContent = facts[factIndex];
    el.style.transition = 'opacity 0.5s ease';
    el.style.opacity = 1;
  }, 300);
}
function nextFact() { factIndex = (factIndex + 1) % facts.length; showFact(); }
function prevFact() { factIndex = (factIndex - 1 + facts.length) % facts.length; showFact(); }
showFact();
setInterval(nextFact, 12000);

// ── HISTORIAN CHAT ──
const histMsgs = document.getElementById('histMsgs');
const histInput = document.getElementById('histInput');
const histSend = document.getElementById('histSend');
let histHistory = [];

function askHist(q) {
  histInput.value = q;
  sendHist();
  document.getElementById('ask-history').scrollIntoView({ behavior: 'smooth' });
}

function addHistMsg(role, html) {
  const div = document.createElement('div');
  div.className = `hm ${role}`;
  const av = document.createElement('div');
  av.className = 'hm-av';
  av.textContent = role === 'user' ? '?' : 'H';
  const bubble = document.createElement('div');
  bubble.className = 'hm-bubble';
  bubble.innerHTML = html;
  div.appendChild(av);
  div.appendChild(bubble);
  histMsgs.appendChild(div);
  histMsgs.scrollTop = histMsgs.scrollHeight;
}

function showHistTyping() {
  const div = document.createElement('div');
  div.className = 'hm assistant';
  div.id = 'hist-typing';
  div.innerHTML = `<div class="hm-av">H</div><div class="hm-bubble"><div class="typing-ind"><span></span><span></span><span></span></div></div>`;
  histMsgs.appendChild(div);
  histMsgs.scrollTop = histMsgs.scrollHeight;
}

function removeHistTyping() {
  const el = document.getElementById('hist-typing');
  if (el) el.remove();
}

function formatHist(text) {
  text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
  text = text.replace(/\n\n/g, '<br><br>');
  text = text.replace(/\n/g, '<br>');
  return text;
}

async function sendHist() {
  const q = histInput.value.trim();
  if (!q) return;
  histInput.value = '';
  histSend.disabled = true;

  addHistMsg('user', q);
  histHistory.push({ role: 'user', content: q });
  showHistTyping();

  const sys = `You are a masterful historian — part storyteller, part scholar, part detective. You make history feel alive, urgent, and personally relevant.

Your approach:
- Always explain WHY something happened, not just WHAT happened
- Connect historical events to their modern consequences — show why this matters TODAY
- Use vivid, concrete details that bring the past alive
- Be honest about what we don't know and what is contested
- Draw unexpected connections across eras and cultures
- Show how ordinary people experienced big historical events
- Never condescend — treat the person as intelligent
- Use **bold** for key names and **important points**
- Use *italics* for emphasis and nuance
- Write in paragraphs, not lists — history is a story, not a spreadsheet
- Be passionate. History is extraordinary. Let that come through.
- Always end with either a surprising implication, a follow-up question to consider, or a connection to today`;

  try {
    const resp = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: sys,
        messages: histHistory
      })
    });
    const data = await resp.json();
    removeHistTyping();
    const reply = data.content?.[0]?.text || "The archive is momentarily unavailable. Try again.";
    histHistory.push({ role: 'assistant', content: reply });
    addHistMsg('assistant', formatHist(reply));
  } catch(e) {
    removeHistTyping();
    addHistMsg('assistant', "Connection to the archive interrupted. Try again in a moment.");
  }

  histSend.disabled = false;
  histInput.focus();
};