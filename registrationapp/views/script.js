//alert("clicked");
const button = document.getElementById("submit_data");
const button1 = document.getElementById("save_data");
const back_btn = document.getElementById("back_btn");
const Name = document.getElementById("name");
const email = document.getElementById("email");
const pwd = document.getElementById("pwd");
const cnfpwd = document.getElementById("cnfpwd");

// async function getData() {
//     const promise = await fetch(`http://localhost:3000/user/show`).then((resp) => {
//         if (!resp.ok)
//             console.log("There is no response from server:");
//         return resp.json();
//     }).then((datax) => {
//         document.getElementById("detail").innerHTML = datax.map((data) =>
//             `<tr>
//             <td>${data.name}</td>
//             <td>${data.email}</td>
//         </tr>`).join(" ");
//         console.log(datax);
//     }).catch((err) => console.log(err));
// }
// async function saveData() {
//     const data = { name: Name.value, email: email.value, password: pwd.value };
//     const promise = await fetch('http://localhost:3000/user/create',
//         {
//             method: "POST",
//             body: JSON.stringify(data),
//             headers: { 'content-type': 'application/json; charset=utf-8' }
//         }
//     ).then((resp) => resp.json()).then((datax) => {
//         console.log(datax);
//         alert(datax.message);
//         resetvalue();
//     }).catch((err) => console.log(err));

// }
// button.addEventListener('click', async () => {
//     // alert("clicked");
//     console.log(Name.value + " " + email.value);
//     const result = await getData();
//     console.log("Data " + result);
// });
// button1.addEventListener('click', async () => {
//     resetform();
//     if (formValidation() == true) {
//         const result = await saveData();
//         console.log("Data is saved " + result);
//     }

// });

function formValidation() {
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (Name.value == "") {
        resetform();
        let x = document.getElementById("name_error");
        x.innerHTML = "Name field must be required";
        return false;
    }
    else if (email.value == "") {
        resetform();
        let x = document.getElementById("email_error");
        x.innerHTML = "Email field must be required";
        return false;
    }
    else if (!email_pattern.test(email.value)) {
        resetform();
        let x = document.getElementById("email_error");
        x.innerHTML = "Incorrect format of email";
        return false;
    }
    else if (pwd.value == "") {
        resetform();
        let x = document.getElementById("pwd_error");
        x.innerHTML = "Password field must be required";
        return false;
    }
    else if (cnfpwd.value == "") {
        resetform();
        let x = document.getElementById("cnf_pwd_error");
        x.innerHTML = "Password field must be required";
        return false;
    }
    else if (cnfpwd.value != pwd.value) {
        resetform();
        let x = document.getElementById("pwd_error");
        let y = document.getElementById("cnf_pwd_error");
        x.innerHTML = "Field must be same";
        y.innerHTML = "Field must be same";
        return false;
    }
    else
    {
        resetform();
        return true;

    }
}
function resetform() {
    document.getElementById("name_error").innerHTML = "";
    document.getElementById("email_error").innerHTML = "";
    document.getElementById("pwd_error").innerHTML = "";
    document.getElementById("cnf_pwd_error").innerHTML = "";

}
function resetvalue() {
    Name.innerHTML = "";
    email.innerHTML = "";
    pwd.innerHTML = "";
    cnfpwd.innerHTML = "";
}
