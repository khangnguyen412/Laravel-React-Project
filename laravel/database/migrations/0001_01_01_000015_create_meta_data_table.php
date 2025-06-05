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
        Schema::create('meta_data', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id();
            $table->morphs('model');
            $table->string('meta_key')->index();
            $table->text('meta_value')->nullable();
            $table->string('field_id')->unique();
            $table->string('field_type');
            $table->timestamps();
            $table->foreignId('parent_id')->constrained('meta_data')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('meta_data');
    }
};
