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
    Schema::create('educational_situations', function (Blueprint $table) {
        $table->id();
        $table->foreignId('orphan_file_id')->constrained()->onDelete('cascade');
        $table->string('school_behavior')->nullable(); // سلوك اليتيم في المدرسة
        $table->string('home_behavior')->nullable();   // سلوكه في البيت
        $table->string('psychological_status')->nullable(); // الحالة النفسية
        $table->string('social_integration')->nullable();  // اندماجه الاجتماعي
        $table->text('notes')->nullable();             // ملاحظات إضافية
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
        Schema::dropIfExists('educational_situations');
    }
};
