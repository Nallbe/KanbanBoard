import { useState } from "react"
import type { TaskStatus } from "../types/task";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

type AddTaskFormProps = {
  addTask: (text: string, taskStatus: TaskStatus) => void;
};

function AddTaskForm(props: AddTaskFormProps) {
  
  const { addTask } = props

  const [inputText, setInputText] = useState<string>("");
  const [formSelect, setFormSelect] = useState<TaskStatus>("todo");


  function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();
    addTask(inputText, formSelect);

    setInputText("");
    setFormSelect("todo");
  }

  function inputHandleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setInputText(e.target.value)
  }


  return (
    <Box
      component="form" 
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        mt: 3
      }}>
        
      <Select
        size="small" 
        value={formSelect}
        onChange={(e) => setFormSelect(e.target.value as TaskStatus)}>
        <MenuItem value="todo">todo</MenuItem>
        <MenuItem value="inProgress">inProgress</MenuItem>
        <MenuItem value="done">done</MenuItem>
      </Select>
      <TextField
        label="Новая задача"
        size="small"
        value={inputText} 
        onChange={inputHandleChange}
      />

      <Button
        type="submit"
        variant="contained"
        >
          Добавить
        </Button>
    </Box>
  )
}

export default AddTaskForm;