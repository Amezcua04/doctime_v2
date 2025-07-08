<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Paciente extends Model
{
    /** @use HasFactory<\Database\Factories\PacienteFactory> */
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'nombre',
        'curp',
        'fecha_nacimiento',
        'sexo',
        'telefono',
        'email'
    ];

}
