<?php

namespace App\Http\Controllers;

use App\Bureau;
use App\Enseignent;
use App\Enseignent_bureau;
use App\Person;
use App\EnseignantM;
use DateTime;
use Dotenv\Result\Success;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

use Illuminate\Support\Facades\Validator;

class GestionEController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        /* */ 

        $enseignantV= DB::table('person')
            ->join('enseignantvacataire','enseignantvacataireID','=','personID')
            ->select('person.Email','person.Nom','person.Prenom','enseignantvacataire.etablisement','enseignantvacataire.grade','enseignantvacataire.numT','enseignantvacataire.grade','enseignantvacataire.dateDebut','enseignantvacataire.grade','enseignantvacataire.dateFin')
            ->where('person.active',true)
            ->get();
        $enseignant = DB::table('person')
            ->join('enseignant', 'personID','=' ,'enseignantID')
            ->select('person.Email','person.Nom','person.Prenom','enseignant.Grade','enseignant.DateRecrutement')
            ->where('person.active',true)
            ->get();
        /*$bureau = DB::select(DB::raw("SELECT Num,Capacite,(SELECT count(be.enseignantID) as capacite from enseignant_bureau be ,enseignant e,person p where be.bureauID=b.Num and e.enseignantID=be.enseignantID and p.personID=e.enseignantID and p.active =true) as nb_ens from bureau b where (select b1.Capacite FROM bureau b1 where b1.Num = b.Num) > (SELECT count(be.enseignantID) as capacite from enseignant_bureau be ,enseignant e,person p where be.bureauID=b.Num and e.enseignantID=be.enseignantID and p.personID=e.enseignantID and p.active =true)"));
        $idperson = DB::select(DB::raw("select max(personID) as id from person"));
        $materielInfo =DB::select(DB::raw(" 
                                    select m.matID,d.designation,r.ref,mi.numInventaire
                                    from materiel m, designation d,reference r,materiel_info mi,materiel_acquisition ma
                                    where m.designationID = d.designationID
                                    and  m.active = TRUE
                                    and m.matID = mi.matID
                                    and m.matID = ma.matID
                                    and r.refID = mi.refID
                                    and m.matID NOT IN (select em.matID from enseignant_materiel em where em.active= true and mi.matID = em.matID )
                                        "));
        $equipementB = DB::select(DB::raw("
                                    select m.matID,d.designation,r.ref,eb.numInventaire
                                    from materiel m,designation d,reference r,equipement_bureau eb,materiel_acquisition ma
                                    where m.designationID = d.designationID
                                    and  m.active = TRUE
                                    and m.matID = eb.matID
                                    and m.matID = ma.matID
                                    and r.refID = eb.refID
                                    and m.matID NOT IN (select em.matID from enseignant_materiel em where em.active= true and eb.matID = em.matID )
                                        "));*/
        /*return view('enseignents')->with([
            'enseignent'=> $enseignent,
            'enseignentV'=> $ensv,
            'bureaux' =>$bureau,
            'maxID' => $idperson,
            'materielInfo'=>$materielInfo,
            'equipementB'=>$equipementB
        ]);*/
        return view('enseignants.enseignant', compact('enseignant','enseignantV'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        // $num = "bureau1";
        // $capacite = DB::select(DB::raw(" SELECT bureauID,count(enseignantID) as capacite from enseignant_bureau where bureauID = GROUP by bureauID"));
        //     return $capacite;
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */


    public function store(Request $request)
    {
        $persID = "";
        switch($request->option){
            case 1 :{
                $person = new Person();
                $person->Nom= $request->nom;
                $person->Prenom= $request->prenom;
                $person->Email= $request->mail;
                $person->active = true;
                $person->save();
                $persID = $person->personID;
                // enseignant
                $ens= new Enseignent();
                $ens->enseignantID = $persID;
                $ens->Grade  = $request->grade;
                $ens->DateRecrutement =$request->dateRecrut;
                $ens->save();
            break;
            }
            case 2 :{
            break;
                $person = new Person();
                $person->Nom= $request->nom;
                $person->Prenom= $request->prenom;
                $person->Email= $request->mail;
                $person->active = true;
                $person->save();
            }
        }
        return $persID;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $Material_Info=DB::select(DB::raw("
            SELECT mi.numInventaire, mi.matID , 
            (SELECT d.designation 
            from designation d 
            where d.designationID=m.designationID)as designation,
            (SELECT r.ref 
            from reference r
             where r.refID=mi.refID) as reference,
             em.Quantite 
             from materiel m,materiel_info mi ,person p,enseignant e,enseignant_materiel em 
             where m.matID=mi.matID 
             and em.active = true
             and mi.matID=em.matID 
             and e.enseignantID = em.enseignantID 
             and p.personID=e.enseignantID 
             and p.personID=$id and p.active=true
        "));
        $ens_bur=DB::select(DB::raw("
                            SELECT p.* ,e.*,(SELECT be.bureauID 
                                from enseignant_bureau be 
                                where be.enseignantID=e.enseignantID
                                and be.active= true ) as bureau
                            from enseignant e,person p
                            WHERE p.active=true
                            and e.enseignantID = p.personID 
                            and p.personID=$id 
                            "));

            $equip_Bureau =DB::select(DB::raw("
            SELECT mi.numInventaire, mi.matID ,
             (SELECT d.designation from designation d 
             where d.designationID=m.designationID)as designation,
             (SELECT r.ref from reference r where r.refID=mi.refID) as reference,
             em.Quantite from materiel m,equipement_bureau mi ,person p,enseignant e,enseignant_materiel em 
             where m.matID=mi.matID 
             and mi.matID=em.matID 
             and em.active = true
             and e.enseignantID = em.enseignantID 
             and p.personID=e.enseignantID 
             and p.personID=$id and p.active=true
            "));

        $t=[
            'ens_bureau'=> $ens_bur,
            'mat_Info'=>$Material_Info,
            'equi_bureau' =>$equip_Bureau,
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
        switch($request->option){
            case 1 :{
                $person = Person::findOrFail($id);
                $person->Nom= $request->nom;
                $person->Prenom= $request->prenom;
                $person->Email= $request->mail;
                $person->save();
                // enseignant
                $ens = Enseignent::findOrFail($id);
                $ens->Grade  = $request->grade;
                $ens->DateRecrutement =$request->dateRecrut;
                $ens->save();
            break;
            }
            case 2 :{
            break;
                $person = new Person();
                $person->Nom= $request->nom;
                $person->Prenom= $request->prenom;
                $person->Email= $request->mail;
                $person->active = true;
                $person->save();
            }
        }
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
        $data = explode('@', $id);
        switch($data[0]){
            case 1:{
                EnseignantM::where('enseignantID', $data[1])->delete();
                Enseignent_bureau::where('enseignantID', intval($data[1]))->delete();
                Enseignent::where('enseignantID', intval($data[1]))->delete();
                Person::where('personID', intval($data[1]))->delete();
            break;
            }
        }
    }
    /**
     * 
     * Archiver the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function archiver($id)
    {
        //
        $person = Person::find($id);
        $person->active = false;
        $person->save();
    }
    /**
     * get References.
     *
     * @return \Illuminate\Http\Response
     */
    public function getListesEns()
    {
        $enseignantV= DB::table('person')
            ->join('enseignantvacataire','enseignantvacataireID','=','personID')
            ->select('person.personID','person.Email','person.Nom','person.Prenom','enseignantvacataire.etablisement','enseignantvacataire.grade','enseignantvacataire.numT','enseignantvacataire.grade','enseignantvacataire.dateDebut','enseignantvacataire.grade','enseignantvacataire.dateFin')
            ->where('person.active',true)
            ->get();
        $enseignant = DB::table('person')
            ->join('enseignant', 'personID','=' ,'enseignantID')
            ->select('person.personID','person.Email','person.Nom','person.Prenom','enseignant.Grade','enseignant.DateRecrutement')
            ->where('person.active',true)
            ->get();
        return compact('enseignant','enseignantV');
    }

}
