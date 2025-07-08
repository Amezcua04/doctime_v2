<?php

namespace Database\Factories;

use App\Models\Medico;
use App\Models\Paciente;
use App\Models\Servicio;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Cita>
 */
class CitaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $tipo = $this->faker->randomElement(['medico', 'servicio']);
        $paciente = Paciente::inRandomOrder()->first();
        $fecha = $this->faker->dateTimeBetween('now', '+1 month');

        return [
            'paciente_id' => $paciente?->id ?? Paciente::factory(),
            'tipo' => $tipo,
            'medico_id' => $tipo === 'medico' ? Medico::inRandomOrder()->first()?->id : null,
            'servicio_id' => $tipo === 'servicio' ? Servicio::inRandomOrder()->first()?->id : null,
            'fecha' => $fecha->format('Y-m-d'),
            'hora' => $this->faker->time('H:i'),
            'estatus' => $this->faker->randomElement(['pendiente', 'confirmada', 'en_curso', 'completada', 'cancelada']),
            'notas' => $this->faker->optional()->sentence(),
        ];
    }
}
