<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SchoolOrphan extends Model
{
    protected $fillable = ['orphan_file_id', 'full_name', 'birth_date', 'level', 'institution', 'repetition_years', 'study_issues', 'can_receive_support', 'future_plans'];

    public function orphanFile()
    {
        return $this->belongsTo(OrphanFile::class);
    }
}