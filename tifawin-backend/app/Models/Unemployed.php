<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Unemployed extends Model
{
    use HasFactory;

    protected $fillable = [
        'orphan_file_id',
        'person_name',
        'relation',
        'reason',
        'notes',
    ];

    public function orphanFile()
    {
        return $this->belongsTo(OrphanFile::class);
    }
}
