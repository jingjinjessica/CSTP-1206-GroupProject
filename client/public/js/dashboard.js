(function isNotLoggedIN() {
  let accessToken = JSON.parse(localStorage.getItem("access-token"));

  if (!accessToken) {
    alert("You are not logged in, so please login");
    window.location.href = "/index.html";
  }
})();

const getUser = JSON.parse(localStorage.getItem("user"));

const username = document.querySelector("#username");
username.innerHTML = `Hello ${getUser.name}`;

const showListOfPosts = async () => {
  const response = await fetch("/api/v1/posts");
  const finalOutput = await response.json();

  const getPostView = document.querySelector("#postsview");

  for (let i = 0; i < finalOutput.data.length; i++) {
    const div = document.createElement("div");
    div.classList.add("card");

    const h3 = document.createElement("h3");
    h3.textContent = finalOutput.data[i].title;

    div.appendChild(h3);

    const h4 = document.createElement("h4");
    h4.textContent = finalOutput.data[i].categories;

    div.appendChild(h4);

    const p = document.createElement("p");
    p.textContent = finalOutput.data[i].desc;

    div.appendChild(p);

    console.log(div);

    getPostView.appendChild(div);
  }
};

showListOfPosts();

const logout = () => {
  // Ideally we should another API for loging the user out, so that we can destroy the access-token

  alert("Succesfully logged out!");
  localStorage.removeItem("access-token");
  localStorage.removeItem("user");

  window.location.href = "/index.html";
};
