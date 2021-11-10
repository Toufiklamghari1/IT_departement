@extends('layouts.app')
@section('content')
<style>

  .nav-tabs {
        font-size: 0.9rem;
        font-weight: 400;
        line-height: 1.6;
    }


    .nav-link.active,
    .nav-item.show .nav-link {
        color:white;
        font-size: 1.3rem;
        font-weight: 500;
        line-height: 2;
    }
</style>
@include('archive/modals/showEnsInfo')
<link href="{{ asset('css/gestionM.css') }}" rel="stylesheet">
<div class="container"  id="content">
    <div class="card">
        <div class="card-header text-center">
            <span class="font-weight-bold text-uppercase py-3 h3">Archive des Matériels</span>
        </div>
        <div id="table" class="card-body">
            <!-- Editable table --> 
            <div class="card-body">
                <ul class="nav" id="myTab" role="tablist">
                    <li class="nav-item" role="presentation">
                      <a class="nav-link active" id="MtIA-tab" data-toggle="tab" href="#MtIA" role="tab" aria-controls="MtIA" aria-selected="true">Materiel Informatique</a>
                    </li>
                    <li class="nav-item" role="presentation">
                      <a class="nav-link" id="MEBA-tab" data-toggle="tab" href="#MEBA" role="tab" aria-controls="MEBA" aria-selected="false">Equipement Bureau</a>
                    </li>
                </ul>
                <div class="tab-content" id="myTabContent">
                    <div class="tab-pane fade show active" id="MtIA" role="tabpanel" aria-labelledby="MtIA-tab">
                        <div class="row z-depth-5 mt-3 p-0 ml-1">
                            <div class="col-md-12">
                                <div class="table-responsive">
                                    <table id="tableMtIA" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
                                        <thead>
                                          <tr>
                                            <th class="text-center font">Numero d'inventaire</th>
                                            <th class="text-center font">designation </th>
                                            <th class="hidden"></th>
                                            <th class="text-center font">referance</th>
                                            <th class="text-center font">Quantité</th>
                                            <th class="text-center font">Date d'Acquisition </th>
                                            <th class="text-center font">Etat</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                            <input type="text" class="hidden" id="matiID">
                                            @foreach ($material_info as $mi)
                                                <tr>
                                                    <td>{{ $mi->numInventaire }}</td>
                                                    <td>{{ $mi->designation }}</td>
                                                    <td class="hidden">{{ $mi->matID }}</td>
                                                    <td>{{ $mi->reference }}</td>
                                                    <td>{{ $mi->quantite }}</td>
                                                    <td>{{ $mi->dateAcquisition }}</td>
                                                    <td>
                                                        <a class="disMI-modal text-success text-center hidden" id="switch1{{ $mi->matID }}" data-id="{{$mi->matID}}"><i class="far fa-check-circle fa-3x"></i>
                                                        </a>
                                                        <a class="actiMI-modal text-danger text-center" id="switch2{{ $mi->matID}}" data-id="{{$mi->matID}}"> <i class="far fa-times-circle fa-3x"></i>
                                                        </a>
                                                    </td>
                                                </tr>
                                            @endforeach
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="MEBA" role="tabpanel" aria-labelledby="MEBA-tab">
                        <div class="row z-depth-5 mt-3 p-0 ml-1">
                            <div class="col-md-12">
                                <div class="table-responsive">
                                    <table id="tableMEBA" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
                                        <thead>
                                          <tr>
                                            <th class="text-center font">Numero d'inventaire</th>
                                            <th class="text-center font">designation</th>
                                            <th class="hidden"></th>
                                            <th class="text-center font">referance</th>
                                            <th class="text-center font">Quantité</th>
                                            <th class="text-center font">Date d'Acquisition</th>
                                            <th class="text-center font">Etat </th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                            @foreach ($equipement_bur as $mi)
                                                <tr>
                                                    <td>{{ $mi->numInventaire }}</td>
                                                    <td>{{ $mi->designation }}</td>
                                                    <td class="hidden">{{ $mi->matID }}</td>
                                                    <td>{{ $mi->reference }}</td>
                                                    <td>{{ $mi->quantite }}</td>
                                                    <td>{{ $mi->dateAcquisition }}</td>
                                                    <td>
                                                        <a class="disEB-modal text-success text-center hidden" id="switch1{{ $mi->matID }}" data-id="{{$mi->matID}}"><i class="far fa-check-circle fa-3x"></i>
                                                        </a>
                                                        <a class="actiEB-modal text-danger text-center" id="switch2{{ $mi->matID}}" data-id="{{$mi->matID}}"> <i class="far fa-times-circle fa-3x"></i>
                                                        </a>
                                                    </td>
                                                </tr>
                                            @endforeach
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                  </div>


            </div>
            <!-- Editable table -->
        </div>
    </div>
</div>
<script src="js/archiveMat.js"></script>


@endsection
