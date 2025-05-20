<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\IncomeActivity;
use App\Models\OrphanFile;
use Illuminate\Http\Request;

class IncomeActivityController extends Controller
{
    public function index($orphanFileId)
    {
        $file = OrphanFile::findOrFail($orphanFileId);
        $this->authorize('view', $file);
        return response()->json($file->incomeActivities);
    }

    public function store(Request $request, $orphanFileId)
    {
        $file = OrphanFile::findOrFail($orphanFileId);
        $this->authorize('update', $file);

        $data = $request->validate([
            'name' => 'required|string',
            'occupation' => 'nullable|string',
            'monthly_income' => 'nullable|numeric',
            'skills' => 'nullable|string',
        ]);

        $data['orphan_file_id'] = $orphanFileId;
        $record = IncomeActivity::create($data);
        return response()->json($record, 201);
    }

    public function show($id)
    {
        $record = IncomeActivity::findOrFail($id);
        $this->authorize('view', $record->orphanFile);
        return response()->json($record);
    }

    public function update(Request $request, $id)
    {
        $record = IncomeActivity::findOrFail($id);
        $this->authorize('update', $record->orphanFile);

        $data = $request->validate([
            'name' => 'sometimes|string',
            'occupation' => 'nullable|string',
            'monthly_income' => 'nullable|numeric',
            'skills' => 'nullable|string',
        ]);

        $record->update($data);
        return response()->json($record);
    }

    public function destroy($id)
    {
        $record = IncomeActivity::findOrFail($id);
        $this->authorize('delete', $record->orphanFile);
        $record->delete();
        return response()->json(['message' => 'تم الحذف']);
    }
}
