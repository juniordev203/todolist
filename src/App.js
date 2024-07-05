import Todolist from "./components/Todolist";
import Textfield from "@atlaskit/textfield";
import Button from "@atlaskit/button";
import { useCallback, useEffect, useState } from "react";
import { v4 } from "uuid";

const TODO_APP_STORAGE_KEY = 'TODO_APP';

function App() {
  //state: dữ liệu nội tại cua component
  //props: dữ liệu truyen tu ben ngoai, tu element cha
  const [todoList, setTodoList] = useState([]);
  const [textInput, setTextInput] = useState("");

  useEffect(() => {
    const storagedTodoList = localStorage.getItem(TODO_APP_STORAGE_KEY);
    if (storagedTodoList) {
      console.log('Loaded from localStorage:', JSON.parse(storagedTodoList));
      setTodoList(JSON.parse(storagedTodoList));
    } else {
      console.log("nodata")
    }
  }, []);
  
  useEffect(() => {
    console.log("haha", todoList);
    localStorage.setItem(TODO_APP_STORAGE_KEY, JSON.stringify(todoList));
  }, [todoList]);

  const onTextInputChange = useCallback((e) => {
    setTextInput(e.target.value);
  }, []);

  const onAddBtnClick = useCallback(
    (e) => {
      //them textinput vao danh sach todolist
      setTodoList([
        { id: v4(), name: textInput, isCompleted: false },
        ...todoList,
      ]);
      setTextInput("");
    },
    [textInput, todoList]
  );

  const onCheckBtnClick = useCallback((id) => {
    setTodoList((prevState) => 
      prevState.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: true } : todo
      )
    );
  });

  return (
    <>
      <h3>Danh sách cần làm</h3>
      <Textfield
        name="add-todo"
        placeholder="Thêm việc cần làm ..."
        elemAfterInput={
          <Button
            isDisabled={!textInput}
            appearance="primary"
            onClick={onAddBtnClick}
          >
            Thêm
          </Button>
        }
        css={{ padding: "2px 4px 2px" }}
        value={textInput}
        onChange={onTextInputChange}
      ></Textfield>
      <Todolist todoList={todoList} onCheckBtnClick={onCheckBtnClick} />
    </>
  );
}

export default App;
