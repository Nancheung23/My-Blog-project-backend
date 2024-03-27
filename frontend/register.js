const baseURL = "http://127.0.0.1:3000"
// select all inputs
let formIpt = document.querySelectorAll('.form-control')

let headImgUrl
// solve upload
const fetchUpload = async (uploadAPI, file) => {
    try {
        let formData = new FormData()
        formData.append('img', file)
        // why here auto refresh ???
        const response = await fetch(uploadAPI, {
            method: 'POST',
            body: formData
        })
        if (!response.ok) {
            throw new Error(`HTTP Error, status : ${response.status}`)
        }
        const data = await response.json()
        headImgUrl = data.data
    } catch (error) {
        console.log(error);
    }
}

// upload headImg
formIpt[3].addEventListener('change', async (e) => {
    console.log('before');
    e.preventDefault()
    console.log('after');
    let file = e.target.files[0]
    console.log(file)
    let uploadAPI = `${baseURL}/api/upload`
    await fetchUpload(uploadAPI, file)
})

// const fetchRegister = async (url, info) => {
//     try {
//         const response = await fetch(url, {
//             method: 'POST',
//             headers: {
//                 'Content-type': 'application/json',
//                 'Accept': 'application/json',
//             },
//             body: JSON.stringify(info)
//         })
//         if (!response.ok) {
//             throw new Error(`HTTP Error, status : ${response.status}`)
//         }
//         return await response.json()
//     } catch (error) {
//         console.log(error);
//     }
// }

// // solve submit register
// const regForm = document.querySelector('.reg-form')
// regForm.addEventListener('submit', async (e) => {
//     e.preventDefault()
//     // upload info
//     let username = formIpt[0].value
//     let nickname = formIpt[1].value
//     let password = formIpt[2].value

//     let response = await fetchRegister(`${baseURL}/api/users`, { username, nickname, password, headImgUrl })
//     console.log(response);
//     layer.msg(response.data.msg)
//     if (response.data.code == 1) {
//         setTimeout(() => {
//             location.href = './login.html'
//         }, 1000)
//     }
// })
