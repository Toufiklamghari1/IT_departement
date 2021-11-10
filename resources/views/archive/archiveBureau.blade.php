@extends('layouts.app')
@section('content')
@include('archive/modals/showBureauInfo')
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
            <span class="font-weight-bold text-uppercase py-3 h3">Archive des Bureaux</span>
        </div>
        <div id="table" class="card-body">
            @include('archive/tables/tableBureau')
        </div>
    </div>
</div>
<script src="js/archiveBureau.js"></script>


@endsection
