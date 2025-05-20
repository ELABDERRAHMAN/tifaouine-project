<?php

namespace App\Http\Controllers\Api;
// app/Http/Controllers/Api/OrphanFileController.php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\OrphanFile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrphanFileController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        $query = OrphanFile::with([
            'familyMembers', 'schoolOrphans', 'trainings', 'unemployed',
            'healthStatuses', 'housing', 'incomeActivities', 'externalAssistances', 'educationalSituation'
        ]);

        if ($user->role !== 'admin') {
            $query->where('user_id', $user->id);
        }

        return response()->json($query->get());
    }

    public function store(Request $request)
    {
        $file = OrphanFile::create([
            'user_id' => Auth::id(),
            'status' => $request->input('status', 'draft')
        ]);

        return response()->json(['message' => 'تم إنشاء الملف', 'id' => $file->id], 201);
    }

    public function show($id)
    {
        $file = OrphanFile::with([
            'familyMembers', 'schoolOrphans', 'trainings', 'unemployed',
            'healthStatuses', 'housing', 'incomeActivities', 'externalAssistances', 'educationalSituation'
        ])->findOrFail($id);

        $this->authorize('view', $file);

        return response()->json($file);
    }

    public function update(Request $request, $id)
    {
        $file = OrphanFile::findOrFail($id);
        $this->authorize('update', $file);

        $file->update($request->only(['status']));

        return response()->json(['message' => 'تم التحديث']);
    }

    public function destroy($id)
    {
        $file = OrphanFile::findOrFail($id);
        $this->authorize('delete', $file);

        $file->delete();
        return response()->json(['message' => 'تم الحذف']);
    }
    public function search(Request $request)
{
    $query = OrphanFile::query();

    if ($request->filled('full_name')) {
        $query->whereHas('familyMembers', function ($q) use ($request) {
            $q->where('full_name', 'like', '%' . $request->full_name . '%');
        });
    }

    if ($request->filled('file_id')) {
        $query->where('id', $request->file_id);
    }

    if ($request->filled('school')) {
        $query->whereHas('schoolOrphans', function ($q) use ($request) {
            $q->where('institution', 'like', '%' . $request->school . '%');
        });
    }

    if ($request->filled('housing_type')) {
        $query->whereHas('housing', function ($q) use ($request) {
            $q->where('type', $request->housing_type);
        });
    }

    if ($request->filled('chronic_disease')) {
        $query->whereHas('healthStatuses', function ($q) use ($request) {
            $q->where('chronic_diseases', 'like', '%' . $request->chronic_disease . '%');
        });
    }

    if ($request->filled('income_min')) {
        $query->whereHas('incomeActivities', function ($q) use ($request) {
            $q->where('monthly_income', '>=', $request->income_min);
        });
    }

    if ($request->filled('created_from')) {
        $query->whereDate('created_at', '>=', $request->created_from);
    }

    if ($request->filled('created_to')) {
        $query->whereDate('created_at', '<=', $request->created_to);
    }

    // تطبيق صلاحيات العرض
    if (auth()->user()->role !== 'admin') {
        $query->where('user_id', auth()->id());
    }

    $results = $query->with([
        'familyMembers',
        'schoolOrphans',
        'housing',
        'healthStatuses',
        'incomeActivities'
    ])->paginate(20);

    return response()->json($results);
}

    public function uploadFile(Request $request, $id)
{
    $file = OrphanFile::findOrFail($id);
    $this->authorize('update', $file);

    $request->validate([
        'file' => 'required|file|mimes:jpg,jpeg,png,pdf|max:2048',
    ]);

    $path = $request->file('file')->store('orphans', 'public');
    $file->file_path = $path;
    $file->save();

    return response()->json(['message' => 'تم رفع الملف', 'path' => $path]);
}

}
