<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('medicos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('cedula_cpe', 15);
            $table->string('especialidad', 100)->nullable();
            $table->string('dgp_especialidad', 10)->nullable();
            $table->string('subespecialidad', 100)->nullable();
            $table->string('dgp_subespecialidad', 10)->nullable();
            $table->string('avatar', 255)->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('medicos');
    }
};
