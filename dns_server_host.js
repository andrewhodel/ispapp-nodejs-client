var ccl = require('./ccl.js');
var dns = require('dns');

// connect the collect client
var collect_client = new ccl({domain: 'dev.ispapp.co', listenerPort: 8550, 'login': 'dev.ispapp.co', 'key': '', dataCb: function(req, j) {

	// function executed each time the client wants new data
	console.log('dataCb');

	// add the collectors object to j
	j.collectors = {};

	// send J as a string to the request object
	req.end(JSON.stringify(j));

}});

// test a DNS server every minute
var test_dns = function() {

	var resolver = new dns.Resolver();
	// use this server to make the request
	resolver.setServers(['3.233.165.14']);

	// request this address
	resolver.resolve4('ispapp.co', (err, addresses) => {

		if (err) {
			// the dns server did not respond
			// stop the collect client
			collect_client.stop();
			return;
		}

		if (collect_client.status === false) {
			// if not connected, reconnect the collect client
			collect_client.start();
		}

		// the response
		//console.log(addresses);

	});

}

test_dns();
setInterval(test_dns, 1000 * 60);
