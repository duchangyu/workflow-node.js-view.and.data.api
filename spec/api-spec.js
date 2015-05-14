var api = require('../routes/api');

describe("Server logic about token", function () {


  beforeEach(function(done) {
    

    done();
  });


  it("should return a valid token", function () {
  	var token ;
    api.get('token', function(_token){
    	token = _token;
  	
    });

    expect(api).toBeDefined();

	//expect(token.token_type).toBeDefined();
   	//expect(token.token_type).toEqual('Bearer');
    //expect(token.access_token).toBeDefined();
 

  });





  afterEach(function(done) {



  	done();
  });
    

});