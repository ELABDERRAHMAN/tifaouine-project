<?php

namespace App\Policies;

use App\Models\User;
use App\Models\OrphanFile;
use Illuminate\Auth\Access\HandlesAuthorization;

class OrphanFilePolicy
{
    use HandlesAuthorization;

    /**
     * السماح بمشاهدة قائمة الملفات.
     */
    public function viewAny(User $user)
    {
        return true;
    }

    /**
     * السماح بمشاهدة ملف معين.
     */
    public function view(User $user, OrphanFile $orphan)
    {
        return true;
    }

    /**
     * السماح بإنشاء ملف جديد.
     */
    public function create(User $user)
    {
        return $user->role === 'admin';
    }

    /**
     * السماح بالتعديل.
     */
    public function update(User $user, OrphanFile $orphan)
    {
        return $user->role === 'admin';
    }

    /**
     * السماح بالحذف.
     */
    public function delete(User $user, OrphanFile $orphan)
    {
        return $user->role === 'admin';
    }
}
