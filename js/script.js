/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

const ITEMSPERPAGE = 9;
//const header = document.querySelector('.header');
//header.innerHTML = `<h1> header </h1>`


/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/



/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage(studentList, pageNumber) {
   const startIndex = (pageNumber * ITEMSPERPAGE) - ITEMSPERPAGE;
   const endIndex = pageNumber * ITEMSPERPAGE;
   const ul = document.querySelector("ul.student-list");
   ul.innerHTML = "";
   for (let i = startIndex; i < studentList.length && i < endIndex; i++) {
      const html = `
         <li class="student-item cf">
            <div class="student-details">
               <img class="avatar" src="${studentList[i].picture.thumbnail}" alt="Profile Picture">
               <h3>${studentList[i].name.first} ${studentList[i].name.last}</h3>
               <span class="email">${studentList[i].email}</span>
            </div>
            <div class="joined-details">
               <span class="date">Joined ${studentList[i].registered.date}</span>
            </div>
         </li>
         `
      ul.insertAdjacentHTML('beforeend', html);
   }
}

function addSearchBar() {
   const header = document.querySelector('header');
   const searchHTML = `
      <label for="search" class="student-search">
         <input id="search" placeholder="Search by name...">
         <button type="button">
            <img src="img/icn-search.svg" alt="Search icon">
         </button>
      </label>
   `
   header.insertAdjacentHTML('beforeend', searchHTML);
}




/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

function addPagination(studentList) {
   const ul = document.querySelector("ul.link-list");
   ul.innerHTML = "";
   // calculation of number of pages 
   // if total number of student records exact multiple number of records to be shown per page, can simply divide
   // but not exact multiple, obtain integer portion of division result (by Math.floor operation to round down)
   // then add 1 to account for the extra records.
   const remainder = studentList.length % ITEMSPERPAGE;
   if (remainder) {
      numPages = Math.floor(studentList.length / ITEMSPERPAGE) + 1;
   } else {
      numPages = studentList.length / ITEMSPERPAGE;
   }

   let pageListHtml = '';
   for (let i = 1; i <= numPages; i++) {
      pageListHtml += `
          <li>
            <button type="button">${i}</button>
          </li>`
          
      
    }

    ul.insertAdjacentHTML('beforeend', pageListHtml);

    ul.firstElementChild.className = "active";
    // set active class initially on the page 1 button, identified as first child 2 levels deep of the ul
    ul.firstElementChild.firstElementChild.className = "active";

    ul.addEventListener('click', (event) => {
       if (event.target.tagName == 'BUTTON') {
          // remove class name from all li elements to ensure none have active class
          const li = document.querySelectorAll('ul > li');
          for (let i=0; i < li.length; i++) {
             li[i].className = "";
          // remove class name from all button elements to ensure none have active class
          const buttons = document.querySelectorAll('ul.link-list button');
          for (let i=0; i < buttons.length; i++) {
             buttons[i].className = "";
          }
          // set active class on the parent li element of the button that was clicked
          const parentLi = event.target.parentNode; 
          parentLi.className = "active";
          // set active class on the button that was clicked
          event.target.className = "active";
          // text content of the button is page number to display,
          // convert to an integer as showPage function needs a numeric value
          const pageNumber = parseInt(event.target.textContent);
         if ( pageNumber ) {
            showPage(studentList, pageNumber);
         }
      }
   }});
}
// Call functions
//function searchForName() {
   function searchForName( studentList ) {
  
      const searchInput = document.getElementById("search");
      const searchButton = searchInput.nextElementSibling;
     /**
      * `displayNoResults` function
      * Display message on page if user search returns no results
      * Removes all html elements from both ul tags other than the message text
      */
     function displayNoResults() {
        const ulStudents = document.querySelector("ul.student-list");
        ulStudents.innerHTML = "<h2>No results found</h2>";
        const ulPages = document.querySelector("ul.link-list");
        ulPages.innerHTML = "";
     }
     function doSearch() {
      searchText = searchInput.value;
       searchResults = [];
       // loop through all student records finding those where the name (first + last) contains the search string
       // (both compared as lowercase so search is case insensitive)
       // have deliberately not coded for an empty search string as in this case all records are returned which
       // is as it should be.
       for (let i = 0; i < data.length; i++) {
          const fullName = data[i].name.first.toLowerCase() + data[i].name.last.toLowerCase();
       // have deliberately not checked for an empty search string as if this is the case all records are returned
       // which is what we want.
       for (let i = 0; i < studentList.length; i++) {
          const fullName = studentList[i].name.first.toLowerCase() + studentList[i].name.last.toLowerCase();
          if ( fullName.includes(searchText.toLowerCase())) {
             searchResults.push(data[i]);
          }
         if ( searchResults.length ) {
            showPage(searchResults, 1);
            addPagination( searchResults );
         } else {
            displayNoResults();
         }
      }
   }
   searchInput.addEventListener("input", doSearch );
   searchButton.addEventListener('click', doSearch );
}}
showPage(data, 1);
addSearchBar();
addPagination(data);
searchForName(data);

