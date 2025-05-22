<?php

namespace App\Http\Controllers;

use App\Models\IncomeActivity;
use Illuminate\Http\Request;

class IncomeActivityController extends Controller
{
    public function index()
    {
        return response()->json(IncomeActivity::all(), 200);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'orphan_file_id' => 'required|exists:orphan_files,id',
            'activity_type' => 'required|string',
            'monthly_income' => 'nullable|numeric',
            'income_source' => 'nullable|string',
            'notes' => 'nullable|string',
        ]);

        $activity = IncomeActivity::create($data);
        return response()->json($activity, 201);
    }

    public function show($id)
    {
        $activity = IncomeActivity::find($id);
        if (!$activity) return response()->json(['message' => 'Not found'], 404);
        return response()->json($activity, 200);
    }

    public function update(Request $request, $id)
    {
        $activity = IncomeActivity::find($id);
        if (!$activity) return response()->json(['message' => 'Not found'], 404);

        $data = $request->validate([
            'activity_type' => 'sometimes|required|string',
            'monthly_income' => 'nullable|numeric',
            'income_source' => 'nullable|string',
            'notes' => 'nullable|string',
        ]);

        $activity->update($data);
        return response()->json($activity, 200);
    }

    public function destroy($id)
    {
        $activity = IncomeActivity::find($id);
        if (!$activity) return response()->json(['message' => 'Not found'], 404);

        $activity->delete();
        return response()->json(['message' => 'Deleted'], 200);
    }
}
