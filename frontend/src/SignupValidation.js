function validation(formValues){
    let error ={}
    const email_pattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern =/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(a-zA-Z0-9){5,}$/

    if(formValues.name===""){
        error.name="Name should not be empty"
    }
    else{
        error.name=""
    }

    if(formValues.email===""){
        error.email="Name should not be empty"
    }
    else if(!email_pattern.test(formValues.email)){
        error.email="Email Didn't Match"
    }
    else{
        error.email=""
    }
    if(formValues.password===""){
        error.password="Password should not be empty"
    }
    // else if(!password_pattern.test(formValues.password)){
    //     error.password="Password didn't match"
    // }
    else if(formValues.password.length <5){
        error.password="Password Must be more than 5 characters"
    }
    else{
        error.password=""
    }
    return error;
}

export default validation