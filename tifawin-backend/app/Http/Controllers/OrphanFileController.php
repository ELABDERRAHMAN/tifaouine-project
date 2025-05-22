<?php

namespace App\Http\Controllers;

use App\Models\OrphanFile;
use Illuminate\Http\Request;

class OrphanFileController extends Controller
{
    public function uploadFile(Request $request, $id)
{
    $orphan = OrphanFile::findOrFail($id);

    $request->validate([
        'file' => 'required|file|mimes:jpg,jpeg,png,pdf|max:2048',
    ]);

    $path = $request->file('file')->store('orphans', 'public');

    $orphan->update([
        'file_path' => $path,
    ]);

    return response()->json([
        'message' => 'File uploaded successfully',
        'file_url' => asset('storage/' . $path)
    ]);
}

    // 🟢 GET /api/orphan-files
    public function index()
    {
        return response()->json(OrphanFile::all(), 200);
    }

    // 🟢 POST /api/orphan-files
    public function store(Request $request)
    {
        $data = $request->validate([
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'birth_date' => 'nullable|date',
            'gender' => 'required|string|in:male,female',
            'cin' => 'nullable|string',
            'photo_path' => 'nullable|string',
            'notes' => 'nullable|string',
        ]);

        $orphan = OrphanFile::create($data);

        return response()->json($orphan, 201);
    }

    // 🟢 GET /api/orphan-files/{id}
    public function show($id)
    {
        $orphan = OrphanFile::find($id);

        if (!$orphan) {
            return response()->json(['message' => 'Not found'], 404);
        }

        return response()->json($orphan, 200);
    }

    // 🟢 PUT /api/orphan-files/{id}
    public function update(Request $request, $id)
    {
        $orphan = OrphanFile::find($id);

        if (!$orphan) {
            return response()->json(['message' => 'Not found'], 404);
        }

        $data = $request->validate([
            'first_name' => 'sometimes|required|string',
            'last_name' => 'sometimes|required|string',
            'birth_date' => 'nullable|date',
            'gender' => 'sometimes|required|string|in:male,female',
            'cin' => 'nullable|string',
            'photo_path' => 'nullable|string',
            'notes' => 'nullable|string',
        ]);

        $orphan->update($data);

        return response()->json($orphan, 200);
    }

    // 🟢 DELETE /api/orphan-files/{id}
    public function destroy($id)
    {
        $orphan = OrphanFile::find($id);

        if (!$orphan) {
            return response()->json(['message' => 'Not found'], 404);
        }

        $orphan->delete();

        return response()->json(['message' => 'Deleted successfully'], 200);
    }
}
