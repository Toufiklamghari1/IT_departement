<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MaterielA extends Model
{
    //
    protected $table = 'materiel_acquisition';
    protected $primaryKey = 'matID';
    public $incrementing = false;
    protected $keyType = 'int';
    public $timestamps = false;
    protected $dateFormat = 'U';
    protected $connection = 'mysql';
    protected $fillable = [
        'matID','quantite','dateAcquisition'
    ];
    protected $matID;
    protected $quantite;
    protected $dateAcquisition;
}
