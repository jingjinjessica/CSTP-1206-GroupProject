(function isNotLoggedIN() {
  let accessToken = JSON.parse(localStorage.getItem("access-token"));

  if (!accessToken) {
    alert("You are not logged in, so please login");
    window.location.href = "/index.html";
  }
})();

const getUser = JSON.parse(localStorage.getItem("user"));

const username = document.querySelector("#username");
username.innerHTML = `Hi ${getUser.name}`;

const showListOfPosts = async () => {
  const response = await fetch("/api/v1/posts");
  const finalOutput = await response.json();

  const getPostView = document.querySelector("#postsview");

  for (let i = 0; i < finalOutput.data.length; i++) {
    const div = document.createElement("div");
    div.classList.add("card");

    const imgLink = document.createElement("a");
    // imgLink.setAttribute("href", `/api/v1/posts/${finalOutput.data[i]._id}`);
    imgLink.setAttribute("href", `/${finalOutput.data[i]._id}`);
    const image = document.createElement("img");
    image.setAttribute("src", finalOutput.data[i].photo);

    imgLink.appendChild(image);
    div.appendChild(imgLink);

    const h2 = document.createElement("h2");
    h2.textContent = finalOutput.data[i].title;

    div.appendChild(h2);

    const h3 = document.createElement("h3");
    h3.textContent = finalOutput.data[i].categories;

    div.appendChild(h3);

    console.log(finalOutput.data[i].createdAt);
    const date = new Date(finalOutput.data[i].createdAt);
    const dateFormat =
      "Create date: " +
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1) +
      "-" +
      date.getDate();
    const p = document.createElement("h4");
    p.textContent = dateFormat;

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
