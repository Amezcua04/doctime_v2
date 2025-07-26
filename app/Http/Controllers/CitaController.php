<?php

namespace App\Http\Controllers;

use App\Models\Cita;
use App\Models\Medico;
use App\Models\Paciente;
use App\Models\Servicio;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CitaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $medicos = Medico::with('user:id,name')->get();
        $servicios = Servicio::all();
        $pacientes = Paciente::all();

        return Inertia::render('citas/index', [
            'medicos' => $medicos,
            'servicios' => $servicios,
            'pacientes' => $pacientes,
        ]);
    }

    public function fetch(Request $request)
    {
        $tipo = $request->input('tipo'); // 'medico', 'servicio' o 'todos'
        $id = $request->input('id');
        $estatus = (array) $request->input('estado', []);
        $start = $request->input('start');
        $end = $request->input('end');

        $query = Cita::with(['paciente', 'medico.user', 'servicio']) // carga relaciones necesarias
            ->when(
                $tipo === 'medico',
                fn($q) =>
                $id ? $q->where('medico_id', $id) : $q->whereNotNull('medico_id')
            )
            ->when(
                $tipo === 'servicio',
                fn($q) =>
                $id ? $q->where('servicio_id', $id) : $q->whereNotNull('servicio_id')
            )

            ->when(!empty($estatus), fn($q) => $q->whereIn('estatus', $estatus))
            ->when($start && $end, fn($q) => $q->whereBetween('fecha', [$start, $end]));

        $citas = $query->get();

        return $citas->map(function ($cita) {
            $hora = substr($cita->hora, 0, 5);
            $paciente = $cita->paciente?->nombre ?? 'Sin paciente';
            $asignado = $cita->medico
                ? 'Dr. ' . ($cita->medico->user->name ?? 'Sin nombre')
                : ($cita->servicio->nombre ?? 'Servicio sin nombre');

            return [
                'id' => $cita->id,
                'title' => "$paciente ($asignado)",
                'start' => $cita->fecha . 'T' . $cita->hora,
                'end' => $cita->fecha . 'T' . $cita->hora,
                'extendedProps' => [
                    'estatus' => $cita->estatus,
                    'tipo' => $cita->medico_id ? 'medico' : 'servicio',
                    'paciente' => $cita->paciente,
                    'asignado' => $asignado,
                ],
            ];
        });
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'paciente_id' => 'required|exists:pacientes,id',
            'fecha' => 'required|date',
            'hora' => 'required',
            'estatus' => 'required|in:pendiente,confirmada,en_curso,completada,cancelada',
            'medico_id' => 'nullable|exists:medicos,id',
            'servicio_id' => 'nullable|exists:servicios,id',
            'notas' => 'nullable|string',
        ]);

        if (!$validated['medico_id'] && !$validated['servicio_id']) {
            return response()->json(['error' => 'Debe seleccionar un médico o un servicio.'], 422);
        }

        $cita = Cita::create($validated);

        return response()->json(['message' => 'Cita registrada.', 'cita' => $cita]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Cita $cita)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Cita $cita)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Cita $cita)
    {
        $validated = $request->validate([
            'fecha' => 'required|date',
            'hora' => 'required',
            'estatus' => 'required|in:pendiente,confirmada,en_curso,completada,cancelada',
            'notas' => 'nullable|string',
        ]);

        $cita->update($validated);

        return response()->json(['message' => 'Cita actualizada.']);
    }

    /**
     * Update the specified date.
     */
    public function actualizarFecha(Request $request, $id)
    {
        $request->validate([
            'fecha' => 'required|date',
            'hora' => 'required|date_format:H:i:s',
        ]);

        $cita = Cita::find($id);

        if (!$cita) {
            return response()->json(['message' => 'Cita no encontrada.'], 404);
        }

        $cita->fecha = $request->input('fecha');
        $cita->hora = $request->input('hora');
        $cita->save();

        return response()->json([
            'message' => 'Cita actualizada correctamente.',
            'cita' => $cita
        ]);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Cita $cita)
    {
        $cita->delete();

        return response()->json(['message' => 'Cita cancelada.']);
    }
}
