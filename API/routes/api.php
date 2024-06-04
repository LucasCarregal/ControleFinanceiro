<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DespesaController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Rotas de Autenticação
Route::post('login', [AuthController::class, 'login']);
Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::get('/me', [AuthController::class, 'me'])->middleware('auth:sanctum');

// Rotas de Usuários 
Route::apiResource('/user', UserController::class);

// Rotas de despesas
Route::apiResource('/despesa', DespesaController::class)->middleware('auth:sanctum');
