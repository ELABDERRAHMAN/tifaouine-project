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
    Schema::create('housings', function (Blueprint $table) {
        $table->id();
        $table->foreignId('orphan_file_id')->constrained()->onDelete('cascade');
        $table->string('housing_type');
        $table->string('housing_condition');
        $table->integer('room_count');
        $table->boolean('water')->default(false);
        $table->boolean('electricity')->default(false);
        $table->boolean('sanitation')->default(false);
        $table->boolean('tv')->default(false);
        $table->boolean('fridge')->default(false);
        $table->boolean('washing_machine')->default(false);
        $table->boolean('blankets')->default(false);
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
        Schema::dropIfExists('housings');
    }
};
