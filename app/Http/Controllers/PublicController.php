<?php

namespace App\Http\Controllers;

use App\Models\Medico;
use App\Models\Servicio;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PublicController extends Controller
{
    public function home()
    {
        return Inertia::render('welcome');
    }

    public function about()
    {
        return Inertia::render('public/about');
    }

    public function directorio()
    {
        $medicosRaw = Medico::with('user')->whereNull('deleted_at')->get();

        // Agregar avatar_url a cada médico
        $medicos = $medicosRaw->map(function ($medico) {
            return [
                'id' => $medico->id,
                'cedula_cpe' => $medico->cedula_cpe,
                'especialidad' => $medico->especialidad,
                'subespecialidad' => $medico->subespecialidad,
                'avatar' => $medico->avatar ? Storage::url($medico->avatar) : null,
                'user' => [
                    'name' => $medico->user->name,
                    'email' => $medico->user->email,
                ],
            ];
        });

        // Obtener especialidades y subespecialidades únicas
        $especialidades = $medicosRaw
            ->pluck('especialidad')
            ->merge($medicosRaw->pluck('subespecialidad'))
            ->filter()
            ->unique()
            ->values();

        return Inertia::render('public/directorio', [
            'medicos' => $medicos,
            'especialidades' => $especialidades,
        ]);
    }

    public function catalogo()
    {
        $servicios = Servicio::whereNull('deleted_at')->get();

        return Inertia::render('public/catalogo', [
            'servicios' => $servicios,
        ]);
    }
}
