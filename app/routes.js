const { signUp, signIn } = require("./controllers/authController");
const {
  addTodo,
  updateTodo,
  deleteTodo,
} = require("./controllers/todoTasksController");
const authenticateUser = require("./middlewares/authMiddleware");
const upload = require('./middlewares/multer');

const routes = (app) => {
  app.route("/api/signUp").post(signUp);
  app.route("/api/signIn").post(signIn);
  app
    .route("/api/addTodo")
    .post(authenticateUser, upload.single("image"), addTodo);
  app
    .route("/api/updateTodo/:id")
    .put(authenticateUser, upload.single("image"), updateTodo);
  app.route("/api/deleteTodo/:id").delete(authenticateUser, deleteTodo);
};

module.exports = routes;
