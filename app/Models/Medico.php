<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;

class Medico extends Model
{
    /** @use HasFactory<\Database\Factories\MedicoFactory> */
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'cedula_cpe',
        'especialidad',
        'dgp_especialidad',
        'subespecialidad',
        'dgp_subespecialidad',
        'avatar'
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function cita() {
        return $this->hasMany(Cita::class);
    }

    public function getAvatarUrlAttribute(): ?string
    {
        return $this->avatar ? Storage::url($this->avatar) : null;
    }
}
