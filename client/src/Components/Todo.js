import React from "react";
import { useState } from "react";
import { BiTrash } from "react-icons/bi";

const Todo = ({ text, done, handleClick, handleDelete }) => {
  //   const [done, setDone] = useState(false);
  //   const[strike, setStrike] = useState('')
  const [ishovered, setIsHovered] = useState(false);
  const [ishoveredtrash, setIsHoveredTrash] = useState(false);

  const style = {
    border: "1px solid black",
    alignItems: "center",
    width: "350px",
    borderRadius: "5px",
    cursor: "pointer",
    outline: "none",
    backgroundColor: ishovered ? "DeepSkyBlue" : "white",
    textDecorationLine: done ? "line-through" : "",
    margin: "5px",
    overflowWrap: "break-word",
  };

  const trashBtnStyle = {
    border: "1px solid black",
    borderRadius: "2px",
    outline: "none",
    backgroundColor: ishoveredtrash ? "red" : "white",
    color: ishoveredtrash ? "white" : "black",
  };

  const changeHover = () => {
    setIsHovered(!ishovered);
  };

  const changeHoverTrash = () => {
    setIsHoveredTrash(!ishoveredtrash);
  };

  return (
    <div>
      <button
        onMouseEnter={changeHover}
        onMouseLeave={changeHover}
        onClick={handleClick}
        style={style}
      >
        {text}
      </button>

      <button
        onMouseEnter={changeHoverTrash}
        onMouseLeave={changeHoverTrash}
        onClick={handleDelete}
        style={trashBtnStyle}
      >
        {" "}
        <BiTrash />
      </button>

      <br />
    </div>
  );
};

export default Todo;
