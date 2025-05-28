<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrphanLog extends Model
{
    protected $fillable = ['orphan_file_id', 'user_id', 'action'];

    public function orphan()
    {
        return $this->belongsTo(OrphanFile::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
