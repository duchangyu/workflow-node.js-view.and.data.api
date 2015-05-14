var frisby = require('frisby');

frisby.create('Get access token')
  .get('http://localhost:3000/api/token')
  	.expectStatus(200)
  	.expectHeaderContains('content-type', 'application/json')
  	//.inspectBody()
  	//.inspectJSON()
  	.expectBodyContains('access_token')
  	.expectJSONTypes({
  		access_token : String,
  		token_type : String,
  		expires_in : Number
  	})
  	//the access token should contains {token_type : 'Bearer'}
  	.expectJSON({token_type : 'Bearer'})
  	.expectJSON({
  		access_token : function(val) {
  			//this is a valid sample access token
  			var sample_token = '2974LErhmJIlyeewjp34lmfZaBpl';

  			expect(val.length).toEqual(sample_token.length);
  		}
  	})

  
.toss();