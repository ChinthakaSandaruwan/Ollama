function autoResize(el) {
  el.style.height = 'auto';
  el.style.height = Math.min(el.scrollHeight, 120) + 'px';
}

function handleKey(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
}

function clearChat() {
  const msgs = document.getElementById('messages');
  msgs.innerHTML = '<div class="msg bot">Hello! How can I help you today?</div>';
}

function appendMsg(text, role, extra) {
  const msgs = document.getElementById('messages');
  const div = document.createElement('div');
  div.className = 'msg ' + role + (extra ? ' ' + extra : '');
  div.textContent = text;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
  return div;
}

async function sendMessage() {
  const input = document.getElementById('prompt-input');
  const btn = document.getElementById('send-btn');
  const prompt = input.value.trim();
  if (!prompt) return;

  input.value = '';
  input.style.height = 'auto';
  btn.disabled = true;

  appendMsg(prompt, 'user');
  const thinking = appendMsg('Thinking...', 'bot', 'thinking');

  try {
    const res = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: 'qwen3.5:0.8b', prompt: prompt, stream: false })
    });

    const data = await res.json();
    thinking.remove();
    appendMsg(data.response, 'bot');

  } catch (err) {
    thinking.remove();
    appendMsg('Could not connect to Ollama. Make sure it is running on localhost:11434.', 'bot');
  }

  btn.disabled = false;
  input.focus();
}