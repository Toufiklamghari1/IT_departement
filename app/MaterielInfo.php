<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MaterielInfo extends Model
{
    //
    protected $table = 'materiel_info';
    protected $primaryKey = 'matID';
    public $incrementing = false;
    protected $keyType = 'int';
    public $timestamps = false;
    protected $dateFormat = 'U';
    protected $connection = 'mysql';
    protected $fillable = [
        'matID','numInventaire','commentaire','refID'
    ];
    protected $matID;
    protected $numInventaire;
    protected $commentaire ;
    protected $refID;

}
