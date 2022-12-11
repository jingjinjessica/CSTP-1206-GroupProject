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

const submitPost = async (event) => {
  event.preventDefault();
  try {
    const response = await fetch("/api/v1/posts/create", {
      method: "post",
      body: JSON.stringify(newPost),
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("acess-token")
        )}`,
      },
    });
    console.log("api");
    window.location.href = "/";
  } catch (error) {
    console.log(error);
  }
  // } else {
  //   alert("Password doesn't match.");
  // }
};
