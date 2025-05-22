<?php

namespace App\Http\Controllers;

use App\Models\ExternalAssistance;
use Illuminate\Http\Request;

class ExternalAssistanceController extends Controller
{
    public function index()
    {
        return response()->json(ExternalAssistance::all(), 200);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'orphan_file_id' => 'required|exists:orphan_files,id',
            'source' => 'required|string',
            'type' => 'required|string',
            'estimated_value' => 'nullable|numeric',
            'notes' => 'nullable|string',
        ]);

        $assistance = ExternalAssistance::create($data);
        return response()->json($assistance, 201);
    }

    public function show($id)
    {
        $assistance = ExternalAssistance::find($id);
        if (!$assistance) return response()->json(['message' => 'Not found'], 404);
        return response()->json($assistance, 200);
    }

    public function update(Request $request, $id)
    {
        $assistance = ExternalAssistance::find($id);
        if (!$assistance) return response()->json(['message' => 'Not found'], 404);

        $data = $request->validate([
            'source' => 'sometimes|required|string',
            'type' => 'sometimes|required|string',
            'estimated_value' => 'nullable|numeric',
            'notes' => 'nullable|string',
        ]);

        $assistance->update($data);
        return response()->json($assistance, 200);
    }

    public function destroy($id)
    {
        $assistance = ExternalAssistance::find($id);
        if (!$assistance) return response()->json(['message' => 'Not found'], 404);

        $assistance->delete();
        return response()->json(['message' => 'Deleted'], 200);
    }
}
