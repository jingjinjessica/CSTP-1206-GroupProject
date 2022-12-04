function validatePassword(checkEmpty=true){
    let pwd = document.getElementById("pwd").value;
    let cmpwd = document.getElementById("cmpwd").value;
    let userName = document.getElementById("username");
    let message = document.getElementById("message");
    if(userName === ""){
        return false;
    }
    if (pwd ==="" && cmpwd ==="" && !checkEmpty){
        return;
    }

    if (pwd !== cmpwd){
        message.innerText = "The passwords are not match.";
        return false;
    }

    if (pwd.length < 6){
        message.innerText = "The passwords at least 6 chars.";
        return false;
    }

    let specialChars = "_#$!%^<>?&*-+=(){}[]|:~@";
    let anyUpperCase = false;
    let anySpecialChar = false;
    for(let i = 0; i < pwd.length; i++){
        let c = pwd.charAt(i);
        if (c.charCodeAt(0) >= 65 && c.charCodeAt(0) <=90 ){
            anyUpperCase = true;
        }
        else if(specialChars.indexOf(c)>=0){
            anySpecialChar = true;
        }
    }
    if(!anyUpperCase){
        message.innerText = "The passwords at least 1 upper case char.";
        return false;
    }

    if(!anySpecialChar){
        message.innerText = "The passwords at least 1 special char as _#$!%^<>?&*-+=(){}[]|:~@";
        return false; 
    }
    return true;
}

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