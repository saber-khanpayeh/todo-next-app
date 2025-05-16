//we want to create an object in this format {todo:[],inprogress:[],review:[],done:[]}
//this object has containe todos that each array has todos with same status
function sortTodos(todos) {
  const sortedData = {};
  todos.map((todo) => {
    //this condition create an array key that is not exist for first time in 'sortedData'
    if (!sortedData[todo.status]) sortedData[todo.status] = [];
    sortedData[todo.status].push(todo);
  });
  return sortedData;
}
export { sortTodos };
