var dbModels = require('../db/models/models');
var cabbageValidator = require('../util/validation');
var validator = require('validator');


module.exports = function(app)  {
	app.route('/api/menu').get(function (req, resp) {
		var itemId = req.query.id;
		if(itemId) {
			if(cabbageValidator.Menu.validateGet(req.query) === true) {
				new dbModels.Menu({id: itemId}).fetch().then(function (result) {
					if(result) {
						resp.send(result.toJSON());
					}
					else {
						resp.sendStatus(404);
					}
				})
				.catch(function (error){
					console.log(error);
					resp.sendStatus(500);
				});
			}
			else {
				console.log("api.js | invalid parameter. id => " +itemId);
				resp.sendStatus(400);
			}
		}
		else {
			dbModels.Menu.fetchAll().then(function (result) {
				resp.send(result.toJSON());
			})
			.catch(function (error) {
				console.log(error);
				resp.sendStatus(500);
			});
		}
	});

	app.route("/api/menu").post(function (req, resp) {
		// var bodyJson = JSON.parse(JSON.stringify(req.body));
		if(cabbageValidator.Menu.validateInsert(req.body) === true) {
			new dbModels.Menu().save(req.body).then(function (result) {
				var id = result.get("id")
				resp.json({id: id});
				// resp.sendStatus(200);
			})
			.catch(function(error) {
				console.log(error);
				resp.sendStatus(500);
			});
		}
		else {
			resp.sendStatus(400);
		}
	});

	app.route("/api/menu/:id").put(function (req, resp) {

		if(cabbageValidator.Menu.validateUpdate(req.body) === true) {
			new dbModels.Menu({id: req.params.id}).save(req.body, {patch: true}).then(function (result) {
				if(result) {
					resp.sendStatus(200);
				}
				else {
					resp.sendStatus(404);
				}
			})
			.catch(function (error) {
				console.log(error);
				resp.sendStatus(500);
			});
		}
		else {
			resp.sendStatus(400);
		}
	});

	app.route("/api/menu").delete(function (req, resp) {

		var deleteMenu = function () {
			new dbModels.Menu({id: req.body.id}).destroy().then(function (result) {
				console.log(result);
				resp.sendStatus(200);
			})
			.catch(function (error){
				resp.sendStatus(500);
			});
		};

		if(cabbageValidator.Menu.validateDelete(req.body) === true ) {
			new dbModels.Menu({id: req.body.id}).fetch().then(function (result) {
				if(result) {
					deleteMenu();
				}
				else {
					resp.sendStatus(404);
				}
			})
			.catch(function (error){
				resp.sendStatus(500);
			});
		}
		else {
			resp.sendStatus(400);
		}
	});
};
