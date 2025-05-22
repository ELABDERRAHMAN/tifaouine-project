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
    Schema::create('external_assistances', function (Blueprint $table) {
        $table->id();
        $table->foreignId('orphan_file_id')->constrained()->onDelete('cascade');
        $table->string('source'); // مصدر المساعدة: جمعية، فاعل خير...
        $table->string('type');   // نوع المساعدة: مالية، غذائية، طبية...
        $table->decimal('estimated_value', 10, 2)->nullable(); // القيمة المقدرة
        $table->text('notes')->nullable();
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
        Schema::dropIfExists('external_assistances');
    }
};
