<?php

namespace App\Http\Controllers;

use App\Bureau;
use App\Enseignent_bureau;
use App\Enseignent;
use DateTime;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class ArchiveBureau extends Controller
{
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

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $bureau = DB::select(DB::raw("
             SELECT if(p.active=1,'Actif','Non Actif') as active, p.Nom,p.Prenom,p.email FROM enseignant_bureau eb,enseignant e,person p where eb.bureauID= '$id' and eb.enseignantID=e.enseignantID and p.personID=e.enseignantID
        "));
        $mat_partage = DB::select(DB::raw("
            SELECT p.Nom,p.Prenom ,if(m.active=1,'Actif','Non Actif') as active, t.matID,d.designation from (SELECT em.enseignantID,em.matID,em.partage,eb.bureauID from enseignant_materiel em, enseignant e, enseignant_bureau eb where em.enseignantID=e.enseignantID and e.enseignantID=eb.enseignantID) as t,materiel m,designation d,person p  where t.bureauID='$id' and t.partage=true and m.matID=t.matID and m.designationID=d.designationID and t.enseignantID= p.personID
        "));
        $bureaub = DB::select(DB::raw("
                select * from bureau b where b.num = '$id'
            "));

        $t=[
            'bureauInfo'=> $bureau,
            'bureau' => $bureaub,
            'mat_partage' =>$mat_partage
        ];
        return $t;

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {

        // DB::table('bureau')
        //       ->where('num', $id)
        //       ->update(['active' => false]);
        $button = $request->input('button');
        if($button==0){
            $bur = Bureau::findOrFail($id);
            $bur->active = false;
            $bur->save();
        }else{
            $bur = Bureau::findOrFail($id);
            $bur->active = true;
            $bur->save();
        }
        return $button;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
