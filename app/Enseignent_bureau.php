<?php

namespace App;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Enseignent_bureau extends Model
{
    protected $table='enseignant_bureau';
    protected $primaryKey=['enseignantID','BureauID','date'];
    public $incrementing = false;
    public $timestamps = false;
    protected $fillable = ['enseignantID' , 'bureauID','date'];

    public function enseignent(){
        $this->belongsTo('App\Enseignent','enseignantID','enseignantID');
    }
    public function bureau(){
        $this->belongsToMany('App\Bureau','BureauID','Num');
    }
}
