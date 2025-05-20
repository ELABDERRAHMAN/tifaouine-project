<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ExternalAssistance;
use App\Models\OrphanFile;
use Illuminate\Http\Request;

class ExternalAssistanceController extends Controller
{
    public function index($orphanFileId)
    {
        $file = OrphanFile::findOrFail($orphanFileId);
        $this->authorize('view', $file);
        return response()->json($file->externalAssistances);
    }

    public function store(Request $request, $orphanFileId)
    {
        $file = OrphanFile::findOrFail($orphanFileId);
        $this->authorize('update', $file);

        $data = $request->validate([
            'source' => 'required|string',
            'relationship' => 'nullable|string',
            'monthly_amount' => 'nullable|numeric',
            'duration' => 'nullable|string',
        ]);

        $data['orphan_file_id'] = $orphanFileId;
        $record = ExternalAssistance::create($data);
        return response()->json($record, 201);
    }

    public function show($id)
    {
        $record = ExternalAssistance::findOrFail($id);
        $this->authorize('view', $record->orphanFile);
        return response()->json($record);
    }

    public function update(Request $request, $id)
    {
        $record = ExternalAssistance::findOrFail($id);
        $this->authorize('update', $record->orphanFile);

        $data = $request->validate([
            'source' => 'sometimes|string',
            'relationship' => 'nullable|string',
            'monthly_amount' => 'nullable|numeric',
            'duration' => 'nullable|string',
        ]);

        $record->update($data);
        return response()->json($record);
    }

    public function destroy($id)
    {
        $record = ExternalAssistance::findOrFail($id);
        $this->authorize('delete', $record->orphanFile);
        $record->delete();
        return response()->json(['message' => 'تم الحذف']);
    }
}
