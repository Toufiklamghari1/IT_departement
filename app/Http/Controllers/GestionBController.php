<?php
namespace App\Http\Controllers;

use App\Bureau;
use App\Enseignent_bureau;
use App\Enseignent;
use DateTime;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class GestionBController extends Controller
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
        $bureaux = DB::select(DB::raw("select num,capacite,(select count(eb.bureauID) 
                                    from enseignant_bureau eb, person p
                                    where eb.bureauID = b.num 
                                    and eb.active = true
                                    and p.personID = eb.enseignantID
                                    and p.active = true) as EnseignantNumber ,b.dateAcquisition
                                    from bureau b
                                    where b.active = true
                                "));
        $enseignants = DB::select(DB::raw("select p.personID,p.nom,p.prenom,eb.bureauID
                                from person p,enseignant_bureau eb
                                where eb.active = true  
                                and p.active = true
                                and p.personID = eb.enseignantID
                            "));
                            
        return view('bureau.gestion_bureau', compact('bureaux','enseignants'));
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
        switch($request->option){
            case 1:{
                $bureau = new Bureau();
                $bureau->Num= $request->num;
                $bureau->Capacite= intval($request->capacite);
                $bureau->DateAcquisition= $request->dateAcquisition;
                $bureau->active= true ;
                $bureau->save();
            break;
            }
            case 2:{
                $length = sizeof($request->enseignants);
                for( $i = 0; $i < $length; $i++ ){
                    $bur_Ens =  new  Enseignent_bureau();
                    $bur_Ens->enseignantID = intval($request->enseignants[$i]) ;
                    $bur_Ens->bureauID = $request->num;
                    $bur_Ens->date = new DateTime();
                    $bur = DB::select(DB::raw("
                                        update enseignant_bureau
                                        set active = false
                                        where enseignantID = $bur_Ens->enseignantID
                                        "));
                    $bur_Ens->save();
                }
                $capacite = DB::select(DB::raw("select bureauID ,count(eb.bureauID) as ensNumber
                                    from enseignant_bureau eb , bureau b
                                    where eb.bureauID = b.num 
                                    and eb.active = true
                                    and b.active = true
                                    GROUP BY b.num
                                    "));
                $ensBureau = DB::select(DB::raw("select bureauID ,enseignantID
                                    from enseignant_bureau
                                    where active = true
                                    "));                    
                return compact('capacite','ensBureau');
            break;
            }
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
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
        //
        //$data = $request->all();
        $bureau = Bureau::findOrFail($id."");
        $bureau->Num= $request->num;
        $bureau->Capacite= intval($request->capacite);
        $bureau->DateAcquisition= $request->dateAcquisition;
        $bureau->update();
        //$result = $bureau->update($data);
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
        $bureau = DB::select(DB::raw("select * from bureau where num = '$id' and active = true"));
        $enseignants = DB::select(DB::raw("
                            select p.nom,p.prenom,e.grade,eb.date
                            from person p,enseignant e,enseignant_bureau eb
                            where p.personID = e.enseignantID
                            and eb.enseignantID = e.enseignantID
                            and eb.bureauID = '$id'
                            and eb.active = true
                            and p.active = true
                            "));
        return compact('bureau','enseignants');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id) 
    {   
        $bureau = Bureau::findOrFail($id);
        $bureau ->delete();
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
        $data = explode('@' , $id);
        switch($data[0]){
            case '1':{
                DB::select(DB::raw("update materiel set active = false where matID = $data[1]"));
            break;
            }
        }
    }
    /**
     * Display the specified resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function initList()
    {
        $bureaux = DB::select(DB::raw("select num,capacite,(select count(eb.bureauID) 
            from enseignant_bureau eb, person p
            where eb.bureauID = b.num 
            and eb.active = true
            and p.personID = eb.enseignantID
            and p.active = true) as EnseignantNumber ,b.dateAcquisition
            from bureau b
            where b.active = true
        "));
        return compact('bureaux');
    }
}
