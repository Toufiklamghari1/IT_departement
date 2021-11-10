<?php

namespace App\Http\Controllers;

use App\Enseignent;
use App\Enseignent_bureau;
use App\Person;
use App\EnseignantM;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class archiveEController extends Controller
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
