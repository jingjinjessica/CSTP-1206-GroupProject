
let user = {};
let baseUrl = "/api/v1";

function addUploadListener(){
    document.getElementById("myImage").addEventListener('change', (e) =>{
        let reader = new FileReader();
        reader.onload = (e1) =>{
            let imgObj = document.getElementById("mypic");
            imgObj.src = e1.target.result;
            let hiddenImage = new Image();
            hiddenImage.onload = (e) =>{
                let orgWidth = hiddenImage.width;
                let orgHeight = hiddenImage.height;
                if (orgWidth > orgHeight){
                    let r = 300 / orgWidth ;
                    orgHeight = orgHeight * r;
                    orgWidth = 300;
                }
                else{
                    let r = 300 / orgHeight ;
                    orgWidth = orgWidth * r;
                    orgHeight = 300;
                }
                const c = document.getElementById("c");
                const ctx = c.getContext('2d');
                c.width = 300;
                c.height = 300;
                ctx.drawImage(hiddenImage, 0, 0, hiddenImage.width, hiddenImage.height,0,0, orgWidth,orgHeight);
                const hidden = document.getElementById("imageData")
                hidden.value = c.toDataURL("image/png");
            }
            hiddenImage.src = e1.target.result;
          }
          reader.readAsDataURL(e.target.files[0]);
    });
}

function loadProfile(){
    const curUser = JSON.parse(localStorage.getItem("user"));
    setElementValue("InputUsername", curUser.name);
    setElementValue("InputEmail", curUser.email);
    // setElementValue("userName",curUser.name);
    user = curUser;
    user.password = "";
}


function setElementValue(id, value){
    document.getElementById(id).value = value;
}



const setUsername = (event) => {
  user.name = event.target.value;
};

const setEmail = (event) => {
  user.email = event.target.value;
};

const setPassword = (event) => {
  user.password = event.target.value;
};


const submitProfileForm = async (event) => {
    event.preventDefault();
    //console.log(user);
    if(user.password && user.password !== document.getElementById("InputPassword2").value&&document.getElementById("InputPassword1").value){
        alert("The new password does not match confirmed password, please try again");
        return false;
    }
    const hidden = document.getElementById("imageData");
    if(hidden.value){
        user.avatar = hidden.value;
    }

    console.info(user);
    
    try {
      const response = await fetch(`${baseUrl}/editprofile`, {
           method: "post",
           body: JSON.stringify(user),
           headers: {
               'Content-Type': 'application/json'
           },
       })
  
       const finalIncomingResponse = await response.json();
  
       // We have to fix this 
       if (finalIncomingResponse.accessToken) {
           // This is for saving user object in the browser storage
           localStorage.setItem("user", JSON.stringify(finalIncomingResponse.data));
  
           // This is for storing access token in the browser storage
           localStorage.setItem("access-token", JSON.stringify(finalIncomingResponse.accessToken));
           window.location.href = "/dashboard.html";
       } else {
           alert(finalIncomingResponse.message);
       }
        } catch(error) {
            console.log(error);
        }
    };
  