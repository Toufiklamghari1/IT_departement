@extends('layouts.app')
@section('content')
@include ('materiel/modals/remove')
@include ('materiel/modals/add')
@include ('materiel/modals/affecter')
@include ('materiel/modals/update')
<!-- Styles -->
<link href="{{ asset('css/gestionM.css') }}" rel="stylesheet">
<div class="container" id="content">
    <!-- Editable table -->
    <div class="card">
        <div class="card-header text-center">
            <span class="font-weight-bold text-uppercase py-3 h3">Liste du Matériel</span>
            <span class="table-add float-right mr-2"><a data-toggle="modal" data-target="#modalAdd" class="text-success"><i class="fas fa-plus fa-2x" aria-hidden="true"></i></a></span>
        </div>
        <div id="table" class="card-body">
            <ul class="nav" id="myTab" role="tablist">
                <li class="nav-item mt-1" role="presentation">
                    <a class="nav-link active" id="tab1" data-toggle="tab" href="#materiel-info" role="tab" aria-controls="materiel-info" aria-selected="true">Materiel Informatique</a>
                </li>
                <li class="nav-item mt-1" role="presentation">
                    <a class="nav-link" id="tab3" data-toggle="tab" href="#equipement" role="tab" aria-controls="equipement" aria-selected="false">Equipement Bureau</a>
                </li>
                <li class="nav-item mt-1" role="presentation">
                    <a class="nav-link" id="tab2" data-toggle="tab" href="#forniture-info" role="tab" aria-controls="forniture-info" aria-selected="false">Forniture Informatique</a>
                </li>
                <li class="nav-item mt-1" role="presentation">
                    <a class="nav-link" id="tab4" data-toggle="tab" href="#forniture-bureau" role="tab" aria-controls="forniture-bureau" aria-selected="false">Forniture Bureau</a>
                </li>
            </ul>
            <div class="tab-content" id="myTabContent">
                <div class="tab-pane fade  show active" id="materiel-info" role="tabpanel" aria-labelledby="tab1">
                    <div class="table-responsive materiel-info">@include ('materiel/tables/materiel-info')</div>
                </div>
                <div class="tab-pane fade" id="equipement" role="tabpanel" aria-labelledby="tab3">
                    <div class="table-responsive">@include ('materiel/tables/equipement')</div>
                </div>
                <div class="tab-pane fade" id="forniture-info" role="tabpanel" aria-labelledby="tab2">
                    <div class="table-responsive">@include ('materiel/tables/forniture-info')</div>
                </div>
                <div class="tab-pane fade" id="forniture-bureau" role="tabpanel" aria-labelledby="tab4">
                    <div class="table-responsive">@include ('materiel/tables/forniture-bureau')</div>
                </div>
            </div>
        </div>
    </div>
</div>
<template id="row-btns"> 
    <td>
        <span class='affecter-btn'><button class='btn btn-info btn-sm left-right-buttons btn-left' data-toggle='modal' data-target='#modalAffecter'><i class='fas fa-users-cog fa-2x'></i></button></span>
        <span class='edit-btn'><button class='btn btn-warning btn-sm btn-center p-edit' data-toggle='modal' data-target='#modalUpdate'><i class='far fa-edit'></i></button></span>
        <span class='remove-btn'><button class='btn btn-danger btn-sm left-right-buttons btn-right' data-toggle='modal' data-target='#modalRemove'><i class='far fa-trash-alt fa-2x'></i></button></span>
    </td>
</template>
<template id="is-checked"><i class='far fa-check-circle '></i></template>
<template id="is-not-checked"><i class='far fa-circle'></i></template>
<template id='actionSuccess'><span class="text-center text-success">Action réussite <i class="far fa-check-circle"></i></span></template>
<template id='error'><span class="text-center text-danger">Erreur <i class="fas fa-exclamation"></i></span></template>
<template id='at-ork'><span class="text-center text-white">En cours.... <i class="fas fa-sync"></i></span></template>
<template id="affecter-msg"><span> Quantite disponible : <span class="quantite">0</span><!-- <i class="fas fa-exclamation"></i> --></span></template>
<script src="ts/Materiel/Materiel.js">
</script>
<script src="ts/Materiel/gestion.js">
</script>
@endsection