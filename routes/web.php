<?php

use App\Http\Controllers\CitaController;
use App\Http\Controllers\MedicoController;
use App\Http\Controllers\PacienteController;
use App\Http\Controllers\ServicioController;
use App\Http\Middleware\RoleMiddleware;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


// Rutas publicas
Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');
Route::get('/nosotros', function () {
    return Inertia::render('about');
})->name('us');

// Rutas administradas
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::middleware(['role:asistente,medico,admin'])->group(function () {
        // Pacientes
        Route::resource('pacientes', PacienteController::class);
        Route::put('/pacientes/{paciente}/restore', [PacienteController::class, 'restore'])->name('pacientes.restore');
        Route::get('/pacientes/buscar', [CitaController::class, 'buscarPacientePorCurp'])->name('pacientes.buscar');
        // Medicos
        Route::resource('medicos', MedicoController::class);
        Route::put('/medicos/{medico}/restore', [MedicoController::class, 'restore'])->name('medicos.restore');

        //Servicios
        Route::resource('servicios', ServicioController::class);
        Route::put('/servicios/{servicio}/restore', [ServicioController::class, 'restore'])->name('servicios.restore');

        //Citas
        // Route::get('/citas', [CitaController::class, 'index'])->name('citas.index');
        // Route::post('/citas', [CitaController::class, 'store']);
        // Route::put('/citas/{cita}', [CitaController::class, 'update'])->name('citas.update');
        // Route::post('/citas/fetch', [CitaController::class, 'fetch'])->name('citas.fetch');
        // Route::put('/citas/{id}/actualizar-fecha', [CitaController::class, 'actualizarFecha'])->name('citas.actualizar-fecha');
        Route::resource('citas', CitaController::class)->only(['index', 'store', 'update']);
        Route::post('/citas/fetch', [CitaController::class, 'fetch'])->name('citas.fetch');
        Route::put('/citas/{id}/actualizar-fecha', [CitaController::class, 'actualizarFecha'])->name('citas.actualizar-fecha');

    });
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
