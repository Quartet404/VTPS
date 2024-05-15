function handleImageError(imageElement, initials) {
    // Створюємо новий елемент span для показу ініціалів
    var newTextElement = document.createElement('span');
    newTextElement.textContent = initials;
    newTextElement.className = 'fallback-initials'; // Клас для стилізації

    // Замінюємо img на новий елемент span
    imageElement.parentNode.replaceChild(newTextElement, imageElement);
}

