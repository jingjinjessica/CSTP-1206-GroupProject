function loadProfileAvatar(){
    const curUser = JSON.parse(localStorage.getItem("user"));
    document.getElementById("profile-image").src = curUser.avatar?curUser.avatar:"./image/user-photo.jpg";
    setElementValue("userName",curUser.name);
    user = curUser;
  
}

function setElementValue(id, value){
    document.getElementById(id).value = value;
}

const logout = () => {
    // Ideally we should another API for loging the user out, so that we can destroy the access-token
  
    alert("Succesfully logged out!");
    localStorage.removeItem("access-token");
    localStorage.removeItem("user");
  
    window.location.href = "/index.html";
  };
