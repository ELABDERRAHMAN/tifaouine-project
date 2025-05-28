<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreOrphanRequest extends FormRequest
{
    public function authorize()
    {
        return true; // 👈 مهم باش تسمح بتمرير الطلب
    }

    public function rules()
    {
        return [
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'birth_date' => 'nullable|date',
            'gender' => 'required|in:male,female',
            'cin' => 'nullable|string',
            'photo_path' => 'nullable|string',
            'notes' => 'nullable|string',
        ];
    }
}
