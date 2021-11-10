<!-- sidebar -->
<nav class="thisIsSpecial active" id="sidebar"><!--background-image:url('{{asset('pictures/sidebar.jpg') }}'); -->
    <ul class="list-unstyled components hamza1" style="height:100%">
        <li>
            <a  class="collapsible-header" href="{{ url('/home') }}" onclick="setActive(0)">
                <i class="fas fa-home"></i> Accueil
            </a>
        </li>
        <li>
            <a  class="ps" href="{{ url('/gestion_materiel') }}" onclick="setActive(1)">
                <i class="fas fa-boxes"></i>  Gestion Materiel
            </a>
        </li>
        <li>
            <a  class="ps" href="{{ url('/gestion_enseignant') }}" onclick="setActive(2)">
                <i class="fas fa-users"></i>  Gestion Enseignant
            </a>
        </li>
        <li>
            <a  class="ps" href="{{ url('/gestion_bureau') }}" onclick="setActive(3)" >
                <i class="fas fa-chalkboard-teacher"></i>  Gestion Bureau
            </a>
        </li>
        <li>
            <a  id="archiveTitle" class="ps" data-toggle="collapse" aria-expanded="false">
                <i class="fas fa-archive"></i>  Archive
                <i class="rotate-icon"></i>
            </a>
            <ul class="hidden list-unstyled" id="archive">
                <li onclick="setActive(4,1)"><a href="/archiveMat">Materiels</a></li>
                <li onclick="setActive(4,2)"><a href="/archive">Enseignants</a></li>
                <li onclick="setActive(4,3)"><a href="/archivebureau">Bureaux</a></li>
            </ul>
            <script>
                $("#archiveTitle").on('click',function(){
                    console.log("hello")
                    if($("#archive").hasClass('hidden'))
                        $("#archive").removeClass('hidden')
                    else    
                        $("#archive").addClass('hidden')
                })
            </script>
        </li>
        <li>
            <a href="#archive">
                <i class="fas fa-cogs"></i> Paramétre
            </a>
        </li>
    </ul>
</nav>
<script src="js/sidebar.js"></script>
<script src="js/source/sourceConst.js"></script>