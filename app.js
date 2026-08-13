document.addEventListener('DOMContentLoaded', () => {
  // Navigation handling
  const navItems = document.querySelectorAll('.nav-item');
  const views = document.querySelectorAll('.view');

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetView = item.getAttribute('data-view');
      
      navItems.forEach(nav => nav.classList.remove('active'));
      views.forEach(view => view.classList.remove('active'));

      item.classList.add('active');
      const activeView = document.getElementById(`${targetView}-view`);
      if (activeView) activeView.classList.add('active');
    });
  });

  // Prompt chips handling
  const promptChips = document.querySelectorAll('.prompt-chip');
  const promptInput = document.getElementById('prompt-input');

  promptChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const text = chip.getAttribute('data-prompt');
      if (promptInput) {
        promptInput.value = text;
        promptInput.focus();
      }
    });
  });

  // Simple form submission handler
  const chatForm = document.getElementById('chat-form');
  const messagesContainer = document.getElementById('messages');

  if (chatForm && promptInput && messagesContainer) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const messageText = promptInput.value.trim();
      if (!messageText) return;

      // Add User Message
      const userMsg = document.createElement('article');
      userMsg.className = 'message user-message';
      userMsg.innerHTML = `<div class="message-bubble"><p>${escapeHtml(messageText)}</p></div>`;
      messagesContainer.appendChild(userMsg);

      promptInput.value = '';

      // Simulate Assistant Response
      setTimeout(() => {
        const tutorMsg = document.createElement('article');
        tutorMsg.className = 'message tutor-message';
        tutorMsg.innerHTML = `
          <div class="avatar tutor-avatar">K</div>
          <div class="message-bubble">
            <p>That's a great topic to explore! Let's break down <strong>${escapeHtml(messageText)}</strong> step-by-step.</p>
            <div class="message-actions"><button class="save-reply" type="button">Save as a note</button></div>
          </div>`;
        messagesContainer.appendChild(tutorMsg);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }, 600);
    });
  }

  function escapeHtml(text) {
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
});
