const bcrypt = require("bcryptjs");

const User = require("../models/user");

exports.getLogin = (req, res, next) => {
	// const isLoggedIn = req.get("Cookie").trim().split("=")[1] === "true";
	let message = req.flash('err');
	if (message.length > 0) {
		message = message[0]
	} else {
		message = null
	}
	console.log(req.session);
	res.render("auth/login", {
		path: "/login",
		pageTitle: "Login",
		errorMessage: message
	});
};

exports.getSignup = (req, res, next) => {
	let message = req.flash("err");
	if (message.length > 0) {
		message = message[0];
	} else {
		message = null;
	}
	res.render("auth/signup", {
		path: "/signup",
		pageTitle: "Signup",
		errorMessage: message,
	});
};
exports.postLogin = (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;
	User.findOne({ email: email })
		.then((user) => {
			if (!user) {
				req.flash("err", "Invalid Email or Password");
				return res.redirect("/login");
			}
			bcrypt
				.compare(password, user.password)
				.then((doMatch) => {
					if (doMatch) {
						req.session.user = user;
						req.session.isLoggedIn = true;
						return req.session.save((err) => {
							console.log(err);
							res.redirect("/");
						});
					}
					res.redirect("/login");
				})
				req.flash("err", "Invalid Email or Password")
				.catch((err) => {
					console.log(err);
					res.redirect("/login");
				});
		})
		.catch((err) => console.log(err));
};
exports.postSignup = (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;
	const confirmPassword = req.body.confirmPassword;

	User.findOne({ email: email })
		.then((userDoc) => {
			if (userDoc) {
				req.flash("err", "Email already exist, please pick a different one");
				return res.redirect("/signup");
			}
			return bcrypt
				.hash(password, 12)
				.then((hashedPassword) => {
					const user = new User({
						email: email,
						password: hashedPassword,
						cart: { items: [] },
					});
					return user.save();
				})
				.then((result) => {
					res.redirect("/login");
				});
		})
		.catch((err) => {
			console.log(err);
		});
};
exports.postLogout = (req, res, next) => {
	req.session.destroy(() => {
		res.redirect("/");
	});
};
