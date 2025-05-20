<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FamilyMember extends Model
{
    protected $fillable = ['orphan_file_id', 'full_name', 'relationship', 'birth_date', 'occupation', 'income', 'expenses'];

    public function orphanFile()
    {
        return $this->belongsTo(OrphanFile::class);
    }
}