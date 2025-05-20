<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\{
    OrphanFileController,
    FamilyMemberController,
    SchoolOrphanController,
    TrainingController,
    UnemployedController,
    HealthStatusController,
    HousingController,
    IncomeActivityController,
    ExternalAssistanceController,
    EducationalSituationController
};
use App\Http\Controllers\Api\DashboardController;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/admin/dashboard', [DashboardController::class, 'index']);
});

Route::middleware('auth:sanctum')->group(function () {
    
    // ملفات الأيتام
    Route::apiResource('orphan-files', OrphanFileController::class);
    Route::get('/notifications', function () {
    return auth()->user()->notifications;
});

Route::post('/notifications/mark-as-read', function () {
    auth()->user()->unreadNotifications->markAsRead();
    return response()->json(['message' => 'تم تعليم الإشعارات كمقروءة']);
});
Route::get('orphan-files-search', [OrphanFileController::class, 'search']);


    // أفراد العائلة
    Route::get('orphan-files/{orphanFile}/family-members', [FamilyMemberController::class, 'index']);
    Route::post('orphan-files/{orphanFile}/family-members', [FamilyMemberController::class, 'store']);
    Route::get('family-members/{id}', [FamilyMemberController::class, 'show']);
    Route::put('family-members/{id}', [FamilyMemberController::class, 'update']);
    Route::delete('family-members/{id}', [FamilyMemberController::class, 'destroy']);

    // اليتامى المتمدرسون
    Route::get('orphan-files/{orphanFile}/school-orphans', [SchoolOrphanController::class, 'index']);
    Route::post('orphan-files/{orphanFile}/school-orphans', [SchoolOrphanController::class, 'store']);
    Route::get('school-orphans/{id}', [SchoolOrphanController::class, 'show']);
    Route::put('school-orphans/{id}', [SchoolOrphanController::class, 'update']);
    Route::delete('school-orphans/{id}', [SchoolOrphanController::class, 'destroy']);

    // التكوين المهني
    Route::apiResource('orphan-files.trainings', TrainingController::class)->shallow();

    // المنقطعين عن الدراسة أو العمل
    Route::apiResource('orphan-files.unemployeds', UnemployedController::class)->shallow();

    // الوضع الصحي
    Route::apiResource('orphan-files.health-statuses', HealthStatusController::class)->shallow();

    // السكن (one to one)
    Route::get('orphan-files/{orphanFile}/housing', [HousingController::class, 'show']);
    Route::post('orphan-files/{orphanFile}/housing', [HousingController::class, 'store']);

    // الأنشطة المدرة للدخل
    Route::apiResource('orphan-files.income-activities', IncomeActivityController::class)->shallow();

    // المساعدات الخارجية
    Route::apiResource('orphan-files.external-assistances', ExternalAssistanceController::class)->shallow();

    // الوضعية التربوية والأخلاقية (one to one)
    Route::get('orphan-files/{orphanFile}/educational-situation', [EducationalSituationController::class, 'show']);
   
    Route::post('orphan-files/{orphanFile}/educational-situation', [EducationalSituationController::class, 'store']);
    Route::post('orphan-files/{id}/upload', [OrphanFileController::class, 'uploadFile']);

});
