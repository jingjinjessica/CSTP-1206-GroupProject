let user = {};

const setUsername = (event) => {
  user.name = event.target.value;
};

const setEmail = (event) => {
  user.email = event.target.value;
};

const setPassword = (event) => {
  user.password = event.target.value;
};

const setConfPassword = (event) => {
  user.password = event.target.value;
};

const submitRegisterForm = async (event) => {
  event.preventDefault();
  //console.log(user);

  // if (setPassword == setConfPassword) {
  try {
    const response = await fetch("/api/v1/users/register", {
      method: "post",
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json",
      },
    });
    if (response) {
      window.location.href = "/index.html";
    }
  } catch (error) {
    console.log(error);
  }
  // } else {
  //   alert("Password doesn't match.");
  // }
};
