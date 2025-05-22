<?php

namespace App\Http\Controllers;

use App\Models\EducationalSituation;
use Illuminate\Http\Request;

class EducationalSituationController extends Controller
{
    public function index()
    {
        return response()->json(EducationalSituation::all(), 200);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'orphan_file_id' => 'required|exists:orphan_files,id',
            'school_behavior' => 'nullable|string',
            'home_behavior' => 'nullable|string',
            'psychological_status' => 'nullable|string',
            'social_integration' => 'nullable|string',
            'notes' => 'nullable|string',
        ]);

        $situation = EducationalSituation::create($data);
        return response()->json($situation, 201);
    }

    public function show($id)
    {
        $situation = EducationalSituation::find($id);
        if (!$situation) return response()->json(['message' => 'Not found'], 404);
        return response()->json($situation, 200);
    }

    public function update(Request $request, $id)
    {
        $situation = EducationalSituation::find($id);
        if (!$situation) return response()->json(['message' => 'Not found'], 404);

        $data = $request->validate([
            'school_behavior' => 'nullable|string',
            'home_behavior' => 'nullable|string',
            'psychological_status' => 'nullable|string',
            'social_integration' => 'nullable|string',
            'notes' => 'nullable|string',
        ]);

        $situation->update($data);
        return response()->json($situation, 200);
    }

    public function destroy($id)
    {
        $situation = EducationalSituation::find($id);
        if (!$situation) return response()->json(['message' => 'Not found'], 404);

        $situation->delete();
        return response()->json(['message' => 'Deleted'], 200);
    }
}
