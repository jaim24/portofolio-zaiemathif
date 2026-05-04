document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Scroll Animation (Intersection Observer dengan Delay) ---
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.15 // Animasi mulai saat elemen 15% terlihat di viewport
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target); // Hanya animasi 1x
            }
        });
    }, observerOptions);

    // Ambil elemen yang memiliki class animasi
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    animatedElements.forEach((el, index) => {
        // Delay bertahap: (index % 5) * 0.15 detik agar masuknya bergantian
        const delay = (index % 5) * 0.15;
        el.style.transitionDelay = `${delay}s`;
        scrollObserver.observe(el);
    });

    // --- 5. Navbar Enhancement (Scroll Spy, Smooth Scroll, Blur) ---
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-links a:not(.btn)");
    const navbar = document.querySelector(".navbar");

    // Smooth Scroll saat klik Nav Link
    navLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            const targetId = this.getAttribute("href");
            if(targetId && targetId.startsWith("#")) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                if(targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 80, // Offset kompensasi tinggi navbar
                        behavior: "smooth"
                    });
                }
            }
        });
    });

    // Scroll Spy & Dinamis Navbar Blur
    window.addEventListener("scroll", () => {
        let current = "";
        
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            // Deteksi id section aktif saat user melakukan scroll
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active-link");
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active-link");
            }
        });
        
        // Enhance Backdrop Blur
        if (window.scrollY > 50) {
            navbar.style.backdropFilter = "blur(16px)";
            navbar.style.webkitBackdropFilter = "blur(16px)";
            navbar.style.backgroundColor = document.body.classList.contains('light-mode') 
                ? "rgba(255, 255, 255, 0.9)" 
                : "rgba(5, 5, 5, 0.85)";
        } else {
            navbar.style.backdropFilter = "blur(12px)";
            navbar.style.webkitBackdropFilter = "blur(12px)";
            navbar.style.backgroundColor = document.body.classList.contains('light-mode') 
                ? "rgba(255, 255, 255, 0.6)" 
                : "rgba(5, 5, 5, 0.4)";
        }
    });
    
    // Trigger event scroll saat pertama kali load agar mendeteksi posisi awal
    window.dispatchEvent(new Event('scroll'));
});
