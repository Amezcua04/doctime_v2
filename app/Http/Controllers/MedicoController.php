<?php

namespace App\Http\Controllers;

use App\Models\Medico;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;

class MedicoController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $sort = $request->input('sort', 'created_at');
        $direction = $request->input('direction', 'desc');

        $medicos = Medico::with('user')
            ->withTrashed()
            ->when($search, function ($query, $search) {
                $query->whereHas('user', fn($q) => $q->where('name', 'like', "%{$search}%"))
                    ->orWhere('especialidad', 'like', "%{$search}%");
            })
            ->orderBy($sort, $direction)
            ->paginate(5)
            ->withQueryString();

        return Inertia::render('medicos/index', [
            'medicos' => $medicos,
            'filters' => $request->only(['search', 'sort', 'direction'])
        ]);
    }

    public function create()
    {
        $usuarios = User::where('role', 'medico')->whereDoesntHave('medico')->get();

        return Inertia::render('medicos/create', [
            'usuarios' => $usuarios,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
            'cedula_cpe' => 'required|string|max:15',
            'especialidad' => 'nullable|string|max:100',
            'dgp_especialidad' => 'nullable|string|max:10',
            'subespecialidad' => 'nullable|string|max:100',
            'dgp_subespecialidad' => 'nullable|string|max:10',
            'avatar' => 'nullable|image|max:2048',
        ]);

        $avatarPath = null;

        if ($request->hasFile('avatar')) {
            $filename = time() . '_' . $request->file('avatar')->getClientOriginalName();
            $avatarPath = $request->file('avatar')->storeAs('avatars', $filename, 'public');

            // Copiar al public/storage
            $source = storage_path('app/public/' . $avatarPath);
            $destination = public_path('storage/' . $avatarPath);
            File::ensureDirectoryExists(dirname($destination));
            File::copy($source, $destination);
        }

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => 'medico',
        ]);

        $user->medico()->create([
            'cedula_cpe' => $validated['cedula_cpe'],
            'especialidad' => $validated['especialidad'],
            'dgp_especialidad' => $validated['dgp_especialidad'],
            'subespecialidad' => $validated['subespecialidad'],
            'dgp_subespecialidad' => $validated['dgp_subespecialidad'],
            'avatar' => $avatarPath,
        ]);

        return redirect()->route('medicos.index')->with('success', 'Médico registrado correctamente.');
    }

    public function edit(Medico $medico)
    {
        return Inertia::render('medicos/edit', [
            'medico' => $medico->load('user')
        ]);
    }

    public function update(Request $request, Medico $medico)
    {
        $validated = $request->validate([
            'name' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255|unique:users,email,' . $medico->user_id,
            'password' => 'nullable|string|min:8|confirmed',
            'cedula_cpe' => 'nullable|string|max:15',
            'especialidad' => 'nullable|string|max:100',
            'dgp_especialidad' => 'nullable|string|max:10',
            'subespecialidad' => 'nullable|string|max:100',
            'dgp_subespecialidad' => 'nullable|string|max:10',
            'avatar' => 'nullable|image|max:2048',
        ]);

        $avatarPath = $medico->avatar;

        if ($request->hasFile('avatar')) {
            $filename = time() . '_' . $request->file('avatar')->getClientOriginalName();
            $avatarPath = $request->file('avatar')->storeAs('avatars', $filename, 'public');

            // Copiar al public/storage
            $source = storage_path('app/public/' . $avatarPath);
            $destination = public_path('storage/' . $avatarPath);
            File::ensureDirectoryExists(dirname($destination));
            File::copy($source, $destination);
        }

        // Actualizar datos del usuario solo si hay cambios
        $userData = [];
        if (Arr::has($validated, 'name')) {
            $userData['name'] = $validated['name'];
        }
        if (Arr::has($validated, 'email')) {
            $userData['email'] = $validated['email'];
        }
        if (!empty($validated['password'])) {
            $userData['password'] = Hash::make($validated['password']);
        }
        if (!empty($userData)) {
            $medico->user->update($userData);
        }

        // Actualizar datos del médico
        $medicoData = [];
        foreach (['cedula_cpe', 'especialidad', 'dgp_especialidad', 'subespecialidad', 'dgp_subespecialidad'] as $field) {
            if (Arr::has($validated, $field)) {
                $medicoData[$field] = $validated[$field];
            }
        }
        $medicoData['avatar'] = $avatarPath;

        $medico->update($medicoData);

        return redirect()->route('medicos.index')->with('success', 'Médico actualizado con éxito.');
    }

    public function destroy(Medico $medico)
    {
        $medico->delete();
        return redirect()->route('medicos.index')->with('success', 'Médico eliminado.');
    }

    public function restore($id)
    {
        $medico = Medico::withTrashed()->findOrFail($id);
        $medico->restore();
        return redirect()->route('medicos.index')->with('success', 'Médico restaurado con éxito.');
    }
}
