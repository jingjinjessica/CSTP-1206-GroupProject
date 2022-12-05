let user = {};

const setEmail = (event) => {
  user.email = event.target.value;
};

const setPassword = (event) => {
  user.password = event.target.value;
};

const submitLoginForm = async (event) => {
  event.preventDefault();
  //console.log(user);

  try {
    const response = await fetch("/api/v1/users/login", {
      method: "post",
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json",
      },
    });
    if (response) {
      console.log("login successful");
      window.location.href = "/dashboard.html";
    }
  } catch (error) {
    console.log(error);
  }
  console.log(response);
};
