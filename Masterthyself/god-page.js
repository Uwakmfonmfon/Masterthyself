// ── SCROLL REVEAL ──
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 60);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
reveals.forEach(el => observer.observe(el));

// ── CHAT ──
const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

let conversationHistory = [];

function askQuestion(q) {
  userInput.value = q;
  sendMessage();
}

function addMessage(role, content) {
  const div = document.createElement('div');
  div.className = `msg ${role}`;
  const avatar = document.createElement('div');
  avatar.className = 'msg-avatar';
  avatar.textContent = role === 'user' ? '🙏' : '✦';
  const bubble = document.createElement('div');
  bubble.className = 'msg-bubble';
  bubble.innerHTML = content;
  div.appendChild(avatar);
  div.appendChild(bubble);
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTyping() {
  const div = document.createElement('div');
  div.className = 'msg assistant';
  div.id = 'typing-indicator';
  div.innerHTML = `<div class="msg-avatar">✦</div><div class="msg-bubble"><div class="typing"><span></span><span></span><span></span></div></div>`;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeTyping() {
  const el = document.getElementById('typing-indicator');
  if (el) el.remove();
}

function formatResponse(text) {
  // Bold **text**
  text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  // Italics *text*
  text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
  // Bible references like (John 3:16) become verse tags
  text = text.replace(/\(([A-Za-z0-9 ]+\s?\d+:\d+[\-\d]*)\)/g, '<span class="verse-tag">$1</span>');
  // Line breaks
  text = text.replace(/\n\n/g, '<br><br>');
  text = text.replace(/\n/g, '<br>');
  return text;
}

async function sendMessage() {
  const q = userInput.value.trim();
  if (!q) return;

  userInput.value = '';
  sendBtn.disabled = true;

  addMessage('user', q);
  conversationHistory.push({ role: 'user', content: q });

  showTyping();

  const systemPrompt = `You are a warm, knowledgeable, deeply loving guide who helps people understand God, the Bible, Jesus, and Christian faith. You are like the best pastor, theologian, and friend combined — someone who takes every question seriously and answers it with depth, warmth, and honesty.

Your style:
- Always warm, never preachy or condescending
- Break down complex truths into digestible, real language
- Reference specific Bible verses (in parentheses like John 3:16) naturally throughout
- Use the names of God naturally: Yahweh, Abba, El Shaddai, Jesus, the Holy Spirit
- Acknowledge doubts and hard questions honestly — don't paper over them
- Always bring answers back to what this means for the person's actual life
- Be concise but never shallow — aim for answers that satisfy
- Radiate warmth, hope, and the genuine goodness of God
- If someone seems to be hurting, notice it and speak to it
- Never lecture. Converse.
- Format with **bold** for key insights and *italics* for emphasis
- Paragraphs, not bullet lists
- End with an invitation — either a verse to sit with, a question to reflect on, or an encouragement`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: systemPrompt,
        messages: conversationHistory
      })
    });

    const data = await response.json();
    removeTyping();

    const reply = data.content?.[0]?.text || "I'm here. Try asking again.";
    conversationHistory.push({ role: 'assistant', content: reply });
    addMessage('assistant', formatResponse(reply));

  } catch (err) {
    removeTyping();
    addMessage('assistant', "Something interrupted us — but He never does. Try again in a moment. 🌟");
  }

  sendBtn.disabled = false;
  userInput.focus();
};