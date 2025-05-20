<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Housing extends Model
{
    protected $fillable = ['orphan_file_id', 'housing_type', 'housing_condition', 'room_count', 'water', 'electricity', 'sanitation', 'tv', 'fridge', 'washing_machine', 'blankets'];

    public function orphanFile()
    {
        return $this->belongsTo(OrphanFile::class);
    }
}

