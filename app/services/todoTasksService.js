const todoTasksModel = require("../models/todoTasks");

const todoTasksService = {
  addTodo: async ({ email, title, subTitle, image }) => {
    try {
      const result = await todoTasksModel.create({
        email,
        title,
        subTitle,
        image,
      });

      if (!result) {
        throw new Error("Task creation failed");
      }

      return { success: 1, message: "Task created!" };
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  },

  updateTodo: async (id, updatedData) => {
    try {
      const updatedTodo = await todoTasksModel.findByIdAndUpdate(
        id,
        { $set: updatedData },
        {
          new: true,
        }
      );

      if (!updatedTodo) {
        throw new Error("Todo not found");
      }

      return { success: 1, message: "Task updated!", updatedTodo };
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  },

  deleteTodo: async (id) => {
    try {
      const deletedTodo = await todoTasksModel.findByIdAndDelete(id);

      if (!deletedTodo) {
        throw new Error("Todo not found");
      }

      return { success: 1, message: "Task deleted!", deletedTodo };
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  },
};

module.exports = todoTasksService;
