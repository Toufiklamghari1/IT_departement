<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Designation extends Model
{
    //
    protected $table = 'designation';
    protected $primaryKey = 'designationID';
    public $incrementing = true;
    protected $keyType = 'int';
    public $timestamps = false;
    protected $dateFormat = 'U';
    protected $connection = 'mysql';
    protected $fillable = [
        'designation','type','designationID'
    ];
    protected $designationID;
    protected $designation;
    protected $type;
}
