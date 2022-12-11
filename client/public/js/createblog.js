let newPost = {};

const getUser = JSON.parse(localStorage.getItem("user"));

const username = document.querySelector("#username");
username.innerHTML = `Hi ${getUser.name}`;

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
  newPost.photo = event.targe.value;
<<<<<<< HEAD
}

// const getUser = JSON.parse(localStorage.getItem("user"));

// const username = document.querySelector("#username");
// username.innerHTML = `Hello ${getUser.name}`;

=======
};
>>>>>>> 8c751cde115264e5daf2fdf353c8f85f289e48d5

const submitPost = async (event) => {
  event.preventDefault();
  try {
    if (blogId) {
      const response = await fetch(`/api/v1/posts/${blogId}`, {
        method: "put",
        body: JSON.stringify(newPost),
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("acess-token")
          )}`,
        },
      });
    } else {
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
    }

    console.log("api");
    window.location.href = "/";
  } catch (error) {
    console.log(error);
  }
  // } else {
  //   alert("Password doesn't match.");
  // }
};

let baseUrl = "/api/v1";

const url = new URL(window.location.href);
const blogId = url.searchParams.get("blogid");
async function loadBlog() {
  if (blogId) {
    const response = await fetch(`${baseUrl}/posts/${blogId}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const blog = await response.json();

    document.getElementById("title").value = blog.title;
    document.getElementById("description").value = blog.desc;
    newPost = blog;
  }
}
