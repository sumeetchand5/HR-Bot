 axios =require('axios'); 

axios.post('https://vodafoneleaveapi.herokuapp.com/api/login',{
    "emp_id" : "240",
    "password" : "qebzwK"
  }).then( (res) => {
    token = res.data; 
      axios.post('https://vodafoneleaveapi.herokuapp.com/api/me',{
        "token" : token ,
        "man_id" : "0",
        "emp_id" : "240"
      }).then(resp => {
        resp.data.token = token; 
        console.log(token)
        data = JSON.stringify(resp.data); 
        data2 = JSON.parse(data); 
        console.log(data2[0].emp_id); 
       }).catch(err => {
         console.log(err); 
        return err
      })
}).catch(err => err)

