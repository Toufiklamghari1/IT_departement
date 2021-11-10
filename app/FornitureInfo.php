<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FornitureInfo extends Model
{
    //
    protected $table = 'forniture_info';
    protected $primaryKey = 'matID';
    public $incrementing = false;
    protected $keyType = 'int';
    public $timestamps = false;
    protected $dateFormat = 'U';
    protected $connection = 'mysql';
    protected $fillable = [
        'matID','commentaire','refID'
    ];
    protected $matID;
    protected $commentaire ;
    protected $refID;
}
