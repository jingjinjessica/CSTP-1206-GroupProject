function loadProfileAvatar(){
    const curUser = JSON.parse(localStorage.getItem("user"));
    document.getElementById("profile-image").src = curUser.avatar?curUser.avatar:"./image/user-photo.jpg";
    document.getElementById("userName").value= curUser.name;
  
}

const logout = () => {
    // Ideally we should another API for loging the user out, so that we can destroy the access-token
  
    alert("Succesfully logged out!");
    localStorage.removeItem("access-token");
    localStorage.removeItem("user");
  
    window.location.href = "/index.html";
  };
