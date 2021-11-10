@extends('layouts.app')
@section('content')
  @include ('bureau/modals/add')
  @include ('bureau/modals/update')
  @include ('bureau/modals/remove')
  @include ('bureau/modals/affecter')
  @include ('bureau/modals/details')
  <!-- Styles -->
  <link href="{{ asset('css/gestionB.css') }}" rel="stylesheet">
    <div class="container" id="content">
      <!-- Editable table -->
        <div class=" card">
          <div class="card-header text-center">
            <span class="font-weight-bold text-uppercase py-3 h3">Liste des Bureaux </span>
            <span class="table-add float-right mr-2"><a data-toggle="modal" data-target="#modalAdd" class="add-btn text-success"><i
                  class="fas fa-plus fa-2x" aria-hidden="true"></i></a></span>
          </div> 
          <div class="card-body">
            <div id="table" class="table-editable table-responsive">
              <table id="bureauTable" class="bureauTable table table-bordered table-responsive-md table-striped text-center">
                <thead>
                  <tr>
                    <th class='w1 text-center font'>info</th>
                    <th class="text-center font pl-2 pr-2">Numéro</th>
                    <th class="text-center font pl-2 pr-2">Capacité</th>
                    <th class="text-center font" style='min-width:200px'>Nombre d’enseignant</th>
                    <th class="text-center font" style='min-width:200px'>Date d’acquisition</th>
                    <th class="text-center font p-action">Action</th>
                  </tr>
                </thead>
                <tbody> 
                  <?php
                    $row =0 ;
                    if(isset($bureaux)){  
                      foreach( $bureaux as $data ){ 
                        echo"
                          <tr id='".(string) $row."' class='bureau-table'>
                            <td>
                                <button type='button' class='details-btn details btn btn-primary btn-sm btn-center p-1' data-toggle='modal' data-target='#modalDetails'>
                                    <i class='fas fa-info-circle'></i></button>
                            </td>
                            <td class='pt-3-half' >".$data->num."</td>
                            <td class='pt-3-half' >".$data->capacite."</td>
                            <td class='pt-3-half' >".$data->EnseignantNumber."</td>
                            <td class='pt-3-half' >".$data->dateAcquisition."</td>
                            <td>
                              <span class='affecter-btn'><button class='btn btn-info btn-sm left-right-buttons btn-left' data-toggle='modal' data-target='#modalAffecter'><i class='fas fa-users-cog fa-2x'></i></button></span>
                              <span class='edit-btn'><button class='btn btn-warning btn-sm btn-center p-edit'  data-toggle='modal' data-target='#modalupdate'><i class='far fa-edit'></i></button></span>
                              <span class='remove-btn'><button class='btn btn-danger btn-sm left-right-buttons btn-right' data-toggle='modal' data-target='#modalRemove'><i class='far fa-trash-alt fa-2x'></i></button></span>
                            </td>
                          </tr>";
                        $row ++;
                      }
                    }
                  ?>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <!-- Editable table -->
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
        <span class='edit-btn'><button class='btn btn-warning btn-sm btn-center p-edit'  data-toggle='modal' data-target='#modalupdate'><i class='far fa-edit'></i></button></span>
        <span class='remove-btn'><button class='btn btn-danger btn-sm left-right-buttons btn-right' data-toggle='modal' data-target='#modalRemove'><i class='far fa-trash-alt fa-2x'></i></button></span>
      </td>
    </template>
    <template id='actionSuccess'><span class="text-center text-success">Action réussite <i class="far fa-check-circle"></i></span></template>
    <template id='error'><span class="text-center text-danger">Erreur  <i class="fas fa-exclamation"></i></span></template>
    <template id='at-ork'><span class="text-center text-white">En cours.... <i class="fas fa-sync"></i></span></template>
  <script>var exports = {};</script>
  <script src="ts/Bureau/Bureau.js"></script>
  <script src="ts/Bureau/gestion.js"></script>
@endsection