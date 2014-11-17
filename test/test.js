
var request = require('supertest');
var app = require('../app');
var req = request(app);
require('should');

describe('routes', function () {
    describe( 'indexのテスト' , function () {
        it('should display index page with title', function (done) {
        	var url = '/users';
            req.get(url).end(function(err, ret) { // *
                var res = ret.res,
                    statusCode = res.statusCode,
                    text = res.text;
 
                statusCode.should.equal(200);
                text.should.equal('respond with a resource');
                done();
            });
        });
	});
});