<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class OrphanFile extends Model
{
    protected $fillable = ['user_id', 'status'];

    public function familyMembers(): HasMany
    {
        return $this->hasMany(FamilyMember::class);
    }

    public function schoolOrphans(): HasMany
    {
        return $this->hasMany(SchoolOrphan::class);
    }

    public function trainings(): HasMany
    {
        return $this->hasMany(Training::class);
    }

    public function unemployed(): HasMany
    {
        return $this->hasMany(Unemployed::class);
    }

    public function healthStatuses(): HasMany
    {
        return $this->hasMany(HealthStatus::class);
    }

    public function housing(): HasOne
    {
        return $this->hasOne(Housing::class);
    }

    public function incomeActivities(): HasMany
    {
        return $this->hasMany(IncomeActivity::class);
    }

    public function externalAssistances(): HasMany
    {
        return $this->hasMany(ExternalAssistance::class);
    }

    public function educationalSituation(): HasOne
    {
        return $this->hasOne(EducationalSituation::class);
    }
    // app/Models/OrphanFile.php

public function user()
{
    return $this->belongsTo(User::class);
}

}