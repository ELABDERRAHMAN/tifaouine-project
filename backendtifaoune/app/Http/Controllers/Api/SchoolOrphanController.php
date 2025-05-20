<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SchoolOrphan;
use App\Models\OrphanFile;
use Illuminate\Http\Request;

class SchoolOrphanController extends Controller
{
    public function index($orphanFileId)
    {
        $file = OrphanFile::findOrFail($orphanFileId);
        $this->authorize('view', $file);
        return SchoolOrphan::where('orphan_file_id', $orphanFileId)->get();
    }

    public function store(Request $request, $orphanFileId)
    {
        $file = OrphanFile::findOrFail($orphanFileId);
        $this->authorize('update', $file);

        $data = $request->all();
        $data['orphan_file_id'] = $orphanFileId;
        return SchoolOrphan::create($data);
    }

    public function show($id)
    {
        return SchoolOrphan::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $item = SchoolOrphan::findOrFail($id);
        $this->authorize('update', $item->orphanFile);
        $item->update($request->all());
        return response()->json(['message' => 'تم التحديث']);
    }

    public function destroy($id)
    {
        $item = SchoolOrphan::findOrFail($id);
        $this->authorize('delete', $item->orphanFile);
        $item->delete();
        return response()->json(['message' => 'تم الحذف']);
    }
}