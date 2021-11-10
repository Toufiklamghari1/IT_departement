@extends('layouts.app')
@section('content')
<style>

  .nav-tabs {
        font-family:sans-serif;
        font-size: 0.9rem;
        font-weight: 400;
        line-height: 1.6;
        border-bottom: 1px solid #dee2e6;
    }


    .nav-tabs .nav-link.active,
    .nav-tabs .nav-item.show .nav-link {
        font-size: 1rem;
        font-weight: 500;
        line-height: 2;
        font-style: oblique;
    }
</style>
@include('archive/modals/showEnsInfo')
<link href="{{ asset('css/gestionM.css') }}" rel="stylesheet">
<div class="container"  id="content">
    <div class="card">
        <div class="card-header text-center">
            <span class="font-weight-bold text-uppercase py-3 h3">Archive des Ensiegnants</span>
        </div>
        <div id="table" class="card-body">
            <ul class="nav" id="myTab" role="tablist">
                <li class="nav-item mt-1" role="presentation" >
                    <a class="nav-link active-tab" id="tab1" data-toggle="tab" href="#pas-consomable"
                    role="tab" aria-controls="pas-consomable" aria-selected="true" onclick="switchBtn(1,2)">Ensiegnants Permanante</a>
                </li>
                <li class="nav-item mt-1" role="presentation">
                    <a class="nav-link" id="tab2" data-toggle="tab" href="#equipement-bureau"
                    role="tab" aria-controls="equipement-bureau" aria-selected="false" onclick="switchBtn(2,1)">Enseignants Vacataires</a>
                </li>
            </ul>
            <div class="tab-content" id="myTabContent">
                <div class="tab-pane fade  show active" id="pas-consomable" role="tabpanel" aria-labelledby="tab1"><div
                class="table-responsive">@include ('archive/tables/tableEns')</div></div>
                <div class="tab-pane fade" id="equipement-bureau" role="tabpanel" aria-labelledby="tab2"><div
                class="table-responsive">@include ('archive/tables/tableEnsV')</div></div>
            </div>
        </div>
    </div>
</div>
<script src="js/archiveEns.js"></script>


@endsection
