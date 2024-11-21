
export const loadState=()=>{
    try{
const serializedState=localStorage.getItem('reduxState')
if(serializedState==null){
    return undefined
}
return JSON.parse(serializedState)
    }catch(error){
console.error("Could not load the state", error)
    }
}

export const saveState=(state:any)=>{
    try{
        const serializedState=JSON.stringify(state)
           localStorage.setItem('reduxState',serializedState)
    }catch(error){
        console.error("Could not save the state",error)
    }
}