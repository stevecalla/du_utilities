//SECTION //this doesn't work. can't get to the html select element because Materalize changes the select element to div, ul, li with active & selected attributes
// let optionsDropdown2 = document.querySelector('#selectedOptions');
// optionsDropdown2.addEventListener('change', function(event) {
//   console.log('hello');
//   console.log(event.target);
// })

//SECTION //this works using the onchange event
$(document).ready(function () {
  //initializes the material html element
  $("select").material_select();
});

// $(document).ready(function(){
//   $('select').formSelect();
// });

function selectOne() {
  console.log("log one selection");
  let optionsDropdown = document.querySelector(".selected");

  console.log(optionsDropdown);
  console.log(optionsDropdown.textContent);
}

function selectMultiple() {
  console.log("log multiple selections");
  // let optionsDropdown = document.querySelectorAll('li.active');
  let optionsDropdown = document.querySelectorAll(
    'li.active input[type="checkbox"]'
  );
  let optionsSelected = [];

  console.log(optionsDropdown);
  if (optionsDropdown.length > 0) {
    console.log(optionsDropdown[0].parentElement);
  }

  for (let i = 0; i < optionsDropdown.length; i++) {
    let selected = optionsDropdown[i].textContent;
    if (!optionsSelected.includes(selected)) {
      optionsSelected.push(optionsDropdown[i].parentElement.textContent);
    }
    console.log(optionsSelected);
  }
}

//SECTION //attempt without jquery doesn't work yet
// document.addEventListener('DOMContentLoaded', function() {
// M.AutoInit();
// var elems = document.querySelectorAll('select');
// var instances = M.FormSelect.init(elems);

// console.log(elems);
// console.log(instances);

// console.log(elems.length + " " + instances.length)
// });
