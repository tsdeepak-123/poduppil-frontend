
//TIMER SCRIPT
// setTimeout(function () {
//     document.getElementById('loading').style.opacity = '0';
//     setTimeout(function () {
//         document.getElementById('loading').style.display = 'none';
//         document.getElementById('content').style.display = 'block';
//     }, 300);
// }, 3000);


//TOGGLE SCRIPT
const mobileMenuButton = document.getElementById('mobileMenuButton');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});


//TESTIMONIAL SCRIPT
// const testimonials = document.querySelectorAll('.testimonial-slide');
// let currentSlide = 0;

// function showSlide(index) {
//     testimonials.forEach((slide, i) => {
//         if (i === index) {
//             slide.style.display = 'inline-block';
//         } else {
//             slide.style.display = 'none';
//         }
//     });
// }

// function nextSlide() {
//     showSlide(currentSlide);
//     currentSlide = (currentSlide + 1) % testimonials.length;
// }

// showSlide(currentSlide);
// setInterval(nextSlide, 5000);

