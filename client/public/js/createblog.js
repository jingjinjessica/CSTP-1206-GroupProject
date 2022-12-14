let newPost = {};

const setTitle = (event) => {
  newPost.title = event.target.value;
};

const setCategory = (event) => {
  newPost.categories = event.target.value;
};

const setDesc = (event) => {
  newPost.desc = event.target.value;
};

const setImage = (event) => {
  if (event.target.files && event.target.files[0]) {
    newPost.photo = event.target.files[0];

    //create a url from selected image pass it to imagePreview src
    const imageURl = URL.createObjectURL(event.target.files[0]);
    console.log("this is imageurl", imageURl);
    imagePreview.src = imageURl;
  }
};


const submitPost = async (event) => {
  event.preventDefault();
  try {
    //create form data to upload image
    const formData = new FormData();
    formData.append("image", newPost.photo);

    //guard against empty input fields
    if (
      !newPost.title ||
      !newPost.categories ||
      !newPost.desc ||
      !newPost.photo
    ) {
      alert("Please fill all the fields");
      return;
    }

    //upload image to cloudinary
    const { url: imageURl } = await fetch("/api/v1/posts/image/upload", {
      method: "post",
      body: formData,
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("access-token")
        )}`,
      },
    })
      .then(async (res) => {
        //throw error if image upload failed
        if (!res.ok) {
          const { message } = await res.json();
          throw new Error(message);
        }
        return res.json();
      })
      .catch((err) => console.log(err.message));

    if (typeof imageURl == "string") {
      //assign image url of cloudinary to new post photo
      newPost.photo = imageURl;
      console.log("this is newpost", newPost);
      await fetch("/api/v1/posts/create", {
        method: "post",
        body: JSON.stringify(newPost),
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("access-token")
          )}`,
        },
      });
      console.log("api");
      window.location.href = "/";
    }
  } catch (error) {
    console.log(error);
  }
 
};
