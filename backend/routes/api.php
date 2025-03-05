<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;

// User route
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Add these task routes
Route::prefix('tasks')->group(function () {
    Route::get('/', [TaskController::class, 'index']);
    Route::post('/', [TaskController::class, 'store']);
    Route::get('/{task}', [TaskController::class, 'show']);
    Route::put('/{task}', [TaskController::class, 'update']);
    Route::delete('/{task}', [TaskController::class, 'destroy']);
});

// Optional: Add a test route for debugging
Route::get('/test', function () {
    return response()->json([
        'message' => 'API is working',
        'timestamp' => now()
    ]);
});