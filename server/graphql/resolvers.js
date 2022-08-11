const bcrypt = require("bcryptjs");

module.exports = {
  Query: {
    allUsers: (root, args, { models }) => {
      return models.User.findAll({
        include: [{ model: models.Project }],
      });
    },
    getUser: (root, { id }, { models }) => {
      return models.User.findByPk(id, {
        include: [{ model: models.Project, as: "project" }],
      });
    },
    allProjects: (root, args, { models }) => {
      return models.Project.findAll();
    },
    getProject: (root, { id }, { models }) => {
      return models.Project.findByPk(id);
    },
  },
  Mutation: {
    register: async (
      parent,
      { password, email, firstName, lastName },
      { models, req }
    ) => {
      if (email.length <= 5) {
        return {
          errors: [
            {
              field: "email",
              message: "email length must be greater than 5",
            },
          ],
        };
      }

      if (password.length <= 5) {
        return {
          errors: [
            {
              field: "password",
              message: "password length must be greater than 5",
            },
          ],
        };
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      let user;
      try {
        user = await models.User.create({
          email,
          password: hashedPassword,
          firstName,
          lastName,
        });
        console.log(user);
      } catch (err) {
        if (err.original.detail.includes("already exists")) {
          // duplicate email
          return {
            errors: [
              {
                field: "email",
                message: "email already exists",
              },
            ],
          };
        }
      }
      return {
        user,
      };
    },
    login: async (parent, { email, password }, { models, req }) => {
      const user = await models.User.findOne({
        where: {
          email: email.toLowerCase(),
        },
      });
      if (!user) {
        return {
          errors: [
            {
              field: "email",
              message: "email does not exist",
            },
          ],
        };
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        return {
          errors: [
            {
              field: "password",
              message: "password incorrect",
            },
          ],
        };
      }

      req.session.userId = user.id;

      return { user };
    },
    createProject: (parent, args, { models }) => {
      try {
        return models.Project.create(args);
      } catch (err) {
        console.error(err);
      }
    },
  },
};
