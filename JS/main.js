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

    // Referências aos elementos
    const yearFilter = document.getElementById('year-filter');
    const categoryFilter = document.getElementById('category-filter');
    const authorFilter = document.getElementById('author-filter');
    const applyFiltersBtn = document.getElementById('apply-filters');
    const resetFiltersBtn = document.getElementById('reset-filters');
    const activeFiltersContainer = document.getElementById('active-filters');
    const publicationItems = document.querySelectorAll('.publication-item');
    const publicationYears = document.querySelectorAll('.publication-year');
    
    // Objeto para armazenar os filtros ativos
    let activeFilters = {
        year: 'all',
        category: 'all',
        author: 'all'
    };
    
    // Cores para os filtros (verde com variações)
    const filterColors = {
        year: '#1a8754',
        category: '#146c43',
        author: '#20a069'
    };
    
    // Função para aplicar os filtros
    function applyFilters() {
        // Atualizar objeto de filtros ativos
        activeFilters = {
            year: yearFilter.value,
            category: categoryFilter.value,
            author: authorFilter.value
        };
        
        // Atualizar tags de filtro visíveis
        updateFilterTags();
        
        // Lógica para filtrar os itens (demonstrativo)
        applyFilterAnimation();
        
        // Aqui viria a lógica real para filtrar itens baseado nos valores selecionados
        // Este é um exemplo simplificado
        filterPublications();
    }
    
    // Função para atualizar as tags de filtro
    function updateFilterTags() {
        // Limpar tags existentes
        activeFiltersContainer.innerHTML = '';
        
        // Adicionar tag para o ano
        if (activeFilters.year !== 'all') {
            const yearText = yearFilter.options[yearFilter.selectedIndex].text;
            addFilterTag('year', yearText);
        }
        
        // Adicionar tag para a categoria
        if (activeFilters.category !== 'all') {
            const categoryText = categoryFilter.options[categoryFilter.selectedIndex].text;
            addFilterTag('category', categoryText);
        }
        
        // Adicionar tag para o autor
        if (activeFilters.author !== 'all') {
            const authorText = authorFilter.options[authorFilter.selectedIndex].text;
            addFilterTag('author', authorText);
        }
    }
    
    // Função para adicionar uma tag de filtro
    function addFilterTag(type, text) {
        const tag = document.createElement('div');
        tag.className = 'filter-tag';
        tag.innerHTML = `
            <span>${text}</span>
            <span class="remove-tag" data-type="${type}">
                <i class="fas fa-times"></i>
            </span>
        `;
        
        // Adicionar evento para remover o filtro
        tag.querySelector('.remove-tag').addEventListener('click', function() {
            const filterType = this.getAttribute('data-type');
            document.getElementById(`${filterType}-filter`).value = 'all';
            applyFilters();
        });
        
        activeFiltersContainer.appendChild(tag);
    }
    
    // Função para resetar todos os filtros
    function resetFilters() {
        yearFilter.value = 'all';
        categoryFilter.value = 'all';
        authorFilter.value = 'all';
        
        // Aplicar os filtros resetados
        applyFilters();
    }
    
    // Função para aplicar animação quando os filtros são alterados
    function applyFilterAnimation() {
        // Adicionar classe para animar os filtros
        const filterGroups = document.querySelectorAll('.filter-group');
        filterGroups.forEach((group, index) => {
            // Removemos e adicionamos novamente a classe para resetar a animação
            group.classList.remove('animate-filter');
            setTimeout(() => {
                group.classList.add('animate-filter');
                group.style.animationDelay = `${index * 0.1}s`;
            }, 10);
        });
        
        // Animar os itens filtrados
        publicationItems.forEach(item => {
            item.style.animation = 'fadeIn 0.5s ease forwards';
        });
    }
    
    // Função para filtrar publicações (exemplo simplificado)
    function filterPublications() {
        // Exemplo simplificado - você precisará expandir isso para filtrar suas publicações reais
        publicationItems.forEach(item => {
            // Simulando verificação de filtro
            const matchesYear = activeFilters.year === 'all' || 
                               item.getAttribute('data-year') === activeFilters.year ||
                               (activeFilters.year === 'older' && parseInt(item.getAttribute('data-year')) < 2020);
                               
            const matchesCategory = activeFilters.category === 'all' || 
                                   item.getAttribute('data-category') === activeFilters.category;
                                   
            const matchesAuthor = activeFilters.author === 'all' || 
                                 item.innerHTML.includes(activeFilters.author);
            
            // Exibir ou esconder baseado nos filtros
            if (matchesYear && matchesCategory && matchesAuthor) {
                item.style.display = 'flex';
                item.classList.remove('hidden');
                // Adicionar uma animação suave
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 10);
            } else {
                item.classList.add('hidden');
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
        
        // Gerenciar a exibição dos anos (cabeçalhos) baseado nos itens visíveis
        publicationYears.forEach(yearSection => {
            const yearItems = yearSection.querySelectorAll('.publication-item:not(.hidden)');
            if (yearItems.length === 0) {
                yearSection.style.display = 'none';
            } else {
                yearSection.style.display = 'block';
            }
        });
    }
    
    // Adicionar efeitos visuais nos selects
    const selects = document.querySelectorAll('.filter-select');
    selects.forEach(select => {
        // Efeito de foco
        select.addEventListener('focus', function() {
            this.parentElement.querySelector('.select-arrow i').style.transform = 'rotate(180deg)';
            this.parentElement.style.boxShadow = '0 0 0 3px rgba(26, 135, 84, 0.2)';
        });
        
        select.addEventListener('blur', function() {
            this.parentElement.querySelector('.select-arrow i').style.transform = 'rotate(0)';
            this.parentElement.style.boxShadow = 'none';
        });
        
        // Efeito ao mudar
        select.addEventListener('change', function() {
            const selectWrapper = this.parentElement;
            selectWrapper.classList.add('pulse');
            setTimeout(() => {
                selectWrapper.classList.remove('pulse');
            }, 500);
        });
    });
    
    // Event listeners
    applyFiltersBtn.addEventListener('click', applyFilters);
    resetFiltersBtn.addEventListener('click', resetFilters);
    
    // Opcional: aplicar filtros automaticamente ao alterar os selects
    // yearFilter.addEventListener('change', applyFilters);
    // categoryFilter.addEventListener('change', applyFilters);
    // authorFilter.addEventListener('change', applyFilters);
    
    // Adicionar atributos data para o filtro (apenas para demo)
    // Na sua implementação real, você já teria esses dados
    publicationItems.forEach(item => {
        // Exemplo: extraindo o ano da publicação do texto
        const yearText = item.querySelector('.journal')?.textContent || '';
        const year = yearText.match(/\b(20\d{2})\b/)?.[1] || '2020';
        item.setAttribute('data-year', year);
        
        // Exemplo: atribuindo categoria com base no texto
        if (item.textContent.includes('Journal')) {
            item.setAttribute('data-category', 'articles');
        } else if (item.textContent.includes('Conference')) {
            item.setAttribute('data-category', 'conferences');
        } else {
            item.setAttribute('data-category', 'books');
        }
    });
    
    // Inicializar tags de filtro
    updateFilterTags();
    
    // Script para gerenciar o comportamento sticky do filtro até o footer
    const filterSection = document.querySelector('.publications-filter');
    const footer = document.querySelector('.footer');
    
    // Verificar se estamos na página de publicações (com filtro e footer)
    if (filterSection && footer) {
        // Obter altura do header para offset
        const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
        
        // Salvar a posição original do filtro em relação ao topo da página
        const filterOriginalOffset = filterSection.getBoundingClientRect().top + window.pageYOffset;
        
        // Função para gerenciar o comportamento sticky
        function handleStickyFilter() {
            // Obter posição atual do scroll
            const scrollY = window.pageYOffset;
            
            // Obter posição e tamanho atuais do footer e do filtro
            const footerRect = footer.getBoundingClientRect();
            const filterRect = filterSection.getBoundingClientRect();
            const filterHeight = filterRect.height;
            
            // Calcular quando o filtro deve parar (um pouco antes do footer)
            const distanceToFooter = footerRect.top - (filterHeight + headerHeight + 20);
            
            // Se já rolamos além da posição original do filtro
            if (scrollY >= filterOriginalOffset - headerHeight) {
                filterSection.classList.add('sticky-active');
                
                // Se o filtro está prestes a tocar no footer, ajustar com position:absolute
                if (distanceToFooter <= 0) {
                    // Parar antes do footer (mudar para position:absolute)
                    filterSection.classList.add('sticky-end');
                    filterSection.style.top = `auto`;
                    filterSection.style.bottom = `${footer.offsetHeight + 20}px`; // 20px de espaço
                } else {
                    // Continuar com position:sticky
                    filterSection.classList.remove('sticky-end');
                    filterSection.style.top = `${headerHeight}px`;
                    filterSection.style.bottom = 'auto';
                }
            } else {
                // Ainda não rolamos o suficiente, manter normal
                filterSection.classList.remove('sticky-active');
                filterSection.classList.remove('sticky-end');
                filterSection.style.top = 'auto';
                filterSection.style.bottom = 'auto';
            }
        }
        
        // Adionar throttling para melhor performance
        let ticking = false;
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    handleStickyFilter();
                    ticking = false;
                });
                ticking = true;
            }
        });
        
        // Recalcular em caso de redimensionamento
        window.addEventListener('resize', function() {
            const newFilterOffset = filterSection.getBoundingClientRect().top + window.pageYOffset;
            if (!filterSection.classList.contains('sticky-active')) {
                // Só atualize a posição original se não estiver no modo sticky
                filterOriginalOffset = newFilterOffset;
            }
            handleStickyFilter();
        });
        
        // Inicializar o comportamento
        handleStickyFilter();
    }
    
    // Adicionar uma pequena animação ao alternar entre filtros quando está sticky
    const filterSelects = document.querySelectorAll('.filter-select');
    filterSelects.forEach(select => {
        select.addEventListener('change', function() {
            if (filterSection.classList.contains('sticky-active')) {
                select.closest('.filter-group').classList.add('pulse-highlight');
                setTimeout(() => {
                    select.closest('.filter-group').classList.remove('pulse-highlight');
                }, 500);
            }
        });
    });
    
    // Adicionar classe para animar quando um filtro é aplicado
    const applyButton = document.getElementById('apply-filters');
    if (applyButton) {
        applyButton.addEventListener('click', function() {
            filterSection.classList.add('filter-applied');
            setTimeout(() => {
                filterSection.classList.remove('filter-applied');
            }, 500);
        });
    }
});