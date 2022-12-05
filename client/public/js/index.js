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

    const loginResponse = await response.json();

    if (loginResponse.accessToken) {
      // console.log("login successful");
      window.location.href = "./dashboard.html";
    } else {
      alert(loginResponse.message);
    }
  } catch (error) {
    console.log(error);
  }
};
