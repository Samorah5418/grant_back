// const nodeMailer = require('nodemailer');
// const fs = require('fs')
// const email = 'companychris22@gmail.com'
// const User = require('./models/user');
// const finder = async () => {
//     const find = await User.find({username: 'companychris22@gmail.com'})
//     console.log(find)
// }

// finder()



// const findUser =  async () => {
//     console.log('hello world')
//     const mail = await User.find({username: 'companychris22@gmail.com'})
//     console.log(maill)
//     console.log(await User.find({username: 'companychris22@gmail.com'}))

// const mailSender = nodeMailer.createTransport({
//     service: "gmail",
//     auth: {
//         user: "falade.okikijesu1@gmail.com",
//         pass: "aqwbnmdxkhwayidy"
//     }
// })

// let details = {
//     from: "falade.okikijesu1@gmail.com",
//     to: mail.username,
//     subject: "new grant email",
//     // text: "this is me learning the email sender for the grant project im working on"
//     html: fs.readFileSync('emailtext.txt', 'utf8')
// }


// mailSender.sendMail(details, (err) => {
//     if(err) {
//         console.log('this is the eroor', err)
//     } else {
//         console.log('email')
//     }
// })
// }

// findUser()