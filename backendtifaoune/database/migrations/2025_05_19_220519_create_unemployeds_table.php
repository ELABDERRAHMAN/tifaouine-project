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
    Schema::create('unemployeds', function (Blueprint $table) {
        $table->id();
        $table->foreignId('orphan_file_id')->constrained()->onDelete('cascade');
        $table->string('full_name');
        $table->string('education_level');
        $table->string('skills')->nullable();
        $table->string('unemployment_reason')->nullable();
        $table->integer('unemployment_duration')->nullable();
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
        Schema::dropIfExists('unemployeds');
    }
};
