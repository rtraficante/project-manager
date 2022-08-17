const bcrypt = require("bcryptjs");
const { dateScalar } = require("./scalars");

module.exports = {
  Date: dateScalar,

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
    getProject: async (root, { projectId }, { models }) => {
      const project = await models.Project.findByPk(projectId, {
        include: [{ model: models.Task, as: "tasks" }],
      });

      return project;
    },
    getProjectsByUserId: async (root, args, { req, models }) => {
      const projects = await models.Project.findAll({
        where: {
          userId: req.session.userId,
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
    getTasks: async (parent, { projectId }, { models }) => {
      const tasks = await models.Task.findAll({
        where: {
          projectId,
        },
      });
      return tasks;
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

    createTask: async (parent, args, { models }) => {
      try {
        const task = await models.Task.create(args);
        return task;
      } catch (err) {
        console.error(err);
      }
    },

    editTaskStatus: async (parent, { id, status }, { models }) => {
      const task = await models.Task.findByPk(id);
      const update = await task.update({
        status,
      });
      if (update) {
        return true;
      } else {
        return false;
      }
    },
  },
};
