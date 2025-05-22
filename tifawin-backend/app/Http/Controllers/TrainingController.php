<?php

namespace App\Http\Controllers;

use App\Models\Training;
use Illuminate\Http\Request;

class TrainingController extends Controller
{
    public function index()
    {
        return response()->json(Training::all(), 200);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'orphan_file_id' => 'required|exists:orphan_files,id',
            'title' => 'required|string',
            'organizer' => 'nullable|string',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date',
            'description' => 'nullable|string',
        ]);

        $training = Training::create($data);
        return response()->json($training, 201);
    }

    public function show($id)
    {
        $training = Training::find($id);
        if (!$training) return response()->json(['message' => 'Not found'], 404);
        return response()->json($training, 200);
    }

    public function update(Request $request, $id)
    {
        $training = Training::find($id);
        if (!$training) return response()->json(['message' => 'Not found'], 404);

        $data = $request->validate([
            'title' => 'sometimes|required|string',
            'organizer' => 'nullable|string',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date',
            'description' => 'nullable|string',
        ]);

        $training->update($data);
        return response()->json($training, 200);
    }

    public function destroy($id)
    {
        $training = Training::find($id);
        if (!$training) return response()->json(['message' => 'Not found'], 404);

        $training->delete();
        return response()->json(['message' => 'Deleted'], 200);
    }
}
