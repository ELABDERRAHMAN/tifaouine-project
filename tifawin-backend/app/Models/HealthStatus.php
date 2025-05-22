<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HealthStatus extends Model
{
    use HasFactory;

    protected $fillable = [
        'orphan_file_id',
        'health_state',
        'disease',
        'description',
    ];

    public function orphanFile()
    {
        return $this->belongsTo(OrphanFile::class);
    }
}
