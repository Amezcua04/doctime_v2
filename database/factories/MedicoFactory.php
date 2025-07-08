<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Medico>
 */
class MedicoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory()->create(['role' => 'medico'])->id,
            'cedula_cpe' => $this->faker->unique()->numerify('##########'),
            'especialidad' => $this->faker->randomElement(['Pediatría', 'Cardiología', 'Dermatología', 'Ginecología']),
            'dgp_especialidad' => $this->faker->numerify('######'),
            'subespecialidad' => $this->faker->optional()->randomElement(['Oncología', 'Neonatología', 'Neurología']),
            'dgp_subespecialidad' => $this->faker->optional()->numerify('######'),
            'avatar' => $this->faker->imageUrl()
        ];
    }
}
