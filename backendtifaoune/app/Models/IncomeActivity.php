<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IncomeActivity extends Model
{
    protected $fillable = ['orphan_file_id', 'full_name', 'job', 'monthly_income', 'skills'];

    public function orphanFile()
    {
        return $this->belongsTo(OrphanFile::class);
    }
}