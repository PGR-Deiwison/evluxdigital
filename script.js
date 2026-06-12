// EVLux Digital - JavaScript Interativo

document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling para links âncora
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navegação ativa
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || 
            (currentPage === '' && href === 'index.html') ||
            (currentPage === 'index.html' && href === '#inicio')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Filtro do portfólio
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Adiciona active ao botão clicado
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.6s ease-out';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Fecha todos os outros itens
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Abre o item clicado se não estava ativo
            if (!isActive) {
                faqItem.classList.add('active');
            }
            
            // Rotaciona o ícone
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = isActive ? 'rotate(0deg)' : 'rotate(180deg)';
            }
        });
    });

    // Animação de entrada dos elementos
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observa elementos para animação
    const animatedElements = document.querySelectorAll('.servico-card, .project-card, .contato-method, .faq-item');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Validação do formulário
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const nome = document.getElementById('nome');
            const email = document.getElementById('email');
            const mensagem = document.getElementById('mensagem');
            
            let isValid = true;
            
            // Limpa mensagens de erro anteriores
            document.querySelectorAll('.error-message').forEach(msg => msg.remove());
            
            // Validação do nome
            if (nome.value.trim().length < 2) {
                showError(nome, 'Nome deve ter pelo menos 2 caracteres');
                isValid = false;
            }
            
            // Validação do email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value)) {
                showError(email, 'Por favor, insira um e-mail válido');
                isValid = false;
            }
            
            // Validação da mensagem
            if (mensagem.value.trim().length < 10) {
                showError(mensagem, 'Mensagem deve ter pelo menos 10 caracteres');
                isValid = false;
            }
            
            if (!isValid) {
                e.preventDefault();
            }
        });
    }
    
    function showError(input, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = '#e74c3c';
        errorDiv.style.fontSize = '14px';
        errorDiv.style.marginTop = '5px';
        errorDiv.textContent = message;
        
        input.style.borderColor = '#e74c3c';
        input.parentNode.appendChild(errorDiv);
        
        // Remove o erro quando o usuário começar a digitar
        input.addEventListener('input', function() {
            this.style.borderColor = '#e9ecef';
            const errorMsg = this.parentNode.querySelector('.error-message');
            if (errorMsg) {
                errorMsg.remove();
            }
        });
    }

    // Efeito parallax suave nos cards flutuantes
    const floatingCards = document.querySelectorAll('.card');
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        floatingCards.forEach((card, index) => {
            const speed = (index + 1) * 0.3;
            card.style.transform = `translateY(${rate * speed}px) rotate(${scrolled * 0.01}deg)`;
        });
    });

    // Loading suave da página
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.3s ease-in-out';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });

    // Otimização para dispositivos móveis
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Reajusta elementos se necessário
            if (window.innerWidth <= 768) {
                // Código específico para mobile
                const heroContent = document.querySelector('.hero-content');
                if (heroContent) {
                    heroContent.style.textAlign = 'center';
                }
            }
        }, 250);
    });

    // Preloader simples (opcional)
    const preloader = document.createElement('div');
    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #003366 0%, #0055aa 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: opacity 0.5s ease-out;
    `;
    
    const spinner = document.createElement('div');
    spinner.style.cssText = `
        width: 50px;
        height: 50px;
        border: 3px solid rgba(255, 255, 255, 0.3);
        border-top: 3px solid white;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    `;
    
    // Adiciona animação de rotação
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    preloader.appendChild(spinner);
    document.body.prepend(preloader);
    
    // Remove o preloader quando a página carregar
    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }, 1000);
    });

    // Console log para desenvolvedores
    console.log('%c🚀 EVLux Digital - Site desenvolvido com excelência!', 'color: #00aaff; font-size: 16px; font-weight: bold;');
    console.log('%c💡 Interessado em nossos serviços? Entre em contato!', 'color: #003366; font-size: 14px;');
});

// Função para detectar se elemento está visível
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Função para scroll suave programático
function smoothScrollTo(targetY, duration = 1000) {
    const startY = window.pageYOffset;
    const difference = targetY - startY;
    const startTime = performance.now();

    function step() {
        const elapsed = performance.now() - startTime;
        const progress = elapsed / duration;

        if (progress < 1) {
            window.scrollTo(0, startY + difference * easeInOutCubic(progress));
            requestAnimationFrame(step);
        } else {
            window.scrollTo(0, targetY);
        }
    }

    requestAnimationFrame(step);
}

// Função de easing para animações suaves
function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
}