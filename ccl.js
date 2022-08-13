'use strict';

var https = require('https');
var os = require('os');
var tls = require('tls');

var ccl_client = function(config) {

	// config
	// 	domain
	// 	listenerPort
	// 	login
	// 	key
	// 	dataCb

	this.ispapp_ca_hex_string = '2d2d2d2d2d424547494e2043455254494649434154452d2d2d2d2d0a4d494947457a4343412f75674177494241674951665674524a725232756848626442594c76464d4e707a414e42676b71686b69473977304241517746414443420a6944454c4d416b474131554542684d4356564d78457a415242674e5642416754436b356c6479424b5a584a7a5a586b784644415342674e56424163544330706c0a636e4e6c65534244615852354d523477484159445651514b457856556147556756564e46556c525356564e554945356c64486476636d73784c6a417342674e560a42414d544a56565452564a55636e567a64434253553045675132567964476c6d61574e6864476c76626942426458526f62334a7064486b774868634e4d5467780a4d5441794d4441774d4441775768634e4d7a41784d6a4d784d6a4d314f545535576a43426a7a454c4d416b474131554542684d4352304978477a415a42674e560a42416754456b64795a5746305a584967545746755932686c6333526c636a45514d4134474131554542784d48553246735a6d39795a4445594d425947413155450a43684d505532566a64476c6e6279424d615731706447566b4d5463774e51594456515144457935545a574e306157647649464a545153424562323168615734670a566d46736157526864476c76626942545a574e31636d556755325679646d567949454e424d494942496a414e42676b71686b6947397730424151454641414f430a415138414d49494243674b4341514541316e4d7a31746338494e414130686446754e592b4236492f783048754d6a444a73477a39394a2f4c457067504c542b4e0a5451454d6767385866324975366268496566735767303674317a496c6b37634876376c5150366c4d7730417136546e2f3259484b48785979516471414a726b6a0a656f63674875502f494a6f386c555276683355476b4543304d704d5743524149497a3753335963506231315246476f4b6163565041584a707a394f54544730450a6f4b4d62676e36786d726e74785a37464e3369666d6767302b315975574d514a44675a6b57377733335047664b47696f567243536f317966753469594342736b0a486173776861367673433665657033427745496334674c773675424b30752b51447254425142627762345643536d5433704443672f7238756f7964616a6f74590a754b334447526545592b317656763244793241307848532b357033623465546c7967786646514944415141426f344942626a434341576f77487759445652306a0a42426777466f415555336d2f57716f7253733955674f48596d384364387249445a737377485159445652304f424259454649324d5873525572597268642b6d620a2b5a7346346267426a5748684d41344741315564447745422f77514541774942686a415342674e5648524d4241663845434441474151482f416745414d4230470a413155644a5151574d425147434373474151554642774d42426767724267454642516344416a416242674e5648534145464441534d41594742465564494141770a434159475a34454d415149424d464147413155644877524a4d456377526142446f45474750326830644841364c79396a636d777564584e6c636e527964584e300a4c6d4e76625339565530565356484a3163335253553046445a584a3061575a7059324630615739755158563061473979615852354c6d4e7962444232426767720a4267454642516342415152714d476777507759494b775942425155484d414b474d326830644841364c79396a636e517564584e6c636e527964584e304c6d4e760a625339565530565356484a3163335253553046425a475255636e567a64454e424c6d4e796444416c4267677242674546425163774159595a6148523063446f760a4c32396a6333417564584e6c636e527964584e304c6d4e766254414e42676b71686b6947397730424151774641414f43416745414d7239687651354977302f480a756b644e2b4a78344751486345783241622f7a44634c52536d6a457a6d6c64532b7a476561365476564b714a6a5541586150675245487a5379724878565962480a37724d326b5962324f56472f527238506f4c71303933354a78436f324635376b61446c367235524f566d2b79657a752f436f61397a63563348414f344f4c47690a4831392b32347263526b69326141725073725730346a546b5a366b345a676c6530726a386e5367364630416e776e4a4f4b66306850487a50452f75574c4d55780a525030543764576271576c6f64337a7534662b6b2b54593443464d356f6f51306e426e7a766736733153513336794f6f654e4454352b2b53523252694f534c760a7876635276694b46786d5a454a43614f45444b4e794a4f754235364450692f5a2b6656476a6d4f2b77656130334b624e496169474370585a4c6f556d477633380a73625a58516d3256305450324f525147676b45343959395933494262704e56396c586a397035762f2f63576f6161736d3536656b42596462716265346f79414c0a6c366c466864327a692b574a4e34347044667747462f593451413543354249472b33767a7868466f59742f6a6d505154324256506937467032524267764751710a366a4733354c576a4f6853624a754d4c652f30436a72615a77546958575462327148536968725a6536385a6b36732b676f2f6c756e726f74456261476d4168590a4c636d734a575479586e57304f4d477566317047672b7052797262786d5245316136567165385941734f6634766d537972636a4338617a6a5565716b6b2b42350a794f4742514d6b4b572b4553504d46674b754f5877496c43797054505270675361627559304d4c5444584a4c5232376c6b3851794b474f48512b53774d6a344b0a3030752f493573554b5545726d6751666b793378787a6c49504b3161456e383d0a2d2d2d2d2d454e442043455254494649434154452d2d2d2d2d0d0a2d2d2d2d2d424547494e2043455254494649434154452d2d2d2d2d0a4d4949466754434342476d6741774942416749514f584a454f766b697431485830327751335445316c54414e42676b71686b69473977304241517746414442370a4d517377435159445651514745774a48516a45624d426b47413155454341775352334a6c5958526c6369424e5957356a6147567a644756794d524177446759440a56515148444164545957786d62334a6b4d526f77474159445651514b44424644623231765a4738675130456754476c746158526c5a4445684d423847413155450a417777595155464249454e6c636e52705a6d6c6a5958526c49464e6c636e5a705932567a4d423458445445354d444d784d6a41774d4441774d466f58445449340a4d54497a4d54497a4e546b314f566f7767596778437a414a42674e5642415954416c56544d524d7745515944565151494577704f5a586367536d5679633256350a4d52517745675944565151484577744b5a584a7a5a586b6751326c30655445654d4277474131554543684d565647686c4946565452564a55556c56545643424f0a5a58523362334a724d5334774c41594456515144457956565530565356484a3163335167556c4e4249454e6c636e52705a6d6c6a5958527062323467515856300a61473979615852354d494943496a414e42676b71686b6947397730424151454641414f43416738414d49494343674b434167454167424a6c467a594f773973490a73394373567731323763306e3030797455494e6834716f6754516b745a416e637a6f6d667a4432703750625077647a7830374857657a636f45537448326a6e470a76446f5a74462b6d765832646f324e43746e6279715473726b666a696239447346694351435437693648544a474c535231474a6b32332b6a42764749474771510a496a79382f68507768785237397551666a74546b556359525a305949556375474646512f7644502b666d79632f786164474c31526a6a576d70326249636d66620a49576178314a7434413842514f756a4d384e79386e6b7a2b727757574e5239585772662f7a766b3974797932396c5464794f63534f6b327554497133584a71300a74794139796e38694e4b352b4f32686d4155546e415535475535737a59506555766c4d336b484e44387a4c44552b2f6271763530546d6e48613478676b3937450a78777a6634544b757a4a4d37555869565a3476755056622b444e4270447873503879556d617a4e74393235482b6e4e443558344f705761784b58777968474e560a6963514e775a4e554d426b54724e4e394e366672585470734e567a625164635332716c4a43392f5967496f4a6b324b4f745762504a596a4e684c6978503651350a44396b436e757353544a56383832734671563457673879345a2b4c6f4535334d57344c54544c5074572f2f6535584f73497a7374414c38315658514a5364684a0a5742702f6b6a626d555a494f38795a3948453058764d6e735179625176304666514b6c455250535a353165486e6c41665631536f5076313059792b785547554a0a356c68434c6b4d61544c54774a55645a2b6751656b39516d526b705167624c65766e69332f47635634636c5868423450593962705972725758315575366c7a470a4b4167454a546d3444697570386b79584841632f44564c3137653876676738434177454141614f42386a4342377a416642674e5648534d4547444157674253670a45516f6a50706278422b7a6972796e766771562f3044436b7444416442674e56485134454667515555336d2f57716f7253733955674f48596d384364387249440a5a73737744675944565230504151482f42415144416747474d41384741315564457745422f7751464d414d4241663877455159445652306742416f77434441470a42675256485341414d454d4741315564487751384d446f774f4b41326f4453474d6d6830644841364c79396a636d7775593239746232527659324575593239740a4c30464251554e6c636e52705a6d6c6a5958526c55325679646d6c6a5a584d7559334a734d445147434373474151554642774542424367774a6a416b426767720a4267454642516377415959596148523063446f764c32396a63334175593239746232527659324575593239744d413047435371475349623344514542444155410a413449424151415968314863644345396e4972674a37637a3043374d3750446d7931345233694a766d33574f6e6e4c2b354e622b71682b636c6933764130702b0a7276534e62334938517a7641502b7534333179717163617538767a5937714e37512f61474e6e7755344d3330397a2f2b33726930697643526c7637395132522b0a2f637a53416146396666675a47636c434b784f2f57497536704b4a6d424861496b55344d6952544f6f6b334a4d724f363642516176484878572f4242433567410a43694944454f554d73666e4e6b6a635a37547678354471322b5555544a6e577675367276503374334f394c45417045394751445446317735327a3937474131460a7a5a4f466c69396433316b57547a39527664564647442f74536f376f426d4630497861314456427a4a305248667842646953707268544555784f6970616b79410a764770347a37682f6a6e5a796d5179642f746552434261686f312b560a2d2d2d2d2d454e442043455254494649434154452d2d2d2d2d0d0a2d2d2d2d2d424547494e2043455254494649434154452d2d2d2d2d0a4d4949454d6a43434178716741774942416749424154414e42676b71686b69473977304241515546414442374d517377435159445651514745774a48516a45620a4d426b47413155454341775352334a6c5958526c6369424e5957356a6147567a644756794d5241774467594456515148444164545957786d62334a6b4d526f770a474159445651514b44424644623231765a4738675130456754476c746158526c5a4445684d42384741315545417777595155464249454e6c636e52705a6d6c6a0a5958526c49464e6c636e5a705932567a4d423458445441304d4445774d5441774d4441774d466f58445449344d54497a4d54497a4e546b314f566f77657a454c0a4d416b474131554542684d4352304978477a415a42674e564241674d456b64795a5746305a584967545746755932686c6333526c636a45514d413447413155450a42777748553246735a6d39795a4445614d4267474131554543677752513239746232527649454e424945787062576c305a5751784954416642674e5642414d4d0a47454642515342445a584a3061575a70593246305a5342545a584a3261574e6c637a4343415349774451594a4b6f5a496876634e4151454242514144676745500a4144434341516f4367674542414c35416e665275346570326878784e5255534f766b6249677761647753722b47422b4f35414c363836746455496f574d5175610a4274444663434c4e5353315559387932626d6847433150717930776b774c78795475727846613730564a6f5343734e36736a4e673474714a56664d69575050650a334d2f76673461696a4a52506e326a796d4a42476843664864722f6a7a445573693134485a47574377456977714a4835595a39324946436f6b63646d746574340a59674e5738496f61452b6f786f7836676d6630343976596e4d6c6876422f5672755073554b362b3371737a575931397a6a4e6f466d616734714d735865445a520a724f6d65394867366a63385032554c696d4179724c35384f416437766e356c4a385333667248524e473569315238586c4b6448356b426a485970792b6738636d0a657a364b4a636641335a336d4e576751494a3250324e3753773453634456376f4c386b434177454141614f42774443427654416442674e5648513445466751550a6f42454b497a3657385166733471387037344b6c66394177704c517744675944565230504151482f42415144416745474d41384741315564457745422f7751460a4d414d4241663877657759445652306642485177636a41346f4461674e4959796148523063446f764c324e796243356a623231765a47396a5953356a623230760a515546425132567964476c6d61574e68644756545a584a3261574e6c6379356a636d77774e7141306f444b474d476830644841364c79396a636d7775593239740a623252764c6d356c64433942515546445a584a3061575a70593246305a564e6c636e5a705932567a4c6d4e796244414e42676b71686b694739773042415155460a41414f4341514541434662384176436236502b6b2b745a37786b53417a6b2f4578665941574d796d747277555357674564756a6d376c337341673967316f31510a4745386d5467486a3572436c37722b3864465242762f333845726a485431723069574146663243334255727a3976484376385335644961324c5831727a4e4c7a0a527430767875427177384d30417978396c7431617767366e43706e424259757244432f7a58447250624464564359666555304273574f2f387471746c626754320a4739773834466f567870375a38566c494d43466c41327a733653467a374a73446f6541337261415647492f3675674c4f7079797045424d73314f55494a7173690a6c3244346b463530314b4b615537337971576a676f6d3743313279786f772b65762b746f3531627972764c6a4b7a6736435947316134585876693374507871330a736d506939574973677452714145465138546d446e3558704e70615962673d3d0a2d2d2d2d2d454e442043455254494649434154452d2d2d2d2d0d0a';

	this.lastUpdate = 0;
	this.updateTimer = null;
	this.config = config;
	this.start();

}

ccl_client.prototype.make_config_request = function() {

	clearInterval(this.updateTimer);

	// make a config request
	var url_string = 'https://' + this.config.domain + ':' + this.config.listenerPort + '/config?login=' + this.config.login + '&key=' + this.config.key + '&clientInfo=ispapp-launcher&os=' + os.platform() + '&osVersion=' + os.release() + '&hardwareCpuInfo=' + os.arch();

	// decode the hex string
	var ispapp_ca_string = Buffer.from(this.ispapp_ca_hex_string, 'hex');

	var secureContext = tls.createSecureContext({ca: ispapp_ca_string.toString('utf8')});

	var cr = https.request(encodeURI(url_string), {method: 'GET', secureContext: secureContext}, function(res) {

		if (res.statusCode != 200) {
			console.error('config response status code != 200', res.statusCode);
			return;
		}

		var data = Buffer.alloc(0);

		res.on('data', function(d) {

			data = Buffer.concat([data, d]);

		});

		res.on('end', function() {

			try {

				var config_res_json = JSON.parse(data.toString('utf8'));
				//console.log(config_res_json);

				if (config_res_json.error) {
					console.error('config response error');
					return;
				}

				this.lastUpdate = Date.now();

				var sendAt = 0;
				this.ccl_client.updateIntervalTimer = setInterval(function() {

					//console.log(Date.now(), sendAt, sendAt-Date.now());
					if (Date.now() < sendAt) {
						return;
					}
					// provide the timeout + a reasonable wait
					// as sendAt is set in the https.request() callback
					sendAt = Date.now() + (1000 * 20);

					//console.log('sending update');

					var ur = https.request('https://' + this.ccl_client.config.domain + ':' + this.ccl_client.config.listenerPort + '/update', {headers: {'Content-Type': 'application/json'}, method: 'POST', secureContext: secureContext}, function(res) {

						//console.log('/update request made', res.statusCode);

						var data = Buffer.alloc(0);

						res.on('data', function(d) {

							data = Buffer.concat([data, d]);

						});

						res.on('end', function() {

							try {

								var u_json = JSON.parse(data);

								//console.log('update response');
								//console.log(u_json);

								if (u_json.error) {
									console.error('update response error');
									return;
								}

								this.lastUpdate = Date.now();

								// send the update at the time requested
								var sendOffset = this.config_res_json.host.outageIntervalSeconds - u_json.lastUpdateOffsetSec;

								if (this.config_res_json.host.updateIntervalSeconds - u_json.lastColUpdateOffsetSec <= sendOffset) {
									// it is time for a collector update
									sendOffset = this.config_res_json.host.updateIntervalSeconds - u_json.lastColUpdateOffsetSec;
								}

								sendAt = Date.now() + (1000 * sendOffset);

								if (u_json.updateFast === true) {
									// update fast
									sendAt = Date.now() + 1000;
								}

								//console.log('set sendAt to', sendAt);
								//console.log('next update request in ', (sendAt-Date.now()) + 'ms');

							} catch (err) {
								console.error('error parsing update response', err);
							}

						}.bind({config_res_json: this.config_res_json}));

					}.bind({config_res_json: this.config_res_json}));

					ur.on('error', function(err) {
						console.error('update request error', err);
					});

					var j = {login: this.ccl_client.config.login, key: this.ccl_client.config.key};
					this.ccl_client.config.dataCb(ur, j);

				}.bind({config_res_json: config_res_json, ccl_client: this.ccl_client}), 1000);

			} catch (err) {

			}

		}.bind({ccl_client: this.ccl_client}));

	}.bind({ccl_client: this}));

	cr.on('error', function(err) {
		console.error('config request error', err);
	});

	cr.end();

}

ccl_client.prototype.stop = function() {

	console.log('collect client stopped');
	clearInterval(this.updateIntervalTimer);

}

ccl_client.prototype.start = function() {

	console.log('collect client started');
	this.make_config_request();

}

ccl_client.prototype.status = function() {
	if (Date.now() - this.lastUpdate > 1000 * 60 * 5) {
		// 5 minutes has passed since an update
		return false;
	} else {
		return true;
	}
}

module.exports = ccl_client;
