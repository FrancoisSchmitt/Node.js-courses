const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const errorController = require("./controllers/error");


const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
	User.findById("659ff5eccfa4279f6cf5290e")
		.then((user) => {
			req.user = user;
			next();
		})
		.catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
	.connect(
		"mongodb+srv://schmittfrancois1699:cSypcNdWg69nRV3H@cluster-francois-schmit.32yl8et.mongodb.net/shop?retryWrites=true&w=majority"
	)
	.then((result) => {
		User.findOne().then(user => {
			if (!user) {
				const user = new User({
					name: 'Francois',
					email: 'Francois.schmitt@gmail.com',
					cart: {
						items: []
					}
				})	
				user.save()
			}
		});
		app.listen(3000);
	})
	.catch((err) => console.log(err));
