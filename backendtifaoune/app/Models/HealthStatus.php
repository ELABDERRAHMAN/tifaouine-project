<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
class HealthStatus extends Model
{
    protected $fillable = ['orphan_file_id', 'full_name', 'disability_or_disease', 'under_medical_followup', 'monthly_expenses', 'chronic_diseases'];

    public function orphanFile()
    {
        return $this->belongsTo(OrphanFile::class);
    }
}