<?php

namespace App\Http\Controllers;

use App\Models\FamilyMember;
use Illuminate\Http\Request;

class FamilyMemberController extends Controller
{
    public function index()
    {
        return response()->json(FamilyMember::all(), 200);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'orphan_file_id' => 'required|exists:orphan_files,id',
            'name' => 'required|string',
            'relation' => 'required|string',
            'job' => 'nullable|string',
            'cin' => 'nullable|string',
            'age' => 'nullable|integer',
        ]);

        $member = FamilyMember::create($data);
        return response()->json($member, 201);
    }

    public function show($id)
    {
        $member = FamilyMember::find($id);
        if (!$member) return response()->json(['message' => 'Not found'], 404);
        return response()->json($member, 200);
    }

    public function update(Request $request, $id)
    {
        $member = FamilyMember::find($id);
        if (!$member) return response()->json(['message' => 'Not found'], 404);

        $data = $request->validate([
            'name' => 'sometimes|required|string',
            'relation' => 'sometimes|required|string',
            'job' => 'nullable|string',
            'cin' => 'nullable|string',
            'age' => 'nullable|integer',
        ]);

        $member->update($data);
        return response()->json($member, 200);
    }

    public function destroy($id)
    {
        $member = FamilyMember::find($id);
        if (!$member) return response()->json(['message' => 'Not found'], 404);

        $member->delete();
        return response()->json(['message' => 'Deleted'], 200);
    }
}
