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