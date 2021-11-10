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

class GestionMController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        //
        $materielInfo =  DB::select(DB::raw("
                            select m.matID,d.designation,r.ref,mi.numInventaire,ma.quantite  as 'quantite',date(ma.dateAcquisition) as 'dateAcquisition'
                            from materiel m, designation d,reference r,materiel_info mi,materiel_acquisition ma
                            where m.designationID = d.designationID
                            and  m.active = TRUE
                            and m.matID = mi.matID
                            and m.matID = ma.matID
                            and r.refID = mi.refID
                            and m.matID NOT IN (select em.matID from enseignant_materiel em where em.active= true and mi.matID = em.matID )
                            GROUP BY m.matID,quantite,dateAcquisition
                        "));
        $equipementbureau =  DB::select(DB::raw("
                            select m.matID,d.designation,r.ref,eb.numInventaire, ma.quantite  as 'quantite',date(ma.dateAcquisition) as 'dateAcquisition'
                            from materiel m,designation d,reference r,equipement_bureau eb,materiel_acquisition ma
                            where m.designationID = d.designationID
                            and  m.active = TRUE
                            and m.matID = eb.matID
                            and m.matID = ma.matID
                            and r.refID = eb.refID
                            and m.matID NOT IN (select em.matID from enseignant_materiel em where em.active= true and eb.matID = em.matID )
                            GROUP BY m.matID,quantite,dateAcquisition
                                "));
        $fornitureinfo =  DB::select(DB::raw("
                                    select matID,designation,ref,sum(quantite) as quantite
                                    from 
                                    (select m.matID,d.designation,r.ref,
                                    (select sum(ma.quantite) - (select if(sum(em.quantite)>=0,sum(em.quantite),0)
                                    from enseignant_materiel em 
                                    where em.active = true 
                                    and fi.matID = em.matID)
                                    ) as quantite
                                    from materiel m,designation d,reference r,forniture_info fi,materiel_acquisition ma
                                    where m.active = TRUE
                                    and ma.active = true
                                    and m.matID = fi.matID
                                    and m.matID = ma.matID
                                    and m.designationID = d.designationID
                                    and fi.refID = r.refID
                                    group BY m.matID,designation,dateAcquisition,quantite)  t 
                                    where quantite > 0
                                    group by matID
                                "));
        $materiel = DB::select(DB::raw("
                            select * from 
                            (select m.matID,d.designation,
                            (select sum(ma.quantite) - (select if(sum(em.quantite)>=0,sum(em.quantite),0)
                                    from enseignant_materiel em 
                                    where em.active = true 
                                    and m.matID = em.matID)
                                    ) as quantite
                            from materiel m,designation d,materiel_acquisition ma
                            where m.matID = ma.matID
                            and m.designationID = d.designationID
                            and m.active = true
                            and m.matID NOT IN(
                                select matID
                                from materiel_info
                                UNION
                                select matID
                                from equipement_bureau
                                UNION
                                select matID
                                from forniture_info
                            )
                            group BY m.matID) t
                            where quantite > 0
                                "));
        $enseignant = DB::select(DB::raw("
                                        select eb.bureauID as num ,p.nom, p.prenom
                                        from person p, enseignant e,enseignant_bureau eb
                                        where p.personID = e.enseignantID
                                        and eb.enseignantID = e.enseignantID
                                        and p.active = true
                                        and eb.active = true
                                        "));
        return view('materiel.gestion_materiel', compact('materielInfo','equipementbureau','fornitureinfo','materiel','enseignant'));
    }
    // Remplire le tableaux des ensignent
    public function remplireListe()
    {
        
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
        
        
        //insert reference
        /*$refId = 0;
        if(intval($request->option) != 0 && intval($request->option) < 5){
            if($request->option != 4){
                $refId = intval($request->ref);}
            if($request->ref == 0 && $request->option != 4){
                $var = new Reference();
                $var->ref = $request->tag;
                $var->save();
                $refId = $var->refID;
                echo $var->refID;
                echo "@";
            }
        }*/
        switch(intval($request->option)){
            case 0 :{
                switch($request->isRef){
                    case 0:{
                        $reference = new Reference();
                        $reference->ref = $request->tag; 
                        $reference->designationID = $request->designationID;
                        $reference->save();
                        return $reference->refID;
                    break;
                    }
                    case 1:{
                        $designation = new Designation();
                        $designation->Designation = $request->tag; 
                        $designation->type = $request->type;
                        $designation->save();
                        return $designation->designationID;
                    break;
                    }
                break;
            }}
            case 1 :{
                //insert materiel
                $data = new Materiel();
                $data->designationID = intval($request->designation);
                $data->active = true;
                $data -> save();
                //insert materiel acquisition
                $data2 = new MaterielA();
                $data2->matID = $data->matID;
                $data2->quantite = 1;
                $data2->dateAcquisition = $request->date;
                $data2 -> save();
                // insert materiel_info
                $data1 = new MaterielInfo();
                $data1->matID = $data->matID;
                $data1->numInventaire = $request->num;
                $data1->commentaire = $request->comment;
                $data1->refID = $request->ref;
                $data1 -> save();
                return $data->matID;
            break;
            }
            /*case 2 :{
                $designationVal = intval($request->designation);
                $id = DB::select(DB::raw("
                                    select m.matID 
                                    from materiel m,forniture_info fi
                                    where m.designationID = $designationVal
                                    and m.matID = fi.matID
                                    and fi.refID = $refId
                                    and m.active = true
                                    "));
                //echo $id;
                if(sizeof($id)!=0){
                    $data2 = new MaterielA();
                    $data2->matID = $id[0]->matID;
                    $data2->quantite = $request->quantite;
                    $data2->dateAcquisition = $request->date;
                    $data2 -> save();
                    echo "-1@";
                    echo $id[0]->matID;
                    return;
                }
                //insert materiel
                $data = new Materiel();
                $data->designationID = intval($request->designation);
                $data->active = true;
                $data -> save();
                echo $data->matID;
                echo "@";
                //insert materiel acquisition
                $data2 = new MaterielA();
                $data2->matID = $data->matID;
                $data2->quantite = $request->quantite;
                $data2->dateAcquisition = $request->date;
                $data2 -> save();
                // forniture info
                $data1 = new FornitureInfo();
                $data1->matID = $data->matID;
                $data1->commentaire = $request->commentaire;
                $data1->refID = $refId;
                $data1 -> save();

            break;
            }
            case 3 :{
                //insert materiel
                $data = new Materiel();
                $data->designationID = intval($request->designation);
                $data->active = true;
                $data -> save();
                echo $data->matID;
                echo "@";
                //insert materiel acquisition
                $data2 = new MaterielA();
                $data2->matID = $data->matID;
                $data2->quantite = 1;
                $data2->dateAcquisition = $request->date;
                $data2 -> save();
                // equipement bureau
                $data1 = new EquipementBureau();
                $data1->matID = $data->matID;
                $data1->numInventaire = $request->num;
                $data1->refID = $refId;
                $data1 -> save();

            break;
            }
            case 4 :{
                $designationVal = intval($request->designation);
                $id = DB::select(DB::raw("
                                    select m.matID 
                                    from materiel m
                                    where m.designationID = $designationVal
                                    and m.active = true
                                    "));
                //echo $id;
                if(sizeof($id)!=0){
                    $data2 = new MaterielA();
                    $data2->matID = $id[0]->matID;
                    $data2->quantite = $request->quantite;
                    $data2->dateAcquisition = $request->date;
                    $data2 -> save();
                    echo "-1@";
                    echo $id[0]->matID;
                    return;
                }
                //insert materiel
                $data = new Materiel();
                $data->designationID = intval($request->designation);
                $data->active = true;
                $data -> save();
                echo $data->matID;
                echo "@";
                //insert materiel acquisition
                $data2 = new MaterielA();
                $data2->matID = $data->matID;
                $data2->quantite = $request->quantite;
                $data2->dateAcquisition = $request->date;
                $data2 -> save();

            break;
            }
            case 5 :{
                if($request->type == 1){
                    $ensM = new EnseignantM();
                    $ensM->matID = intval($request->matID);
                    $ensM->date = new DateTime();
                    $ensM->enseignantID = intval($request->enseignantID);
                    $ensM->quantite = 1;
                    $ensM->partage = intval($request->partage);
                    $ensM->save();
                    return;
                }
                else{
                    $quantites = array();
                    $enseignantsID = array();
                    $i = 0;
                    foreach($request->enseignantsID as $val){
                        $enseignantsID[$i] = $val;
                        $i++;
                    };
                    $i = 0;
                    foreach($request->quantites as $val){
                        $quantites[$i] = $val;
                        $i++;
                    };
                    for($i =0 ;$i<sizeof($enseignantsID);$i++){
                        if(intval($quantites[$i]) <= 0)
                            continue;
                        $ensM = new EnseignantM();
                        $ensM->matID = intval($request->matID);
                        $ensM->date = new DateTime();
                        $ensM->enseignantID = intval($enseignantsID[$i]);
                        $ensM->quantite = intval($quantites[$i]);
                        $ensM->save();
                    }
                }
            break;
            }*/
        }
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
        // update and insert ref
        /*$refId = 0;
        if($request->option != 0){
            if($request->option != 4){
                $refId = intval($request->ref);
            }
            if($request->ref == 0 && $request->option != 4){
                $var = new Reference();
                $var->ref = $request->tag;
                $var->save();
                $refId = $var->refID;
                $request->ref = $refId;
            }
            //update materiel
            $data = Materiel::findOrFail($id);
            if($data->designationID != $request->designation){
                $data->designationID = $request->designation;
                $data -> update();
            }
            //update materiel acquisition
            $data2 = MaterielA::findOrFail($id);
            if($request->option != 1 && $request->option != 3 && $data2->quantite != $request->quantite)
                $data2->quantite = $request->quantite;
            if($data2->dateAcquisition != $request->date)
                $data2->dateAcquisition = $request->date;
            $data2 -> update();
        }*/
        switch(intval($request->option)){
            case 1 :{
                // matereil_info
                $mat = Materiel::findOrFail(intval($id));
                $mat->designationID = $request->designation;
                $mat->update();
                // matereil_info
                $matA = MaterielA::findOrFail(intval($id));
                $matA->dateAcquisition = $request->date;
                $matA->update();
                // insert materiel_info
                $matInfo = MaterielInfo::findOrFail(intval($id));
                $matInfo->numInventaire = $request->num;
                $matInfo->commentaire = $request->comment;
                $matInfo->refID = $request->ref;
                $matInfo->update();
            break;
            }/*
            case 2 :{
                // forniture info 
                $data1 = FornitureInfo::findOrFail($id);
                $data1->commentaire = $request->commentaire;
                $data1->refID = $request->ref;
                $data1->update();
            break;
            }
            case 3 :{
                //equipement
                $data1 = EquipementBureau::findOrFail($id);
                $data1->numInventaire = $request->num;
                $data1->refID = $request->ref;
                $data1->update();
            break;
            }*/
        }
    }
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        // r reference
        // m materiel
        $data = explode("@",$id);
        $result = null;
        switch ($data[0]) {
            case 'r':{   
                $result = DB::select(DB::raw("
                select DISTINCT refID,ref 
                from reference
                where  refID in (
                    select DISTINCT mi.refID 
                    from materiel m ,materiel_info mi
                    where m.matID = mi.matID
                    and m.designationID = $data[1]
                    UNION
                    select DISTINCT mi.refID 
                    from materiel m ,equipement_bureau mi
                    where m.matID = mi.matID
                    and m.designationID = $data[1]
                    UNION
                    select DISTINCT mi.refID 
                    from materiel m ,forniture_info mi
                    where m.matID = mi.matID
                    and m.designationID = $data[1]
                    ) 
                "));
                return compact('result');
            }
            case 'm' :{
                switch($data[2]){
                    case '1' :{
                        $result = DB::select(DB::raw("
                            select m.designationID,mi.refID,mi.numInventaire,
                            date(ma.dateAcquisition) as 'dateAcquisition',mi.commentaire
                            from materiel m,materiel_info mi,materiel_acquisition ma
                            where m.matID = ma.matID
                            and m.matID = mi.matID
                            and m.matID = $data[1]
                        "));
                    break;
                    }
                    case '2' :{
                        $result = DB::select(DB::raw("
                        select m.designationID,fi.refID,
                        (select sum(ma.quantite))  as 'quantite',date(max(ma.dateAcquisition)) as 'dateAcquisition',fi.commentaire
                        from materiel m,forniture_info fi,materiel_acquisition ma
                        where m.matID = ma.matID
                        and m.matID = fi.matID
                        and m.matID = $data[1]
                        "));
                    break;
                    }
                    case '3' :{
                        $result = DB::select(DB::raw("
                        select m.designationID,eb.numInventaire,eb.refID,
                        (select sum(ma.quantite))  as 'quantite',date(max(ma.dateAcquisition)) as 'dateAcquisition'
                        from materiel m,equipement_bureau eb,materiel_acquisition ma
                        where m.matID = ma.matID
                        and m.matID = eb.matID
                        and m.matID = $data[1]
                        "));
                    break;
                    }
                    case '4' :{
                        $result = DB::select(DB::raw("
                        select m.designationID,(select sum(ma.quantite))  as 'quantite',date(max(ma.dateAcquisition)) as 'dateAcquisition'
                        from materiel m,materiel_acquisition ma
                        where m.matID = ma.matID
                        and m.matID = $data[1]
                        "));
                    break;
                    }
                }

                return compact('result');
            }
            default: break;
        }
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
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $data = explode('@' , $id);
        switch($data[0]){
            case '1':{
                MaterielInfo::find(intval($data[1]))->delete();
                MaterielA::find(intval($data[1]))->delete();
                Materiel::find(intval($data[1]))->delete();
            break;
            }
        }
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function archiver($id)
    {
        //
        $materiel = Materiel::find($id);
        $materiel->active = false;
        $materiel->save();
    }
    /**
     * get Designation.
     *
     * @param  string  $type
     * @return \Illuminate\Http\Response
     */
    public function getDesignations($type)
    {   
        $designations =  DB::select(DB::raw("select distinct(designationID),designation
                                            from designation 
                                            where type = ".$type."
                                            "));
        return compact('designations');
    }
    /**
     * get References.
     *
     * @param  string  $type
     * @param  int  $designationID
     * @return \Illuminate\Http\Response
     */
    public function getReferences($designationID)
    {   
        $references =  DB::select(DB::raw("select refID, ref
                                            from reference 
                                            WHERE designationID = ".intval($designationID)."
                                            "));
        return compact('references');
    }
    /**
     * get References.
     *
     * @return \Illuminate\Http\Response
     */
    public function getListes()
    {
        
        $materielInfo =  DB::select(DB::raw("
                            select m.matID,d.designationID as designation,r.refID as ref,mi.numInventaire as num,mi.commentaire as comment,date(ma.dateAcquisition) as 'dateAcquisition'
                            from materiel m, designation d,reference r,materiel_info mi,materiel_acquisition ma
                            where m.designationID = d.designationID
                            and  m.active = TRUE
                            and m.matID = mi.matID
                            and m.matID = ma.matID
                            and r.refID = mi.refID
                            and m.matID NOT IN (select em.matID from enseignant_materiel em where em.active= true and mi.matID = em.matID )
                            GROUP BY m.matID,quantite,dateAcquisition
                        "));
        $enseignant = DB::select(DB::raw("
                            select distinct(p.personID), p.nom, p.prenom
                            from person p, enseignant e
                            where p.active = true
                            and p.personID = e.enseignantID
                        "));
        /*$equipementBureau =  DB::select(DB::raw("
                            select m.matID,d.designation,r.ref,eb.numInventaire, ma.quantite  as 'quantite',date(ma.dateAcquisition) as 'dateAcquisition'
                            from materiel m,designation d,reference r,equipement_bureau eb,materiel_acquisition ma
                            where m.designationID = d.designationID
                            and  m.active = TRUE
                            and m.matID = eb.matID
                            and m.matID = ma.matID
                            and r.refID = eb.refID
                            and m.matID NOT IN (select em.matID from enseignant_materiel em where em.active= true and eb.matID = em.matID )
                            GROUP BY m.matID,quantite,dateAcquisition
                                "));
        $fornitureInfo =  DB::select(DB::raw("
                                    select matID,designation,ref,sum(quantite) as quantite
                                    from 
                                    (select m.matID,d.designation,r.ref,
                                    (select sum(ma.quantite) - (select if(sum(em.quantite)>=0,sum(em.quantite),0)
                                    from enseignant_materiel em 
                                    where em.active = true 
                                    and fi.matID = em.matID)
                                    ) as quantite
                                    from materiel m,designation d,reference r,forniture_info fi,materiel_acquisition ma
                                    where m.active = TRUE
                                    and ma.active = true
                                    and m.matID = fi.matID
                                    and m.matID = ma.matID
                                    and m.designationID = d.designationID
                                    and fi.refID = r.refID
                                    group BY m.matID,designation,dateAcquisition,quantite)  t 
                                    where quantite > 0
                                    group by matID
                                "));
        $fornitureBureau = DB::select(DB::raw("
                            select * from 
                            (select m.matID,d.designation,
                            (select sum(ma.quantite) - (select if(sum(em.quantite)>=0,sum(em.quantite),0)
                                    from enseignant_materiel em 
                                    where em.active = true 
                                    and m.matID = em.matID)
                                    ) as quantite
                            from materiel m,designation d,materiel_acquisition ma
                            where m.matID = ma.matID
                            and m.designationID = d.designationID
                            and m.active = true
                            and m.matID NOT IN(
                                select matID
                                from materiel_info
                                UNION
                                select matID
                                from equipement_bureau
                                UNION
                                select matID
                                from forniture_info
                            )
                            group BY m.matID) t
                            where quantite > 0
                                "));*/
        return compact('materielInfo','enseignant');
    }
}