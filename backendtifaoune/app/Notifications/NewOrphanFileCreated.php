<?php

namespace App\Notifications;

use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\DatabaseMessage;
use App\Models\OrphanFile;

class NewOrphanFileCreated extends Notification
{
    public $file;

    public function __construct(OrphanFile $file)
    {
        $this->file = $file;
    }

    public function via($notifiable)
    {
        return ['database'];
    }

    public function toDatabase($notifiable)
    {
        return [
            'title' => 'تم إضافة ملف اجتماعي جديد',
            'file_id' => $this->file->id,
            'created_by' => $this->file->user->name ?? 'مستخدم غير معروف',
        ];
    }
}
