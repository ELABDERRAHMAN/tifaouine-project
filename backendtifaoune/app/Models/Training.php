<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Training extends Model
{
    protected $fillable = ['orphan_file_id', 'full_name', 'dropout_date', 'institution', 'training_type', 'issues', 'future_plans'];

    public function orphanFile()
    {
        return $this->belongsTo(OrphanFile::class);
    }
}