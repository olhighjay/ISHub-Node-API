const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app.js");
const mongoose = require('mongoose');
const Post = require('../api/models/postModel');

//Assertion Style
chai.should();
chai.use(chaiHttp);


describe('Posts API', () => {
  /**
   * Test the GET route
   */
  describe('GET /api/posts', () => {
    it('should GET all the posts', (done) => {
      chai.request(server)
      .get('/api/posts')
      .end((err, response) =>{
        response.should.have.status(200);
        response.body.Posts.should.be.a('array');
        response.body.Posts.length.should.be.eq(response.body.count);
      done();
      })
    })
  })

   /**
   * Test the GET (by id) route
   */
  describe('GET /api/posts/:postId', () => {
    it('should GET post by the id in the url', (done) => {
      const postId = "5fedd0c91fb3294118a19e1e";
      chai.request(server)
      .get('/api/posts/' + postId)
      .end((err, response) =>{
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.should.have.property('Id');
        response.body.should.have.property('Title');
        response.body.should.have.property('Body');
        response.body.should.have.property('Category');
        // console.log(response.body);
      done();
      });
    });

    it('should not GET post by the id in the url', (done) => {
      const postId = "5fd3d9a03599313f081810f0";
      chai.request(server)
      .get('/api/posts/' + postId)
      .end((err, response) =>{
        response.should.have.status(404);
        response.text.should.be.eq('{"error":"Post not found"}');
      done();
      })
    })

  })

   /**
   * Test the POST route
   */
  describe('POST /api/posts', () => {
    it('should POST a new post', (done) => {
      // beforeEach(function(done){
        const post = new Post({
          title: "unit testing",
          body: "This is the nmain post for nunit testing",
          category: "5fd2743c51b7b828b0cfbcf2"
        });
        // post.save();
      // });
      // post.save();
      chai.request(server)
      .post('/api/posts')
      .send(post)
      // .set('Content-Type', 'application/json')
      .set('authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJ1c2VySWQiOiI1ZmQ4OTExZDhhZmVkZjJjMmMxMTNmZTYiLCJpYXQiOjE2MDk1Nzk3NTQsImV4cCI6MTYwOTkzOTc1NH0.elTJkOL1fMrr8bKc7eMVB7tNa1Zg-7GQYcRUm2CQgqo')
      .end((err, response) =>{
        response.should.have.status(201);
        response.body.message.should.be.eq('Post was created successfully');
        response.body.should.be.a('object');
        response.body.createdProduct.should.have.property('_id');
        response.body.createdProduct.should.have.property('title').eq("unit testing");
        response.body.createdProduct.should.have.property('body').eq("This is the nmain post for nunit testing");
        response.body.createdProduct.should.have.property('category').eq("5fd2743c51b7b828b0cfbcf2");
        response.body.createdProduct.should.have.property('author');
        console.log(response.body);
      done();
      });
    });

    it('should not POST a new post', (done) => {
      // beforeEach(function(done){
        const post = new Post({
          title: "unit testing",
          body: "This is the nmain post for nunit testing",
        });
        // post.save();
      // });
      // post.save();
      chai.request(server)
      .post('/api/posts')
      .send(post)
      // .set('Content-Type', 'application/json')
      .set('authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJ1c2VySWQiOiI1ZmQ4OTExZDhhZmVkZjJjMmMxMTNmZTYiLCJpYXQiOjE2MDk1NDA3ODUsImV4cCI6MTYwOTkwMDc4NX0.f6VUBPjJ-tqSv0lfjhbtw_emcGBXH6L7oKyd9Ivr7FQ')
      .end((err, response) =>{
        response.should.have.status(404);
        response.text.should.be.eq('{"error":"Category does not exist"}');
      done();
      });
    });
  });

   /**
   * Test the update route
   */
  describe('POST /api/posts/:postId', () => {
    let postId = "5fedd0d32437663c803f2d6b";
    it('should UPDATE post with the ID in the url', (done) => {
      post = {
        title: "update testing",
        body: "This is the main post for unit testing for updating",
        category: "5fd2743c51b7b828b0cfbcf2",
      }
      chai.request(server)
      .post('/api/posts/5fedd0d32437663c803f2d6b')
      .send(post)
      .set('authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJ1c2VySWQiOiI1ZmQ4OTExZDhhZmVkZjJjMmMxMTNmZTYiLCJpYXQiOjE2MDk1Nzk3NTQsImV4cCI6MTYwOTkzOTc1NH0.elTJkOL1fMrr8bKc7eMVB7tNa1Zg-7GQYcRUm2CQgqo')
      .end((err, response) =>{
        response.should.have.status(201);
        response.body.message.should.be.eq("Post updated successfully");
        response.body.should.be.a('object');
        response.body.post.should.have.property('_id').eq('5fedd0d32437663c803f2d6b');
        response.body.post.should.have.property('title').eq("update testing");
        response.body.post.should.have.property('body').eq("This is the main post for unit testing for updating");
        response.body.post.should.have.property('category').eq("5fd2743c51b7b828b0cfbcf2");
        response.body.post.should.have.property('author');
        console.log(response.body);
      done();
      });
    });

    it('should not UPDATE post with the ID in the url', (done) => {
      post = {
        title: "update testing",
        body: "This is the main post for unit testing for updating",
        category: "5fd2743c51b7b828b0cfbcf2",
      }
      chai.request(server)
      .post('/api/posts/5fedd0d32437663c803f2d6b')
      .send(post)
      // .set('authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJ1c2VySWQiOiI1ZmQ4OTExZDhhZmVkZjJjMmMxMTNmZTYiLCJpYXQiOjE2MDk1Nzk3NTQsImV4cCI6MTYwOTkzOTc1NH0.elTJkOL1fMrr8bKc7eMVB7tNa1Zg-7GQYcRUm2CQgqo')
      .end((err, response) =>{
        response.should.have.status(401);
        response.text.should.be.eq('{"message":"Auth failed. You can\'t access this page except you login"}');
      done();
      });
    });

    
    after((done) => {
      mongoose.connection.close();
      server.close(done());
    })
  });

   /**
   * Test the DELETE route
   */
})