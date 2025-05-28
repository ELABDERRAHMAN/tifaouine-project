<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateOrphanRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'first_name' => 'sometimes|required|string',
            'last_name' => 'sometimes|required|string',
            'birth_date' => 'nullable|date',
            'gender' => 'sometimes|required|in:male,female',
            'cin' => 'nullable|string',
            'photo_path' => 'nullable|string',
            'notes' => 'nullable|string',
        ];
    }
}
