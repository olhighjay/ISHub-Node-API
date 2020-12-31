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
      const postId = "5fed93f30c639c49f401dd26";
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
    // const Post = mongoose.model('Post');
    it('should POST a new post', (done) => {
      // beforeEach(function(done){
        const post = new Post({
          title: "unit testing",
          body: "This is the nmain post for nunit testing",
          category: "5fd2743c51b7b828b0cfbcf2"
        });
        post.save();
      // });
      // post.save();
      chai.request(server)
      .post('/api/posts')
      .send(post)
      // .set('Content-Type', 'application/json')
      .set('authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJ1c2VySWQiOiI1ZmQ4OTExZDhhZmVkZjJjMmMxMTNmZTYiLCJpYXQiOjE2MDkzNTY3MzEsImV4cCI6MTYwOTQ0MzEzMX0.VTOaoZ28yI-DS0pSy5eEmgzT8sSTrn4ZLKeEjmU_dQs')
      .end((err, response) =>{
        response.should.have.status(201);
        response.body.message.should.be.eq('Post was created successfully');
        response.body.should.be.a('object');
        response.body.createdProduct.should.have.property('_id');
        response.body.createdProduct.should.have.property('title');
        response.body.createdProduct.should.have.property('body');
        response.body.createdProduct.should.have.property('category');
        response.body.createdProduct.should.have.property('author');
        console.log(response.body);
      done();
      });
    });
    // afterEach(function(done){
    //   Post.collection.drop();
    //   done();
    // });
    // afterEach((done) => {
    //   Post.deleteMany({}).exec();
    //   done();
    // });
  
    // after((done) => {
    //   mongoose.connection.close();
    //   server.close(done());
    // })
  });

   /**
   * Test the update route
   */

   /**
   * Test the DELETE route
   */
})