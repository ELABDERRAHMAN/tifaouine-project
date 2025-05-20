<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class FamilyMemberController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, $orphanFileId)
{
    $orphanFile = OrphanFile::findOrFail($orphanFileId);
    $this->authorize('update', $orphanFile); // التحقق من صلاحية التعديل

    $data = $request->validate([
        'full_name' => 'required|string',
        'relationship' => 'required|string',
        'birth_date' => 'nullable|date',
        'occupation' => 'nullable|string',
        'income' => 'nullable|numeric',
        'expenses' => 'nullable|numeric',
    ]);

    $data['orphan_file_id'] = $orphanFileId;
    $member = FamilyMember::create($data);
    return response()->json(['message' => 'تمت الإضافة بنجاح', 'data' => $member], 201);
}

public function index($orphanFileId)
{
    $orphanFile = OrphanFile::findOrFail($orphanFileId);
    $this->authorize('view', $orphanFile);

    return response()->json($orphanFile->familyMembers);
}


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
