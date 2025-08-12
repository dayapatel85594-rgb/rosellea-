import { useEffect } from 'react';

function LuxuryParticles() {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .luxury-particles {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
        overflow: hidden;
      }
      
      .particle {
        position: absolute;
        width: 4px;
        height: 4px;
        background: radial-gradient(circle, #D4AF37 0%, transparent 70%);
        border-radius: 50%;
        animation: float 15s linear infinite;
        opacity: 0.6;
      }
      
      @keyframes float {
        0% {
          transform: translateY(100vh) rotate(0deg);
          opacity: 0;
        }
        10% {
          opacity: 0.6;
        }
        90% {
          opacity: 0.6;
        }
        100% {
          transform: translateY(-100px) rotate(360deg);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);

    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
      particle.style.animationDelay = Math.random() * 5 + 's';
      
      const particlesContainer = document.querySelector('.luxury-particles');
      if (particlesContainer) {
        particlesContainer.appendChild(particle);
        
        setTimeout(() => {
          if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
          }
        }, 20000);
      }
    };

    const interval = setInterval(createParticle, 3000);
    
    for (let i = 0; i < 5; i++) {
      setTimeout(createParticle, i * 1000);
    }

    return () => {
      clearInterval(interval);
      document.head.removeChild(style);
    };
  }, []);

  return <div className="luxury-particles"></div>;
}

export default LuxuryParticles;