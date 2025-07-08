<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Servicio>
 */
class ServicioFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nombre' => $this->faker->randomElement([
                'Rayos X',
                'Ultrasonido',
                'Laboratorio Clínico',
                'Electrocardiograma',
                'Tomografía',
                'Resonancia Magnética',
                'Consulta de Nutrición',
                'Fisioterapia',
                'Audiometría'
            ]),
            'descripcion' => $this->faker->sentence(),
            'costo' => $this->faker->randomFloat(2, 200, 2000),
        ];
    }
}
