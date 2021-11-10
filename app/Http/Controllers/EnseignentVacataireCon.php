<?php

namespace App\Http\Controllers;

use App\EnseignentsVacataire;
use App\Person;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EnseignentVacataireCon extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $post = new Person();
        $post->Nom= $request->input('Nomv');
        $post->Prenom= $request->input('Prenomv');
        $post->Email= $request->input('Emailv');
        $post->active = true;
        $post->save();
        $ensv = new EnseignentsVacataire();
        $ensv->etablisement = $request->input('Etabv');
        $ensv->grade = $request->input('Gradev');
        $ensv->numT = $request->input('Telv');
        $ensv->dateDebut  = "2020-10-10";
        $ensv->enseignantVacataireID = $post->personID;
        $ensvID=$ensv->enseignantVacataireID;
        $ensv->dateDebut = $request->input('Periodev');
        $ensv->dateFin = $request->input('datefin');
        $ensv->save();
        return $ensvID;

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $ensv=DB::select(DB::raw("
        SELECT p.Nom,p.Prenom,p.email,p.active, ev.* from person p,enseignantvacataire ev where p.personID=ev.enseignantvacataireID and p.personID=$id
        "));
        return $ensv;
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
        $per = Person::findOrFail($id);
        $per->Nom =$request->input('Nom');
        $per->Prenom = $request->input('Prenom');
        $per->Email = $request->input('Email');
        $per->save();
        $ens = EnseignentsVacataire::findOrFail($id);
        $ens->grade = $request->input('Grade');
        $ens->etablisement = $request->input('Etablisement');
        $ens->numT = $request->input('NumT');
        $ens->dateDebut = $request->input('dateD');
        $ens->dateFin = $request->input('dateF');
        $ens->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $req,$id)
    {
        $id = $req->input('id');
        DB::table('person')->join('enseignantvacataire','enseignantvacataireID','=','personID')
        ->where('enseignantvacataireID',$id)->update([
            'person.active' => false
        ]);
    }
}
