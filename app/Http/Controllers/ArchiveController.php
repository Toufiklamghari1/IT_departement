<?php

namespace App\Http\Controllers;

use App\Enseignent;
use App\EnseignentsVacataire;
use App\Person;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ArchiveController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $enseignent = DB::table('person')
            ->join('enseignant', 'personID','=' ,'enseignantID')
            ->select('person.Email','person.Nom','person.Prenom','person.active','enseignant.enseignantID','enseignant.Grade','enseignant.DateRecrutement')
            ->where('person.active',false)
            ->get();
            $enseignentv = DB::table('person')
            ->join('enseignantvacataire', 'personID','=' ,'enseignantvacataireID')
            ->select('person.Email','person.Nom','person.Prenom','person.active','enseignantvacataire.enseignantvacataireID','enseignantvacataire.Grade')
            ->where('person.active',false)
            ->get();
            return view('archive.archiveEns')->with([
                'archive'=> $enseignent,
                'vacataire' => $enseignentv
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
    public function show(Request $req, $id){
        // if(EnseignentsVacataire::findOrFail($id)){
        //     $Material_Info=DB::select(DB::raw("
        // SELECT mi.numInventaire, mi.matID , (SELECT d.designation from designation d where d.designationID=m.designationID)as designation,(SELECT r.ref from reference r where r.refID=mi.refID) as reference,em.Quantite from materiel m,matereil_info mi ,person p,enseignant e,enseignant_materiel em where m.matID=mi.matID and mi.matID=em.matID and e.enseignantID = em.enseignantID and p.personID=e.enseignantID and p.personID=$id
        // "));
        // $ens_bur=DB::select(DB::raw("SELECT p.* ,e.*,(SELECT be.bureauID from enseignant_bureau be where be.enseignantID=e.enseignantID) as bureau
        // from enseignant e,person p
        // WHERE e.enseignantID = p.personID and p.personID=$id"));
        //     $forniture_Info = DB::select(DB::raw("
        //     SELECT mi.matID , (SELECT d.designation from designation d where d.designationID=m.designationID)as designation,(SELECT r.ref from reference r where r.refID=mi.refID) as reference,em.Quantite from materiel m,forniture_info mi ,person p,enseignant e,enseignant_materiel em where m.matID=mi.matID and mi.matID=em.matID and e.enseignantID = em.enseignantID and p.personID=e.enseignantID and p.personID=$id
        //     "));
        //     $equip_Bureau =DB::select(DB::raw("
        //     SELECT mi.numInventaire, mi.matID , (SELECT d.designation from designation d where d.designationID=m.designationID)as designation,(SELECT r.ref from reference r where r.refID=mi.refID) as reference,em.Quantite from materiel m,equipement_bureau mi ,person p,enseignant e,enseignant_materiel em where m.matID=mi.matID and mi.matID=em.matID and e.enseignantID = em.enseignantID and p.personID=e.enseignantID and p.personID=$id
        //     "));
        //     $forniture_Bureau=DB::select(DB::raw("
        //     SELECT  (SELECT d.designation from designation d where d.designationID=m.designationID) as designation,em.Quantite from materiel m,enseignant_materiel em,person p where m.matID not IN(SELECT matID from matereil_info) and m.matID not IN(SELECT matID from equipement_bureau) and m.matID not in(SELECT matID from forniture_info) and m.matID = em.matID and em.enseignantID=p.personID and p.personID=$id and m.active=true
        //     "));
        // $t=[
        //     'ens_bureau'=> $ens_bur,
        //     'mat_Info'=>$Material_Info,
        //     'forni_Info' => $forniture_Info,
        //     'equi_bureau' =>$equip_Bureau,
        //     'forni_bur'=>$forniture_Bureau
        // ];

        // return $t;
        // }
       $ens = $req->input('ens');
       if($ens==0){
        $Material_Info=DB::select(DB::raw("
        SELECT mi.numInventaire, mi.matID ,
         (SELECT d.designation from designation d where d.designationID=m.designationID)as designation,
         (SELECT r.ref from reference r where r.refID=mi.refID) as reference,em.Quantite 
         from materiel m,materiel_info mi ,person p,enseignant e,enseignant_materiel em 
         where m.matID=mi.matID 
         and mi.matID=em.matID 
         and e.enseignantID = em.enseignantID 
         and p.personID=e.enseignantID 
         and p.personID=$id
        "));
        $ens_bur=DB::select(DB::raw("SELECT p.* ,e.*,(SELECT be.bureauID from enseignant_bureau be where be.enseignantID=e.enseignantID) as bureau
        from enseignant e,person p
        WHERE e.enseignantID = p.personID and p.personID=$id"));
            $forniture_Info = DB::select(DB::raw("
            SELECT mi.matID , 
            (SELECT d.designation from designation d 
            where d.designationID=m.designationID)as designation,
            (SELECT r.ref from reference r where r.refID=mi.refID) as reference,em.Quantite 
            from materiel m,forniture_info mi ,person p,enseignant e,enseignant_materiel em 
            where m.matID=mi.matID 
            and mi.matID=em.matID 
            and e.enseignantID = em.enseignantID 
            and p.personID=e.enseignantID 
            and p.personID=$id
            "));
            $equip_Bureau =DB::select(DB::raw("
            SELECT mi.numInventaire, mi.matID , 
            (SELECT d.designation from designation d 
            where d.designationID=m.designationID)as designation,
            (SELECT r.ref from reference r where r.refID=mi.refID) as reference,em.Quantite 
            from materiel m,equipement_bureau mi ,person p,enseignant e,enseignant_materiel em 
            where m.matID=mi.matID and mi.matID=em.matID 
            and e.enseignantID = em.enseignantID 
            and p.personID=e.enseignantID 
            and p.personID=$id
            "));
            $forniture_Bureau=DB::select(DB::raw("
            SELECT  (SELECT d.designation from designation d 
            where d.designationID=m.designationID) as designation,em.Quantite 
            from materiel m,enseignant_materiel em,person p 
            where m.matID not IN(SELECT matID from materiel_info) 
            and m.matID not IN(SELECT matID from equipement_bureau) 
            and m.matID not in(SELECT matID from forniture_info) 
            and m.matID = em.matID and em.enseignantID=p.personID 
            and p.personID=$id 
            and m.active=true
            "));
        $t=[
            'ens_bureau'=> $ens_bur,
            'mat_Info'=>$Material_Info,
            'forni_Info' => $forniture_Info,
            'equi_bureau' =>$equip_Bureau,
            'forni_bur'=>$forniture_Bureau
        ];

        return $t;
       }else{
        $ens=DB::select(DB::raw("SELECT p.* ,e.* from enseignantvacataire e,person p
        WHERE e.enseignantVacataireID = p.personID and p.personID=$id"));
    return $ens;
       }


    }
    public function update(Request $request, $id){
        $button = $request->input('button');
        if($button==0){
            $ens = Person::findOrFail($id);
            $ens->active = false;
            $ens->save();
        }else{
            $ens = Person::findOrFail($id);
            $ens->active = true;
            $ens->save();
        }

        return $button;
    }

}
