<div style="background-image:url('{{asset('pictures/navbar.jpg')}}');" >
<nav class="navbar navbar-expand-md navbar-light shadow-sm">
        <!-- <button type="button" id="sidebarCollapse" class="navbar-btn">
            <span id="span1" style="display:none;" onclick="displayBtn(1)"><i class="fas fa-times"></i></span>
            <span id="span2" style="display:none;"  onclick="displayBtn(0)"><i class="fas fa-align-justify"></i></span>
        </button> -->
        <a class="navbar-brand app-name" href="{{ url('/home') }}">
            {{ config('app.name', 'Laravel') }}
        </a>
        <div class="collapse navbar-collapse w-75 ">
            <ul class="menu-bar w-100 text-gray d-flex m-auto" >
                <li>
                    <a  href="{{ url('/home') }}">
                        <i class="fas fa-home"></i><span>Accueil </span>
                    </a>
                </li>
                <li>
                    <a  href="{{ url('/gestion_materiel') }}">
                        <i class="fas fa-boxes"></i><span>Materiels </span>
                    </a>
                </li>
                <li>
                    <a  href="{{ url('/gestion_enseignant') }}">
                        <i class="fas fa-users"></i><span>Enseignants </span>
                    </a>
                </li>
                <li>
                    <a href="{{ url('/gestion_bureau') }}">
                        <i class="fas fa-chalkboard-teacher"></i> <span>Bureaux</span>
                    </a>
                </li>
                <li>
                    <a  href="{{ url('/archive') }}">
                        <i class="fas fa-archive"></i><span>Archive </span>
                    </a>
                </li>
                <li>
                    <a href="#Paramétre">
                        <i class="fas fa-cogs"></i><span>Paramétre </span>
                    </a>
                </li>
            </ul>
        </div>
        <div class="collapse navbar-collapse">
            <a class="log-out" href="{{ route('logout') }}" onclick="event.preventDefault();  document.getElementById('logout-form-home').submit();">
                <i class="fas fa-power-off"></i>
            </a>
            <form id="logout-form-home" action="{{ route('logout') }}" method="POST" style="display: none;">
                @csrf
            </form>
        </div>
</nav>
</div>