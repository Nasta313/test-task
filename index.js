const form = document.querySelector("#form");
const FName = document.getElementsByName("FName")[0];
const LName = document.getElementsByName("LName")[0];
const Email = document.getElementsByName("Email")[0];
const Phone = document.getElementsByName("Phone")[0];
const Sex = document.getElementsByName("Sex");
const Skills = document.getElementsByName("Skills");
const Department = document.getElementsByName("Department");

window.onload = () => {
    const url = new URL(window.location.href);
    decodeURI(url);
    FName.value = url.searchParams.get("FName");
    LName.value = url.searchParams.get("LName");
    Email.value = url.searchParams.get("Email");
    Phone.value = url.searchParams.get("Phone");

    Sex.forEach((radioElement)=>{
        if(radioElement.value == url.searchParams.get("Sex")){
           radioElement.setAttribute("checked", "checked")
        }
    })

    if(url.searchParams.get("Skills")){
        const skills = url.searchParams.get("Skills").split('|');
        skills.forEach((skill)=>{
            Skills.forEach((checkboxElement) => {
                if(checkboxElement.value == skill){
                    checkboxElement.setAttribute("checked", "checked")
                }
            });
        })
    }
    
    if(url.searchParams.get("Department")){
        const departments = url.searchParams.get("Department").split('|');
        departments.forEach((department)=>{
            Department.forEach((element) => {
                if(element.value == department){
                    element.setAttribute("selected", "selected")
                }
            });
        })
    }
}

form.addEventListener("submit", (event)=>{
    event.preventDefault();
    const objectFromForm = {};
    const skillsArray = [];
    const departmentArray = [];

    objectFromForm.FName = FName.value;
    objectFromForm.LName = LName.value;
    objectFromForm.Email = Email.value;
    objectFromForm.Phone = Phone.value;
    objectFromForm.Sex = Sex.value;
    objectFromForm.Skills = [];

    Sex.forEach((radioElement)=>{
        if(radioElement.checked){
            objectFromForm.Sex = radioElement.value;
        }
    })

    Skills.forEach((checkboxElement) => {
        if(checkboxElement.checked){
            skillsArray.push(checkboxElement.value);
            objectFromForm.Skills = skillsArray;
        }
    });

    Department.forEach((option)=>{
        if(option.selected){
            departmentArray.push(option.value);
            objectFromForm.Department = departmentArray;
        }
    });

    let result = JSON.stringify(objectFromForm);
    console.log("Object with key-value:", result);
   
    function requestData(data){
        const url = new URL(window.location.href);
        for(key in data){
            if(typeof data[key]=="object"){
                url.searchParams.set(key, data[key].join("|"));
            } else {
                url.searchParams.set(key, data[key]);
            }
        }      
        return url;
    }

    history.pushState('', '', decodeURI(requestData(objectFromForm)));
})
