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
    getProject: (root, { id }, { models }) => {
      return models.Project.findByPk(id);
    },
    getProjectsByUserId: async (root, { userId }, { models }) => {
      const projects = await models.Project.findAll({
        where: {
          userId,
        },
      });
      return projects;
    },
    me: async (parent, args, { models, req }) => {
      // you are not logged in
      if (!req.session.userId) {
        return null;
      }
      const user = await models.User.findByPk(req.session.userId);
      return user;
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

      req.session.userId = user.id;
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
    logout: async (parents, args, { req, res }) => {
      return new Promise((resolve) => {
        return req.session.destroy((err) => {
          if (err) {
            console.log(err);
            resolve(false);
            return false;
          }
          res.clearCookie("qid");
          resolve(true);
          return true;
        });
      });
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
