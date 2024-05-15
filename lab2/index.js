
let modalAddTeacher = document.getElementById("modalAddTeacher");
let modalTeacher = document.getElementById("modalTeacher");
let span = document.querySelectorAll(".close");

window.onclick = function(event) {

    if (event.target === modalTeacher || event.target===modalAddTeacher) {

        modalAddTeacher.style.display = "none";
        modalTeacher.style.display = "none";
    }
}


document.querySelectorAll(".teacher_click").forEach(btn => {
    btn.addEventListener('click',()=>{
        console.log(btn)
        modalTeacher.style.display = "block";
    })
})

document.querySelectorAll(".modal-toggle").forEach(btn => {
    btn.addEventListener('click',()=>{
        modalAddTeacher.style.display = "block";
    })
})


span.forEach(close => close.addEventListener( "click",
    () => {
        modalAddTeacher.style.display = "none";
        modalTeacher.style.display = "none";
    }
))

function handleImageError(imageElement, initials) {
    // Створюємо новий елемент span для показу ініціалів
    var newTextElement = document.createElement('span');
    newTextElement.textContent = initials;
    newTextElement.className = 'fallback-initials'; // Клас для стилізації

    // Замінюємо img на новий елемент span
    imageElement.parentNode.replaceChild(newTextElement, imageElement);
}
