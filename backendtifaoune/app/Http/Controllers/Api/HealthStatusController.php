<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\HealthStatus;
use App\Models\OrphanFile;
use Illuminate\Http\Request;

class HealthStatusController extends Controller
{
    public function index($orphanFileId)
    {
        $file = OrphanFile::findOrFail($orphanFileId);
        $this->authorize('view', $file);
        return response()->json($file->healthStatuses);
    }

    public function store(Request $request, $orphanFileId)
    {
        $file = OrphanFile::findOrFail($orphanFileId);
        $this->authorize('update', $file);

        $data = $request->validate([
            'name' => 'required|string',
            'disability_or_disease' => 'nullable|string',
            'medical_followup' => 'nullable|string',
            'monthly_expenses' => 'nullable|numeric',
            'chronic_diseases' => 'nullable|string',
        ]);

        $data['orphan_file_id'] = $orphanFileId;
        $record = HealthStatus::create($data);
        return response()->json($record, 201);
    }

    public function show($id)
    {
        $record = HealthStatus::findOrFail($id);
        $this->authorize('view', $record->orphanFile);
        return response()->json($record);
    }

    public function update(Request $request, $id)
    {
        $record = HealthStatus::findOrFail($id);
        $this->authorize('update', $record->orphanFile);

        $data = $request->validate([
            'name' => 'sometimes|string',
            'disability_or_disease' => 'nullable|string',
            'medical_followup' => 'nullable|string',
            'monthly_expenses' => 'nullable|numeric',
            'chronic_diseases' => 'nullable|string',
        ]);

        $record->update($data);
        return response()->json($record);
    }

    public function destroy($id)
    {
        $record = HealthStatus::findOrFail($id);
        $this->authorize('delete', $record->orphanFile);
        $record->delete();
        return response()->json(['message' => 'تم الحذف']);
    }
}
