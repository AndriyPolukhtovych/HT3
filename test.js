const axios = require ('axios')
const { expect } = require("chai")
const fs = require('fs');
const FormData = require('form-data');


describe("api",()=>{

   
       
        it('POST request adds data', async () => {
          const data = { "id": 2,
          username: "test1",
          firstName: "test2",
          lastName: "test3",
          email: "a@c.com",
          password: "123",
          phone: "547",
          userStatus: 2 };
          const response = await axios.post('https:petstore.swagger.io/v2/user', data);
          
          expect(response.status).to.equal(200);
          });

        it('Verify that allows login as a User', async () => {
          const response = await axios.get('https://petstore.swagger.io/v2/user/login?username=test1&password=123');
                    
          expect(response.data.message).to.contain('logged in user session');
          
        });

        it('Verify that allows creating the list of Users', async () => {
          const data = [{ "id": 2,
          username: "test1",
          firstName: "test2",
          lastName: "test3",
          email: "a@c.com",
          password: "123",
          phone: "547",
          userStatus: 2 }];
          const response = await axios.post('https:petstore.swagger.io/v2/user/createWithArray', data);
          
          expect(response.status).to.equal(200);
          
          
        });

        it('Verify that allows Log out User', async () => {
          const response = await axios.get('https://petstore.swagger.io/v2/user/logout');
          
          expect(response.status).to.equal(200);
          
        });

        it('Verify that allows adding a new Pet', async () => {
          const data = {
            "id": 1234,
            "category": {
              "id": 0,
              "name": "string"
            },
            "name": "doggie",
            "photoUrls": [
              "string"
            ],
            "tags": [
              {
                "id": 0,
                "name": "string"
              }
            ],
            "status": "available"
          }
          const response = await axios.post('https:petstore.swagger.io/v2/pet', data);
          
          expect(response.status).to.equal(200);
          });

          it('POST request adds data', async () => {
            const file= 'pexels.jpg';
            
            const formData = new FormData();
            formData.append('file', fs.createReadStream(file));
           
            const data1 = {
              "id": 534433,
              "category": {
                "id": 3,
                "name": "string"
              },
              "name": "doggie",
              "photoUrls": [
                "string"
              ],
              "tags": [
                {
                  "id": 0,
                  "name": "string"
                }
              ],
              "status": "available"
            }
            const responsePet = await axios.post('https:petstore.swagger.io/v2/pet', data1);
            const id= responsePet.data.id
           
           

            const response = await axios.post(`https://petstore.swagger.io/v2/pet/${id}/uploadImage`, formData,
              {headers: {
                   'Content-Type': 'multipart/form-data',
                   'api_key': 'special-key',
            }});
            //console.log(response.data)
           
            expect(response.status).to.equal(200);
            expect(response.data.message).to.contain('pexels.jpg')
            });

          it('Verify that allows updating Pet’s name and status', async () => {
            const data = {
              "id": 0,
              "category": {
                "id": 0,
                "name": "string"
              },
              "name": "doggie",
              "photoUrls": [
                "string"
              ],
              "tags": [
                {
                  "id": 0,
                  "name": "new"
                }
              ],
              "status": "available"
            }
            const response = await axios.post('https:petstore.swagger.io/v2/pet', data);
            const name=response.data.name;
            const status= response.data.status;
            const data1 = {
              "id": 0,
              "category": {
                "id": 0,
                "name": "string"
              },
              "name": "Newdoggie",
              "photoUrls": [
                "string"
              ],
              "tags": [
                {
                  "id": 0,
                  "name": "new"
                }
              ],
              "status": "another"
            }
            const response1 = await axios.put('https:petstore.swagger.io/v2/pet', data1);
            const newName=response1.data.name;
            const newStatus=response1.data.status

            expect(name).not.to.equal(newName);
            expect(status).not.to.equal(newStatus);
            });

            it('Verify that allows deleting Pet ', async () => {
              const data = {
                "id": 15645544554,
                "category": {
                  "id": 2,
                  "name": "a"
                },
                "name": "Newdoggie",
                "photoUrls": [
                  "string"
                ],
                "tags": [
                  {
                    "id": 3,
                    "name": "b"
                  }
                ],
                "status": "available"
              }
             const headers= {
                'api_key': 'special-key'
               }
              const response = await axios.post('https://petstore.swagger.io/v2/pet', data,headers);
              const id=response.data.id;
              
              const response1= await axios.delete(`https://petstore.swagger.io/v2/pet/${id}`)
              
              expect(response1.status).to.equal(200);
             
            });
})