"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Trash2, Plus } from "lucide-react"

interface Task {
  id: number
  text: string
  completed: boolean
}

type FilterType = "all" | "completed" | "pending"

export default function Component() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState("")
  const [filter, setFilter] = useState<FilterType>("all")

  const addTask = () => {
    if (newTask.trim() !== "") {
      const task: Task = {
        id: Date.now(),
        text: newTask.trim(),
        completed: false,
      }
      setTasks([...tasks, task])
      setNewTask("")
    }
  }

  const toggleTask = (id: number) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed
    if (filter === "pending") return !task.completed
    return true
  })

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTask()
    }
  }

  const completedCount = tasks.filter((task) => task.completed).length
  const totalCount = tasks.length

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Sticky Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-center">Daily Task Tracker</h1>
          {totalCount > 0 && (
            <p className="text-sm text-gray-600 text-center mt-1">
              {completedCount} of {totalCount} tasks completed
            </p>
          )}
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 pb-24">
        {/* Add Task Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-100">
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              type="text"
              placeholder="What needs to be done today?"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 h-12 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
            />
            <Button
              onClick={addTask}
              className="h-12 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Task
            </Button>
          </div>
        </div>

        {/* Tasks List */}
        <div className="space-y-3">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg mb-2">
                {filter === "all" && "No tasks yet"}
                {filter === "completed" && "No completed tasks"}
                {filter === "pending" && "No pending tasks"}
              </div>
              <p className="text-gray-500 text-sm">
                {filter === "all" && "Add a task above to get started!"}
                {filter === "completed" && "Complete some tasks to see them here"}
                {filter === "pending" && "All tasks are completed! 🎉"}
              </p>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                className={`bg-white rounded-xl shadow-md border border-gray-100 p-4 transition-all duration-200 hover:shadow-lg hover:scale-[1.01] ${
                  task.completed ? "opacity-75" : ""
                }`}
              >
                <div className="flex items-center gap-4">
                  <Checkbox
                    id={`task-${task.id}`}
                    checked={task.completed}
                    onCheckedChange={() => toggleTask(task.id)}
                    className="w-5 h-5 rounded-md border-2 border-gray-300 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                  />
                  <label
                    htmlFor={`task-${task.id}`}
                    className={`flex-1 text-base cursor-pointer transition-all duration-200 ${
                      task.completed ? "line-through text-gray-500" : "text-gray-800 hover:text-gray-600"
                    }`}
                  >
                    {task.text}
                  </label>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteTask(task.id)}
                    className="h-9 w-9 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
                    aria-label="Delete task"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {/* Filter Buttons - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-200 shadow-lg">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex justify-center gap-2">
            {(["all", "pending", "completed"] as FilterType[]).map((filterType) => (
              <Button
                key={filterType}
                variant={filter === filterType ? "default" : "outline"}
                onClick={() => setFilter(filterType)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                  filter === filterType
                    ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md"
                    : "border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400"
                }`}
              >
                {filterType === "all" && `All (${totalCount})`}
                {filterType === "pending" && `Pending (${totalCount - completedCount})`}
                {filterType === "completed" && `Completed (${completedCount})`}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
