<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\OrphanFile;

class OrphanController extends Controller
{
    /**
     * عرض قائمة الأيتام
     */
    public function index(Request $request)
    {
        try {
            $perPage = $request->get('per_page', 15);
            $search = $request->get('search');

            $query = OrphanFile::query();

            if ($search) {
                $query->where('name', 'like', "%{$search}%")
                      ->orWhere('email', 'like', "%{$search}%");
            }

            $orphans = $query->latest()->paginate($perPage);

            return response()->json([
                'success' => true,
                'data' => $orphans
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'فشل في جلب قائمة الأيتام',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * إنشاء يتيم جديد
     */
    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email|unique:orphan_files,email',
                'phone' => 'nullable|string|max:20',
                'address' => 'nullable|string',
                'birth_date' => 'nullable|date',
                'notes' => 'nullable|string',
            ]);

            $orphan = OrphanFile::create($validatedData);

            return response()->json([
                'success' => true,
                'data' => $orphan,
                'message' => 'تم إنشاء ملف اليتيم بنجاح'
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'فشل في إنشاء ملف اليتيم',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * عرض يتيم محدد
     */
    public function show($id)
    {
        try {
            $orphan = OrphanFile::findOrFail($id);

            return response()->json([
                'success' => true,
                'data' => $orphan
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'لم يتم العثور على اليتيم',
                'error' => $e->getMessage()
            ], 404);
        }
    }

    /**
     * تحديث يتيم
     */
    public function update(Request $request, $id)
    {
        try {
            $orphan = OrphanFile::findOrFail($id);

            $validatedData = $request->validate([
                'name' => 'sometimes|required|string|max:255',
                'email' => 'sometimes|required|email|unique:orphan_files,email,' . $id,
                'phone' => 'nullable|string|max:20',
                'address' => 'nullable|string',
                'birth_date' => 'nullable|date',
                'notes' => 'nullable|string',
            ]);

            $orphan->update($validatedData);

            return response()->json([
                'success' => true,
                'data' => $orphan,
                'message' => 'تم تحديث ملف اليتيم بنجاح'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'فشل في تحديث ملف اليتيم',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * حذف يتيم
     */
    public function destroy($id)
    {
        try {
            $orphan = OrphanFile::findOrFail($id);
            $orphan->delete();

            return response()->json([
                'success' => true,
                'message' => 'تم حذف ملف اليتيم بنجاح'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'فشل في حذف ملف اليتيم',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}