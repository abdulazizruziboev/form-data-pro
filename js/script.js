let elAlertBox = document.getElementById("alertBox");
let elForm = document.getElementById("addCarForm");
let elFormSubmit = document.getElementById("addCarFormSubmit");

function infoAlert(text) {
    let clone = document.getElementById("infoAlertTemplate").cloneNode(true).content;
    clone.querySelector("span").textContent=text;
    elAlertBox.appendChild(clone);
    setTimeout(()=>{
        elAlertBox.querySelector(`[role="alert"]`).classList.add("opacity-0","translate-x-1/2");
        setTimeout(()=>{
            elAlertBox.querySelector(`[role="alert"]`).remove();
        },2000)
    },3000)
}

function successAlert(text) {
    let clone = document.getElementById("successAlertTemplate").cloneNode(true).content;
    clone.querySelector("span").textContent=text;
    elAlertBox.appendChild(clone);
    setTimeout(()=>{
        elAlertBox.querySelector(`[role="alert"]`).classList.add("opacity-0","translate-x-1/2");
        setTimeout(()=>{
            elAlertBox.querySelector(`[role="alert"]`).remove();
        },2000)
    },3000)
}

function errorAlert(text) {
    let clone = document.getElementById("errorAlertTemplate").cloneNode(true).content;
    clone.querySelector("span").textContent=text;
    elAlertBox.appendChild(clone);
    setTimeout(()=>{
        elAlertBox.querySelector(`[role="alert"]`).classList.add("opacity-0","translate-x-1/2");
        elAlertBox.querySelector(`[role="alert"]`).remove();
    },1500)
}

elForm.addEventListener("submit",(evt)=>{
evt.preventDefault();
})

elFormSubmit.addEventListener("click",()=>{
    let emtptyInputs = [];
    elForm.querySelectorAll("input, textarea").forEach(el=>{
        if(el.value.trim()=='') {
            emtptyInputs.push(el.ariaLabel);
            elForm.querySelector(`[aria-label=${emtptyInputs[0]}]`).focus();
        }
    })
    if(emtptyInputs.length!=0) {
        infoAlert("Please fill in "+emtptyInputs[0])
    } else if(emtptyInputs.length==0) {
        elForm.addEventListener("submit",()=>{
            infoAlert("Request sending....");
            let objFormData = new FormData(elForm);
            const requestObject = {
                name:objFormData.get("name").trim(),
                trim:objFormData.get("trim").trim(),
                generation:objFormData.get("generation").trim(),
                year:objFormData.get("year").trim(),
                country:objFormData.get("country").trim(),
                color:objFormData.get("color").trim(),
                colorName:objFormData.get("colorName").trim(),
                category:objFormData.get("category").trim(),
                doorCount:objFormData.get("doorCount").trim(),
                seatCount:objFormData.get("seatCount").trim(),
                maxSpeed:objFormData.get("maxSpeed").trim()+" km/h",
                acceleration:"0-100 km/h: "+objFormData.get("acceleration").trim()+"s",
                engine:objFormData.get("engine").trim(),
                horsepower:objFormData.get("horsepower").trim(),
                description:objFormData.get("description").trim(),
                fuelType:objFormData.get("fuelType").trim(),
                fuelConsumption: {
                    city: objFormData.get("cityConsumption").trim()+" L/100km",
                    highway: objFormData.get("highwayConsumption").trim()+" L/100km",
                    combined: objFormData.get("combinedConsumption").trim()+" L/100km"
                }
            };
            elForm.querySelectorAll("input, textarea").forEach(el=>el.disabled=true);
            fetch("https://json-api.uz/api/project/fn44-amaliyot/cars",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(requestObject)
            }).
            then(res=>{
                if(res.ok) {
                    successAlert("Car added successfuly!");
                    elForm.querySelectorAll("input, textarea").forEach(el=>el.disabled=false);
                    elForm.querySelectorAll("input, textarea").forEach(el=>el.value='');
                } else if(!(res.ok)){                
                    errorAlert("Error... try again.");
                    elForm.querySelectorAll("input, textarea").forEach(el=>el.disabled=false);
                }
            }).catch(()=>{
                errorAlert("Error... try again.");
                elForm.querySelectorAll("input, textarea").forEach(el=>el.disabled=false);
            })
        })
    }
}) 