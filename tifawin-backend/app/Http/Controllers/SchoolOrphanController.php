<?php

namespace App\Http\Controllers;

use App\Models\SchoolOrphan;
use Illuminate\Http\Request;

class SchoolOrphanController extends Controller
{
    public function index()
    {
        return response()->json(SchoolOrphan::all(), 200);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'orphan_file_id' => 'required|exists:orphan_files,id',
            'school_name' => 'required|string',
            'level' => 'required|string',
            'year' => 'required|string',
            'is_successful' => 'boolean',
            'notes' => 'nullable|string',
        ]);

        $school = SchoolOrphan::create($data);
        return response()->json($school, 201);
    }

    public function show($id)
    {
        $school = SchoolOrphan::find($id);
        if (!$school) return response()->json(['message' => 'Not found'], 404);
        return response()->json($school, 200);
    }

    public function update(Request $request, $id)
    {
        $school = SchoolOrphan::find($id);
        if (!$school) return response()->json(['message' => 'Not found'], 404);

        $data = $request->validate([
            'school_name' => 'sometimes|required|string',
            'level' => 'sometimes|required|string',
            'year' => 'sometimes|required|string',
            'is_successful' => 'boolean',
            'notes' => 'nullable|string',
        ]);

        $school->update($data);
        return response()->json($school, 200);
    }

    public function destroy($id)
    {
        $school = SchoolOrphan::find($id);
        if (!$school) return response()->json(['message' => 'Not found'], 404);

        $school->delete();
        return response()->json(['message' => 'Deleted'], 200);
    }
}
