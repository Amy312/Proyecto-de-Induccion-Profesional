const types = {
  login: "login User",
  logout: "log out User",
  update: "update tasks",
  edit: "edit task",
  offEdit: "no edit"
};

const initialValues = {
  auth: localStorage.getItem("auth"),
  id: localStorage.getItem("id"),
  tasksD: [],
  edit: false,
  taskEdit: {}
};

const taskReducer = (state, action) => {
  switch (action.type) {
    case types.login:
      return {
        ...state,
        auth: true,
        id: action.id,
      };
    case types.logout:
      return {
        ...state,
        auth: false,
      };
    case types.update:
      return {
        ...state,
        tasksD: action.tasksD,
      };
      case types.edit:
      return {
        ...state,
        taskEdit: action.taskEdit,
        edit: true
      };
      case types.offEdit:
        return  {
          ...state,
          edit: false,
          taskEdit: {}
        }
    default:
      return state;
  }
};

export { initialValues, types };

export default taskReducer;
