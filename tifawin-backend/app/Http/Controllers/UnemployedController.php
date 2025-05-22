<?php

namespace App\Http\Controllers;

use App\Models\Unemployed;
use Illuminate\Http\Request;

class UnemployedController extends Controller
{
    public function index()
    {
        return response()->json(Unemployed::all(), 200);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'orphan_file_id' => 'required|exists:orphan_files,id',
            'person_name' => 'required|string',
            'relation' => 'required|string',
            'reason' => 'nullable|string',
            'notes' => 'nullable|string',
        ]);

        $unemployed = Unemployed::create($data);
        return response()->json($unemployed, 201);
    }

    public function show($id)
    {
        $unemployed = Unemployed::find($id);
        if (!$unemployed) return response()->json(['message' => 'Not found'], 404);
        return response()->json($unemployed, 200);
    }

    public function update(Request $request, $id)
    {
        $unemployed = Unemployed::find($id);
        if (!$unemployed) return response()->json(['message' => 'Not found'], 404);

        $data = $request->validate([
            'person_name' => 'sometimes|required|string',
            'relation' => 'sometimes|required|string',
            'reason' => 'nullable|string',
            'notes' => 'nullable|string',
        ]);

        $unemployed->update($data);
        return response()->json($unemployed, 200);
    }

    public function destroy($id)
    {
        $unemployed = Unemployed::find($id);
        if (!$unemployed) return response()->json(['message' => 'Not found'], 404);

        $unemployed->delete();
        return response()->json(['message' => 'Deleted'], 200);
    }
}
