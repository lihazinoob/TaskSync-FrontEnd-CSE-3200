import { fetchTaskById, fetchTasksByProject } from "@/service/api/task";
import { sub } from "date-fns";
import React from "react";
import { toast } from "sonner";

const ProjectTree = ({ project, employees = [], projectId }) => {
  // state to track if anythong in on loading or on network call
  const [loading, setLoading] = React.useState(false);

  // state to show the error message if any error occurs
  const [error, setError] = React.useState(null);

  // helper function to get the employee name by ID
  const getEmployeeName = (employeeId) => {
    if (!employeeId) return "Unassigned";
    const employee = employees.find(emp => emp.userId == employeeId);
    return employee ? employee.username : "Unknown";
  };

  // function to build a tree strucuture
  const buildTreeStructure = async () => {
    setLoading(true);
    setError(null);
    try {
      // first fetch all the tasks of the project by the project ID

      const tasksResponse = await fetchTasksByProject(projectId);

      if (!tasksResponse.success) {
        setError(tasksResponse.message || "Failed to fetch tasks.");
        return;
      }
      const tasks = tasksResponse.data;
      console.log("Tasks fetched successfully in tree structure:", tasks);
      
      // Now call the function fetchTaskById in task.js and fetch all the subtasks of each task

      const taskWithSubtasks = [];


      for(const task of tasks) {
        // console.log(`Processing task: ${task.title} (ID: ${task.id})`);

        // create the task object
        const taskObj = {
          id:task.id,
          type: "task",
          title: task.title,
          description: task.description,
          status: task.status,
          dueDate: task.dueDate,
          assignedTo: task.assignedToId,
          assignedToName: getEmployeeName(task.assignedToId),
          assignedBy: task.assignedById,
          assignedByName: getEmployeeName(task.assignedById),
          subtasks: [],
      
        }

        // console.log("The taskObject is:", taskObj); 

        // If task has subTaskIDs ,fetch each subtask by ID
        if(task.subTaskIds && task.subTaskIds.length > 0) {
          // console.log(`Task ${task.title} has ${task.subTaskIds.length} subtasks:`, task.subTaskIds);

          // Fetch all the subTasks in parallel
          const subTasksPromises = task.subTaskIds.map(subTaskId => {
            // console.log(`Fetching subtask with ID: ${subTaskId}`);
            return fetchTaskById(subTaskId);
          });
          try {
            const subTaskResponses = await Promise.all(subTasksPromises);

            // Now Process each subtask response

            subTaskResponses.forEach((subtaskResponse, index) => {
              if (subtaskResponse.success) {
                const subtask = subtaskResponse.data;
                console.log(`Subtask fetched successfully:`, subtask);
                
                taskObj.subtasks.push({
                  id: subtask.id,
                  type: 'subtask',
                  title: subtask.title,
                  description: subtask.description,
                  status: subtask.status,
                  dueDate: subtask.dueDate,
                  assignedToId: subtask.assignedToId,
                  assignedToName: getEmployeeName(subtask.assignedToId),
                  parentTaskId: task.id
                });

                console.log("TaskObject", taskObj);
              } else {
                console.error(`Failed to fetch subtask ${task.subTaskIds[index]}:`, subtaskResponse.message);
              }
            });

          } catch (subTaskError) {
            console.error(`Error fetching subtasks for task ${task.id}:`, subTaskError);
          }
        }

        taskWithSubtasks.push(taskObj);

        console.log("Complete task object with subtasks:", taskWithSubtasks);



      }
      

    
      
      
      

      
      
    
    } catch (error) {
      setError("An error occurred while fetching tasks.", error);
      toast.error("An error occurred while fetching tasks.");
    } finally {
      setLoading(false);
    }
  };

  // useEffect to build the tree structure when the component mounts
  React.useEffect(() => {
    buildTreeStructure();
  }, [projectId, employees]);

  // if loading is true, show a loading spinner
  if (loading) {
    return (
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4">Project Structure</h3>
        <div className="flex items-center justify-center py-8">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 border-2 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-gray-600">Loading project structure...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4">Project Structure</h3>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Project Task Tree</h2>
      <div className="p-4">
        <div className="space-y-2">
          <h3 className="text-md font-semibold">
            {project.name} ({project.totalTasks +  1 || 0})
          </h3>
        </div>
      </div>
    </div>
  );
};

export default ProjectTree;
