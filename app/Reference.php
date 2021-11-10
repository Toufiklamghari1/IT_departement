<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Reference extends Model
{
    //
    protected $table = 'reference';
    protected $primaryKey = 'refID';
    public $incrementing = true;
    protected $keyType = 'int';
    public $timestamps = false;
    protected $dateFormat = 'U';
    protected $connection = 'mysql';
    protected $fillable = [
        'refID','ref','designationID'
    ];
    protected $refID;
    protected $ref;
    protected $designationID; 
}
