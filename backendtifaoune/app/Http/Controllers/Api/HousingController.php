<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Housing;
use App\Models\OrphanFile;
use Illuminate\Http\Request;

class HousingController extends Controller
{
    public function show($orphanFileId)
    {
        $file = OrphanFile::findOrFail($orphanFileId);
        $this->authorize('view', $file);
        return response()->json($file->housing);
    }

    public function store(Request $request, $orphanFileId)
    {
        $file = OrphanFile::findOrFail($orphanFileId);
        $this->authorize('update', $file);

        $data = $request->validate([
            'type' => 'nullable|string',
            'condition' => 'nullable|string',
            'rooms' => 'nullable|integer',
            'water' => 'nullable|boolean',
            'electricity' => 'nullable|boolean',
            'sewer' => 'nullable|boolean',
            'equipments' => 'nullable|string',
        ]);

        $record = Housing::updateOrCreate(
            ['orphan_file_id' => $orphanFileId],
            $data
        );

        return response()->json($record);
    }
}
