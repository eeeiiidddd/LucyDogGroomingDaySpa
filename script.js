// Carousel functionality
const buttons = document.querySelectorAll("[data-carousel-button]")

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const offset = button.dataset.carouselButton === "next" ? 1 : -1
        const slidesContainer = button.closest("[data-carousel]").querySelector("[data-slides]")

        const activeSlide = slidesContainer.querySelector("[data-active]")
        let newIndex = [...slidesContainer.children].indexOf(activeSlide) + offset
        if (newIndex < 0) newIndex = slidesContainer.children.length - 1
        if (newIndex >= slidesContainer.children.length) newIndex = 0

        slidesContainer.children[newIndex].dataset.active = true
        delete activeSlide.dataset.active
    })
})

// Autoplay functionality: advance to next slide every 3 seconds
const autoplayInterval = 4000; // milliseconds
setInterval(() => {
    const nextButton = document.querySelector("[data-carousel-button='next']");
    if (nextButton) nextButton.click();
}, autoplayInterval);

// Book button: scroll to contact section on the page
const bookBtn = document.querySelector("#bookBtn");
if (bookBtn) {
    bookBtn.addEventListener("click", () => {
        const contact = document.querySelector('#contact');
        if (contact) contact.scrollIntoView({ behavior: 'smooth' });
    });
}

// Contact form submit handler (builds a mailto and navigates)
const contactForm = document.querySelector('#contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e){
        e.preventDefault();
        const f = e.target;
        const name = f.name.value.trim();
        const email = f.email.value.trim();
        const phone = f.phone.value.trim();
        const service = f.service.value;
        const date = f.date.value;
        const time = f.time.value;
        const message = f.message.value.trim();
        if(!name || !email || !message){
            alert('Please fill name, email and message.');
            return;
        }
        const subject = encodeURIComponent('Contact from ' + name + ' — ' + service);
        let body = '';
        body += 'Name: ' + name + '\n';
        body += 'Email: ' + email + '\n';
        if(phone) body += 'Phone: ' + phone + '\n';
        if(date) body += 'Preferred date: ' + date + '\n';
        if(time) body += 'Preferred time: ' + time + '\n';
        body += '\nMessage:\n' + message + '\n';
        const mailto = 'mailto:info@lucydoggrooming.com?subject=' + subject + '&body=' + encodeURIComponent(body);
        window.location.href = mailto;
    });
}



