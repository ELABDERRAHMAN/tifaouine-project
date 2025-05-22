<?php

namespace App\Http\Controllers;

use App\Models\HealthStatus;
use Illuminate\Http\Request;

class HealthStatusController extends Controller
{
    public function index()
    {
        return response()->json(HealthStatus::all(), 200);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'orphan_file_id' => 'required|exists:orphan_files,id',
            'health_state' => 'required|string',
            'disease' => 'nullable|string',
            'description' => 'nullable|string',
        ]);

        $health = HealthStatus::create($data);
        return response()->json($health, 201);
    }

    public function show($id)
    {
        $health = HealthStatus::find($id);
        if (!$health) return response()->json(['message' => 'Not found'], 404);
        return response()->json($health, 200);
    }

    public function update(Request $request, $id)
    {
        $health = HealthStatus::find($id);
        if (!$health) return response()->json(['message' => 'Not found'], 404);

        $data = $request->validate([
            'health_state' => 'sometimes|required|string',
            'disease' => 'nullable|string',
            'description' => 'nullable|string',
        ]);

        $health->update($data);
        return response()->json($health, 200);
    }

    public function destroy($id)
    {
        $health = HealthStatus::find($id);
        if (!$health) return response()->json(['message' => 'Not found'], 404);

        $health->delete();
        return response()->json(['message' => 'Deleted'], 200);
    }
}
