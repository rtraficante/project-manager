const bcrypt = require("bcryptjs");
const { dateScalar } = require("./scalars");

module.exports = {
  Date: dateScalar,

  Query: {
    allUsers: (root, args, { models }) => {
      return models.User.findAll();
    },
    getUser: (root, { email }, { models }) => {
      return models.User.findOne(
        {
          where: {
            email,
          },
        },
        {
          include: [{ model: models.Project, as: "project" }],
        }
      );
    },
    getProject: async (root, { projectId }, { models, req }) => {
      const project = await models.Project.findByPk(projectId, {
        include: [
          { model: models.Task, as: "tasks" },
          { model: models.User, as: "users" },
        ],
      });

      for (const user of project.users) {
        if (user.id === req.session.userId) {
          return {
            project,
          };
        }
      }

      return {
        errors: [
          {
            type: "Authorization",
            message: "You do not have access to this project.",
          },
        ],
      };
    },
    getProjectsByUserId: async (root, args, { req, models }) => {
      const projects = await models.User_Project.findAll({
        where: {
          userId: req.session.userId,
        },
        include: [{ model: models.Project, as: "project" }],
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
    getInvites: async (parent, args, { req, models }) => {
      const invites = await models.Invitation.findAll({
        where: {
          inviteeId: req.session.userId,
        },
        include: [
          { model: models.User, as: "invitee" },
          { model: models.User, as: "sender" },
          { model: models.Project, as: "invitations" },
        ],
      });

      const res = invites.map((invite) => {
        return {
          id: invite.id,
          sender: invite.sender,
          invitee: invite.invitee,
          project: invite.invitations,
        };
      });

      return res;
    },
  },
  Mutation: {
    register: async (
      parent,
      { password, email, username, firstName, lastName },
      { models, req }
    ) => {
      if (!email.includes("@")) {
        return {
          errors: [
            {
              field: "email",
              message: "email format is not valid",
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

      if (username.length <= 5) {
        return {
          errors: [
            {
              field: "username",
              message: "username length must be greater than 5",
            },
          ],
        };
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      let user;
      try {
        user = await models.User.create({
          email,
          username,
          password: hashedPassword,
          firstName,
          lastName,
        });
      } catch (err) {
        const errDetails = err.original.detail;
        if (
          errDetails.includes("already exists") &&
          errDetails.includes("email")
        ) {
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

        if (
          errDetails.includes("already exists") &&
          errDetails.includes("username")
        ) {
          // duplicate email
          return {
            errors: [
              {
                field: "username",
                message: "username already exists",
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
      console.log(req.session);

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

    createProject: async (parent, args, { models, req }) => {
      try {
        const user = await models.User.findByPk(req.session.userId);
        console.log(req.session);
        const project = await models.Project.create(args);

        await user.addProject(project);
        return project;
      } catch (err) {
        console.error(err);
      }
    },

    deleteProject: async (parent, { id }, { models, req }) => {
      //TODO: DELETE ALL INVITES WHEN ASSOCIATED WITH PROJECT BEING DELETED
      const project = await models.Project.findByPk(id, {
        include: [{ model: models.User, as: "users" }],
      });

      let potentialUserId = null;

      for (const user of project.users) {
        if (user.id === req.session.userId) {
          potentialUserId = user.id;
        }
      }
      if (!potentialUserId) return false;

      try {
        await models.Project.destroy({
          where: {
            id,
          },
        });
        await models.User_Project.destroy({
          where: {
            projectId: id,
          },
        });
        return true;
      } catch (err) {
        console.log(err);
        return false;
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

    editTask: async (parent, { id, ...args }, { models }) => {
      const task = await models.Task.findByPk(id);
      await task.update(args);
      return task;
    },

    deleteTask: async (parent, { id }, { models }) => {
      try {
        await models.Task.destroy({
          where: {
            id,
          },
        });
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },

    createInvite: async (
      parent,
      { senderId, projectId, inviteeId },
      { models }
    ) => {
      try {
        const invitee = await models.User.findByPk(inviteeId, {
          include: [{ model: models.Invitation, as: "invitee" }],
        });

        const userProjects = await models.User_Project.findAll({
          where: {
            projectId,
          },
        });

        for (const project of userProjects) {
          if (project.userId === inviteeId) {
            return {
              errors: [
                {
                  message: "This user is already a member of this project",
                },
              ],
              status: false,
            };
          }
        }

        for (const invite of invitee.invitee) {
          if (invite.projectId === projectId) {
            return {
              errors: [
                {
                  message: "This user has already been invited to this project",
                },
              ],
              status: false,
            };
          }
        }

        if (inviteeId === senderId) {
          return {
            errors: [
              {
                message:
                  "You cannot invite yourself to a project. Please invite a valid user instead.",
              },
            ],
            status: false,
          };
        }

        await models.Invitation.create({
          senderId,
          projectId,
          inviteeId,
        });
        return {
          status: true,
        };
      } catch (err) {
        console.error(err);
        return {
          errors: [
            {
              message: err,
            },
          ],
        };
      }
    },

    acceptInvite: async (_, { inviteId }, { models, req }) => {
      try {
        const invite = await models.Invitation.findByPk(inviteId);
        if (req.session.userId !== invite.inviteeId) {
          return false;
        }

        const project = await models.Project.findByPk(invite.projectId);
        const user = await models.User.findByPk(invite.inviteeId);
        await user.addProject(project);

        await models.Invitation.destroy({
          where: {
            id: inviteId,
          },
        });

        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
  },
};
