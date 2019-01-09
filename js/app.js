'use strict';

/* 
    variables 
*/

const courses = document.querySelector('#courses-list');
const shoppingCartContent = document.querySelector('#cart-content tbody');
const clearCartBtn = document.querySelector('#clear-cart');

/* 
    event listeners 
*/

courses.addEventListener('click', onCoursesClick);
shoppingCartContent.addEventListener('click', onRemoveClick);
clearCartBtn.addEventListener('click', onClearCartBtnClick);
document.addEventListener('DOMContentLoaded', onDocumentLoad);

/* 
    functions
*/

function onCoursesClick (evt) {
    evt.preventDefault();

    if (evt.target.classList.contains('add-to-cart')) {

        const course = evt.target.parentElement.parentElement;

        getCourseInfo(course);
    }
}

function getCourseInfo (course) {
    const courseInfo = {
        image: course.querySelector('img').src,
        title: course.querySelector('h4').textContent,
        price: course.querySelector('.price span').textContent,
        id: course.querySelector('a').getAttribute('data-id')
    }
    
    addCourseToCart(courseInfo);
};

function addCourseToCart (course) {
    const cartRow = document.createElement('tr');
    cartRow.innerHTML = `
        <tr>
            <td>
                <img src="${course.image}" width="100"></img>
            </td>
            <td>${course.title}</td>
            <td>${course.price}</td>
            <td>
                <a href="#" class="remove" data-id="${course.id}">X</a>
            </td>
        </tr>
    `;

    shoppingCartContent.appendChild(cartRow);
    saveCourseToLocalStorage(course);    
}

function saveCourseToLocalStorage (course) {
    let courses = getCoursesFromLocalStorage();
    
    courses.push(course);

    localStorage.setItem('courses', JSON.stringify(courses));
};

function getCoursesFromLocalStorage () {
    let courses;
    
    if (localStorage.getItem('courses') === null) {
        courses = [];
    } else {
        courses = JSON.parse(localStorage.getItem('courses'));
    }

    return courses;
};

function onRemoveClick (evt) {
    evt.preventDefault();
    const cartElement = evt.target.parentElement.parentElement;

    if(evt.target.classList.contains('remove')) {
        cartElement.remove();
        let cartID = cartElement.querySelector('.remove').getAttribute('data-id');
        removeCourseFromLocalStorage(cartID);
    }
};

function removeCourseFromLocalStorage (id) {
    var coursesFromLocalStorage = getCoursesFromLocalStorage();

    coursesFromLocalStorage.some(function (item, index) {
        if(item.id === id) {
            coursesFromLocalStorage.splice(index, 1);
            return true;
        }
    });
    localStorage.setItem('courses', JSON.stringify(coursesFromLocalStorage));
};

function onClearCartBtnClick (evt) {
    evt.preventDefault();

    Array.from(shoppingCartContent.children).forEach(function (item) {
        shoppingCartContent.removeChild(item);
    });

    clearLocalStorage();
};

function clearLocalStorage () {
    localStorage.clear();
};

function onDocumentLoad () {
    var coursesFromLocalStorage = getCoursesFromLocalStorage();

    coursesFromLocalStorage.forEach(function (item) {
        const cartRow = document.createElement('tr');
        cartRow.innerHTML = `
            <tr>
                <td>
                    <img src="${item.image}" width="100"></img>
                </td>
                <td>${item.title}</td>
                <td>${item.price}</td>
                <td>
                    <a href="#" class="remove" data-id="${item.id}">X</a>
                </td>
            </tr>
        `;
        shoppingCartContent.appendChild(cartRow);
    });
};