import { 
    createUser, 
    logIn, 
    logInGoogle, 
    logInFacebook, 
    currentUser, 
    deleteCurrentUser,
    updateCurrentUser
} from "./firebase.js";

const form_registration = document.getElementById('form-registration');
const form_login = document.getElementById('form-login');
const btn_google = document.getElementById('btn-google');
const btn_facebook = document.getElementById('btn-facebook');
const current_user = document.getElementById('current-user');
const delete_current_user = document.getElementById('delete-current-user');
const update_current_user = document.getElementById('update-current-user')


if(form_registration !== null){
    form_registration.addEventListener('submit',async (e)=>{
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const {error,data} = await createUser(email,password);

        if(error){
            switch(data.code){
                case 'auth/email-already-in-use': alert('Correo registrado')
                break;
                case 'auth/weak-password': alert('Contraseña debe ser de mínimo 6 caracteres');
                break;
                default:
                    alert('ERROR')
                break;
            }
        }else{
            alert('Usuaro registrado correctamente');
            window.location.href = '/login.html'
        }
    })
}

if(form_login !== null){
    form_login.addEventListener('submit', async (e)=>{
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const {error,data} = await logIn(email,password);
        console.log(error, data)
        if(error){
            switch(data.code){
                case 'auth/wrong-password': alert('Contraseña incorrecta');
                break;
                case 'auth/user-not-found': alert('Correo no registrado');
                break;
                default: alert('ERROR s');
                break;
            }
        }else{
            localStorage.setItem('user',JSON.stringify({email:data.email,uid:data.uid}))
            window.location.href = "/chat.html"
        }
    })
}

if(btn_google !== null){
    btn_google.addEventListener('click', async(e)=>{
        const {error,data} = await logInGoogle();
        console.log(error, data)    
        if(error){
            console.log(error)
            alert('ERROR');
        }else{
            // localStorage.setItem('user',JSON.stringify({email:data.email,uid:data.uid}))
            // window.location.href = "/chat.html"
        }
    })
}

if(btn_facebook !== null){
    btn_facebook.addEventListener('click', async(e)=>{
        const {error,data} = await logInFacebook();
        console.log(error,data)
        if(error){
            console.log(error)
            alert('ERROR');
        }else{
            console.log(data)
            // localStorage.setItem('user',JSON.stringify({email:data.email,uid:data.uid}))
            // window.location.href = "/chat.html"
        }
    })
}

if (current_user !== null){
    current_user.addEventListener('click', () => {
        console.log(currentUser());
    })
}

if(delete_current_user !== null){
    delete_current_user.addEventListener('click', async () => {
        const {error,data} = await deleteCurrentUser();
        console.log(error,data)
        if(error){
            console.log(error)
            alert('ERROR');
        }else{
            console.log(data)
            // localStorage.setItem('user',JSON.stringify({email:data.email,uid:data.uid}))
            // window.location.href = "/chat.html"
        }
    })
}

if(update_current_user !== null){
    update_current_user.addEventListener('click', async () => {
        const {error,data} = await updateCurrentUser();
        console.log(error,data)
        if(error){
            console.log(error)
            alert('ERROR');
        }else{
            console.log(data)
            // localStorage.setItem('user',JSON.stringify({email:data.email,uid:data.uid}))
            // window.location.href = "/chat.html"
        }
    })
}