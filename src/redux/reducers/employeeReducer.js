import { ADD_EMPLOYEE, DELETE_EMPLOYEE } from '../actions/employeeActions';

const initialState = {
  employees: [
    { id: 1, name: "Виталий", surname: "Андреев", group: "ИТ-12" },
    { id: 2, name: "Михаил", surname: "Королёв", group: "ИТ-12" },
    { id: 3, name: "Никита", surname: "Лапцевич", group: "ИТ-12" },
    { id: 4, name: "Алексей", surname: "Веселов", group: "ИТ-12" },
    { id: 5, name: "Кирилл", surname: "Радкевич", group: "ИТ-12" },
    { id: 6, name: "Дмитрий", surname: "Ковалёв", group: "ИТ-12" },
  ],
};

const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_EMPLOYEE:
      const newId = state.employees.length > 0 ? Math.max(...state.employees.map(emp => emp.id)) + 1 : 1;
      const newEmployee = { ...action.payload, id: newId };
      return {
        ...state,
        employees: [...state.employees, newEmployee],
      };
    case DELETE_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.filter(emp => emp.id !== action.payload),
      };
    default:
      return state;
  }
};

export default employeeReducer;