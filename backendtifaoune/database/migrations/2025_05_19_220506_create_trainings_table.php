<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
   public function up()
{
    Schema::create('trainings', function (Blueprint $table) {
        $table->id();
        $table->foreignId('orphan_file_id')->constrained()->onDelete('cascade');
        $table->string('full_name');
        $table->date('dropout_date')->nullable();
        $table->string('institution')->nullable();
        $table->string('training_type')->nullable();
        $table->text('issues')->nullable();
        $table->text('future_plans')->nullable();
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('trainings');
    }
};
