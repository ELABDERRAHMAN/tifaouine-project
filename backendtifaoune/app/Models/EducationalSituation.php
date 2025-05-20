<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EducationalSituation extends Model
{
    protected $fillable = ['orphan_file_id', 'mother_orphan_relationship', 'cleanliness_and_clothing', 'study_attention', 'neighbor_relationship', 'notes'];

    public function orphanFile()
    {
        return $this->belongsTo(OrphanFile::class);
    }
}
