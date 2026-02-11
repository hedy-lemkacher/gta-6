/* =====================================================
   GTA VI — ANIMATION ENGINE
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ── LOADING SCREEN ──
    const loader = document.querySelector('.loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 1800);
    }

    // ── SCROLL REVEAL (IntersectionObserver) ──
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ── ANIMATED STAT COUNTERS ──
    const statNumbers = document.querySelectorAll('.nombre-statistique');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const text = el.textContent.trim();
                // Extract number (e.g. "7 500+" → 7500, "2026" → 2026)
                const cleaned = text.replace(/\s/g, '').replace(/[+]/g, '');
                const target = parseInt(cleaned);
                const suffix = text.includes('+') ? '+' : '';
                const hasSpace = text.includes(' ');

                if (!isNaN(target)) {
                    animateCounter(el, target, suffix, hasSpace);
                }
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => counterObserver.observe(el));

    function animateCounter(el, target, suffix, hasSpace) {
        const duration = 2000;
        const start = performance.now();

        function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const ease = 1 - Math.pow(1 - progress, 3);
            let current = Math.floor(ease * target);

            // Format with spaces if original had them
            if (hasSpace) {
                current = current.toLocaleString('fr-FR');
            }

            el.textContent = current + suffix;

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }



    // ── PARALLAX ON HERO BACKGROUND ──
    const heroImg = document.querySelector('.image-fond-hero img');
    if (heroImg) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            heroImg.style.transform = `scale(${1 + scrolled * 0.0002}) translateY(${rate}px)`;
        }, { passive: true });
    }

    // ── NAV SHRINK ON SCROLL ──
    const nav = document.querySelector('nav');
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                nav.style.padding = '0';
                nav.style.borderBottomColor = 'rgba(212, 0, 120, 0.2)';
            } else {
                nav.style.padding = '';
                nav.style.borderBottomColor = '';
            }
        }, { passive: true });
    }

    // ── TILT EFFECT ON BENTO CARDS ──
    const bentoCards = document.querySelectorAll('.carte-bento');
    bentoCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / centerY * -5;
            const rotateY = (x - centerX) / centerX * 5;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // ── MAGNETIC EFFECT ON CTA BUTTON ──
    const ctaButtons = document.querySelectorAll('.bouton-nav-cta, .bouton-jouer');
    ctaButtons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });

});
