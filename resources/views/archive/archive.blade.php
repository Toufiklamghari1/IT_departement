@extends('layouts.app')
@section('content')
<link href="{{ asset('css/archive.css') }}" rel="stylesheet">
<div class="container" id="content">
    <div class=" card">
        <div class="card-header text-center">
            <span class="font-weight-bold text-uppercase py-3 h3">Archive </span>
            <span class="table-add float-right pl-3 pr-3"><i class="fas fa-users fa-2x"></i></span>
            <span class="table-add float-right pl-3 pr-3"><i class="fas fa-chalkboard-teacher fa-2x"></i></span>
            <span class="table-add float-right pl-3 pr-3"><i class="fas fa-boxes fa-2x"></i></span>
        </div>
        <div id="archive" class="card-body">
        </div>
    </div>
</div>
@endsection