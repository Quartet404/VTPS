import { regionMap } from './regionMap.js';

async function fetchRandomUsers() {
    try {
        const response = await fetch('https://randomuser.me/api/?results=10'); // Запит 10 користувачів
        const data = await response.json();
        return data.results; // Зазвичай, дані будуть у властивості `results`
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function fetchAndFormatUsers() {
    const courses = ["Mathematics", "Physics", "English", "Computer Science", "Dancing", "Chess", "Biology", "Chemistry", "Law", "Art", "Medicine", "Statistics"];
    
    // Отримати дані користувачів
    const userData = await fetchRandomUsers();

    // Трансформація даних
    const formattedUsers = userData.map(user => ({
        gender: user.gender,
        title: user.name.title,
        full_name: `${user.name.first} ${user.name.last}`,
        city: user.location.city,
        state: user.location.state,
        country: user.location.country,
        postcode: user.location.postcode,
        coordinates: { latitude: user.location.coordinates.latitude, longitude: user.location.coordinates.longitude },
        timezone: { offset: user.location.timezone.offset, description: user.location.timezone.description },
        email: user.email,
        b_date: user.dob.date,
        age: user.dob.age,
        phone: user.phone,
        picture_large: user.picture.large,
        picture_thumbnail: user.picture.thumbnail,
        id: user.login.uuid,
        favorite: false,
        course: courses[Math.floor(Math.random() * courses.length)],
        bg_color: "#FFFFFF",
        note: ""
    }));

    return formattedUsers;
}

function validateUser(user) {
    const isCapitalized = (str) => str && str[0] === str[0].toUpperCase();

    let errors = {};

    // Перевірка строкових полів
    if (!isCapitalized(user.full_name)) errors.full_name = "Must start with a capital letter.";
    if (!isCapitalized(user.gender)) errors.gender = "Must start with a capital letter.";
    if (!isCapitalized(user.note)) errors.note = "Must start with a capital letter.";
    if (!isCapitalized(user.state)) errors.state = "Must start with a capital letter.";
    if (!isCapitalized(user.city)) errors.city = "Must start with a capital letter.";
    if (!isCapitalized(user.country)) errors.country = "Must start with a capital letter.";

    // Перевірка числових полів
    if (typeof user.age !== 'number') errors.age = "Must be a number.";

    // Перевірка email
    if (!user.email.includes('@')) errors.email = "Invalid email format.";

    // Перевірка телефону (припущення для спрощення)
    if (!user.phone.match(/^\d{4}-\d{3}-\d{4}$/)) errors.phone = "Invalid phone format. Expected format: XXXX-XXX-XXXX";

    return Object.keys(errors).length === 0 ? { valid: true } : { valid: false, errors };
}

function filterUsers(users, filterOptions) {
    return users.filter(user => {
        const userRegion = regionMap(user.country);
        const userAgeRange = filterOptions.ageRange && filterOptions.ageRange.split('-');
        const minAge = userAgeRange && parseInt(userAgeRange[0]);
        const maxAge = userAgeRange && parseInt(userAgeRange[1]);

        return (!filterOptions.region || userRegion === filterOptions.region) &&
               (!filterOptions.ageRange || (user.age >= minAge && user.age <= maxAge)) &&
               (!filterOptions.gender || user.gender[0].toUpperCase() + user.gender.slice(1) === filterOptions.gender) &&
               (filterOptions.favorite === undefined || user.favorite === filterOptions.favorite);
    });
}

function sortUsers(users, sortBy, sortDirection = 'asc') {
    return users.sort((a, b) => {
        let comparison = 0;

        // Порівняння числових полів
        if (typeof a[sortBy] === 'number' && typeof b[sortBy] === 'number') {
            comparison = a[sortBy] - b[sortBy];
        }
        // Порівняння строкових полів
        else if (typeof a[sortBy] === 'string' && typeof b[sortBy] === 'string') {
            comparison = a[sortBy].localeCompare(b[sortBy]);
        }

        // Зміна напряму сортування
        return sortDirection === 'asc' ? comparison : -comparison;
    });
}

function findUser(users, searchField, searchValue) {
    return users.find(user => {
        if (searchField === 'region') {
            const userRegion = regionMap(user.country);
            return userRegion.toLowerCase() === searchValue.toLowerCase();
        } else if (typeof user[searchField] === 'string') {
            return user[searchField].toLowerCase() === searchValue.toLowerCase();
        } else if (typeof user[searchField] === 'number') {
            return user[searchField] === searchValue;
        }
        return false;
    });
}

function calculatePercentage(users, searchField, searchValue) {
    const matchingUsers = users.filter(user => {
        if (typeof user[searchField] === 'string') {
            return user[searchField].toLowerCase() === searchValue.toLowerCase();
        } else if (typeof user[searchField] === 'number') {
            return user[searchField] === searchValue;
        }
        return false;
    });

    const percentage = (matchingUsers.length / users.length) * 100;
    return percentage;
}

function calculatePercentageWithCondition(users, searchField, conditionFn) {
    const matchingUsers = users.filter(user => {
        return conditionFn(user[searchField]);
    });

    const percentage = (matchingUsers.length / users.length) * 100;
    return percentage;
}

fetchAndFormatUsers().then(users => {
    console.log("Завдання 1");
    console.log(users);
    console.log("Завдання 2");
    users.forEach(user => {
        const validationResult = validateUser(user);
        console.log(`Validation for ${user.full_name}:`, validationResult);
    });

    // Приклад виклику функції фільтрації
    const filterOptions = {
        region: "Europe",
        ageRange: "46-58",
        gender: "Male",
        favorite: false
    };
    const filteredUsers = filterUsers(users, filterOptions);
    console.log("Завдання 3: Фільтровані користувачі", filteredUsers);

    // Сортування всіх користувачів
    const sortedUsers = sortUsers(users, 'age', 'asc');
    console.log("Завдання 4: Відсортовані користувачі", sortedUsers);

    // Пошук користувача
    const searchField = 'region';
    const searchValue = 'Europe';
    const foundUser = findUser(users, searchField, searchValue);
    console.log("Завдання 5: Знайдений користувач", foundUser);
	
    // Відсоток користувачів з віком більше 30
    const ageCondition = (age) => age > 30;
    const percentage = calculatePercentageWithCondition(users, 'age', ageCondition);
    console.log("Завдання 6: Відсоток користувачів з віком більше 30", percentage, "%");
});

function createTeacherCard(teacher) {
    const card = document.createElement('div');
    card.className = 'col-md-2 teacher__card';
    card.innerHTML = `
        <div class="teacher_photo">
            <img src="${teacher.picture_large}" alt="${teacher.full_name}" title="${teacher.full_name}" onerror="handleImageError(this, '${teacher.full_name.split(' ').map(n => n[0]).join('. ')}.')">
        </div>
        <p class="teacher__name">${teacher.full_name.split(' ').join('<br>')}</p>
        <p class="teacher__specialty">${teacher.course}</p>
        <p class="teacher__location">${teacher.country}</p>
        <button class="favorite-btn">${teacher.favorite ? 'Remove from favorites' : 'Add to favorites'}</button>
    `;
    card.querySelector('.favorite-btn').addEventListener('click', (event) => {
        event.stopPropagation(); // Зупиняє поширення події, щоб не відкривалося модальне вікно
        toggleFavorite(teacher);
    });
    card.querySelector('.teacher_photo').addEventListener('click', () => showTeacherInfo(teacher));
    return card;
}

function displayTeachers(teachers) {
    const container = document.getElementById('displayTeachers');
    container.innerHTML = '';
    teachers.forEach(teacher => {
        const card = createTeacherCard(teacher);
        container.appendChild(card);
    });
}

function showTeacherInfo(teacher) {
    const modalTeacher = document.getElementById('modalTeacher');
    modalTeacher.querySelector('img').src = teacher.picture_large;
    modalTeacher.querySelector('h2').innerText = teacher.full_name;
    modalTeacher.querySelector('b').innerText = teacher.course;
    modalTeacher.querySelector('.teacher-location').innerText = `${teacher.city}, ${teacher.country}`;
    modalTeacher.querySelector('.teacher-age-gender').innerText = `${teacher.age}, ${teacher.gender[0].toUpperCase() + teacher.gender.slice(1)}`;
    modalTeacher.querySelector('.teacher-email').innerText = teacher.email;
    modalTeacher.querySelector('.teacher-phone').innerText = teacher.phone;
    modalTeacher.style.display = 'block';
	modalTeacher.querySelector('.modal__header .close').addEventListener('click', () => {
		modalTeacher.style.display = 'none';
	});
}

function toggleFavorite(teacher) {
    teacher.favorite = !teacher.favorite;
    displayTeachers(filterAndSortTeachers(teachers)); // Перерисовуємо лише відфільтрованих викладачів після зміни
	displayFavorites(teachers);
}

function filterAndSortTeachers(teachers) {
    const country = document.getElementById('country-filter').value;
    const ageRange = document.getElementById('age-filter').value;
    const gender = document.getElementById('gender-filter').value;
    const favorites = document.getElementById('favorites-filter').checked;

    return teachers.filter(teacher => {
        const teacherRegion = regionMap(teacher.country);
        const [minAge, maxAge] = ageRange ? ageRange.split('-').map(Number) : [null, null];
        return (!country || teacherRegion === country) &&
               (!minAge || (teacher.age >= minAge && teacher.age <= maxAge)) &&
               (!gender || teacher.gender[0].toUpperCase() + teacher.gender.slice(1) === gender) &&
               (!favorites || teacher.favorite === favorites);
    });
}

function displayStatistics(teachers) {
    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = '';
    teachers.forEach(teacher => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="table-name">${teacher.full_name}</td>
            <td>${teacher.course}</td>
            <td>${teacher.age}</td>
            <td>${teacher.gender[0].toUpperCase() + teacher.gender.slice(1)}</td>
            <td>${teacher.country}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Додана функція для сортування таблиці статистики
function sortStatistics(teachers, sortBy, sortDirection = 'asc') {
    return teachers.sort((a, b) => {
        let comparison = 0;

        if (sortBy === 'full_name' || sortBy === 'course' || sortBy === 'country') {
            comparison = a[sortBy].localeCompare(b[sortBy]);
        } else if (sortBy === 'age') {
            comparison = a[sortBy] - b[sortBy];
        } else if (sortBy === 'b_date') {
            comparison = new Date(a[sortBy]) - new Date(b[sortBy]);
        }

        return sortDirection === 'asc' ? comparison : -comparison;
    });
}


// Основний код для завантаження та відображення викладачів
let teachers = [];
let currentSort = { sortBy: 'full_name', sortDirection: 'asc' };


fetchAndFormatUsers().then(users => {
    teachers = users;
    displayTeachers(teachers);
	displayStatistics(sortStatistics(teachers, currentSort.sortBy, currentSort.sortDirection));
	displayFavorites(teachers);
});



window.onclick = function(event) {
    const modalTeacher = document.getElementById('modalTeacher');
	const modalAddTeacher = document.getElementById('modalAddTeacher');
    if (event.target === modalTeacher || event.target === modalAddTeacher) {
        modalAddTeacher.style.display = "none";
        modalTeacher.style.display = "none";
    }
}



// Обробка фільтрів
document.getElementById('country-filter').addEventListener('change', () => displayTeachers(filterAndSortTeachers(teachers)));
document.getElementById('age-filter').addEventListener('change', () => displayTeachers(filterAndSortTeachers(teachers)));
document.getElementById('gender-filter').addEventListener('change', () => displayTeachers(filterAndSortTeachers(teachers)));
document.getElementById('favorites-filter').addEventListener('change', () => displayTeachers(filterAndSortTeachers(teachers)));

// Обробка сортування таблиці
document.getElementById('sort-name').addEventListener('click', () => {
    currentSort.sortBy = 'full_name';
    currentSort.sortDirection = currentSort.sortDirection === 'asc' ? 'desc' : 'asc';
    const sortedTeachers = sortStatistics(filterAndSortTeachers(teachers), currentSort.sortBy, currentSort.sortDirection);
    displayStatistics(sortedTeachers);
});
document.getElementById('sort-course').addEventListener('click', () => {
    currentSort.sortBy = 'course';
    currentSort.sortDirection = currentSort.sortDirection === 'asc' ? 'desc' : 'asc';
    const sortedTeachers = sortStatistics(filterAndSortTeachers(teachers), currentSort.sortBy, currentSort.sortDirection);
    displayStatistics(sortedTeachers);
});
document.getElementById('sort-age').addEventListener('click', () => {
    currentSort.sortBy = 'age';
    currentSort.sortDirection = currentSort.sortDirection === 'asc' ? 'desc' : 'asc';
    const sortedTeachers = sortStatistics(filterAndSortTeachers(teachers), currentSort.sortBy, currentSort.sortDirection);
    displayStatistics(sortedTeachers);
});
document.getElementById('sort-country').addEventListener('click', () => {
    currentSort.sortBy = 'country';
    currentSort.sortDirection = currentSort.sortDirection === 'asc' ? 'desc' : 'asc';
    const sortedTeachers = sortStatistics(filterAndSortTeachers(teachers), currentSort.sortBy, currentSort.sortDirection);
    displayStatistics(sortedTeachers);
});

document.getElementById('teacherForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const specialty = document.getElementById('sp').value;
    const country = document.getElementById('country').value;
    const city = document.getElementById('city').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const dateOfBirth = document.getElementById('date').value;
    const sex = document.querySelector('input[name="sex"]:checked').value;
    const color = document.getElementById('color').value;
    const comment = document.getElementById('comment').value;

    const newTeacher = {
        gender: sex.toLowerCase(),
        title: sex === 'Male' ? 'Mr.' : 'Ms.',
        full_name: name,
        city: city,
        state: '', // Немає поля в формі
        country: country,
        postcode: '', // Немає поля в формі
        coordinates: { latitude: '', longitude: '' }, // Немає поля в формі
        timezone: { offset: '', description: '' }, // Немає поля в формі
        email: email,
        b_date: new Date(dateOfBirth).toISOString(),
        age: new Date().getFullYear() - new Date(dateOfBirth).getFullYear(),
        phone: phone,
        picture_large: '', // Немає поля в формі
        picture_thumbnail: '', // Немає поля в формі
        id: 'id-' + Math.random().toString(36).substr(2, 9), // Генеруємо випадковий id
        favorite: false,
        course: specialty,
        bg_color: color,
        note: comment
    };

    teachers.push(newTeacher);
    displayTeachers(filterAndSortTeachers(teachers));
    displayStatistics(sortStatistics(filterAndSortTeachers(teachers), currentSort.sortBy, currentSort.sortDirection));
    
    // Закриття модального вікна
    document.getElementById('modalAddTeacher').style.display = 'none';
});

document.getElementById('addTeacherBtn1').addEventListener('click', () => {
    const modalAddTeacher = document.getElementById('modalAddTeacher');
	modalAddTeacher.style.display = 'block';
	modalAddTeacher.querySelector('.modal__header .close').addEventListener('click', () => {
		console.log("CLOSE!!!");
		modalAddTeacher.style.display = 'none';
	});
});

document.getElementById('addTeacherBtn2').addEventListener('click', () => {
    const modalAddTeacher = document.getElementById('modalAddTeacher');
	modalAddTeacher.style.display = 'block';
	modalAddTeacher.querySelector('.modal__header .close').addEventListener('click', () => {
		modalAddTeacher.style.display = 'none';
	});
});

const favoritesContainer = document.querySelector('.favorites-container');
const leftButton = document.querySelector('.left-button');
const rightButton = document.querySelector('.right-button');
const cardsToShow = 5; // Кількість карток для відображення
let currentPosition = 0;

// Функція для відображення улюблених вчителів
function displayFavorites(teachers) {
    favoritesContainer.innerHTML = ''; // Очищуємо контейнер

    const favoriteTeachers = teachers.filter(teacher => teacher.favorite);
    favoriteTeachers.forEach(teacher => {
        const card = createTeacherCard(teacher);
        favoritesContainer.appendChild(card);
    });

    updateCarouselButtons();
}

// Оновлення видимості кнопок прокрутки
function updateCarouselButtons() {
    const totalCards = favoritesContainer.children.length;
    leftButton.style.display = currentPosition > 0 ? 'block' : 'none';
    rightButton.style.display = currentPosition < totalCards - cardsToShow ? 'block' : 'none';
}

// Прокрутка вліво
leftButton.addEventListener('click', () => {
    const cardWidth = favoritesContainer.children[0].offsetWidth;
    currentPosition = Math.max(currentPosition - 1, 0);
    favoritesContainer.style.transform = `translateX(-${currentPosition * cardWidth}px)`;
    updateCarouselButtons();
});

// Прокрутка вправо
rightButton.addEventListener('click', () => {
    const cardWidth = favoritesContainer.children[0].offsetWidth;
    const totalCards = favoritesContainer.children.length;
    currentPosition = Math.min(currentPosition + 1, totalCards - cardsToShow);
    favoritesContainer.style.transform = `translateX(-${currentPosition * cardWidth}px)`;
    updateCarouselButtons();
});