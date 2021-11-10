<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Person extends Model
{
    //
    protected $table = 'person';
    protected $primaryKey = 'personID';
    public $incrementing = true;
    protected $keyType = 'int';
    public $timestamps = false;
    protected $dateFormat = 'U';
    protected $connection = 'mysql';
    protected $fillable = ['Email' ,'Nom' , 'Prenom','active' ];
    public function enseignent(){
        $this->hasOne('App\Enseignent','personID','personID');
    }
}
