<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\TaskRequest;

class TaskController extends Controller
{
    /**
     * Display a list of the tasks.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Task::query();
        
        // Filter by status 
        if ($request->has('status') && in_array($request->status, ['pending', 'completed'])) {
            $query->where('status', $request->status);
        }
        
        // Paginate the results
        $perPage = $request->input('per_page', 10);
        $tasks = $query->latest()->paginate($perPage);
        
        return response()->json([
            'data' => $tasks->items(),
            'meta' => [
                'current_page' => $tasks->currentPage(),
                'last_page' => $tasks->lastPage(),
                'per_page' => $tasks->perPage(),
                'total' => $tasks->total()
            ]
        ]);
    }

    /**
     * Store a newly created task.
     */
    public function store(TaskRequest $request): JsonResponse
    {
        $task = Task::create($request->validated());
        
        return response()->json($task, 201);
    }

    /**
     * Display the task.
     */
    public function show(Task $task): JsonResponse
    {
        return response()->json($task);
    }

    /**
     * Update the  task.
     */
    public function update(TaskRequest $request, Task $task): JsonResponse
    {
        $task->update($request->validated());
        
        return response()->json($task);
    }

    /**
     * Remove the task from storage.
     */
    public function destroy(Task $task): JsonResponse
    {
        $task->delete();
        
        return response()->json(null, 204);
    }
}