<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Designation;
use App\Materiel;
use App\Reference;
use App\EnseignantM;
use App\EquipementBureau;
use App\FornitureInfo;
use App\MaterielInfo;
use App\MaterielA;
use DateTime;
use Illuminate\Support\Facades\DB;

class archiveMController extends Controller
{
    //
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $bureau = DB::select(DB::raw("
            select * from bureau b where b.active= false
        "));
        return view('archive.archive',compact('bureau'));
    }
}
