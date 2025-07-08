<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Cita extends Model
{
    /** @use HasFactory<\Database\Factories\CitaFactory> */
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'paciente_id',
        'medico_id',
        'servicio_id',
        'tipo',
        'fecha',
        'hora',
        'estatus',
        'notas'
    ];

    public function paciente()
    {
        return $this->belongsTo(Paciente::class);
    }

    public function medico()
    {
        return $this->belongsTo(Medico::class);
    }

    public function servicio(){
        return $this->belongsTo(Servicio::class);
    }
}
