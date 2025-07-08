<?php

namespace App\Http\Controllers;

use App\Models\Paciente;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PacienteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');
        $sort = $request->input('sort', 'created_at');
        $direction = $request->input('direction', 'desc');

        $pacientes = Paciente::withTrashed()
            ->when($search, function ($query, $search) {
                $query->where('nombre', 'like', "%{$search}%")
                    ->orwhere('curp', 'like', "%{$search}%");
            })
            ->orderBy($sort, $direction)
            ->paginate(5)
            ->withQueryString();

        return Inertia::render('pacientes/index', [
            'pacientes' => $pacientes,
            'filters' => $request->only(['search', 'sort', 'direction'])
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('pacientes/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:150',
            'curp' => 'required|string|size:18|unique:pacientes,curp',
            'fecha_nacimiento' => 'required|date',
            'sexo' => 'required|in:M,F,Otro',
            'telefono' => 'nullable|string|size:10',
            'email' => 'nullable|email|max:250',
        ]);

        Paciente::create($validated);

        return redirect()->route('pacientes.index')->with('success', 'Paciente registrado con éxito.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Paciente $paciente)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Paciente $paciente)
    {
        return Inertia::render('pacientes/edit', [
            'paciente' => $paciente
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Paciente $paciente)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:150',
            'curp' => 'required|string|size:18|unique:pacientes,curp,' . $paciente->id,
            'fecha_nacimiento' => 'required|date',
            'sexo' => 'required|in:M,F,Otro',
            'telefono' => 'nullable|string|size:10',
            'email' => 'nullable|email|max:250',
        ]);

        $paciente->update($validated);

        return redirect()->route('pacientes.index')->with('success', 'Paciente actualizado con éxito.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Paciente $paciente)
    {
        $paciente->delete();

        return redirect()->route('pacientes.index')->with('success', 'Paciente eliminado.');
    }

    public function restore($id)
    {
        $paciente = Paciente::withTrashed()->findOrFail($id);

        $paciente->restore();

        return redirect()->route('pacientes.index')->with('success', 'Paciente restaurado con éxito.');
    }
}
