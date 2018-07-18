// user.js
//
// Defines the users api. Add to a server by calling:
// required(./users)

// Only export - adds the API to the app with give option
module.exports = (app, options) => {

  app.get('/users', (req, res, next) => {
    options.repository.getUsers().then((users) => {
      res.status(200).send(users.map((user) => {
        return {
          email: user.email,
          phoneNumber: user.phone_number
        };
      }));
    }).catch(next);
  });

  app.get('/search', (req, res, next) => {

    // Get the email
    let email = req.query.email;
    if(!email) {
      throw new Error("When searching for a user, the email must be specified, eg: '/search?email=homer@toilaptrinh.com'.");
    }

    // Get the user from the repo.
    options.repository.getUserByEmail(email).then((user) => {

      if(!user) {
        res.status(404).send('User not found');
      } else {
        res.status(200).send({
          email: user.email,
          phoneNumber: user.phone_number
        });
      }

    }).catch(next);

  });

};