<?php

namespace Database\Seeders;

use App\Models\Servicio;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ServicioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $servicios = [
            'Rayos X',
            'Ultrasonido',
            'Laboratorio Clínico',
            'Electrocardiograma',
            'Tomografía',
            'Resonancia Magnética',
            'Consulta de Nutrición',
            'Fisioterapia',
            'Audiometría'
        ];

        foreach ($servicios as $nombre) {
            Servicio::create([
                'nombre' => $nombre,
                'descripcion' => 'Servicio de ' . strtolower($nombre),
                'costo' => fake()->randomFloat(2, 200, 2000),
            ]);
        }
    }
}
