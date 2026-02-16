document.addEventListener('DOMContentLoaded', () => {
    // 1. Set Initial State: Show Home, Hide others
    const sections = document.querySelectorAll('main > section');
    const navLinks = document.querySelectorAll('.nav-links a');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-links');

    // Function to switch tabs
    function switchTab(targetId) {
        // Remove active class from all sections
        sections.forEach(section => {
            section.classList.remove('active');
        });

        // Add active class to target section
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        // Update Nav Links Active State
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === targetId) {
                link.classList.add('active');
            }
        });

        // Mobile: Close menu after click
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    }

    // Initialize: Check URL hash or default to #about
    const initialHash = window.location.hash || '#about';
    switchTab(initialHash);

    // Event Listeners for Nav Links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Stop default jump-scroll behavior
            const targetId = link.getAttribute('href');
            switchTab(targetId);

            // Optionally update URL hash without scrolling
            history.pushState(null, null, targetId);
        });
    });

    // Also handle "View My Work" button in Hero
    const heroBtn = document.querySelector('.hero .btn');
    if (heroBtn) {
        heroBtn.addEventListener('click', (e) => {
            e.preventDefault();
            switchTab('#projects');
            history.pushState(null, null, '#projects');
        });
    }

    // Toggle Hamburger Menu
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
});
