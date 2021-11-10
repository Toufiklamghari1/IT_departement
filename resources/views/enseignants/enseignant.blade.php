@extends('layouts.app')
@section('content')
@include ('enseignants/modals/add')
@include ('enseignants/modals/update')
@include ('enseignants/modals/remove')
@include ('enseignants/modals/affecter')
@include ('enseignants/modals/details')
<link href="{{ asset('css/gestionM.css') }}" rel="stylesheet">
<link href="{{ asset('css/gestionE.css') }}" rel="stylesheet">
<div class="container"  id="content">
    <div class="card"> 
        <div class="card-header text-center">
            <span class="font-weight-bold text-uppercase py-3 h3">Liste des Ensiegnants</span>
            <span id="Ens1" class="table-add float-right mr-2"><a data-toggle="modal" data-target="#modalAdd" class="text-success addBtn"><i class="fas fa-plus fa-2x" aria-hidden="true"></i></a></span>
        </div>
        <div id="table" class="card-body">
            <ul class="nav" id="myTab" role="tablist">
                <li class="nav-item mt-1" role="presentation" >
                    <a class="nav-link active" id="tab1" data-toggle="tab" href="#enseignant-table"
                    role="tab" aria-controls="enseignant-table" aria-selected="true" onclick="switchBtn(1,2)">Ensiegnants Permanante</a>
                </li>
                <li class="nav-item mt-1" role="presentation">
                    <a class="nav-link" id="tab2" data-toggle="tab" href="#enseigant-vacataire"
                    role="tab" aria-controls="enseigant-vacataire" aria-selected="false" onclick="switchBtn(2,1)">Enseignants Vacataires</a>
                </li>
            </ul>
            <div class="tab-content" id="myTabContent">
                <div class="tab-pane fade  show active" id="enseignant-table" role="tabpanel" aria-labelledby="tab1"><div
                class="table-responsive">@include ('enseignants/tables/enseignantTable')</div></div>
                <div class="tab-pane fade" id="enseigant-vacataire" role="tabpanel" aria-labelledby="tab2"><div
                class="table-responsive">@include ('enseignants/tables/vacataireTable')</div></div>
            </div>
        </div>
    </div>
</div> 
</div>
    <template id="details-btn">
      <td>
          <button type='button' class='details-btn details btn btn-primary btn-sm btn-center p-1' data-toggle='modal' data-target='#modalDetails'>
              <i class='fas fa-info-circle'></i></button>
      </td>
    </template>
    <template id="row-btns">
      <td>
        <span class='affecter-btn'><button class='btn btn-info btn-sm left-right-buttons btn-left' data-toggle='modal' data-target='#modalAffecter'><i class='fas fa-users-cog fa-2x'></i></button></span>
        <span class='edit-btn'><button class='btn btn-warning btn-sm btn-center p-edit'  data-toggle='modal' data-target='#modalUpdate'><i class='far fa-edit'></i></button></span>
        <span class='remove-btn'><button class='btn btn-danger btn-sm left-right-buttons btn-right' data-toggle='modal' data-target='#modalRemove'><i class='far fa-trash-alt fa-2x'></i></button></span>
      </td>
    </template>
    <template id='actionSuccess'><span class="text-center text-success">Action réussite <i class="far fa-check-circle"></i></span></template>
    <template id='error'><span class="text-center text-danger">Erreur  <i class="fas fa-exclamation"></i></span></template>
    <template id='at-work'><span class="text-center text-white">En cours.... <i class="fas fa-sync"></i></span></template>
  <script>var exports = {};</script>
  <script src="ts/Enseignant/Enseignant.js"></script>
  <script src="ts/Enseignant/gestion.js"></script>
@endsection
