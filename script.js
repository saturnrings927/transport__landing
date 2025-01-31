
// Fixed header

const header = document.querySelector('.header');
const headerHeight = header.offsetHeight;

window.addEventListener('scroll', () => {

    if (window.scrollY > headerHeight) {
        header.classList.add('fixed');
    } else {
        header.classList.remove('fixed');
    }

});

// Nav toggle 
document.getElementById("nav__toggle").addEventListener("click", function(event) {
    event.preventDefault();

    this.classList.toggle("active");
    document.getElementById("nav__sidebar").classList.toggle("active");
});

document.getElementById("sidebar__close").addEventListener("click", function(event){
    event.preventDefault;

    document.getElementById("nav__sidebar").classList.toggle("active")
    document.getElementById("nav__toggle").classList.toggle("active");
});

// Scroll nav class toggle
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav__link");
const sidebarLinks = document.querySelectorAll(".sidebar__link");

window.addEventListener("scroll", () => {
    let currentSection = "";

    // Проверяем положение каждой секции относительно окна просмотра
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;  // Верхняя позиция секции
        const sectionHeight = section.clientHeight;  // Высота секции
        // Если текущая секция видна на экране
        if (window.pageYOffset >= sectionTop - sectionHeight / 3) {
            currentSection = section.getAttribute("id");
        }
    });
    // Убираем класс "active" у всех ссылок в навигации и боковом меню
    navLinks.forEach((link) => {
        link.classList.remove("active");
    });
    sidebarLinks.forEach((link) => {
        link.classList.remove("active");
    });
    // Добавляем класс "active" на ссылку, соответствующую текущей секции
    if (currentSection) {
        const activeNavLink = document.querySelector(`.nav__link[href="#${currentSection}"]`);
        const activeSidebarLink = document.querySelector(`.sidebar__link[href="#${currentSection}"]`);
        
        // Добавляем класс active для основной навигации
        if (activeNavLink) {
            activeNavLink.classList.add("active");
        }
        // Добавляем класс active для бокового меню
        if (activeSidebarLink) {
            activeSidebarLink.classList.add("active");
        }
    }
});


const loadingIndicator = document.getElementById("contact__loading");
const submitButton = document.getElementById("contact__button");
const contactSection = document.getElementById("contact");

document.getElementById("contact__form").addEventListener("submit", function(event) {
    event.preventDefault(); // Предотвращаем перезагрузку страницы

    const formData = new FormData(this);

    submitButton.disabled = true;
    loadingIndicator.style.display = "flex"

    // Валидация данных
    if (!formData.get("name") || !formData.get("email") || !formData.get("subject") || !formData.get("message")) {
        alert("Пожалуйста, заполните все обязательные поля");
        return;
    }
    // Отправка данных через fetch
    fetch("./php/mail.php", {
        method: "POST",
        body: formData
    })
    .then(response => {
        // Убеждаемся, что сервер вернул JSON
        if (!response.ok) throw new Error("Сервер вернул ошибку");
        return response.json();
    })
    .then(data => {
        submitButton.disabled = false;
        loadingIndicator.style.display = "none"

        if (data.success) {
            alert("Сообщение успешно отправлено!");
            this.reset(); // Очищаем форму
        } else {
            alert("Ошибка: " + (data.error || "Неизвестная ошибка"));
        }
    })
    .catch(error => {
        submitButton.disabled = false;
        loadingIndicator.style.display = "none"

        alert("Ошибка при соединении с сервером: " + error.message);
        console.error(error);
    });
    grecaptcha.reset() //Очищаем капчу
    header.classList.add('sent');
});

