const menuOpenButton = document.querySelector('#menu-open-button');
const menuCloseButton = document.querySelector('#menu-close-button');
const navMenu = document.querySelector('.nav-menu');

menuOpenButton.addEventListener('click', () => {
    document.body.classList.toggle("show-mobile-menu");
});

menuCloseButton.addEventListener('click', () =>
menuOpenButton.click());

// Sticky navbar functionality
const header = document.querySelector('header');
const heroSection = document.querySelector('.hero-section');

window.addEventListener('scroll', () => {
    if (window.scrollY > heroSection.offsetHeight - 120) { // adjust for navbar height
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
});

// Smooth transition for sticky navbar
// (Add CSS transition in style.css: header { transition: all 0.3s ease; })

// Highlight current section in navbar
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
    let scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100; // Adjust offset for navbar height
        const sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
            // Add active class to header for glassmorphism
            header.classList.remove('hero-active', 'issue-active', 'solutions-active', 'graph-active'); // Remove others
            header.classList.add(`${sectionId}-active`);
        }
    });

    // Special case for Home (hero section)
    if (scrollY < sections[0].offsetTop - 100) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#') {
                link.classList.add('active');
            }
        });
        header.classList.remove('issue-active', 'solutions-active', 'graph-active'); // Remove others
        header.classList.add('hero-active');
    }
}

window.addEventListener('scroll', highlightNavLink);

window.addEventListener('load', function() {
    // Image Carousel
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-item');
    const carouselInner = document.querySelector('.carousel-inner');

    function showSlide(index) {
        const offset = -index * 100;
        carouselInner.style.transform = `translateX(${offset}%)`;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    // Auto-slide every 5 seconds
    setInterval(nextSlide, 5000);

    // Plugin for center text in doughnut charts
    const centerTextPlugin = {
        id: 'centerText',
        beforeDraw: function(chart) {
            const {ctx, chartArea: {left, right, top, bottom}} = chart;
            ctx.save();
            const centerX = (left + right) / 2;
            const centerY = (top + bottom) / 2;
            ctx.font = 'bold 24px Arial';
            ctx.fillStyle = '#333';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            const text = chart.config.options.plugins.centerText.text;
            ctx.fillText(text, centerX, centerY);
            ctx.restore();
        }
    };

    Chart.register(centerTextPlugin);

    // Impact Charts - Widgets
    const mortalityCtx = document.getElementById('mortalityChart').getContext('2d');
    const mortalityChart = new Chart(mortalityCtx, {
        type: 'doughnut',
        data: {
            labels: ['Reduction', 'Remaining'],
            datasets: [{
                data: [30, 70],
                backgroundColor: ['rgba(255, 99, 132, 0.8)', 'rgba(255, 99, 132, 0.2)'],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(255, 99, 132, 0.5)'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed + '%';
                        }
                    }
                },
                centerText: {
                    text: '30%'
                }
            }
        }
    });

    const accessCtx = document.getElementById('accessChart').getContext('2d');
    const accessChart = new Chart(accessCtx, {
        type: 'doughnut',
        data: {
            labels: ['Improvement', 'Remaining'],
            datasets: [{
                data: [50, 50],
                backgroundColor: ['rgba(54, 162, 235, 0.8)', 'rgba(54, 162, 235, 0.2)'],
                borderColor: ['rgba(54, 162, 235, 1)', 'rgba(54, 162, 235, 0.5)'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed + '%';
                        }
                    }
                },
                centerText: {
                    text: '50%'
                }
            }
        }
    });

    const detectionCtx = document.getElementById('detectionChart').getContext('2d');
    const detectionChart = new Chart(detectionCtx, {
        type: 'doughnut',
        data: {
            labels: ['Increase', 'Remaining'],
            datasets: [{
                data: [40, 60],
                backgroundColor: ['rgba(255, 206, 86, 0.8)', 'rgba(255, 206, 86, 0.2)'],
                borderColor: ['rgba(255, 206, 86, 1)', 'rgba(255, 206, 86, 0.5)'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed + '%';
                        }
                    }
                },
                centerText: {
                    text: '40%'
                }
            }
        }
    });
});

// Auto-slide for the image slider
let currentSlideIndex = 0;
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slider img');

if (slider && slides.length > 0) {
    setInterval(() => {
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        slider.scrollLeft = currentSlideIndex * slider.clientWidth;
    }, 5000);
}

// Infinite Achievement Scroll Logic
const initInfiniteScroll = () => {
    const list = document.querySelector('.achievements-carousel .styled-list');
    if (list) {
        // Clear any existing clones first to prevent triple-cloning on refresh
        const originalContent = list.innerHTML;
        list.innerHTML = originalContent + originalContent;
    }
};

// Run after DOM is fully loaded
if (document.readyState === 'complete') {
    initInfiniteScroll();
} else {
    window.addEventListener('load', initInfiniteScroll);
}

// Auto-highlight based on current URL
window.addEventListener('load', () => {
    const currentPath = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath) {
            link.classList.add('active');
        }
    });
});