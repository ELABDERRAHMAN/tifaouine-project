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
    Schema::create('school_orphans', function (Blueprint $table) {
        $table->id();
        $table->foreignId('orphan_file_id')->constrained()->onDelete('cascade');
        $table->string('full_name');
        $table->date('birth_date');
        $table->string('level');
        $table->string('institution');
        $table->integer('repetition_years')->nullable();
        $table->text('study_issues')->nullable();
        $table->boolean('can_receive_support')->default(false);
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
        Schema::dropIfExists('school_orphans');
    }
};
