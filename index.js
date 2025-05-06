// Create floating bubbles
function createBubbles() {
    const bubbles = document.getElementById('bubbles');
    const colors = ['#ff6b6b', '#e83e8c', '#8a2be2', '#4dabf7', '#1ee0ac'];
    
    for (let i = 0; i < 15; i++) {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        
        const size = Math.random() * 100 + 50;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${Math.random() * 100}%`;
        bubble.style.top = `${Math.random() * 100}%`;
        bubble.style.backgroundColor = color;
        bubble.style.animationDuration = `${Math.random() * 20 + 10}s`;
        bubble.style.animationDelay = `${Math.random() * 5}s`;
        bubble.style.opacity = 0.1;
        
        bubbles.appendChild(bubble);
    }
}

// Create confetti animation
function createConfetti() {
    const confettiColors = ['#ff6b6b', '#e83e8c', '#8a2be2', '#4dabf7', '#1ee0ac', '#ffd43b', '#ff922b'];
    const confettiContainer = document.querySelector('.hero-image');
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        
        const size = Math.random() * 10 + 5;
        const color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        confetti.style.backgroundColor = color;
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.top = `-10px`;
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.animation = `confettiDrop ${Math.random() * 5 + 3}s linear infinite`;
        confetti.style.animationDelay = `${Math.random() * 5}s`;
        
        confettiContainer.appendChild(confetti);
    }
}

// Countdown timer
function updateCountdown() {
    const now = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const diff = tomorrow - now;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
}

// Add message to board
function addMessage() {
    const nameInput = document.getElementById('message-name');
    const textInput = document.getElementById('message-text');
    
    const name = nameInput.value.trim();
    const text = textInput.value.trim();
    
    if (name && text) {
        const messagesContainer = document.getElementById('messages');
        
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        
        const currentDate = new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        messageDiv.innerHTML = `
            <div class="message-header">
                <div class="message-name">${name}</div>
                <div class="message-date">${currentDate}</div>
            </div>
            <div class="message-content">
                ${text}
            </div>
        `;
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        nameInput.value = '';
        textInput.value = '';
        
        // Add confetti burst
        createConfettiBurst(window.innerWidth / 2, window.innerHeight / 2);
    }
}

// Create confetti burst
function createConfettiBurst(x, y) {
    const confettiColors = ['#ff6b6b', '#e83e8c', '#8a2be2', '#4dabf7', '#1ee0ac', '#ffd43b', '#ff922b'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = `${Math.random() * 10 + 5}px`;
        confetti.style.height = `${Math.random() * 10 + 5}px`;
        confetti.style.backgroundColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '1000';
        
        document.body.appendChild(confetti);
        
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 50 + 50;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        let posX = x;
        let posY = y;
        let opacity = 1;
        let gravity = 9.8;
        
        function updatePosition() {
            posX += vx / 20;
            posY += vy / 20;
            vy += gravity / 10;
            opacity -= 0.01;
            
            confetti.style.left = `${posX}px`;
            confetti.style.top = `${posY}px`;
            confetti.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(updatePosition);
            } else {
                document.body.removeChild(confetti);
            }
        }
        
        requestAnimationFrame(updatePosition);
    }
}

// Image modal
function openModal(imgSrc) {
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modalImage');
    
    modalImage.src = imgSrc;
    modal.classList.add('active');
    
    // Add confetti burst
    createConfettiBurst(window.innerWidth / 2, window.innerHeight / 2);
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.classList.remove('active');
}

// Play music (simulate)
function playMusic(id) {
    const playButtons = document.querySelectorAll('.playlist-item-play');
    
    // Reset all buttons
    playButtons.forEach(btn => {
        btn.textContent = '▶';
    });
    
    // Set clicked button to pause
    playButtons[id - 1].textContent = '⏸️';
    
    // Create confetti burst
    const playlistItem = document.querySelectorAll('.playlist-item')[id - 1];
    const rect = playlistItem.getBoundingClientRect();
    createConfettiBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);
    
    // Alert for simulation
    alert(`Now playing song #${id}! (This is a simulation - no actual audio will play)`);
}

// Initialize everything
window.onload = function() {
    createBubbles();
    createConfetti();
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // Add interactive elements
    const heroImage = document.getElementById('hero');
    heroImage.addEventListener('click', function(e) {
        createConfettiBurst(e.clientX, e.clientY);
    });
    
    const countdownItems = document.querySelectorAll('.countdown-item');
    countdownItems.forEach(item => {
        item.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            createConfettiBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);
        });
    });
};


const cursor = document.querySelector('.cursor');
        const cakeContainer = document.querySelector('.cake-container');
        const cakeImage = document.querySelector('.cake-image');
        
        const candles = [
            { 
                flame: document.querySelector('.flame1'),
                candle: document.querySelector('.candle1'),
                percentPosition: { x: 30, y: 15 },
                isLit: true 
            },
            { 
                flame: document.querySelector('.flame2'),
                candle: document.querySelector('.candle2'),
                percentPosition: { x: 50, y: 10 },
                isLit: true 
            },
            { 
                flame: document.querySelector('.flame3'),
                candle: document.querySelector('.candle3'),
                percentPosition: { x: 70, y: 15 },
                isLit: true 
            }
        ];
        
        let isMouseDown = false;
        let mousePosition = { x: 0, y: 0 };
        let lastParticleTime = 0;
        
        // Function to calculate and update absolute positions based on container size
        function updateCandlePositions() {
            const containerRect = cakeContainer.getBoundingClientRect();
            
            candles.forEach(candle => {
                // Update calculated position based on percentages
                candle.position = {
                    x: (candle.percentPosition.x / 100) * containerRect.width,
                    y: (candle.percentPosition.y / 100) * containerRect.height
                };
            });
        }
        
        // Initial position calculation
        updateCandlePositions();
        
        // Listen for window resize to update candle positions
        window.addEventListener('resize', updateCandlePositions);
        
        // Update cursor position
        document.addEventListener('mousemove', (e) => {
            mousePosition.x = e.clientX;
            mousePosition.y = e.clientY;
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
            
            // Check for candle interactions when mouse is down
            if (isMouseDown) {
                checkCandleBlowout();
                
                // Create air particles with throttling
                const now = Date.now();
                if (now - lastParticleTime > 30) { // 30ms throttling
                    createAirParticles();
                    lastParticleTime = now;
                }
            }
        });
        
        // Track mouse down state
        document.addEventListener('mousedown', () => {
            isMouseDown = true;
            cursor.style.backgroundColor = 'rgba(135, 206, 250, 0.5)';
            cursor.style.width = '40px';
            cursor.style.height = '40px';
        });
        
        document.addEventListener('mouseup', () => {
            isMouseDown = false;
            cursor.style.backgroundColor = 'rgba(135, 206, 250, 0.2)';
            cursor.style.width = '30px';
            cursor.style.height = '30px';
        });
        
        // Create air particles
        function createAirParticles() {
            for (let i = 0; i < 5; i++) { // Create 5 particles at once
                const particle = document.createElement('div');
                particle.className = 'air-particle';
                
                // Position particle at cursor
                particle.style.left = `${mousePosition.x}px`;
                particle.style.top = `${mousePosition.y}px`;
                
                // Calculate random direction
                const angle = Math.random() * Math.PI * 2;
                const distance = 20 + Math.random() * 60;
                const tx = Math.cos(angle) * distance;
                const ty = Math.sin(angle) * distance;
                
                // Set custom property for the animation
                particle.style.setProperty('--tx', `${tx}px`);
                particle.style.setProperty('--ty', `${ty}px`);
                
                document.body.appendChild(particle);
                
                // Remove particle after animation completes
                particle.addEventListener('animationend', () => {
                    particle.remove();
                });
            }
        }
        
        // Check if air particles are close enough to blow out candles
        function checkCandleBlowout() {
            const containerRect = cakeContainer.getBoundingClientRect();
            
            candles.forEach(candle => {
                if (!candle.isLit) return;
                
                // Calculate candle position relative to viewport
                const candleX = containerRect.left + candle.position.x;
                const candleY = containerRect.top + candle.position.y;
                
                // Calculate distance from mouse to candle
                const dx = mousePosition.x - candleX;
                const dy = mousePosition.y - candleY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                // Check if cursor is close enough to blow out the candle
                if (distance < 70) {
                    blowOutCandle(candle);
                }
            });
        }
        
        function blowOutCandle(candle) {
            if (!candle.isLit) return;
            
            candle.isLit = false;
            
            // Play extinguish animation
            candle.flame.style.animationName = 'none';
            
            // Need to trigger a reflow to restart animation
            void candle.flame.offsetWidth;
            
            // Apply extinguish animation
            candle.flame.style.animationName = 'extinguish';
            candle.flame.style.animationDuration = '0.5s';
            candle.flame.style.animationIterationCount = '1';
            candle.flame.style.animationFillMode = 'forwards';
            
            // Create smoke effect
            createSmoke(candle);
            
            // Check if all candles are blown out
            if (candles.every(c => !c.isLit)) {
                // Automatically reset after a short delay
                setTimeout(showGift, 3000);
            }
        }
        
        function createSmoke(candle) {
            const containerRect = cakeContainer.getBoundingClientRect();
            const candleX = containerRect.left + candle.position.x;
            const candleY = containerRect.top + candle.position.y;
            
            // Create multiple smoke particles with delay
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    const smoke = document.createElement('div');
                    smoke.className = 'air-particle';
                    smoke.style.backgroundColor = 'rgba(200, 200, 200, 0.5)';
                    smoke.style.width = '12px';
                    smoke.style.height = '12px';
                    
                    smoke.style.left = `${candleX}px`;
                    smoke.style.top = `${candleY - 20}px`;
                    
                    smoke.style.setProperty('--tx', `${Math.random() * 20 - 10}px`);
                    smoke.style.setProperty('--ty', `-${40 + Math.random() * 20}px`);
                    smoke.style.animationDuration = '1.5s';
                    
                    document.body.appendChild(smoke);
                    
                    smoke.addEventListener('animationend', () => {
                        smoke.remove();
                    });
                }, i * 120);
            }
        }
        
        function showGift() {
            document.querySelector('.cake-container').style.display = 'none'
            document.querySelector('.cake-title').style.display = 'none'
            document.querySelector('.cake-description').style.display = 'none'
            document.querySelector('#gpt').style.display = 'none'

            document.querySelector('.gift').style.display = 'flex'
            document.querySelector('.gift').style.flex_direction = 'column'
            document.querySelector('.gift').style.justify_content = 'center'
            document.querySelector('.gift').style.align_items = 'center'
        }