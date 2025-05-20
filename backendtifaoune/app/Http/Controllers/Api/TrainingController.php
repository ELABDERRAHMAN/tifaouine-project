<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\OrphanFile;
use App\Models\Training;
use Illuminate\Http\Request;

class TrainingController extends Controller
{
    public function index($orphanFileId)
    {
        $file = OrphanFile::findOrFail($orphanFileId);
        $this->authorize('view', $file);
        return response()->json($file->trainings);
    }

    public function store(Request $request, $orphanFileId)
    {
        $file = OrphanFile::findOrFail($orphanFileId);
        $this->authorize('update', $file);

        $data = $request->validate([
            'name' => 'required|string',
            'dropout_date' => 'nullable|date',
            'institution' => 'nullable|string',
            'training_type' => 'nullable|string',
            'problems' => 'nullable|string',
            'future' => 'nullable|string',
        ]);

        $data['orphan_file_id'] = $orphanFileId;
        $record = Training::create($data);
        return response()->json($record, 201);
    }

    public function show($id)
    {
        $record = Training::findOrFail($id);
        $this->authorize('view', $record->orphanFile);
        return response()->json($record);
    }

    public function update(Request $request, $id)
    {
        $record = Training::findOrFail($id);
        $this->authorize('update', $record->orphanFile);

        $data = $request->validate([
            'name' => 'sometimes|string',
            'dropout_date' => 'nullable|date',
            'institution' => 'nullable|string',
            'training_type' => 'nullable|string',
            'problems' => 'nullable|string',
            'future' => 'nullable|string',
        ]);

        $record->update($data);
        return response()->json($record);
    }

    public function destroy($id)
    {
        $record = Training::findOrFail($id);
        $this->authorize('delete', $record->orphanFile);
        $record->delete();
        return response()->json(['message' => 'تم الحذف']);
    }
}
