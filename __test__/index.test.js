
const request = require('supertest')

const app = require('../app.js')

describe("POST /users/register", ()=>{
    test("OK, Registration is succefull", async ()=>{
        const res = await request(app)
                          .post('/users/register')
                          .send({
                            "fname":"Kaveri",
                            "lname":"Water",
                            "email":"Kaveri123@gmail.com",
                            "password":"Kaveri123@gmail.com",
                            "role":"admin"
                          })
                    console.log(res);
                    expect(res.statusCode).toEqual(200)
    },10000)
})

describe("POST /users/login",()=>{
   test("OK, Login is Succefull", async ()=>{
       const res = await request(app)
                        .post('/users/login')
                        .send({
                            "email":"Kaveri@gmail.com",
                            "password":"Kaveri@gmail.com"
                        })
                   console.log(res);
                   expect(res.statusCode).toEqual(200)

   },10000)
})

describe("GET /products/products",()=>{
    var token= null;
    beforeEach((done)=>{
        request(app)
          .post('/users/login')
          .send({
            "email":"Kaveri@gmail.com",
            "password":"Kaveri@gmail.com"
          })
          .end((err,res)=>{
              token = res._body.data.token
              console.log(token);
              done()
          })
    })

    test("OK, Products getting done", async ()=>{
        const res = await request(app)
                          .get('/products/products')
                          .set("Authorization" , 'Bearer ' + token)
                    console.log(res);
                    expect(res.statusCode).toEqual(200)
    },20000)
})



