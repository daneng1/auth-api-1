'use strict';

process.env.SECRET = "toes";

const server = require('../../src/server').server;
const supergoose = require('@code-fellows/supergoose');
const bearer = require('../../src/auth/middleware/bearer.js');

const mockRequest = supergoose(server);

let users = {
  admin: { username: 'admin', password: 'password', role: 'admin' },
  editor: { username: 'editor', password: 'password', role: 'editor' },
  user: { username: 'user', password: 'password', role: 'user' },
};

let foodObj = {
  name: 'food',
  calories: 100,
  type: 'FRUIT'
};

let clothesObj = {
  name: 'clothes',
  color: 'color',
  size: 'size'
}

describe('API Router', () => {

  describe(`admin users`, () => {
    
    it('can create new food objects', async () => {
      
      // First, use basic to login to get a token
      await mockRequest.post('/signup').send(users.admin);
      const response = await mockRequest.post('/signin')
        .auth(users.admin.username, users.admin.password);
      const token = response.body.token;

      // then, create new food object with auth
      const bearerResponse = await mockRequest
        .post('/api/v2/food')
        .set('Authorization', `Bearer ${token}`)
        .send(foodObj);

      // check that food object was created
      expect(bearerResponse.status).toBe(201);
      expect(bearerResponse.body.name).toBe('food');
      const deleteResponse = await mockRequest
        .delete(`/api/v2/food/${bearerResponse.body._id}`)
        .set('Authorization', `Bearer ${token}`)
      expect(deleteResponse.status).toBe(200);
    });

    it('can create new clothes objects', async() => {

      // First, use basic to login to get a token
      await mockRequest.post('/signup').send(users.admin);
      const response = await mockRequest.post('/signin')
        .auth(users.admin.username, users.admin.password);
      const token = response.body.token;

      // then, create new food object with auth
      const bearerResponse = await mockRequest
        .post('/api/v2/clothes')
        .set('Authorization', `Bearer ${token}`)
        .send(clothesObj);

      // check that food object was created
      expect(bearerResponse.status).toBe(201);
      expect(bearerResponse.body.name).toBe('clothes');
      const deleteResponse = await mockRequest
        .delete(`/api/v2/clothes/${bearerResponse.body._id}`)
        .set('Authorization', `Bearer ${token}`)
    expect(deleteResponse.status).toBe(200);

    })

  });

});