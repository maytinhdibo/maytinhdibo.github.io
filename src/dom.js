export const alertAtHome = ()=>{
    document.getElementById('alert').style.width = '350px';
    document.getElementById('alert').style.bottom = '-100px';
}
export const alertText = (text,auto)=>{
    document.getElementById("alert").innerHTML = text;
    document.getElementById("alert").style.bottom = 0;
    if(auto){
        setTimeout("document.getElementById('alert').style.bottom = '-100px'", 3000);
    }
}
export const offalertText = (text)=>{
    document.getElementById('alert').style.bottom = '-100px';
}