import chai from "chai"
import chaiHttp from "chai-http"

chai.use(chaiHttp)
const expect = chai.expect
const baseurl = "http://localhost:8080"


// Test only runs properly when sync({force: true}) because it works on fresh db instances

describe("Auth", () => {
  it("should not be able to login without registering", (done) => {
    chai.request(`${baseurl}`).post('/auth/login').send({ email: "stuff@gmail.com", password: "stuffingsA1*" }).end((err, res) => {
      expect(err).to.be.null;
      expect(res).to.have.status(400);
      expect(res.body.error).to.equal("User does not exist")
      done()
    })
  })
  it("test1 route should respond with 200 status", (done) => {
    chai.request(`${baseurl}`).get('/test1').end((err, res) => {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      done()
    })
  })
  it("test route should be unauthorized", (done) => {
    chai.request(`${baseurl}`).get('/test').end((err, res) => {
      expect(err).to.be.null;
      expect(res).to.have.status(401);
      done()
    })
  })

  // Register tests
  it("should return error for no parameters when registering", (done) => {
    chai.request(baseurl).post("/auth/register").send({}).end((err, res) => {
      expect(err).to.be.null
      expect(res).to.have.status(400)
      expect(res.body.error).to.be.equal("Please fill in all fields")
      done()
    })
  })
  it("should return error for just email when registering", (done) => {
    chai.request(baseurl).post("/auth/register").send({ email: "stuff@gmail.com" }).end((err, res) => {
      expect(err).to.be.null
      expect(res).to.have.status(400)
      expect(res.body.error).to.be.equal("Please fill in all fields")
      done()
    })
  })
  it("should return error for just password when registering", (done) => {
    chai.request(baseurl).post("/auth/register").send({ password: "stuffingsA1*" }).end((err, res) => {
      expect(err).to.be.null
      expect(res).to.have.status(400)
      expect(res.body.error).to.be.equal("Please fill in all fields")
      done()
    })
  })
  it("should return error for just fullname when registering", (done) => {
    chai.request(baseurl).post("/auth/register").send({ fullname: "Victor Abuka" }).end((err, res) => {
      expect(err).to.be.null
      expect(res).to.have.status(400)
      expect(res.body.error).to.be.equal("Please fill in all fields")
      done()
    })
  })
  it("should return error for incorrect email format when registering", (done) => {
    chai.request(baseurl).post("/auth/register").send({
      fullname: "Victor Abuka",
      email: "stuff",
      password: "stuffingsA1*"
    }).end((err, res) => {
      expect(err).to.be.null
      expect(res).to.have.status(400)
      done()
    })
  })
  it("should return error for password less than 8 characters when registering", (done) => {
    chai.request(baseurl).post("/auth/register").send({
      fullname: "Victor Abuka",
      email: "stuff",
      password: "stuff"
    }).end((err, res) => {
      expect(err).to.be.null
      expect(res).to.have.status(400)
      done()
    })
  })
  it("should return error for password without an uppercase letter when registering", (done) => {
    chai.request(baseurl).post("/auth/register").send({
      fullname: "Victor Abuka",
      email: "stuff",
      password: "stuffings1*"
    }).end((err, res) => {
      expect(err).to.be.null
      expect(res).to.have.status(400)
      done()
    })
  })
  it("should return error for password without a number when registering", (done) => {
    chai.request(baseurl).post("/auth/register").send({
      fullname: "Victor Abuka",
      email: "stuff",
      password: "stuffingsA*"
    }).end((err, res) => {
      expect(err).to.be.null
      expect(res).to.have.status(400)
      done()
    })
  })
  it("should return error for password without a symbol when registering", (done) => {
    chai.request(baseurl).post("/auth/register").send({
      fullname: "Victor Abuka",
      email: "stuff",
      password: "stuffingsA1"
    }).end((err, res) => {
      expect(err).to.be.null
      expect(res).to.have.status(400)
      done()
    })
  })

  it("should succeed with validated parameters when registering", (done) => {
    chai.request(baseurl).post("/auth/register").send({
      fullname: "Victor Abuka",
      email: "stuff@gmail.com",
      password: "stuffingsA1*"
    }).end((err, res) => {
      expect(err).to.be.null
      expect(res).to.have.status(201)
      done()
    })
  })
  it("should return error if user already exists when registering", (done) => {
    chai.request(baseurl).post("/auth/register").send(
      {
        fullname: "Victor Abuka",
        email: "stuff@gmail.com",
        password: "stuffingsA1*"
      }).end((err, res) => {
        expect(err).to.be.null
        expect(res).to.have.status(400)
        expect(res.body.error).to.be.equal("User already exists")
        done()
      })
  })

  // Login tests

  it("should return error for no parameters with login", (done) => {
    chai.request(baseurl).post("/auth/login").send({}).end((err, res) => {
      expect(err).to.be.null
      expect(res).to.have.status(400)
      expect(res.body.error).to.be.equal("Please fill in all fields")
      done()
    })
  })
  it("should return error for just password with login", (done) => {
    chai.request(baseurl).post("/auth/login").send({ password: "stuffingsA1*" }).end((err, res) => {
      expect(err).to.be.null
      expect(res).to.have.status(400)
      expect(res.body.error).to.be.equal("Please fill in all fields")
      done()
    })
  })
  it("should return error for just email with login", (done) => {
    chai.request(baseurl).post("/auth/login").send({ email: "stuff@gmail.com" }).end((err, res) => {
      expect(err).to.be.null
      expect(res).to.have.status(400)
      expect(res.body.error).to.be.equal("Please fill in all fields")
      done()
    })
  })
  it("should return error for extra parameters with login", (done) => {
    chai.request(baseurl).post("/auth/login").send({ fullname: "Victor Abuka", email: "stuff@gmail.com", password: "stuffingsA1*" }).end((err, res) => {
      expect(err).to.be.null
      expect(res).to.have.status(400)
      done()
    })
  })
  it("should return error for unregistered email with login", (done) => {
    chai.request(baseurl).post("/auth/login").send({ email: "stuff@yahoo.com" }).end((err, res) => {
      expect(err).to.be.null
      expect(res).to.have.status(400)
      done()
    })
  })
  it("should return error for incorrect email format with login", (done) => {
    chai.request(baseurl).post("/auth/login").send({ email: "stuff", password: "stuffingsA1*" }).end((err, res) => {
      expect(err).to.be.null
      expect(res).to.have.status(400)
      done()
    })
  })
  it("should return error for incorrect password with login", (done) => {
    chai.request(baseurl).post("/auth/login").send({ email: "stuff", password: "stuffingsA*" }).end((err, res) => {
      expect(err).to.be.null
      expect(res).to.have.status(400)
      done()
    })
  })
  it("should login successfully with appropriate parameters", (done) => {
    chai.request(baseurl).post("/auth/login").send({ email: "stuff@gmail.com", password: "stuffingsA1*" }).end((err, res) => {
      expect(err).to.be.null
      expect(res).to.have.status(200);
      expect(res.body.refreshToken).to.not.be.equal(undefined);
      expect(res.body.accessToken).to.not.be.equal(undefined);
      expect(res).to.have.cookie('accessToken');
      expect(res).to.have.cookie('refreshToken');
      done()
    })
  })
  it("should return error for logout without tokens", (done) => {
    chai.request(baseurl).post("/auth/logout").end((err, res) => {
      expect(res).to.have.status(401);
      expect(res.body.refreshToken).to.be.equal(undefined);
      expect(res.body.accessToken).to.be.equal(undefined);
      expect(res.body.error).to.be.equal("You are not logged in");
      done()
    })
  })

  it("test1 route should still respond with 200 status", (done) => {
    chai.request.agent(`${baseurl}`).get('/test1').end((err, res) => {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      done()
    })
  })

  // Todo: More logout route tests
  // Todo: test protected route
})
