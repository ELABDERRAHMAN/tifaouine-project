<?php

namespace App\Http\Controllers;

use App\Models\Housing;
use Illuminate\Http\Request;

class HousingController extends Controller
{
    public function index()
    {
        return response()->json(Housing::all(), 200);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'orphan_file_id' => 'required|exists:orphan_files,id',
            'housing_type' => 'required|string',
            'building_type' => 'nullable|string',
            'rooms_number' => 'nullable|integer',
            'has_water' => 'boolean',
            'has_electricity' => 'boolean',
            'description' => 'nullable|string',
        ]);

        $housing = Housing::create($data);
        return response()->json($housing, 201);
    }

    public function show($id)
    {
        $housing = Housing::find($id);
        if (!$housing) return response()->json(['message' => 'Not found'], 404);
        return response()->json($housing, 200);
    }

    public function update(Request $request, $id)
    {
        $housing = Housing::find($id);
        if (!$housing) return response()->json(['message' => 'Not found'], 404);

        $data = $request->validate([
            'housing_type' => 'sometimes|required|string',
            'building_type' => 'nullable|string',
            'rooms_number' => 'nullable|integer',
            'has_water' => 'boolean',
            'has_electricity' => 'boolean',
            'description' => 'nullable|string',
        ]);

        $housing->update($data);
        return response()->json($housing, 200);
    }

    public function destroy($id)
    {
        $housing = Housing::find($id);
        if (!$housing) return response()->json(['message' => 'Not found'], 404);

        $housing->delete();
        return response()->json(['message' => 'Deleted'], 200);
    }
}
