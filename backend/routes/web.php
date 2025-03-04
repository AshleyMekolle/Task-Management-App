<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController; // Add this import

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});


Route::prefix('api')->group(function () {
    Route::resource('tasks', TaskController::class);
});


Route::get('/csrf-token', function () {
    return response()->json(['csrf_token' => csrf_token()]);
});