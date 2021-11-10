<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>
    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet" >
    <link href="{{ asset('css/apphelp.css') }}" rel="stylesheet" defer>
    <link rel="stylesheet" href="{{ asset('css/navbar.css') }}">
    <!--MDB -->
        <!-- Font Awesome-->
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css">
        <!-- Google Fonts 
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap">-->
        <!-- Bootstrap core CSS-->
        <link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.4.1/css/bootstrap.min.css" rel="stylesheet">
        <!-- Material Design Bootstrap -->
        <link href="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.18.0/css/mdb.min.css" rel="stylesheet">
        <!-- JQuery -->
        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        <!-- Bootstrap tooltips
        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.4/umd/popper.min.js"></script>-->
        <!-- Bootstrap core JavaScript-->
        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.4.1/js/bootstrap.min.js"></script>
        <!-- MDB core JavaScript -->
        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.18.0/js/mdb.min.js"></script>
    <!--- datatables -->
    <script src="{{ asset('js/jquery.dataTables.js') }}" ></script>
    <link href="{{ asset('datatables.net-dt/css/jquery.dataTables.css') }}" rel="stylesheet">
    <!--- select2 -->
    <script src="{{ asset('select2/dist/js/select2.full.js') }}" ></script>
    <link href="{{ asset('select2/dist/css/select2.css') }}" rel="stylesheet">
    <script src="js/r.js"></script>

</head>
<body class="m-0" style="background-color:rgb(68, 64, 64);"><!--background-image: url('pictures/bg.jpg'); -->
    <div id="app">
        @guest
        @else
            @include ('layouts.navbar')
            <div class="wrapper">
        @endguest
        <main class="py-0" style="width:100%;">
            @yield('content')
        </main>
    </div>
    </div>
</body>
<!--<script src="js/gestionB/gestion.js"></script>-->
</html>
