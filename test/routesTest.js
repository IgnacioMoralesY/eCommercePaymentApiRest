const chai = require('chai');
const chaiHttp = require('chai-http');
require('dotenv').config();

chai.should();
chai.use(chaiHttp);

const Server = process.env.SERVER;
const Port = process.env.PORT;
const testPath = Server + ':' + Port;

describe('Test Endpoints User', () => {
    //Test Post a new User
    describe('POST /api/user', () => {
        it('It should POST a new user', (done) => {
            const user = {
                email: "mocha@test.com"
            }
            chai.request(testPath)
                .post("/api/user")
                .send(user)
                .end((err, response) => {
                    if(err){
                        done(err);
                    } 

                    response.should.have.status(201);
                    response.body.should.be.a('object');
                    response.body.should.have.property('user').that.includes.all.keys([ '_id', 'email', '__v' ]);
                    
                    done();
                });
        });
    });

    //Test Get All
    describe('GET /api/user', () => {
        it('It should GET all the users', (done) => {
            chai.request(testPath)
                .get("/api/user")
                .end((err, response) => {
                    if(err){
                        done(err);
                    } 

                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('users').that.be.a('array');
                    done();
                });
        });
    });

    //Test Get mocha@test.com
    describe('GET /api/user/:email', () => {
        it('It should GET a User mocha@test.com', (done) => {
            const user = "mocha@test.com";
            chai.request(testPath)
                .get("/api/user/" + user)
                .end((err, response) => {
                    if(err){
                        done(err);
                    } 

                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('user').that.includes.all.keys([ '_id', 'email', '__v' ]);
                    done();
                });
        });
    });
});


describe('Test Endpoints Shop', () => {
    //Test Post a new Shop
    describe('POST /api/shop', () => {
        it('It should POST a new shop', (done) => {
            const shop = {
                name: "shopMocha"
            }
            chai.request(testPath)
                .post("/api/shop")
                .send(shop)
                .end((err, response) => {
                    if(err){
                        done(err);
                    } 

                    response.should.have.status(201);
                    response.body.should.be.a('object');
                    response.body.should.have.property('shop').that.includes.all.keys([ '_id', 'name', '__v' ]);
                    
                    done();
                });
        });
    });

    //Test Get All
    describe('GET /api/shop', () => {
        it('It should GET all the shops', (done) => {
            chai.request(testPath)
                .get("/api/shop")
                .end((err, response) => {
                    if(err){
                        done(err);
                    } 

                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('shops');
                    response.body.should.have.property('shops').that.be.a('array');
                    done();
                });
        });
    });

    //Test Get shopMocha
    describe('GET /api/shop/:name', () => {
        it('It should GET a Shop shopMocha', (done) => {
            const shop = "shopMocha";
            chai.request(testPath)
                .get("/api/shop/" + shop)
                .end((err, response) => {
                    if(err){
                        done(err);
                    } 

                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('shop').that.includes.all.keys([ '_id', 'name', '__v' ]);
                    done();
                });
        });
    });
});


describe('Test Endpoints Payments and Delete User and Shop mocha', () => {


    //Test Post add Credits for User in Shop
    describe('POST /api/payment/add-credits', () => {
        it('It should POST Add credits for User in Shop', (done) => {
            const payment = {
                emailUser: "mocha@test.com",
                shop: "shopMocha",
                credit: "500"
            }
            chai.request(testPath)
                .post("/api/payment/add-credits")
                .send(payment)
                .end((err, response) => {
                    if(err){
                        done(err);
                    } 

                    response.should.have.status(201);
                    response.body.should.be.a('object');
                    response.body.should.have.property('payment').that.includes.all.keys([ '_id', 'credit', 'user', 'shop', '__v' ]);
                    
                    done();
                });
        });
    });

    //Test Post Remove Credits for User in Shop
    describe('POST /api/payment/remove-credits', () => {
        it('It should POST Remove credits for User in Shop', (done) => {
            const payment = {
                emailUser: "mocha@test.com",
                shop: "shopMocha",
                credit: "200"
            }
            chai.request(testPath)
                .post("/api/payment/remove-credits")
                .send(payment)
                .end((err, response) => {
                    if(err){
                        done(err);
                    } 

                    response.should.have.status(201);
                    response.body.should.be.a('object');
                    response.body.should.have.property('payment').that.includes.all.keys([ '_id', 'credit', 'user', 'shop', '__v' ]);
                    
                    done();
                });
        });
    });

    //Test Get All
    describe('GET /api/payment', () => {
        it('It should GET all the payments', (done) => {
            chai.request(testPath)
                .get("/api/payment")
                .end((err, response) => {
                    if(err){
                        done(err);
                    } 

                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('payments').that.be.a('array');
                    done();
                });
        });
    });

    //Test Get All credits for User 
    describe('GET /api/payment/:email', () => {
        it('It should GET all credits for User', (done) => {
            const user = "mocha@test.com";
            chai.request(testPath)
                .get("/api/payment/" + user)
                .end((err, response) => {
                    if(err){
                        done(err);
                    } 

                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('payment').that.be.a('object');
                    response.body.should.have.property('payment').that.includes.all.keys([ 'userId', 'email', 'credits' ]);
                    done();
                });
        });
    });

    //Test Get credits for User and Shop
    describe('GET /api/payment/:email/:name', () => {
        it('It should GET credits for User and Shop', (done) => {
            const user = "mocha@test.com";
            const shop = "shopMocha";
            chai.request(testPath)
                .get("/api/payment/" + user + '/' + shop)
                .end((err, response) => {
                    if(err){
                        done(err);
                    } 

                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('payment').that.be.a('object');
                    response.body.should.have.property('payment').that.includes.all.keys([ 'userId', 'email', 'credit' ]);
                    done();
                });
        });
    });

    //Test DELETE shopMocha
    describe('DELETE /api/shop/:name', () => {
        it('It should DELETE a Shop shopMocha', (done) => {
            const shop = "shopMocha";
            chai.request(testPath)
                .delete("/api/shop/" + shop)
                .end((err, response) => {
                    if(err){
                        done(err);
                    } 

                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('shop').that.includes.all.keys([ '_id', 'name', '__v' ]);
                    done();
                });
        });
    });

    //Test DELETE mocha@test.com
    describe('DELETE /api/user/:email', () => {
        it('It should DELETE a User mocha@test.com', (done) => {
            const user = "mocha@test.com";
            chai.request(testPath)
                .delete("/api/user/" + user)
                .end((err, response) => {
                    if(err){
                        done(err);
                    } 

                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('user').that.includes.all.keys([ '_id', 'email', '__v' ]);
                    done();
                });
        });
    });
});