// ~Comments coding */
// *======== Sections =========== */
// ? ------- Sub-sections -------- */
// & ++++++++ more details ++++++++ */
// !!!!!! Handle with care !!!!!!! */
// ^^^^^^^^^ Optional Section ^^^^^^ */
// explanation */


/**
 * Main application JavaScript file
 * Handles UI interactions, form validation, and dynamic content loading
 */
    
    // Initialize all tooltips on the page
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl)
    })

document.addEventListener("DOMContentLoaded", function () {
    /* 
    *========== Collapse Memory State ==========
    Preserves collapse/expand state of elements across page refreshes
    Uses localStorage to remember user preferences
     */
    const collapsibles = ["collapsoverview", "collapsemilestone", "collapsepopulation"];
    collapsibles.forEach(id => {
        const element = document.getElementById(id);
        if (!element) return; // Skip if element doesn't exist on current page
        
        const savedState = localStorage.getItem(id);
        const bsCollapse = new bootstrap.Collapse(element, { toggle: false });

        /* 
        ? ------- Load Saved State -------- */
        if (savedState === "open") {
            bsCollapse.show();
        } else {
            bsCollapse.hide();
        }

        /* 
        ? ------- Save New States -------- */
        element.addEventListener("shown.bs.collapse", () => {
            localStorage.setItem(id, "open");
        });

        element.addEventListener("hidden.bs.collapse", () => {
            localStorage.setItem(id, "closed");
        });
    });

    /* 
    *========== Insert External HTML ==========
    Dynamically loads reusable HTML components via fetch API
    Components loaded: official cards, navbar, social handles, footer
     */
    
    /* 
    ? ------- Official Cards Section -------- */
    fetch("officialCard.html")
        .then(response => response.text())
        .then(data => {
            const el = document.getElementById("InsertOfficialCards");
            if (el) el.innerHTML = data;
        })
        .catch(error => console.error("Error loading Executive Section:", error));

    /* 
    ? ------- Navigation Bar -------- */
    fetch("navigationbar.html")
        .then(response => response.text())
        .then(data => {
            const el = document.getElementById("Navbar");
            if (el) {
                el.innerHTML = data;

                /* & ++++++++ Initialize navbar-dependent features ++++++++ */
                setupSmartLinks();
                handleDirectSectionNavigation();
            }
        })
        .catch(error => console.error("Error loading navbar:", error));

    /* 
    ? ------- Social Handles -------- */
    fetch("socialhandle.html")
        .then(response => response.text())
        .then(data => {
            const el = document.getElementById("InsertSocial");
            if (el) el.innerHTML = data;
        })
        .catch(error => console.error("Error loading social handles:", error));
    /* 
    ? ------- Footer Section -------- */
    fetch("footer.html")
        .then(response => response.text())
        .then(data => {
            const el = document.getElementById("insertfooter");
            if (el) el.innerHTML = data;
        })
        .catch(error => console.error("Error loading footer:", error));

    /* *========== Smart Section Navigation ==========
     * Enables intelligent linking between pages and sections
     * - Smooth scrolls if section exists on current page
     * - Redirects to fallback page if section not found
     */

    /**
     * *Sets up click handlers for all smart links on the page
     * *Usage: <a href="#section-id" class="smart-link" data-fallback="page.html#section-id">Link Text</a>
     */
    function setupSmartLinks() {
        const smartLinks = document.querySelectorAll('a.smart-link[href^="#"]');

        smartLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                const sectionId = this.getAttribute('href').substring(1);
                const sectionElement = document.getElementById(sectionId);

                if (sectionElement) {
                    /* 
                    ? ------- Section exists on current page -------- */
                    e.preventDefault(); // prevent default jump
                    sectionElement.scrollIntoView({ behavior: "smooth" });
                } else {
                    /* 
                    ? ------- Section not found, use fallback -------- */
                    e.preventDefault();
                    const fallbackUrl = this.getAttribute('data-fallback');
                    if (fallbackUrl) {
                        window.location.href = fallbackUrl;
                    } else {
                        console.warn(`Section "${sectionId}" not found and no fallback provided.`);
                    }
                }
            });
        });
    }

    /**
     * *Handles direct navigation to section via URL hash
     * *Redirects to fallback page if section doesn't exist on current page
     */
    function handleDirectSectionNavigation() {
        if (window.location.hash) {
            const sectionId = window.location.hash.substring(1);
            const sectionElement = document.getElementById(sectionId);

            if (!sectionElement) {
                /* 
                ? ------- Section not found, look for fallback -------- */
                const smartLink = document.querySelector(`a.smart-link[href="#${sectionId}"]`);
                if (smartLink) {
                    const fallbackUrl = smartLink.getAttribute('data-fallback');
                    if (fallbackUrl && !window.location.href.endsWith(fallbackUrl)) {
                        window.location.href = fallbackUrl;
                    }
                }
            }
        }
    }

    /*
    *========== Executive Card Interaction ==========
     Handles the expandable/collapsible executive profile cards
     Shows detailed information when "See More" is clicked
     */
    const seeMoreBtns = document.querySelectorAll('.see-more-btn');
    const closeButtons = document.querySelectorAll('.close-details');

    /* Closes all currently active cards Ensures only one card can be expanded at a time*/
    function closeAllCards() {
        document.querySelectorAll('.card.active').forEach(activeCard => {
            activeCard.classList.remove('active');
        });
    }

    /* 
    ? ------- Setup See More Button Events -------- */
    seeMoreBtns.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.stopPropagation(); // Prevent this from triggering the outside click
            closeAllCards();
            const card = this.closest('.card');
            card.classList.add('active');
        });
    });

    /* 
    ? ------- Setup Close Button Events -------- */
    closeButtons.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            const card = this.closest('.card');
            card.classList.remove('active');
        });
    });

    /* 
    ? ------- Close Card When Clicking Outside -------- */
    document.addEventListener('click', function (e) {
        const activeCard = document.querySelector('.card.active');
        if (activeCard && !activeCard.contains(e.target)) {
            activeCard.classList.remove('active');
        }
    });

    /* 
    *========== Form Validation ==========
    Handles form validation, submission, and user feedback
    Features real-time validation after first submit attempt
     */
    document.querySelectorAll("form").forEach(form => {
        let hasSubmitted = false;

        /* 
        ? ------- Auto-require Fields -------- */
        form.querySelectorAll("input[type='text'], input[type='email'], input[type='tel'], select, textarea")
            .forEach(input => {
                if (!input.classList.contains("optional")) {
                    input.setAttribute("required", "");
                }
            });

        /* 
        ? ------- Form Submit Logic -------- */
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            hasSubmitted = true;
            let valid = true;

            /* 
            & ++++++++ Validate all required fields ++++++++ */
            const requiredFields = this.querySelectorAll("[required]");
            requiredFields.forEach(field => {
                const feedback = field.parentElement.querySelector(".invalid-feedback");
                if (!field.value.trim()) {
                    field.classList.add("is-invalid");
                    if (feedback) feedback.style.display = "block";
                    valid = false;
                } else {
                    field.classList.remove("is-invalid");
                    if (feedback) feedback.style.display = "none";
                }
            });

            /* 
            & ++++++++ Handle successful submission ++++++++ */
            if (valid) {
                showCustomAlert("Form submitted successfully!");
                this.reset();
                this.querySelectorAll(".invalid-feedback").forEach(fb => fb.style.display = "none");
                this.querySelectorAll(".is-invalid").forEach(f => f.classList.remove("is-invalid"));
                hasSubmitted = false;
            }
        });

        /* 
        ? ------- Real-time Validation -------- */
        form.querySelectorAll("[required]").forEach(field => {
            field.addEventListener("input", function () {
                if (!hasSubmitted) return; // Skip validation until submit is tried once
                const feedback = this.parentElement.querySelector(".invalid-feedback");

                if (this.value.trim()) {
                    this.classList.remove("is-invalid");
                    if (feedback) feedback.style.display = "none";
                }
            });
        });

        /* 
        ? ------- Reset Button Handler -------- */
        const resetBtn = form.querySelector("button[type='reset']");
        if (resetBtn) {
            resetBtn.addEventListener("click", () => {
                form.querySelectorAll(".is-invalid").forEach(f => f.classList.remove("is-invalid"));
                form.querySelectorAll(".invalid-feedback").forEach(fb => fb.style.display = "none");
                hasSubmitted = false;
            });
        }
    });

    /**
     * Shows a custom alert message to the user
     * @param {string} message - The message to display
     */
    function showCustomAlert(message) {
        const alertBox = document.getElementById("customAlert");
        document.getElementById("alertMessage").textContent = message;
        alertBox.classList.remove("hidden");

        document.getElementById("alertOk").onclick = () => {
            alertBox.classList.add("hidden");
        };
    }

    /* 
    *========== Copy Account Number Function ==========
    Allows users to copy account numbers to clipboard
    Shows temporary confirmation when copied
     */
    const copyButtons = document.querySelectorAll('.copy-button');

    copyButtons.forEach(button => {
        button.addEventListener('click', async function () {
            const accountNumberSpan = this.previousElementSibling; // Get the preceding sibling (account number span)
            const accountNumber = accountNumberSpan.textContent.trim();
            const copyNotification = this.nextElementSibling; // Get the following sibling (notification span)

            /* 
            ? ------- Modern Clipboard API -------- */
            if (navigator.clipboard) {
                try {
                    await navigator.clipboard.writeText(accountNumber);
                    showCopyNotification(copyNotification);
                } catch (err) {
                    console.error('Clipboard write failed', err);
                }
            } else {
                /* 
                ? ------- Legacy Fallback Method -------- */
                const tempTextarea = document.createElement('textarea');
                tempTextarea.value = accountNumber;
                document.body.appendChild(tempTextarea);
                tempTextarea.select();
                tempTextarea.setSelectionRange(0, tempTextarea.value.length);

                try {
                    const successful = document.execCommand('copy');
                    if (successful) {
                        showCopyNotification(copyNotification);
                    } else {
                        console.error('Fallback copy unsuccessful');
                    }
                } catch (err) {
                    console.error('Fallback copy error: ', err);
                } finally {
                    document.body.removeChild(tempTextarea);
                }
            }
        });
    });

    /**
     * Shows a temporary "copied" notification
     * @param {HTMLElement} notificationElement - The notification element to show
     */
    function showCopyNotification(notificationElement) {
        notificationElement.classList.add('show');
        setTimeout(() => {
            notificationElement.classList.remove('show');
        }, 1500);
    }
    
    /* 
    !!!!!! Commented-out Secure-only Copy Function !!!!!!! 
      This version only works in secure contexts (HTTPS)
      Kept for reference but not used
     */
    /*
    const copyButtons = document.querySelectorAll('.copy-button');

    copyButtons.forEach(button => {
        button.addEventListener('click', async function () {
            const accountNumberSpan = this.previousElementSibling;
            const accountNumber = accountNumberSpan.textContent.trim();
            const copyNotification = this.nextElementSibling;

            try {
                await navigator.clipboard.writeText(accountNumber);
                copyNotification.classList.add('show');
                setTimeout(() => {
                    copyNotification.classList.remove('show');
                }, 1500);
            } catch (err) {
                console.error('Clipboard copy failed:', err);
            }
        });
    });
    */
    // * ======= AOS Animation
    window.onload = function () {
                AOS.init({
                    duration: 1000,  // Animation duration
                    startEvent: "DOMContentLoaded",// Ensure AOS runs after the DOM is fully loaded
                    // once: true,      // Animation runs once
                });
            };
        AOS.refresh();
});

/* 
*========== Governor Profile Carousel ==========
  Self-contained carousel implementation for governor profiles
 Features: auto-scroll, indicators, keyboard navigation
 */
(function () {
    document.addEventListener('DOMContentLoaded', function () {
        // Initialize Profile Carousel
        initProfileCarousel();
    });

    /**
     * Initializes the profile carousel with all functionality
     * Uses IIFE to avoid global scope pollution
     */
    function initProfileCarousel() {
        const carousel = document.getElementById('profile-carousel');
        // If carousel doesn't exist on this page, exit early
        if (!carousel) return;

        const prevButton = document.querySelector('.profile-carousel__nav-btn--prev');
        const nextButton = document.querySelector('.profile-carousel__nav-btn--next');
        const profileCards = document.querySelectorAll('.profile-card');
        const indicatorsContainer = document.getElementById('profile-carousel-indicators');

        let currentIndex = 0;
        let autoScrollInterval;
        const itemWidth = profileCards[0].offsetWidth + parseInt(window.getComputedStyle(profileCards[0]).marginRight);

        /* 
        ? ------- Setup Carousel Components -------- */
        createIndicators();
        initEvents();
        updateButtonStates();
        startAutoScroll();

        /**
         * Creates indicator dots for each profile card
         */
        function createIndicators() {
            profileCards.forEach((_, index) => {
                const indicator = document.createElement('div');
                indicator.classList.add('profile-carousel__indicator');
                if (index === 0) {
                    indicator.classList.add('profile-carousel__indicator--active');
                }
                indicator.addEventListener('click', () => scrollToItem(index));
                indicatorsContainer.appendChild(indicator);
            });
        }

        /**
         * Initializes all event listeners for the carousel
         */
        function initEvents() {
            /* & ++++++++ Navigation Button Events ++++++++ */
            prevButton.addEventListener('click', function () {
                scrollToItem(currentIndex - 1);
                stopAutoScroll();
            });

            nextButton.addEventListener('click', function () {
                scrollToItem(currentIndex + 1);
                stopAutoScroll();
            });

            /* 
            & ++++++++ Scroll Event Handling ++++++++ */
            carousel.addEventListener('scroll', function () {
                updateCurrentIndex();
                updateIndicators();
                updateButtonStates();
            });

            /* 
            
            & ++++++++ Auto-scroll Pause/Resume ++++++++ */
            carousel.addEventListener('mouseenter', stopAutoScroll);
            carousel.addEventListener('touchstart', stopAutoScroll);

            carousel.addEventListener('mouseleave', startAutoScroll);
            carousel.addEventListener('touchend', startAutoScroll);

            /* 
            & ++++++++ Keyboard Navigation ++++++++ */
            document.addEventListener('keydown', function (e) {
                if (isElementInViewport(carousel)) {
                    if (e.key === 'ArrowLeft') {
                        scrollToItem(currentIndex - 1);
                        stopAutoScroll();
                    } else if (e.key === 'ArrowRight') {
                        scrollToItem(currentIndex + 1);
                        stopAutoScroll();
                    }
                }
            });

            /* 
            & ++++++++ Window Resize Handling ++++++++ */
            window.addEventListener('resize', function () {
                // Recalculate item width on resize and maintain position
                setTimeout(() => {
                    // No need to redefine itemWidth here as it's not used in the callback
                    scrollToItem(currentIndex);
                }, 100);
            });
        }

        /**
         * Scrolls carousel to specific item
         * @param {number} index - The index to scroll to
         */
        function scrollToItem(index) {
            // Ensure index is within bounds
            index = Math.max(0, Math.min(index, profileCards.length - 1));

            currentIndex = index;
            const scrollPos = index * itemWidth;

            carousel.scrollTo({
                left: scrollPos,
                behavior: 'smooth'
            });

            updateIndicators();
        }

        /**
         * Updates current index based on scroll position
         */
        function updateCurrentIndex() {
            const scrollPos = carousel.scrollLeft;
            currentIndex = Math.round(scrollPos / itemWidth);
        }

        /**
         * Updates active indicator based on current index
         */
        function updateIndicators() {
            const indicators = document.querySelectorAll('.profile-carousel__indicator');

            indicators.forEach((indicator, index) => {
                if (index === currentIndex) {
                    indicator.classList.add('profile-carousel__indicator--active');
                } else {
                    indicator.classList.remove('profile-carousel__indicator--active');
                }
            });
        }

        /**
         * Updates navigation button states based on scroll position
         */
        function updateButtonStates() {
            const scrollPos = carousel.scrollLeft;
            const maxScroll = carousel.scrollWidth - carousel.clientWidth;

            prevButton.style.opacity = scrollPos <= 5 ? '0.5' : '1';
            prevButton.style.pointerEvents = scrollPos <= 5 ? 'none' : 'all';

            nextButton.style.opacity = scrollPos >= maxScroll - 5 ? '0.5' : '1';
            nextButton.style.pointerEvents = scrollPos >= maxScroll - 5 ? 'none' : 'all';
        }

        /**
         * Starts auto-scrolling carousel
         */
        function startAutoScroll() {
            // Clear any existing interval first
            stopAutoScroll();

            autoScrollInterval = setInterval(() => {
                if (currentIndex >= profileCards.length - 1) {
                    scrollToItem(0);
                } else {
                    scrollToItem(currentIndex + 1);
                }
            }, 5000); // Auto-scroll every 5 seconds
        }

        /**
         * Stops auto-scrolling carousel
         */
        function stopAutoScroll() {
            clearInterval(autoScrollInterval);
        }

        /**
         * Checks if element is in viewport
         * @param {HTMLElement} el - Element to check
         * @returns {boolean} - Whether element is in viewport
         */
        function isElementInViewport(el) {
            const rect = el.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }
    }
})();