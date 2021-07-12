import React from "react";
import { useState, useEffect } from "react";
import Todo from "./Todo";
const json = require("../data.json");

//Dont allow submission with spaces

const TdList = () => {
  const [todos, setTodos] = useState([]);

  //To do this with ids, create unique ids using state, increment the state id by one every time a todo is added
  //determine whether button should be disabled
  const [text, setText] = useState("");
  //const [btncolor, setBtncolor] = useState("grey");

  /* 
  The following two useEffects are meant to store the todos 
  between page refreshes 
  */

  //Either get the array of todos in local storage, or set the todos to a null array

  //LOCAL STORAGE METHOD
  // useEffect(() => {
  //   const parsedTodos =
  //     JSON.parse(localStorage.getItem("todos")) || Array(10).fill(null);

  //   setTodos(parsedTodos);
  // }, []);

  //When the todos array changes, set the local storage to the new todo list
  // useEffect(() => {
  //   localStorage.setItem("todos", JSON.stringify(todos));
  // }, [todos]);

  //BACKEND METHOD, reads from every todo in json file and populates todo list with them

  useEffect(() => {
    let newTdList = [];
    fetch("/api")
      .then((response) => response.json()) // .then((res) => res.json())

      .then(({ todos }) => {
        todos &&
          todos.map((todo) => {
            const newTodo = {
              text: todo.text,
              done: todo.done,
            };

            newTdList.push(newTodo);
          });
      })
      .then(() => {
        setTodos(newTdList);
      });
  }, []);

  const btnStyle = {
    border: ".1px solid white",
    borderRadius: "5px",
    outline: "none",
    backgroundColor: text ? "Navy" : "grey",
    color: "white",
  };

  const addTodo = () => {
    //Could probably do this in a better way
    // const newTodo = <Todo text={document.getElementById("todo-input").value} />;

    const newTodo = {
      text,
      done: false,
    };

    //find better way to do this, shouldn't have to use query selector
    // document.getElementById("todo-input").value = "";

    fetch("/api/stuff", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTodo),
    })
      //return status ok
      .then((response) => {
        if (!response) {
          alert("error");
        }
      });

    setText("");
    setTodos([newTodo, ...todos]);
  };

  /* 
If user adds text, button changes to blue
if the text is empty, button needs to be grey  
*/
  // useEffect(() => {
  //   if (text) {
  //     setBtncolor("Navy");
  //   } else setBtncolor("grey");
  // }, [text]);

  const handleTextChange = (e) => {
    // setText(document.getElementById("todo-input").value);
    // in an onclick/onchange, js passes an event object as a parameter

    //added .trim so that users cannot submit only spaces
    if (!e.target.value.trim()) {
      setText("");
    } else {
      setText(e.target.value);
    }
  };

  //DELETE WORKS!
  //filter is filtering by reference not by value
  /* In react you cant mutate state because react only compares reference
  looking for state updates by comparing by reference
  */

  //if you wanted to do this with ids, could use a 'ref' to persist variable between renders
  const handleDelete = (todoToDelete) => {
    const newTodos = todos.filter((todo) => {
      return todoToDelete !== todo;
    });
    setTodos(newTodos);
  };

  const inputStyle = {
    margin: "5px",
  };
  return (
    <div>
      <h1>TODO LIST</h1>
      <input
        style={inputStyle}
        id="todo-input"
        placeholder="add item..."
        onChange={handleTextChange}
        value={text}
      ></input>
      <button style={btnStyle} onClick={addTodo} disabled={!text}>
        ADD
      </button>

      <p>
        {todos &&
          todos.map((todo, i) => {
            return (
              <div>
                <Todo
                  text={todo.text}
                  done={todo.done}
                  handleClick={() => {
                    //can use i because of closure
                    const newTodos = [...todos];
                    newTodos[i].done = !newTodos[i].done;

                    setTodos(newTodos);
                  }}
                  handleDelete={() => handleDelete(todo)}
                />
              </div>
            );
          })}
      </p>
    </div>
  );
};

export default TdList;
