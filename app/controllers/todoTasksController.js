const todoTasksService = require("../services/todoTasksService");

const todoTasksController = {
  addTodo: async (req, res) => {
    const { email, title, subTitle } = req.body;
    const image = req.file.path;

    try {
      const result = await todoTasksService.addTodo({
        email,
        title,
        subTitle,
        image,
      });
      res.json(result);
    } catch (error) {
      console.error(error);
      const response = {
        success: 0,
        message: error.message,
      };
      res.json(response);
    }
  },

  updateTodo: async (req, res) => {
    const { id } = req.params;
    let updatedData = req.body;
    const image = req.file;

    if (image) {
      updatedData["image"] = req.file.path
    }

    try {
      const updatedTodo = await todoTasksService.updateTodo(id, updatedData);
      res.json(updatedTodo);
    } catch (error) {
      console.error(error);
      const response = {
        success: 0,
        message: error.message,
      };
      res.status(500).json(response);
    }
  },

  deleteTodo: async (req, res) => {
    const { id } = req.params;

    try {
      const result = await todoTasksService.deleteTodo(id);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: 0, message: error.message });
    }
  },
};

module.exports = todoTasksController;
