(function () {
    'use strict'

    bsCustomFileInput.init()

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.validated-form')

    

    // Loop over them and prevent submission
    Array.from(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
})()

function calc() {
  var quantity = parseInt(document.getElementById("quantity").value,10);
  var time = parseInt(document.getElementById("time").value,10);
  var price = parseInt(document.getElementById("priceId").innerHTML,10);
  var quantityAvailable = parseInt(document.getElementById("quantityId").innerHTML,10);
  var total = time * quantity * price;
  var totalTag = document.getElementById("total");
  if(quantity <= quantityAvailable && time <= 24 && time >= 1 )
  {
      totalTag.innerHTML = `Total Cost - &#8377; ${total}`;
  }
  else if(quantity > quantityAvailable)
  {
    totalTag.innerHTML = `Please Enter correct Quantity`;
  }
  else 
  {
    totalTag.innerHTML = `Please Enter correct time`; 
  }
  
  }



function addSkill()
{
    var skill = document.getElementById("skill");
    var allSkills =  document.getElementById("allSkills");
    var newSkill = document.createElement("button");
    newSkill.innerHTML =  skill.value;
    newSkill.type = "button";
    newSkill.classList.add("btn");
    newSkill.classList.add("btn-info");
    newSkill.classList.add("rounded-pill");
    newSkill.classList.add("ml-3");
    newSkill.classList.add("px-3");
    newSkill.classList.add("btnSkill");
    skill.value = '';
    
    newSkill.onclick = function () {

      newSkill.style.display = "none";
      
    }
    allSkills.appendChild(newSkill);
   
}


function collectSkill()
{
  var skills = document.getElementsByClassName("btnSkill");
  let str = '';
  for (var i=0; i < skills.length; i++) {

    str = str + skills[i].innerHTML + ",";

  }

  var skillFinal = document.getElementById("skillFinal");
  skillFinal.value = str;


   
}

