// Arquivo: c:\Users\Pâmela\DAW\ProjetoSiteLaborat-rioBromatologiaUFMG-1\JS\main.js

document.addEventListener('DOMContentLoaded', function() {
    // Funcionalidade de menu móvel
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileToggle && mainNav) {
        mobileToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Controle do dropdown de login
    const loginToggle = document.querySelector('.login-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    
    if (loginToggle && dropdownMenu) {
        // Permitir navegação direta ao clicar no botão principal
        loginToggle.addEventListener('click', function(e) {
            // Não prevenimos o evento padrão para permitir a navegação via href
            
            // Se estiver em dispositivos móveis, toggle do dropdown
            if (window.innerWidth < 768) {
                e.preventDefault();
                dropdownMenu.classList.toggle('show');
            }
        });
        
        // Permita que os links dentro do dropdown funcionem normalmente
        const dropdownLinks = document.querySelectorAll('.dropdown-menu a');
        dropdownLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Comportamento padrão permitido (navegação)
            });
        });
        
        // Fechar dropdown quando clicar fora
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.login-dropdown')) {
                dropdownMenu.classList.remove('show');
            }
        });
    }
    
    // Animação de scroll suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                window.scrollTo({
                    top: target.offsetTop - 80, // Ajuste para o header fixo
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Efeitos de scroll para elementos de página
    const scrollElements = document.querySelectorAll('.fade-in, .fade-up, .fade-left, .fade-right');
    
    function handleScrollAnimation() {
        scrollElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                el.classList.add('visible');
            }
        });
    }
    
    // Inicializa ao carregar e adiciona listener de scroll
    handleScrollAnimation();
    window.addEventListener('scroll', handleScrollAnimation);
    
    // Funcionalidade de accordion (para FAQs, etc)
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    if (accordionItems.length > 0) {
        accordionItems.forEach(item => {
            const header = item.querySelector('.accordion-header');
            
            if (header) {
                header.addEventListener('click', function() {
                    // Fecha outros itens
                    accordionItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('active');
                        }
                    });
                    
                    // Abre/fecha o item atual
                    item.classList.toggle('active');
                });
            }
        });
    }
    
    // Funcionalidade de tabs (para página de login/cadastro)
    const tabButtons = document.querySelectorAll('.auth-tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabButtons.length > 0 && tabContents.length > 0) {
        // Verificar hash da URL para mostrar o formulário correto
        if(window.location.hash === '#cadastro') {
            document.getElementById('loginTab')?.classList.remove('active');
            document.getElementById('registerTab')?.classList.add('active');
            document.getElementById('loginContent')?.classList.remove('active');
            document.getElementById('registerContent')?.classList.add('active');
        }
        
        // Adicionar event listeners aos botões de tabs
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const target = this.id.replace('Tab', 'Content');
                
                // Remove classe active de todos os tabs e conteúdos
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Adiciona classe active ao tab e conteúdo clicado
                this.classList.add('active');
                document.getElementById(target)?.classList.add('active');
                
                // Atualiza o hash da URL
                if (target === 'registerContent') {
                    history.replaceState(null, null, '#cadastro');
                } else {
                    history.replaceState(null, null, ' ');
                }
            });
        });
        
        // Links dentro dos formulários para alternar entre login e cadastro
        const switchToRegister = document.querySelector('.switch-to-register');
        const switchToLogin = document.querySelector('.switch-to-login');
        
        if (switchToRegister) {
            switchToRegister.addEventListener('click', function(e) {
                e.preventDefault();
                document.getElementById('registerTab')?.click();
            });
        }
        
        if (switchToLogin) {
            switchToLogin.addEventListener('click', function(e) {
                e.preventDefault();
                document.getElementById('loginTab')?.click();
            });
        }
    }
    
    // Validação básica de formulários
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
                
                // Validação específica para email
                if (field.type === 'email' && field.value) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(field.value)) {
                        isValid = false;
                        field.classList.add('error');
                    }
                }
                
                // Validação de senha no formulário de cadastro
                if (field.id === 'registerPassword' && form.id === 'registerForm') {
                    const confirmPassword = document.getElementById('confirmPassword');
                    if (field.value !== confirmPassword.value) {
                        isValid = false;
                        field.classList.add('error');
                        confirmPassword.classList.add('error');
                    }
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                alert('Por favor, preencha todos os campos obrigatórios corretamente.');
            }
        });
    });
});