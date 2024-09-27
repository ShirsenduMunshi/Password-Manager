//test the script

console.log("Working")

// adding event to the burger

document.querySelector(".burger").addEventListener('click', () => {
    document.querySelector(".sidebar").classList.toggle("left-0");
})

//marks pass

function maskPassword(pass){
    let str = ""
    for (let index = 0; index < pass.length; index++) {
        str  += "*"
    }
    return str
}

//delete button

const deletePassword = (website) => {
    let data = localStorage.getItem("passwords")
    arr = JSON.parse(data)
    arrUpdated = arr.filter((e) => {
        return e.website != website
    })
    localStorage.setItem("passwords", JSON.stringify(arrUpdated))
    alert(`Successfully deleted ${website}'s Password`)
    showPassword()
}

//Copy the text

function copyText(txt) {
    navigator.clipboard.writeText(txt).then(() => {
            // alert("copied the text: " + txt)
            document.getElementById("alart").style.display = "inline"
            setTimeout(()=>{
                document.getElementById("alart").style.display = "none"
            },2000);

        },
        () => {
            /* clipboard write failed */
            alert("Clipboard copying failed")
        },
    );
}

//filling the table

const showPassword = () => {
    let tb = document.querySelector("table")
    let data = localStorage.getItem("passwords")

    if (data == null || JSON.parse(data).length == 0) {
        tb.innerHTML = `<h3 class="warning-massage my-3">No Data To Show!!!</h3>`
    }

    else {
        tb.innerHTML = `<tr>
    <th>Website Name</th>
    <th>Username</th>
    <th>Password</th>
    <th>Delete</th>
</tr>`
        let arr = JSON.parse(data);
        let str = "";
        for (let index = 0; index < arr.length; index++) {
            const element = arr[index];

            str += `
    <tr>
    <td>${element.website} <img src="./copy.svg" class="square" onclick="copyText('${element.website}')" alt=""></td>
    <td>${element.username} <img src="./copy.svg" class="square" onclick="copyText('${element.username}')" alt=""></td>
    <td>${maskPassword(element.password)} <img src="./copy.svg" class="square" onclick="copyText('${element.password}')"alt=""></td>
    <td><button class="btn" onclick="deletePassword('${element.website}')">
    <img src="./delete.svg" alt="Delete">
    </button></td>
    </tr>
    `
        }
        tb.innerHTML = tb.innerHTML + str
    }
    website.value = ""
    username.value = ""
    password.value = ""
}
//main working code
showPassword()
submit.addEventListener('click', (e) => {
    e.preventDefault()
    console.log('Clicked...')
    console.log(username.value, password.value)
    let passwords = localStorage.getItem("passwords")
    console.log(passwords)
    if (passwords == null) {
        let jeson = []
        jeson.push({ username: username.value, password: password.value, website: website.value })
        alert("Password Saved")
        localStorage.setItem("passwords", JSON.stringify(jeson))
    }
    else {
        let json = JSON.parse(localStorage.getItem("passwords"))
        json.push({ username: username.value, password: password.value, website: website.value })
        alert("Password Saved")
        localStorage.setItem("passwords", JSON.stringify(json))
    }
    showPassword()
})