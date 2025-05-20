<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\EducationalSituation;
use App\Models\OrphanFile;
use Illuminate\Http\Request;

class EducationalSituationController extends Controller
{
    public function show($orphanFileId)
    {
        $file = OrphanFile::findOrFail($orphanFileId);
        $this->authorize('view', $file);
        return response()->json($file->educationalSituation);
    }

    public function store(Request $request, $orphanFileId)
    {
        $file = OrphanFile::findOrFail($orphanFileId);
        $this->authorize('update', $file);

        $data = $request->validate([
            'mother_orphan_relation' => 'nullable|string',
            'cleanliness' => 'nullable|string',
            'study_followup' => 'nullable|string',
            'neighbors_relation' => 'nullable|string',
            'notes' => 'nullable|string',
        ]);

        $record = EducationalSituation::updateOrCreate(
            ['orphan_file_id' => $orphanFileId],
            $data
        );

        return response()->json($record);
    }
}
