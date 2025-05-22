<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EducationalSituation extends Model
{
    use HasFactory;

    protected $fillable = [
        'orphan_file_id',
        'school_behavior',
        'home_behavior',
        'psychological_status',
        'social_integration',
        'notes',
    ];

    public function orphanFile()
    {
        return $this->belongsTo(OrphanFile::class);
    }
}
