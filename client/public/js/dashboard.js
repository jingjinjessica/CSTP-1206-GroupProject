// (function isNotLoggedIN() {
//   let accessToken = JSON.parse(localStorage.getItem("access-token"));

//   if (!accessToken) {
//     alert("You are not logged in, so please login");
//     window.location.href = "/index.html";
//   }
// })();

// const showListOfPosts = async () => {
//   const response = await fetch("/api/v1/posts");
//   const finalOutput = await response.json();

//   const getPostView = document.querySelector("#postsview");

//   for (let i = 0; i < finalOutput.data.length; i++) {

//     // let row = document.createElement("div");
//     // row.classList.add("row");
//     let column = document.createElement("div");
//     column.classList.add("col-md-4");
//     let card = document.createElement("div");
//     card.classList.add("card");

//     let cardImg = document.createElement("img");
//     cardImg.classList.add("card-img-top");
//     let cardBody = document.createElement("div");
//     cardBody.classList.add("card-body");
//     let cardTitle = document.createElement("h5");
//     cardTitle.classList.add("card-title");
//     let cardCategory = document.createElement("span");
//     cardCategory.classList.add("card-category");
//     let cardDate = document.createElement("label");
//     cardDate.classList.add("card-date");
//     let dateIcon = document.createElement("img");
//     dateIcon.classList.add("date-icon");
//     dateIcon.setAttribute("src", "./image/icon-calendar.png");
//     let nextLine = document.createElement("br");
    
//     column.appendChild(card);
//     card.appendChild(cardImg);
//     const imgLink = document.createElement("a");
//     imgLink.classList.add("img-link");
//     imgLink.setAttribute("href", `/${finalOutput.data[i]._id}`);
//     cardImg.setAttribute("src", finalOutput.data[i].photo);
//     cardImg.setAttribute("width", 200);
//     cardImg.setAttribute("height", 250);
//     cardImg.appendChild(imgLink);
//     card.appendChild(cardBody);
//     cardBody.appendChild(cardTitle);
//     cardTitle.textContent = finalOutput.data[i].title;
//     cardBody.appendChild(cardCategory);
//     cardCategory.textContent = finalOutput.data[i].categories;
//     cardBody.appendChild(nextLine);

//     const date = new Date(finalOutput.data[i].createdAt);
//     const dateFormat =
//       "Create date: " +
//       date.getFullYear() +
//       "-" +
//       (date.getMonth() + 1) +
//       "-" +
//       date.getDate();
//     cardBody.appendChild(cardDate);
//     cardDate.appendChild(dateIcon);
//     cardDate.textContent = dateFormat;

//     getPostView.appendChild(column);
//   }
// };


//showListOfPosts();









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

    getPostView.appendChild(div);
  }
};

showListOfPosts();

// const logout = () => {
//   // Ideally we should another API for loging the user out, so that we can destroy the access-token

//   alert("Succesfully logged out!");
//   localStorage.removeItem("access-token");
//   localStorage.removeItem("user");

//   window.location.href = "/index.html";
// };

