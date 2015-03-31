var dbModels = require('../db/models/models');

module.exports = function(app)  {
	app.route("/api/menu").get(function (req, resp) {
		var itemId = req.query.id;
		if(itemId) {
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
		new dbModels.Menu().save(req.body).then(function (result){
			console.log(result);
			resp.send("K.O.");
		})
		.catch(function(error) {
			console.log(error);
			resp.sendStatus(500);
		});
	});
	app.route("/api/menu").put(function (req, resp) {
		new dbModels.Menu({id: req.body.id}).save(req.body, {patch: true}).then(function (result){
			console.log("*****" + result);
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

	});
};