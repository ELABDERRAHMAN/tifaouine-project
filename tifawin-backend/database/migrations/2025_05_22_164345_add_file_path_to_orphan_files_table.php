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
    Schema::table('orphan_files', function (Blueprint $table) {
        $table->string('file_path')->nullable();
    });
}

public function down()
{
    Schema::table('orphan_files', function (Blueprint $table) {
        $table->dropColumn('file_path');
    });
}

};
