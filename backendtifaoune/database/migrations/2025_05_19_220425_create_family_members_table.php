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
    Schema::create('family_members', function (Blueprint $table) {
        $table->id();
        $table->foreignId('orphan_file_id')->constrained()->onDelete('cascade');
        $table->string('full_name');
        $table->string('relationship');
        $table->date('birth_date')->nullable();
        $table->string('occupation')->nullable();
        $table->decimal('income')->nullable();
        $table->decimal('expenses')->nullable();
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
        Schema::dropIfExists('family_members');
    }
};
