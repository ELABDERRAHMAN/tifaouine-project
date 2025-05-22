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
    Schema::create('income_activities', function (Blueprint $table) {
        $table->id();
        $table->foreignId('orphan_file_id')->constrained()->onDelete('cascade');
        $table->string('activity_type'); // نوع النشاط: فلاح، عامل، خياطة، تجارة...
        $table->decimal('monthly_income', 10, 2)->nullable(); // الدخل الشهري
        $table->string('income_source')->nullable(); // مصدر الدخل
        $table->text('notes')->nullable(); // ملاحظات إضافية
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
        Schema::dropIfExists('income_activities');
    }
};
