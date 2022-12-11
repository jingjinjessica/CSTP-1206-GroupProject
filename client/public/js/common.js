function loadProfileAvatar(){
    const curUser = JSON.parse(localStorage.getItem("user"));
    document.getElementById("profile-image").src = curUser.avatar?curUser.avatar:"./image/user-photo.jpg";
    document.getElementById("userName").value= curUser.name;
  
}
