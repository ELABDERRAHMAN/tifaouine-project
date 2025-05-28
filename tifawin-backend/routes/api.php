<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\OrphanController;
use App\Http\Controllers\OrphanFileController;
use App\Http\Controllers\FamilyMemberController;
use App\Http\Controllers\SchoolOrphanController;
use App\Http\Controllers\TrainingController;
use App\Http\Controllers\UnemployedController;
use App\Http\Controllers\HealthStatusController;
use App\Http\Controllers\HousingController;
use App\Http\Controllers\IncomeActivityController;
use App\Http\Controllers\ExternalAssistanceController;
use App\Http\Controllers\EducationalSituationController;
use App\Http\Controllers\StatsController;
use App\Http\Controllers\SponsorController;
use App\Http\Controllers\SettingsController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// 🔐 مصادقة Laravel Sanctum
Route::prefix('auth')->controller(AuthController::class)->group(function () {
    Route::post('/register', 'register');
    Route::post('/login', 'login');
    
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', 'logout');
        Route::get('/profile', 'profile');
    });
});

// ✅ مسارات محمية بـ Sanctum
Route::middleware('auth:sanctum')->group(function () {
    
    // إحصائيات عامة
    Route::get('/dashboard-stats', [StatsController::class, 'index']);
    Route::get('/statistics/detailed', [StatsController::class, 'detailed']);
    Route::get('/statistics/export/{type}', [StatsController::class, 'export']);
    
    // سجلات الأيتام
    Route::get('/orphan-logs', function () {
        return \App\Models\OrphanLog::with('orphan', 'user')->latest()->paginate(10);
    });
    
    // تحميل الملفات
    Route::get('/orphan-files/{id}/download', [OrphanFileController::class, 'download']);
    
    // مسارات الأيتام (متاحة لجميع المستخدمين المصادق عليهم)
    Route::apiResource('orphans', OrphanController::class);
    Route::post('/orphans/{id}/files', [OrphanFileController::class, 'uploadFiles']);
    Route::get('/orphans/{id}/files', [OrphanFileController::class, 'getFiles']);
    Route::delete('/orphans/{orphanId}/files/{fileId}', [OrphanFileController::class, 'deleteFile']);
    
    // مسارات الكفلاء
    Route::apiResource('sponsors', SponsorController::class);
    
    // الإعدادات
    Route::get('/settings', [SettingsController::class, 'index']);
    Route::put('/settings', [SettingsController::class, 'update']);
    Route::put('/settings/notifications', [SettingsController::class, 'updateNotifications']);
    
    // مسارات محدودة للموظفين والإداريين
    Route::middleware('can:manage-data')->group(function () {
        Route::apiResources([
            'family-members' => FamilyMemberController::class,
            'school-orphans' => SchoolOrphanController::class,
            'trainings' => TrainingController::class,
            'unemployeds' => UnemployedController::class,
            'health-statuses' => HealthStatusController::class,
            'housings' => HousingController::class,
            'income-activities' => IncomeActivityController::class,
            'external-assistances' => ExternalAssistanceController::class,
            'educational-situations' => EducationalSituationController::class,
        ]);
    });
    
    // مسارات محدودة للإداريين فقط
    Route::middleware('can:admin-access')->group(function () {
        Route::apiResource('orphan-files', OrphanFileController::class)->except(['show']);
        Route::post('orphan-files/{id}/upload', [OrphanFileController::class, 'uploadFile']);
    });
});