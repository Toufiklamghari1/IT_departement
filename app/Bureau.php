<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Bureau extends Model
{
    //
    protected $table = 'bureau';
    protected $primaryKey = 'num';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;
    protected $dateFormat = 'U';
    protected $connection = 'mysql';
    protected $fillable = [
        'Num','Capacite','DateAcquisition','active'
    ];

    protected $Num;
    protected $Capacite;
    protected $Date;
    
}
