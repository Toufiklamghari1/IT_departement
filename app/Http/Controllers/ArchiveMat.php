<?php

namespace App\Http\Controllers;

use App\Materiel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ArchiveMat extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $mat_info = DB::select(DB::raw("
                                    SELECT m.matID,m.active ,ma.quantite,date(ma.dateAcquisition) as dateAcquisition, mi.numInventaire , 
                                    (SELECT d.designation 
                                        from designation d 
                                        where d.designationID=m.designationID)as designation,
                                    (SELECT r.ref 
                                        from reference r 
                                        where r.refID=mi.refID) as reference 
                                    from materiel m,materiel_info mi ,materiel_acquisition ma 
                                    where m.matID=mi.matID 
                                    and m.matID =ma.matID 
                                    and m.active=false       
                                    "));

        $eqi_bur = DB::select(DB::raw("
                                    SELECT ma.quantite,m.active,date(ma.dateAcquisition) as dateAcquisition, mi.numInventaire, mi.matID , 
                                    (SELECT d.designation
                                    from designation d 
                                    where d.designationID=m.designationID)as designation,
                                    (SELECT r.ref 
                                        from reference r 
                                        where r.refID=mi.refID) as reference 
                                    from materiel m,equipement_bureau mi,materiel_acquisition ma 
                                    where m.matID=mi.matID 
                                    and m.matID=ma.matID 
                                    and m.active=false
                                "));

        return view('archive.archiveMaterial')->with([
            'material_info' => $mat_info,
            'equipement_bur' => $eqi_bur,
        ]);
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
        //
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
        $button = $request->input('button');
        if($button==0){
            $mat = Materiel::findOrFail($id);
            $mat->active = false;
            $mat->save();
        }else{
            $mat = Materiel::findOrFail($id);
            $mat->active = true;
            $mat->save();
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
