export const validateEmail=(email:string)=>{
    // const emailRegex=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
        const emailRegex = /^[\w.-]+@gmail\.com$/.test(email);
    
    if(!emailRegex){
        return {errMessage:"Email ID is not valid",name:"Email"}
    }
    return null
    }


export const validatePassword=(password:string)=>{
    const passwordValidate=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(password)
    if(!passwordValidate){
        return {errMessage:"Password is not valid.",name:"Password"};
    }
    return null
}

export const validatePhoneNumber = (phone: string) => {
  const phoneRegex = /^\+?[1-9]\d{0,2}[-.\s]?(\(?\d{1,4}\)?)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(phone);

  if (!phoneRegex) {
    return {
      errMessage: "Phone number is invalid. Please enter a valid phone number.",
      name: "Phone_number",
    };
  }
  return null;
};


export const validateAddress=(address:string)=>{
    
  const addressRegex = /^[a-zA-Z0-9.,'!?$%()\-\n ]{5,25}$/.test(address);
  if(!addressRegex){
      return {errMessage:"Address must be between 5 and 25 characters.",name:"Description"};
  }
  return null
}

export const validateDescription=(description:string)=>{
    
  const descriptionRegex = /^[a-zA-Z0-9.,'!?$%()\-\n ]{10,500}$/.test(description);
  if(!descriptionRegex){
      return {errMessage:"Description must be between 10 and 500 characters and can include letters, numbers, and basic punctuation.",name:"Description"};
  }
  return null
}
export const validateFullName = (name: string) => {
    const nameRegex = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/.test(name);
  
    if (!nameRegex) {
      return {
        errMessage:
          "Name must be 2 to 30 characters long, only contain letters and spaces, and should not have consecutive spaces.",
        name: "Full_name",
      };
    }
    return null;
  };