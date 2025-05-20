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
    Schema::create('orphan_files', function (Blueprint $table) {
        $table->id();
        $table->string('guardian_name');
        $table->string('phone')->nullable();
        $table->text('address')->nullable();
        $table->timestamps();
    });
}

// app/Models/OrphanFile.php



    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orphan_files');
    }
};
