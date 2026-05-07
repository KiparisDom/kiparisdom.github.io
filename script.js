// Ждем, пока вся HTML-структура документа будет полностью загружена
document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. Управление навигационной панелью (Header) при скролле
       ========================================================================== */
    const header = document.querySelector('.header');
    
    // Если страница только загрузилась и мы находимся в самом верху (позиция 0), 
    // делаем шапку прозрачной
    if(window.scrollY === 0) {
        header.classList.add('transparent');
    }

    // Отслеживаем событие прокрутки страницы
    window.addEventListener('scroll', () => {
        // Если прокрутили больше 50 пикселей вниз
        if (window.scrollY > 50) {
            header.classList.remove('transparent'); // Убираем прозрачность
            header.classList.add('scrolled');       // Добавляем фон и тень
        } else {
            header.classList.add('transparent');    // Возвращаем прозрачность
            header.classList.remove('scrolled');    // Убираем фон и тень
        }
    });

    /* ==========================================================================
       2. Мобильное меню (Бургер)
       ========================================================================== */
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-list a');

    // При клике на иконку бургера
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active'); // Анимируем саму иконку (превращаем в крестик)
        navMenu.classList.toggle('active');   // Показываем/скрываем меню
        
        // Блокируем прокрутку основной страницы, если мобильное меню открыто
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Закрытие мобильного меню при клике на любую ссылку в нем
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active'); // Возвращаем бургер в исходное состояние
            navMenu.classList.remove('active');   // Прячем меню
            document.body.style.overflow = '';    // Разблокируем прокрутку страницы
        });
    });

    /* ==========================================================================
       3. Анимация появления элементов при прокрутке (Scroll Reveal)
       ========================================================================== */
    // Находим все элементы, которые должны плавно появляться
    const fadeElements = document.querySelectorAll('.fade-in');

    // Настройки для наблюдателя (Intersection Observer)
    const appearOptions = {
        threshold: 0.15,               // Элемент должен появиться на 15% в зоне видимости
        rootMargin: "0px 0px -50px 0px" // Срабатывает за 50px до нижней границы экрана
    };

    // Создаем наблюдатель за элементами
    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            // Если элемент еще не в зоне видимости, ничего не делаем
            if (!entry.isIntersecting) return;
            
            // Если элемент появился, добавляем класс 'visible' для запуска CSS-анимации
            entry.target.classList.add('visible');
            
            // Прекращаем наблюдение за этим элементом (чтобы анимация проигралась только 1 раз)
            observer.unobserve(entry.target); 
        });
    }, appearOptions);

    // Применяем наблюдатель ко всем найденным элементам
    fadeElements.forEach(element => {
        appearOnScroll.observe(element);
    });

    /* ==========================================================================
       4. Эффект параллакса на главном экране (Hero Section)
       ========================================================================== */
    const heroBg = document.querySelector('.hero-bg');
    
    // Отслеживаем прокрутку для сдвига фоновой картинки
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        
        // Производим вычисления только когда главный экран находится в зоне видимости
        // Это экономит ресурсы браузера
        if (scrollPosition < window.innerHeight) {
            // Двигаем фон вниз со скоростью 50% от скорости прокрутки страницы
            heroBg.style.transform = `translateY(${scrollPosition * 0.5}px)`;
        }
    });
});
