'use strict';

const courses = document.querySelector('#courses-list');
const shoppingCartContent = document.querySelector('#cart-content tbody');

courses.addEventListener('click', onCoursesClick);

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
    console.log(courseInfo);
    
    addCourseToCart(courseInfo);
}

function addCourseToCart (course) {
    const cartRow = document.querySelector('#cart-content tr');

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
}