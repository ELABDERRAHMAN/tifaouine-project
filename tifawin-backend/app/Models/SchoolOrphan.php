<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SchoolOrphan extends Model
{
    use HasFactory;

    protected $fillable = [
        'orphan_file_id',
        'school_name',
        'level',
        'year',
        'is_successful',
        'notes',
    ];

    public function orphanFile()
    {
        return $this->belongsTo(OrphanFile::class);
    }
}
