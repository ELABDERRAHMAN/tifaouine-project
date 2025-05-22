<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;

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

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// ✅ مسارات عامة (بدون تسجيل دخول)
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// ✅ مسارات محمية للمصادقة
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});

// ✅ مسارات محمية للموظف و المسؤول معًا
Route::middleware(['auth:sanctum', 'role:admin,employe'])->group(function () {
    Route::apiResource('family-members', FamilyMemberController::class);
    Route::apiResource('school-orphans', SchoolOrphanController::class);
    Route::apiResource('trainings', TrainingController::class);
    Route::apiResource('unemployeds', UnemployedController::class);
    Route::apiResource('health-statuses', HealthStatusController::class);
    Route::apiResource('housings', HousingController::class);
    Route::apiResource('income-activities', IncomeActivityController::class);
    Route::apiResource('external-assistances', ExternalAssistanceController::class);
    Route::apiResource('educational-situations', EducationalSituationController::class);

    // 👥 لوحة عامة (مثال فقط)
    Route::get('/dashboard', fn () => ['data' => 'visible to admin & employe']);
});

// ✅ مسارات خاصة بـ admin فقط
Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::apiResource('orphan-files', OrphanFileController::class);
    Route::post('orphan-files/{id}/upload', [OrphanFileController::class, 'uploadFile']);
});