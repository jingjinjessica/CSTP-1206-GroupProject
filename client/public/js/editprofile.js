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