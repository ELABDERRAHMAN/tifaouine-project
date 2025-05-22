<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Training extends Model
{
    use HasFactory;

    protected $fillable = [
        'orphan_file_id',
        'title',
        'organizer',
        'start_date',
        'end_date',
        'description',
    ];

    public function orphanFile()
    {
        return $this->belongsTo(OrphanFile::class);
    }
}
