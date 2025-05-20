<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExternalAssistance extends Model
{
    protected $fillable = ['orphan_file_id', 'source', 'relationship', 'monthly_value', 'duration'];

    public function orphanFile()
    {
        return $this->belongsTo(OrphanFile::class);
    }
}