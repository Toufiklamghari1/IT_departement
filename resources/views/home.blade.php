
@extends('layouts.app')

@section('content')
<style>
      #sidebar{
            display:none;
      }
</style>
<link href="{{ asset('css/home.css') }}" rel="stylesheet">
<div class="container mt-4 pt-1">
      <div class="text-center font-home">Departement Informatique</div>
      <div class="card-deck mt-5 pt-5 justify-content-center">
            <div type="button" class="min-w card mt-5"  onclick="window.location.href='/gestion_bureau'">
                  <img class="card-img" src="pictures/gestionBh.jpg" alt="gestionB">
                  <div class="text-block text-center max-w-h">
                        Gestion<br>Bureau
                  </div>
            </div>
            <div type="button" class="min-w card mt-5" onclick="window.location.href='/gestion_enseignant'">
                   <img class="card-img" src="pictures/gestionEh.jpg" alt="gestionE">
                   <div class="text-block text-center max-w-h">
                        Gestion<br>Enseignant
                  </div>
            </div>
            <div type="button" class="min-w card mt-5" onclick="window.location.href='/gestion_materiel'">
                  <img class="card-img" src="pictures/gestionMh.jpg" alt="gestionM">
                  <div class="text-block text-center max-w-h">
                        Gestion<br>Matériel
                  </div>
            </div>
      </div>
</div>
@endsection
