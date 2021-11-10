<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class EquipementBureau extends Model
{
    //
    protected $table = 'equipement_bureau';
    protected $primaryKey = 'matID';
    public $incrementing = false;
    protected $keyType = 'int';
    public $timestamps = false;
    protected $dateFormat = 'U';
    protected $connection = 'mysql';
    protected $fillable = [
        'matID','numInventaire','refID'
    ];
    protected $matID;
    protected $numInventaire;
    protected $refID;
}
