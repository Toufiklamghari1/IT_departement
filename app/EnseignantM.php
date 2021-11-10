<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class EnseignantM extends Model
{
    //
    protected $table = 'enseignant_materiel';
    protected $primaryKey = 'matID,enseignantID,date';
    public $incrementing = false;
    public $timestamps = false;
    protected $dateFormat = 'U';
    protected $connection = 'mysql';
    protected $fillable = [
        'quantite','active','partage'
    ];
}
