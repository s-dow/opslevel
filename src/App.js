import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

import "./App.css";

function App() {
  const [toDo, setToDo] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [newPriority, setNewPriority] = useState("");
  const [missingPrios, setMissingPrios] = useState("");

  useEffect(() => {
    findMissingPriorities();
  }, [toDo]);

  // Add new task
  const addTask = () => {
    // Check if duplicate priority level
    const checkPrio = (obj) => obj.priority === newPriority;

    // Validate that the fields are all filled in, aren't duplicates, and are positive integers
    if (!newPriority || !newTask) {
      alert("Please fill in all fields.");
    } else if (newPriority < 1 || toDo.some(checkPrio)) {
      alert("Priority levels must be unique and greater than 0.");
    } else {
      let num = toDo.length + 1;
      let newEntry = { id: num, title: newTask, priority: newPriority };
      setToDo([...toDo, newEntry]);
      setNewTask("");
      setNewPriority("");
    }
  };

  // Delete a task
  const deleteTask = (id) => {
    let newTasks = toDo.filter((task) => task.id !== id);
    setToDo(newTasks);
  };

  // Check which priority levels are missing
  const findMissingPriorities = () => {
    let missing = [];
    let priorities = [];
    for (var i = 0; i < toDo.length; i++) {
      priorities.push(parseInt(toDo[i]["priority"]));
    }

    for (let i = 1; i <= Math.max(...priorities); i++) {
      if (priorities.indexOf(i) === -1) {
        missing.push(i);
      }
    }
    if (missing.length === 0) {
      missing = ["none"];
      setMissingPrios("");
    } else {
      setMissingPrios(missing);
    }
  };

  return (
    <div className="grid justify-items-center w-full lg:w-1/2 mx-auto my-12 p-6 text-slate-600 shadow-lg rounded-sm bg-white">
      <h1 className="mt-2 font-bold text-3xl">To Do List</h1>
      <div className="mt-6 w-full relative rounded-md shadow-sm mb-2">
        <div className="my-2">
          <input
            value={newTask}
            placeholder="New Task"
            onChange={(e) => setNewTask(e.target.value)}
            className="p-3 block w-full sm:text-sm border shadow-md rounded border-gray-500"
          />
        </div>
        <div className="w-full my-2">
          <div className="">
            <input
              value={newPriority}
              type="number"
              id="prio"
              placeholder="Priority Level"
              min="1"
              max="100"
              onChange={(e) => setNewPriority(e.target.value)}
              className="p-3 block w-full sm:text-sm border shadow-md rounded border-gray-500"
            />
          </div>
          <div className="my-2">
            <button
              className="rounded bg-slate-600 w-full text-white font-medium p-3 shadow-md hover:bg-slate-700"
              onClick={addTask}
            >
              Add Task
            </button>
          </div>
        </div>
      </div>

      {missingPrios && missingPrios.length ? (
        <p className="text-red-400 italic font-sm">
          Missing priorities: {missingPrios.join(", ")}
        </p>
      ) : (
        ""
      )}

      {toDo && toDo.length
        ? ""
        : "Get started by adding a task to your to do list."}

      <ul className="divide-y divide-gray-300 w-full rounded-lg">
        {toDo &&
          toDo
            .sort((a, b) => a.priority - b.priority)
            .map((item, index) => (
              <li key={item.id}>
                <div tabIndex={item.id} className="block p-4 hover:bg-gray-50">
                  <div className="flex items-center px-4 py-4 sm:px-6">
                    <div className="min-w-0 flex-1 flex items-center">
                      <div className="flex-shrink-0">
                        <span className="w-12 h-12 rounded-full mr-3 flex justify-center items-center border border-slate-600">
                          {item.priority}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                        <div>
                          <p className="text-md truncate">
                            <span className="font-semibold">{item.title}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="hover:text-slate-700 cursor-pointer">
                      <span onClick={() => deleteTask(item.id)} title="Delete">
                        <FontAwesomeIcon className="h-6 w-6" icon={faX} />
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
      </ul>
    </div>
  );
}

export default App;
