// script.js
// ----- MEDIA ASSETS -----
const mediaItems = [
  // NEW images first — Stombe 1 is baby pic, Stombe 2 & 3 are baddie pics
  { type: 'image', src: 'stombe 1.jpeg', title: 'look at you ... as a baby 🌟', description: 'ncooooo' },
  { type: 'image', src: 'stombe 2.jpeg', title: 'rrrrr💫', description: 'i could bite you... i mean lick you' },
  { type: 'image', src: 'stombe 3.jpeg', title: 'yeses 🌈', description: 'i could spend my whole life with you and onnly you' },
  // NEW videos
  { type: 'video', src: 'baby 1.mp4', title: 'yohhh 👶', description: '' },
  { type: 'video', src: 'baby 2.mp4', title: 'yoh', description: 'You are my favourite everything' },
  { type: 'video', src: 'baby 3.mp4', title: 'yess wena ', description: 'Forever my baby' },
  // Original media
  { type: 'image', src: 'picture1.jpg', title: 'well', description: 'my precious dumbass' },
  { type: 'image', src: 'picture2.jpg', title: 'Why I will always love you', description: 'To more years of being dumb together' },
  { type: 'video', src: 'weirdo.mp4', title: 'My Weirdo', description: 'I love it so much' },
  { type: 'image', src: 'holdinghands.jpeg', title: 'Still Holding On', description: 'Never letting go, no matter what' },
  { type: 'image', src: 'missingring.jpeg', title: 'Yess something is still missing 💍', description: 'But it will change soon... just wait' },
  { type: 'image', src: 'us.jpeg', title: 'old picture yess', description: 'we dont have an mirror pictures' },
  { type: 'image', src: 'wife.jpeg', title: 'Future Mrs.', description: 'Looking like my wife already , well you are my wife already. Can\'t wait to make it official' },
  { type: 'image', src: 'calls.jpg', title: 'Just you looking pretty one more time', description: 'i want to kidnap you... respectfully soo' }
];

// ----- STAGES with notes matched to each caption -----
const stages = [
  { type: 'welcome' },
  // Stombe 1 — baby picture
  { type: 'media', mediaIndex: 0, note: 'Look at you, as a baby ... yes i used this picture.. but make her proud baby. ✨' },
  // Stombe 2 — baddie picture
  { type: 'media', mediaIndex: 1, note: 'Okay, baddie. we see the big forehead.. my big forehead. want a kiss?' },
  // Stombe 3 — baddie picture
  { type: 'media', mediaIndex: 2, note: 'okay we get it ... youre hot and stuff stop showing off' },
  // Baby 1 video
  { type: 'media', mediaIndex: 3, note: 'did i mention that i love you baby' },
  // Baby 2 video
  { type: 'media', mediaIndex: 4, note: 'You are my favourite everything — my favourite person, my favourite view, my favourite future. ' },
  // Baby 3 video
  { type: 'media', mediaIndex: 5, note: 'Forever my baby. No matter how fine you get, you\'ll always be my baby. 🧸' },
  // You being dumb
  { type: 'media', mediaIndex: 6, note: 'You are dumb ... just like me .... i love you for that ... never change .. always be dumb' },
  // Why I will always love you
  { type: 'media', mediaIndex: 7, note: 'i love you baby . ❤️' },
  // My Weirdo
  { type: 'media', mediaIndex: 8, note: 'i love you and all your weird parts... even when you are mad at me.' },
  // Still Holding On
  { type: 'media', mediaIndex: 9, note: 'Still holding on, and I don\'t ever plan on letting go. You\'re stuck with me, baby.' },
  // Yess something is still missing
  { type: 'media', mediaIndex: 10, note: 'Yess something is still missing... but it will change soon. Just you wait. 💍' },
  // You & Me
  { type: 'media', mediaIndex: 11, note: 'old picture ... i know , i couldn\'t find others' },
  // Future Mrs.
  { type: 'media', mediaIndex: 12, note: 'Future Mrs. — I already see you as my wife. I can\'t wait to make it official one day.' },
  // Just you looking pretty
  { type: 'media', mediaIndex: 13, note: 'Just you looking pretty one more time — because you always do. Even through a screen, you\'re stunning.' },
  // Final birthday stage
  { type: 'birthday' }
];

let currentStageIndex = 0;
const stageContent = document.getElementById('stageContent');
const wishModal = document.getElementById('wishModal');
const wishInput = document.getElementById('wishInput');
const sendWishBtn = document.getElementById('sendWishBtn');
const wishThanks = document.getElementById('wishThanks');

// ---- CONFETTI ----
function createConfetti() {
  const container = document.getElementById('confettiContainer');
  const emojis = ['❤️', '🎉', '🎂', '✨', '💖', '🎈', '🥳', '💝', '🌸', '🌟', '💕', '🎁', '💗', '🦋', '💐', '🌹', '🥂'];
  for (let i = 0; i < 70; i++) {
    const span = document.createElement('span');
    span.className = 'confetti-emoji';
    span.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    span.style.left = Math.random() * 100 + '%';
    span.style.animationDuration = (Math.random() * 7 + 6) + 's';
    span.style.animationDelay = (Math.random() * 14) + 's';
    span.style.fontSize = (Math.random() * 30 + 16) + 'px';
    container.appendChild(span);
  }
}

// ---- STAGE RENDERER ----
function renderStage(index) {
  const stage = stages[index];
  if (!stage) return;

  if (stage.type === 'welcome') {
    stageContent.innerHTML = `
      <div class="stage active">
        <div class="stage-inner">
          <button class="next-btn top-btn" id="startBtn">Start the journey ➡️</button>
          <h1 class="glow-text">🎂 Happy Birthday, My Love 🎂</h1>
          <p class="subtitle">1 year, 8 months of us — and today is all about you, baby.</p>
        </div>
      </div>
    `;
    document.getElementById('startBtn')?.addEventListener('click', () => goToStage(1));
    return;
  }

  if (stage.type === 'media') {
    const item = mediaItems[stage.mediaIndex];
    if (!item) return;

    let mediaHtml = '';
    if (item.type === 'image') {
      mediaHtml = `
        <div class="media-frame">
          <img src="${item.src}" alt="${item.title}" onerror="this.src='https://placehold.co/900x600/3d1a3d/d69e70?text=❤️+${encodeURIComponent(item.title)}'">
        </div>
      `;
    } else {
      mediaHtml = `
        <div class="media-frame">
          <video src="${item.src}" controls playsinline preload="metadata" onerror="this.outerHTML='<div style=\\'padding:80px;text-align:center;color:#d69e70;background:#1a0b1e;border-radius:35px;font-size:1.2rem;\\'>🎥 Video not found: ${item.title}</div>'"></video>
        </div>
      `;
    }

    stageContent.innerHTML = `
      <div class="stage active">
        <div class="stage-inner">
          <button class="next-btn top-btn" id="nextBtn">Next memory ➡️</button>
          ${mediaHtml}
          <h3 style="color:#e8b4a0; font-size:1.7rem; margin-top:8px;">${item.title}</h3>
          <div class="caption">${item.description}</div>
          <div class="love-note">
            ${stage.note || 'I love you more than words can say.'}
            <small>— forever yours</small>
          </div>
        </div>
      </div>
    `;
    document.getElementById('nextBtn')?.addEventListener('click', () => goToStage(index + 1));
    return;
  }

  if (stage.type === 'birthday') {
    stageContent.innerHTML = `
      <div class="stage active">
        <div class="stage-inner">
          <button class="next-btn top-btn" id="wishBtn">Make a wish ✨</button>
          <h1 class="glow-text" style="font-size:2.8rem;">🎉 HAPPY BIRTHDAY, BABY! 🎉</h1>
          <div style="font-size:5rem; margin:15px 0;">🎂🎈🥳</div>
          <div class="final-message">
            <p>My baby, my love, my whole world —</p>
            <p>One year and eight months ago, you walked into my life and everything changed. I didn't know it then, but you were about to become the most important person in my world. Every laugh, every silly moment, every late-night call, every time you made me smile when I didn't think I could — it all led me to this feeling I have right now.</p>
            <p>I love the way you are normal with me. I love the way you look pretty without even trying. I love that no matter how much time passes, i dont show it but I still get butterflies when I see your name light up my phone. I love that you're my best friend before anything else.</p>
            <p>I know I'm not always the easiest person, and I know I forget things and I joke around too much, but please know this, you are the best thing that has ever happened to me. You make me want to be better. You make me want to build a future that has you in every single picture.</p>
            <p>So today, on your birthday, I just want to remind you — you are loved. Deeply, fully, endlessly. You are my person. My forever.</p>
            <p>Happy birthday, baby. Here's to more years of being stupid and freaky together. 🥂</p>
            <p>❤️ I LOVE YOU ❤️ SEND ME PICTURES ...!!!!!!!!!!!!</p>
          </div>
        </div>
      </div>
    `;
    document.getElementById('wishBtn')?.addEventListener('click', () => {
      wishModal.classList.add('active');
      wishInput.value = '';
      wishThanks.textContent = '';
    });
    return;
  }
}

function goToStage(index) {
  if (index >= stages.length) {
    currentStageIndex = stages.length - 1;
  } else {
    currentStageIndex = index;
  }
  const stage = stages[currentStageIndex];
  if (stage) {
    renderStage(currentStageIndex);
  }
  wishModal.classList.remove('active');
}

// ---- WISH SUBMIT ----
sendWishBtn.addEventListener('click', () => {
  if (wishInput.value.trim() === '') {
    wishThanks.textContent = 'Write something, baby 💕';
    return;
  }
  wishThanks.textContent = 'Your wish is safe with the universe. I love you ❤️';
  wishInput.value = '';
  setTimeout(() => {
    wishModal.classList.remove('active');
  }, 2200);
});

// ---- INIT ----
window.addEventListener('load', () => {
  createConfetti();
  const startBtn = document.getElementById('startBtn');
  if (startBtn) {
    startBtn.addEventListener('click', () => goToStage(1));
  }
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && wishModal.classList.contains('active')) {
      wishModal.classList.remove('active');
    }
  });
});

window.addEventListener('click', (e) => {
  if (e.target === wishModal) {
    wishModal.classList.remove('active');
  }
});

window.goToStage = goToStage;