<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\OrphanFile;
use App\Models\User;
use App\Models\SchoolOrphan;
use App\Models\IncomeActivity;
use Illuminate\Support\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        $totalFiles = OrphanFile::count();
        $totalEmployees = User::where('role', 'employe')->count();
        $newFilesThisMonth = OrphanFile::whereMonth('created_at', Carbon::now()->month)->count();
        $totalSchoolOrphans = SchoolOrphan::count();
        $totalIncome = IncomeActivity::sum('monthly_income');

        return response()->json([
            'total_files' => $totalFiles,
            'total_employees' => $totalEmployees,
            'new_files_this_month' => $newFilesThisMonth,
            'total_school_orphans' => $totalSchoolOrphans,
            'total_income' => $totalIncome,
        ]);
    }
}
