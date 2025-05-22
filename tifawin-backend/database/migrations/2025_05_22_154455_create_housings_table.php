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
        $table->string('housing_type'); // نوع السكن: ملك، كراء، مجانا...
        $table->string('building_type')->nullable(); // بيت، شقة، كوخ...
        $table->integer('rooms_number')->nullable(); // عدد الغرف
        $table->boolean('has_water')->default(false);
        $table->boolean('has_electricity')->default(false);
        $table->text('description')->nullable();
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
