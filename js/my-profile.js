const img = document.querySelector('.profImage');
const fName = document.querySelector('#fName');
const sName = document.querySelector('#sName');
const surname = document.querySelector('#surname');
const sSurname = document.querySelector('#sSurname');
const contact = document.querySelector('#contact');
const email = document.querySelector('#mail')
const upload = document.querySelector('#upload');
const saveBtn = document.querySelector('.saveBtn');
const campos = document.querySelector('.campos');

let url = "";
let profile = {
    profile_fName: "",
    profile_sName: "",
    profile_surname: "",
    profile_sSurname: "",
    profile_email: "",
    profile_contact: "",
    profile_image: "img/img_perfil.png",
};

const saveLocalProfile = ()=>{localStorage.setItem('profile', JSON.stringify(profile))}
const getLocalProfile = ()=>{return(JSON.parse(localStorage.getItem('profile')))}
const getUser = ()=>{return(localStorage.getItem('user'))}

document.addEventListener('DOMContentLoaded',()=>{
    if(localStorage.getItem('profile')!=null){
        profile = getLocalProfile()
        savedInputs()
    }else {img.src = "img/img_perfil.png"; email.value = getUser();}
})

function savedInputs() {
    fName.value = profile.profile_fName
    sName.value = profile.profile_sName
    surname.value = profile.profile_surname
    sSurname.value = profile.profile_sSurname
    email.value = profile.profile_email
    contact.value = profile.profile_contact
    img.src = profile.profile_image
}

/* fName sName surname sSurname mail contacto */
function saveChanges() {
    if (fName.value ===""){
        fName.classList.add('border-danger')
    }else{fName.classList.remove('border-danger')}
    if (surname.value ===""){
        surname.classList.add('border-danger')
    }else{surname.classList.remove('border-danger')}
    if (contact.value ===""){
        contact.classList.add('border-danger')
    }else{contact.classList.remove('border-danger')}

    if(fName.value!="" && surname.value!="" && contact.value!=""){
        saveProfile()
    }

}

function saveProfile() {
    if (fName.value!="") {
        profile.profile_fName = fName.value
    }
    if (sName.value!="") {
        profile.profile_sName = sName.value
    }
    if (surname.value!="") {
        profile.profile_surname = surname.value
    }
    if (sSurname.value!="") {
        profile.profile_sSurname = sSurname.value
    }
    if (email.value!="") {
        profile.profile_email = email.value
    }
    if (contact.value!="") {
        profile.profile_contact = contact.value
    }
    if (profile.profile_image != url && url != "") {
        profile.profile_image = url
    }
    saveLocalProfile()
}


upload.addEventListener('change', ()=>{
    const fr = new FileReader();
    fr.readAsDataURL(upload.files[0]);

    fr.addEventListener('load', ()=>{
        url = fr.result;
        img.src = url
        profile.profile_image = url
        saveLocalProfile()
    });
})
