
<table id="archiveEnsv" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
    <thead>
        <tr>
        <th class="th-sm hidden">ID</th>
        <th></th>
        <th class="font text-center">Nom</th>
        <th class="font text-center">Prenom</th>
        <th class="font text-center">Email</th>
        <th class="font text-center">Etat</th>

        </tr>
    </thead>
    <tbody>
        {{ csrf_field() }}
        @forelse ($vacataire as $arcv)
            <tr class="enseignent{{$arcv->enseignantvacataireID}} active-tab">
                <td>
                    <a type="button" class="showArcEnsv btn btn-primary btn-sm btn-center p-0 pt-2"
                    data-id="{{ $arcv->enseignantvacataireID }}">
                    <i class='fas fa-info-circle text-white'></i></a>
                </td>
                <td class="font-weight-normal hidden">{{ $arcv->enseignantvacataireID }}</td>
                <td class="font-weight-normal">{{ $arcv->Nom }}</td>
                <td class="font-weight-normal">{{ $arcv->Prenom }}</td>
                <td class="font-weight-normal">{{ $arcv->Email }}</td>
                <td class="font-weight-normal">
                    <a class="disEv-modal text-success text-center hidden" id="switch1{{ $arcv->enseignantvacataireID }}" data-id="{{$arcv->enseignantvacataireID}}"><i class="far fa-check-circle fa-3x"></i>
                    </a>
                    <a class="actiEv-modal text-danger text-center" id="switch2{{ $arcv->enseignantvacataireID }}" data-id="{{$arcv->enseignantvacataireID}}"> <i class="far fa-times-circle fa-3x"></i>
                    </a>
                </td>

            </tr>
            @empty

        @endforelse
    </tbody>
</table>
