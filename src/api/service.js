const EmployeeAPI = {
    employees: [
      { id: 1, name: "Виталий", surname: "Андреев", group: "ИТ-12" },
      { id: 2, name: "Михаил", surname: "Королёв", group: "ИТ-12" },
      { id: 3, name: "Никита", surname: "Лапцевич", group: "ИТ-12" },
      { id: 4, name: "Алексей", surname: "Веселов", group: "ИТ-12" },
      { id: 5, name: "Кирилл", surname: "Радкевич", group: "ИТ-12" },
      { id: 6, name: "Дмитрий", surname: "Ковалёв", group: "ИТ-12" },
    ],
    all() {
      return this.employees;
    },
    get(id) {
      return this.employees.find(employee => employee.id === id);
    },
    delete(id) {
      this.employees = this.employees.filter(employee => employee.id !== id);
      return true;
    },
    add(employee) {
      this.employees.push(employee);
      return employee;
    },
    update(employee) {
      const index = this.employees.findIndex(emp => emp.id === employee.id);
      if (index !== -1) {
        this.employees[index] = employee;
      }
      return employee;
    },
  };
  
  export default EmployeeAPI;  