<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IncomeActivity extends Model
{
    use HasFactory;

    protected $fillable = [
        'orphan_file_id',
        'activity_type',
        'monthly_income',
        'income_source',
        'notes',
    ];

    public function orphanFile()
    {
        return $this->belongsTo(OrphanFile::class);
    }
}
