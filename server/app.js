// Here we’re importing the express module with the first variable. 
// Then, we are calling the express function in the app variable. 
// This function puts a new Express application inside the app variable. 
// This is creating an instance of Express that we can use to call the various Express functions that will help us build our server.

var express= require('express');
var app= express();
var bodyParser= require('body-parser');

app.use(require('./middleware/headers'));

app.use('/api/test', function(req, res){
	res.send("Hello World");
});
// Add app.listen, so that the server will start up when it is run on Port 3000. 
// Then, we’ll pass a simple callback with a console.log inside that tells us that the server is on:
app.listen(3000,function(){
	console.log("app is listening on 3000");
});


var Sequelize = require('sequelize');
var sequelize = new Sequelize('workoutlog', 'postgres', 'Carrara09', {
		host: 'localhost',
		dialect: 'postgres'
});

sequelize.authenticate().then(
		function() {
				console.log('connected to workout log postgres db');
		},
		function(err) {
				console.log(err);
		}
	);

// Build a user model in sqllize
	var User= sequelize.define('user',{
		username: Sequelize.STRING,
		passwordhash: Sequelize.STRING,
	});


	// TODO: This code will need a lot of discussion and breakdown. Slapping it n here for now.
	// creates the table in postgres
	// matches the model we defined
	// Doesnt drop the db
	User.sync();
	// User.sync({force:true}); 	// drops the table completely line (27ish)
	
	app.use(bodyParse.json());


	app.post('/api/user', function(req,res) {
		// when we post to api user, it will want a user object in the body
		var username = req.body.user.username;
		var pass = req.body.user.password;					//TODO:hash this password-HASH=not human readable
		// Need to create a user object and use sequelize to put that user into our database.

		// Match the model we create above
		// Sequelize - take the user model and go out to the db and create this:
		User.create({
				username: username,
				passwordhash: ""
	}).then (
				// Sequelize is going to return the object it created from db.
				function createSuccess(user){
					// successful get this:
						res.json({
							user: user,
							message: 'create'
						});
				},
				function createError(err){
						res.send(500, err.message);

				}
		);
	});

	var User = sequelize.define('user',{
					username:Sequelize.STRING,
					passwordhash: Sequelize.STRING,
				});

