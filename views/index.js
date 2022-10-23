const name = document.getElementById("input-name");
const email = document.getElementById("input-email");
const phone = document.getElementById("input-phone");

const btn = document.getElementById("btnid");
btn.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("hello");
  const obj = {
    name: name.value,
    email: email.value,
    phone: phone.value,
  };
  console.log(obj);
  axios
    .post("http://localhost:3000/details", obj)
    .then((response) => {
      showListofRegisteredUser(response.data.data);
      console.log(response);
    })
    .catch((err) => {
      document.body.innerHTML =
        document.body.innerHTML + "<h4>something went wrong </h4>";
      console.log(err);
    });
  //localStorage.setItem(obj.description,JSON.stringify(obj))

  //clear fields
  name.value = "";
  email.value = "";
  phone.value = "";
});
function showListofRegisteredUser(user) {
  const parentNode = document.getElementById("userlist");
  const createNewUserHtml = `<li id='${user.id}'>${user.name} - ${user.email} - ${user.phone}
                                        <button onclick=deleteUser('${user.id}')>Delete</button>
                                        <button onclick=EditUser('${user.name}','${user.email}','${user.phone}','${user.id}')>Edit</button>
                                    </li>`;
  console.log(createNewUserHtml);
  parentNode.innerHTML = parentNode.innerHTML + createNewUserHtml;
  console.log(parentNode.innerHTML);
}
window.addEventListener("DOMContentLoaded", (e) => {
  e.preventDefault();
  axios
    .get("http://localhost:3000/userinfo")
    .then((response) => {
      console.log(response);
      for (let i = 0; i < response.data.response.length; i++) {
        let name = response.data.response[i].name;
        let email = response.data.response[i].email;
        let phone = response.data.response[i].phone;
        let id = response.data.response[i].id;

        const parentNode = document.getElementById("userlist");
        const createNewUserHtml = `<li id='${id}'>${name} - ${email} - ${phone}
                                        <button onclick=deleteUser('${id}')>Delete</button>
                                        <button onclick=EditUser('${name}','${email}','${phone}','${id}')>Edit</button>
                                    </li>`;
        //console.log(createNewUserHtml)
        parentNode.innerHTML = parentNode.innerHTML + createNewUserHtml;
        //  console.log(parentNode.innerHTML)
        // console.log();
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

function deleteUser(userid) {
  axios
    .delete(`http://localhost:3000/del/${userid}`)

    .then((response) => removeItemFromScreen(userid))
    // console.log(response))
    .catch((err) => console.log(err));
}

function removeItemFromScreen(userid) {
  const parentNode = document.getElementById("userlist");
  const elem = document.getElementById(userid);
  parentNode.removeChild(elem);
}

function EditUser(name, email, phone, id) {
  document.getElementById("input-name").value = name;
  document.getElementById("input-email").value = email;
  document.getElementById("input-phone").value = phone;

  deleteUser(id);
}
