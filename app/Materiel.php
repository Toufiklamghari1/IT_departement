<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Materiel extends Model
{
    //
    protected $table = 'materiel';
    protected $primaryKey = 'matID';
    public $incrementing = true;
    protected $keyType = 'int';
    public $timestamps = false;
    protected $dateFormat = 'U';
    protected $connection = 'mysql';
    protected $fillable = [
        'designationID','active'
    ];
    protected $designationID;
    protected $active;
}
