<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Unemployed extends Model
{
    protected $fillable = ['orphan_file_id', 'full_name', 'education_level', 'skills', 'unemployment_reason', 'unemployment_duration', 'future_plans'];

    public function orphanFile()
    {
        return $this->belongsTo(OrphanFile::class);
    }
}