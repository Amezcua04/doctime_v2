<?php

namespace App\Http\Controllers;

use App\Models\Medico;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class MedicoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');
        $sort = $request->input('sort', 'created_at');
        $direction = $request->input('direction', 'desc');

        $medicos = Medico::with('user')
            ->withTrashed()
            ->when($search, function ($query, $search) {
                $query->whereHas('user', fn($q) => $q->where('name', 'like', "%{$search}%"))
                    ->orwhere('especialidad', 'like', "%{$search}%");
            })
            ->orderBy($sort, $direction)
            ->paginate(5)
            ->withQueryString();

        return Inertia::render('medicos/index', [
            'medicos' => $medicos,
            'filters' => $request->only(['search', 'sort', 'direction'])
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $usuarios = User::where('role', 'medico')->whereDoesntHave('medico')->get();

        return Inertia::render('medicos/create', [
            'usuarios' => $usuarios,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            // Datos del usuario
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email',
            'password' => 'required|string|min:8|confirmed',

            // Datos del médico
            'cedula_cpe' => 'required|string|max:15',
            'especialidad' => 'nullable|string|max:100',
            'dgp_especialidad' => 'nullable|string|max:10',
            'subespecialidad' => 'nullable|string|max:100',
            'dgp_subespecialidad' => 'nullable|string|max:10',
            'avatar' => 'nullable|string|max:255',
        ]);

        // 1. Crear el usuario con rol 'medico'
        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => 'medico', // asignación directa
        ]);

        // 2. Crear el médico asociado
        $user->medico()->create([
            'cedula_cpe' => $validated['cedula_cpe'],
            'especialidad' => $validated['especialidad'],
            'dgp_especialidad' => $validated['dgp_especialidad'],
            'subespecialidad' => $validated['subespecialidad'],
            'dgp_subespecialidad' => $validated['dgp_subespecialidad'],
            'avatar' => $validated['avatar'],
        ]);

        return redirect()->route('medicos.index')->with('success', 'Médico registrado correctamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Medico $medico)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Medico $medico)
    {

        return Inertia::render('medicos/edit', [
            'medico' => $medico->load('user')
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Medico $medico)
    {
        $validated = $request->validate([
            // Usuario
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email,' . $medico->user_id,
            'password' => 'nullable|string|min:8|confirmed',

            // Médico
            'cedula_cpe' => 'required|string|max:15',
            'especialidad' => 'nullable|string|max:100',
            'dgp_especialidad' => 'nullable|string|max:10',
            'subespecialidad' => 'nullable|string|max:100',
            'dgp_subespecialidad' => 'nullable|string|max:10',
            'avatar' => 'nullable|string|max:255',
        ]);

        // Actualizar el usuario
        $medico->user->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
            ...($validated['password']
                ? ['password' => Hash::make($validated['password'])]
                : []),
        ]);

        // Actualizar el médico
        $medico->update([
            'cedula_cpe' => $validated['cedula_cpe'],
            'especialidad' => $validated['especialidad'],
            'dgp_especialidad' => $validated['dgp_especialidad'],
            'subespecialidad' => $validated['subespecialidad'],
            'dgp_subespecialidad' => $validated['dgp_subespecialidad'],
            'avatar' => $validated['avatar'],
        ]);

        return redirect()->route('medicos.index')->with('success', 'Médico actualizado con éxito.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Medico $medico)
    {
        $medico->delete();

        return redirect()->route('medicos.index')->with('success', 'Médico eliminado.');
    }

    /**
     * Restore a soft-deleted medico.
     */
    public function restore($id)
    {
        $medico = Medico::withTrashed()->findOrFail($id);

        $medico->restore();

        return redirect()->route('medicos.index')->with('success', 'Médico restaurado con éxito.');
    }
}
