'use strict';

const courses = document.querySelector('#courses-list');
const shoppingCartContent = document.querySelector('#cart-content tbody');
const clearCartBtn = document.querySelector('#clear-cart');

courses.addEventListener('click', onCoursesClick);
shoppingCartContent.addEventListener('click', onRemoveClick);
clearCartBtn.addEventListener('click', onClearCartBtnClick);

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
    console.log(cartRow);

    shoppingCartContent.appendChild(cartRow);
    console.log(shoppingCartContent);
    
}

function onRemoveClick (evt) {
    if(evt.target.classList.contains('remove')) {
        evt.target.parentElement.parentElement.remove();
    }
}

function onClearCartBtnClick () {
    Array.from(shoppingCartContent.children).forEach(function (item) {
        shoppingCartContent.removeChild(item);
    })
}