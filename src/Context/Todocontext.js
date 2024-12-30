import React,{createContext,useContext} from 'react'

const Todocontext = createContext({

/*
* Logic : 
      > createContext
      > Make Custom Hook
      > Add functionality for Context and provide them 
      > wrap this fun in those file where you want to access of context, > useContext

*/
   todos:[
      {
         id: 1,
         todoTittle:"todo msg",
         completed: false

      }
   ],

   addTodo:(todo)=>{},
   updateTodo: (id,todoTittle)=>{},
   deleteTodo:(id)=>{},
   toggleComplete:(id)=>{}
})

const useTodo = () =>{
 const context = useContext(Todocontext)
 return context
}

const TodoProvider = Todocontext.Provider;
 

export {
   TodoProvider, 
   Todocontext,
   useTodo,
}

