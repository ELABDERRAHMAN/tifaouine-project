<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExternalAssistance extends Model
{
    use HasFactory;

    protected $fillable = [
        'orphan_file_id',
        'source',
        'type',
        'estimated_value',
        'notes',
    ];

    public function orphanFile()
    {
        return $this->belongsTo(OrphanFile::class);
    }
}
