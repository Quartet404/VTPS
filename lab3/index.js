let modalAddTeacher = document.getElementById("modalAddTeacher");
let modalTeacher = document.getElementById("modalTeacher");
let span = document.querySelectorAll(".close");

import { regionMap } from './regionMap.js';

// console.log(regionMap("Germany")); 
// console.log(regionMap("United States")); 
// console.log(regionMap("Tuvalu")); 
// console.log(regionMap("Russia")); 
// console.log(regionMap("Argentina")); 

async function fetchRandomUsers() {
    try {
        const response = await fetch('https://randomuser.me/api/?results=10'); // Запит 10 користувачів
        const data = await response.json();
        return data.results; // Зазвичай, дані будуть у властивості `results`
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// fetchRandomUsers().then(users => {
    // console.log(users);
// });

async function fetchAndFormatUsers() {
    const courses = ["Mathematics", "Physics", "English", "Computer Science", "Dancing", "Chess", "Biology", "Chemistry", "Law", "Art", "Medicine", "Statistics"];
    
    // Отримати дані користувачів
    const userData = await fetchRandomUsers();
	//console.log(userData[0]);
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

// Виведення відформатованих даних
// fetchAndFormatUsers().then(users => {
	// console.log("Завдання 1");
	// console.log(users);
// });

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