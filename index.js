const loginBtn = document.getElementById("loginBtn")
const email = document.getElementById("email")

console.log(loginBtn);
loginBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const data = {
        userEmail: email.value,
        apikey: 'e1a680da-cb68-4890-8622-6053649807a6',
        redirectUrl: 'https://developersahil.tech'
    }
    console.log(data);
    try {
        const response = await fetch('http://localhost:3000/sendotp', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            }
        })
        const jsonData = await response.json();
        console.log(jsonData)
        const redirectUrl = jsonData.redirectTo
        console.log(redirectUrl);
        window.location.replace(redirectUrl);
    }
    catch (error) {
        console.log(error);
    }

})