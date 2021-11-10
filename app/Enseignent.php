<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Enseignent extends Model
{
    protected $table='enseignant';
    protected $primaryKey='enseignantID';
    public $incrementing = false;
    protected $keyType = 'int';
    public $timestamps = false;
    protected $dateFormat = 'U';
    protected $connection = 'mysql';
    protected $fillable = ['Grade' , 'DateRecrutement'];

    public function person(){
        $this->belongsTo('App\Person');
    }
    public function enseignent_bureau(){
        $this->hasOne('App\Enseignent_Bureau','enseignantID','enseignantID');
    }
}
