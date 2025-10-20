import { useEffect, useState } from "react"
import classes from './style.module.css'
import TodoItem from "./components/todo-items";
import TodoDetails from "./components/todo-details";
import { Skeleton } from "@mui/material";
function App() {
  const [loading,setLoading] = useState(false)
  const [todoList,setTodoList]=useState([])
  const [showError,setError]=useState(null);
  const [todoDetails,setTodoDetails]=useState(null);
  const [openDialog,setOpenDialog]=useState(false);
 

async function fetchDetailsOfCurrentTodo(getCurrentTodoId) {
  
  try{
  let apiRes=await fetch(`https://dummyjson.com/todos/${getCurrentTodoId}`);
  let details=await apiRes.json();
  console.log(details)
  if(details){
    setTodoDetails(details);
    setOpenDialog(true)
  }else{
    setTodoDetails(null);
    setOpenDialog(false)
  }
  }catch(error){
    console.log(error)
  }
}


  const fetchListItems=async ()=>{
    try {
      setLoading(true);
      const response=await fetch('https://dummyjson.com/todos');
      const data=await response.json();
      if(data?.todos && data.todos.length>0){
        setTodoList(data?.todos);
        setLoading(false);
        setError('')
      }else{
        setTodoList([]);
        setLoading(false)
        setError('')
      }
    
    } catch (error) {
      console.log(error);
      setError(error);
    }
    
  }

  useEffect(()=>{
    fetchListItems();
  },[])

 if(loading) return <Skeleton variant="rectangular" width={650} height={650} />
  return (
    <div className={classes.mainWrapper}>
      <h1 className={classes.headerTitle}>Simple TO-DO List Using Material UI</h1>
      <div className={classes.todoListWrapper}>
        {
          todoList && todoList.length>0?
          todoList.map(todoItem=> <TodoItem 
            fetchDetailsOfCurrentTodo={fetchDetailsOfCurrentTodo}
            todo={todoItem}/>):null
        }
      </div>
        <TodoDetails
        setTodoDetails={setTodoDetails}
        setOpenDialog={setOpenDialog}
        openDialog={openDialog}
        todoDetails={todoDetails}
        />
    </div>
  )
}

export default App
