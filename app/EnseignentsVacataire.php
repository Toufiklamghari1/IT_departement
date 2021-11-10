<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class EnseignentsVacataire extends Model
{
    //
    protected $table = 'enseignantVacataire';
    protected $primaryKey = 'enseignantVacataireID';
    public $incrementing = false;
    protected $keyType = 'int';
    public $timestamps = false;
    protected $dateFormat = 'U';
    protected $connection = 'mysql';
    protected $fillable = [
       'etablisement','grade','dateDebut','dateFin','numT'
    ];
    public function person(){
        $this->belongsTo('App\Person');
    }
}
