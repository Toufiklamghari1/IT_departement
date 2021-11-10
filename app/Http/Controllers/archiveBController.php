<?php

namespace App\Http\Controllers;

use App\Bureau;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class archiveBController extends Controller
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
