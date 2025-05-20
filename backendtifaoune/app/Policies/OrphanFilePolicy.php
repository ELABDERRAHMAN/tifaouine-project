<?php

namespace App\Policies;

use App\Models\User;
use App\Models\OrphanFile;

class OrphanFilePolicy
{
    public function view(User $user, OrphanFile $file)
    {
        return $user->role === 'admin' || $user->id === $file->user_id;
    }

    public function update(User $user, OrphanFile $file)
    {
        return $user->role === 'admin' || $user->id === $file->user_id;
    }

    public function delete(User $user, OrphanFile $file)
    {
        return $user->role === 'admin' || $user->id === $file->user_id;
    }
}
