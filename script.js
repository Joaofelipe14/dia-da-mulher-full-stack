document.addEventListener('DOMContentLoaded', () => {

    
    document.getElementById("presentButton").addEventListener("click", function() {
        // Mostra a mensagem após o clique
        document.querySelector(".message-container").classList.remove("hidden");
        
        // Toca a música (o áudio ou o vídeo)
        const iframe = document.getElementById("background-video");
                
        if (iframe) {
            iframe.src += "&autoplay=1";
        } else {
            console.log('Iframe não encontrado!');
        }
    
        // Oculta o botão para não ser clicado novamente
        document.getElementById("presentButton").style.display = "none";
    });

    const presentButton = document.getElementById('presentButton');
    const giftContainer = document.querySelector('.gift-container');
    const messageContainer = document.querySelector('.message-container');
    const backgroundMusic = document.getElementById('background-music');
    
 
    // Posiciona os corações aleatoriamente
    positionHearts();
    
    // Adiciona efeito ao botão
    presentButton.addEventListener('click', () => {
        // Inicia a reprodução da música
        
        // Adiciona animação de saída ao container do presente
        giftContainer.style.transform = 'scale(0.1)';
        giftContainer.style.opacity = '0';
        
        // Espera um pouco e mostra a mensagem
        setTimeout(() => {
            giftContainer.classList.add('hidden');
            messageContainer.classList.remove('hidden');
            
            // Adiciona depois de um pequeno delay para a animação funcionar
            setTimeout(() => {
                messageContainer.classList.add('visible');
                // Dispara confetes
                launchConfetti();
            }, 100);
        }, 800);
    });
    
    // Função para reproduzir a música de fundo

    
    // Função para posicionar os corações aleatoriamente
    function positionHearts() {
        const hearts = document.querySelectorAll('.heart');
        hearts.forEach(heart => {
            const randomTop = Math.floor(Math.random() * 100);
            heart.style.top = `${randomTop}%`;
        });
    }
    
    // Função para criar o efeito de confete
    function launchConfetti() {
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
        
        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }
        
        const interval = setInterval(function() {
            const timeLeft = animationEnd - Date.now();
            
            if (timeLeft <= 0) {
                return clearInterval(interval);
            }
            
            const particleCount = 50 * (timeLeft / duration);
            
            // Criaremos o efeito de confete usando elementos DIV
            for (let i = 0; i < 10; i++) {
                createConfetti();
            }
        }, 250);
    }
    
    function createConfetti() {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-5vh';
        confetti.style.backgroundColor = getRandomColor();
        confetti.style.width = Math.random() * 10 + 5 + 'px';
        confetti.style.height = Math.random() * 10 + 5 + 'px';
        confetti.style.position = 'fixed';
        confetti.style.zIndex = '1000';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        document.body.appendChild(confetti);
        
        const animation = confetti.animate(
            [
                { transform: `translate(0, 0) rotate(0deg)`, opacity: 1 },
                { transform: `translate(${Math.random() * 100 - 50}px, 100vh) rotate(${Math.random() * 360}deg)`, opacity: 0 }
            ],
            {
                duration: Math.random() * 3000 + 2000,
                easing: 'cubic-bezier(0, .9, .57, 1)',
                delay: Math.random() * 200
            }
        );
        
        animation.onfinish = () => {
            confetti.remove();
        };
    }
    
    function getRandomColor() {
        const colors = [
            '#ff7eb3', 
            '#e85f99', 
            '#fff5f8', 
            '#ff9ccb',
            '#ffcce0',
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    const photoFrame = document.querySelector('.photo-frame');
    photoFrame.addEventListener('mouseover', () => {
        photoFrame.style.transform = 'rotate(0deg) scale(1.05)';
    });
    
    photoFrame.addEventListener('mouseout', () => {
        photoFrame.style.transform = 'rotate(-2deg) scale(1)';
    });

    
    // Adiciona estilo à assinatura
    document.querySelector('.signature').style.opacity = '0';
    document.querySelector('.signature').style.transition = 'opacity 1s ease';
}); 

