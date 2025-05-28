<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\OrphanFile;
use App\Models\User;
use App\Models\Training;
use App\Models\HealthStatus;

class StatsController extends Controller
{
    /**
     * عرض إحصائيات لوحة التحكم
     */
    public function index()
    {
        try {
            $stats = [
                'orphans' => OrphanFile::count(),
                'users' => User::count(),
                'trainings' => Training::count(),
                'health_statuses' => HealthStatus::count(),
                'recent_orphans' => OrphanFile::latest()->take(5)->get(),
                'monthly_stats' => $this->getMonthlyStats(),
            ];

            return response()->json([
                'success' => true,
                'data' => $stats
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'فشل في جلب الإحصائيات',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * إحصائيات مفصلة
     */
    public function detailed(Request $request)
    {
        try {
            $period = $request->get('period', 'month'); // week, month, year
            
            $stats = [
                'orphans_by_status' => $this->getOrphansByStatus(),
                'users_by_role' => $this->getUsersByRole(),
                'monthly_registrations' => $this->getMonthlyRegistrations($period),
                'age_distribution' => $this->getAgeDistribution(),
            ];

            return response()->json([
                'success' => true,
                'data' => $stats
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'فشل في جلب الإحصائيات المفصلة',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * تصدير تقرير
     */
    public function export($type, Request $request)
    {
        try {
            $data = [];
            
            switch ($type) {
                case 'pdf':
                    $data = $this->generatePDFReport($request);
                    break;
                case 'excel':
                    $data = $this->generateExcelReport($request);
                    break;
                case 'csv':
                    $data = $this->generateCSVReport($request);
                    break;
                default:
                    throw new \Exception('نوع التقرير غير مدعوم');
            }

            return response()->json([
                'success' => true,
                'data' => $data,
                'message' => 'تم إنشاء التقرير بنجاح'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'فشل في تصدير التقرير',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * إحصائيات شهرية
     */
    private function getMonthlyStats()
    {
        $currentMonth = now()->month;
        $currentYear = now()->year;

        return [
            'current_month_orphans' => OrphanFile::whereMonth('created_at', $currentMonth)
                                                ->whereYear('created_at', $currentYear)
                                                ->count(),
            'last_month_orphans' => OrphanFile::whereMonth('created_at', $currentMonth - 1)
                                              ->whereYear('created_at', $currentYear)
                                              ->count(),
            'growth_percentage' => $this->calculateGrowthPercentage(),
        ];
    }

    /**
     * الأيتام حسب الحالة
     */
    private function getOrphansByStatus()
    {
        // يمكن تخصيص هذا حسب حقول قاعدة البيانات
        return [
            'active' => OrphanFile::count(), // مؤقتاً
            'inactive' => 0,
            'pending' => 0,
        ];
    }

    /**
     * المستخدمين حسب الدور
     */
    private function getUsersByRole()
    {
        return [
            'admin' => User::where('role', 'admin')->count(),
            'employe' => User::where('role', 'employe')->count(),
        ];
    }

    /**
     * التسجيلات الشهرية
     */
    private function getMonthlyRegistrations($period)
    {
        $months = [];
        $startDate = now()->subMonths(11)->startOfMonth();

        for ($i = 0; $i < 12; $i++) {
            $date = $startDate->copy()->addMonths($i);
            $months[] = [
                'month' => $date->format('Y-m'),
                'count' => OrphanFile::whereYear('created_at', $date->year)
                                    ->whereMonth('created_at', $date->month)
                                    ->count()
            ];
        }

        return $months;
    }

    /**
     * توزيع الأعمار
     */
    private function getAgeDistribution()
    {
        // مؤقتاً - يمكن تخصيص هذا حسب حقول قاعدة البيانات
        return [
            '0-5' => 0,
            '6-10' => 0,
            '11-15' => 0,
            '16-18' => 0,
        ];
    }

    /**
     * حساب نسبة النمو
     */
    private function calculateGrowthPercentage()
    {
        $currentMonth = OrphanFile::whereMonth('created_at', now()->month)->count();
        $lastMonth = OrphanFile::whereMonth('created_at', now()->subMonth()->month)->count();

        if ($lastMonth == 0) return 0;

        return round((($currentMonth - $lastMonth) / $lastMonth) * 100, 2);
    }

    /**
     * إنشاء تقرير PDF
     */
    private function generatePDFReport($request)
    {
        // تنفيذ إنشاء PDF
        return ['url' => '/reports/stats.pdf'];
    }

    /**
     * إنشاء تقرير Excel
     */
    private function generateExcelReport($request)
    {
        // تنفيذ إنشاء Excel
        return ['url' => '/reports/stats.xlsx'];
    }

    /**
     * إنشاء تقرير CSV
     */
    private function generateCSVReport($request)
    {
        // تنفيذ إنشاء CSV
        return ['url' => '/reports/stats.csv'];
    }
}