<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\OrphanFile;
use App\Models\Unemployed;
use Illuminate\Http\Request;

class UnemployedController extends Controller
{
    public function index($orphanFileId)
    {
        $file = OrphanFile::findOrFail($orphanFileId);
        $this->authorize('view', $file);
        return response()->json($file->unemployed);
    }

    public function store(Request $request, $orphanFileId)
    {
        $file = OrphanFile::findOrFail($orphanFileId);
        $this->authorize('update', $file);

        $data = $request->validate([
            'name' => 'required|string',
            'education_level' => 'nullable|string',
            'skills' => 'nullable|string',
            'unemployment_reason' => 'nullable|string',
            'unemployment_duration' => 'nullable|string',
            'future' => 'nullable|string',
        ]);

        $data['orphan_file_id'] = $orphanFileId;
        $record = Unemployed::create($data);
        return response()->json($record, 201);
    }

    public function show($id)
    {
        $record = Unemployed::findOrFail($id);
        $this->authorize('view', $record->orphanFile);
        return response()->json($record);
    }

    public function update(Request $request, $id)
    {
        $record = Unemployed::findOrFail($id);
        $this->authorize('update', $record->orphanFile);

        $data = $request->validate([
            'name' => 'sometimes|string',
            'education_level' => 'nullable|string',
            'skills' => 'nullable|string',
            'unemployment_reason' => 'nullable|string',
            'unemployment_duration' => 'nullable|string',
            'future' => 'nullable|string',
        ]);

        $record->update($data);
        return response()->json($record);
    }

    public function destroy($id)
    {
        $record = Unemployed::findOrFail($id);
        $this->authorize('delete', $record->orphanFile);
        $record->delete();
        return response()->json(['message' => 'تم الحذف']);
    }
}
