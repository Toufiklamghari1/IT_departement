
<!-- end new table -->
<!-- <table id="dtBasicExample" class="table table-bordered table-responsive-md table-striped text-center " style="width:100%">
    <thead>
        <tr>
            <th class='w-1'></th>
            <th class="font text-center  pl-3 pr-3">Nom </th>
            <th class="font text-center  pl-3 pr-3">Prenom </th>
            <th class="font text-center" style='min-width:200px'>Date de recrutement  </th>
            <th class="text-center font p-action">Action </th>
        </tr>
    </thead>
    <tbody> 
        {{ csrf_field() }}
        @forelse ($enseignent as $ens)
            <tr id = "ens{{$ens->enseignantID}}" class="enseignent{{$ens->enseignantID}} "> 
                <td>

                    <a type="button" class="showEnsA btn btn-primary btn-sm btn-center text-center p-0 pt-2"
                    data-id="{{ $ens->enseignantID }}">
                    <i class='fas fa-info-circle'></i></button></a>
                </td>
                <td class="font-weight-normal hidden">{{ $ens->enseignantID }}</td>
                <td class="font-weight-normal">{{ $ens->Nom }}</td>
                <td class="font-weight-normal">{{ $ens->Prenom }}</td>
                <td class="font-weight-normal">{{ $ens->DateRecrutement }}</td>
                <td>
                    <button class="table-info-b btn btn-info btn-sm btn-info-affecter left-right-buttons btn-left" data-toggle="modal" data-target="#modalAffecterForm"
                    data-id="{{ $ens->enseignantID }}"" data-Nom="{{ $ens->Nom }}" data-Prenom="{{ $ens->Prenom }}" data-Email="{{ $ens->Email }}" data-Grade="{{ $ens->Grade }}"
                        data-DateRecrutement="{{ $ens->DateRecrutement }}"><i class="fas fa-users-cog fa-2x"></i></button>

                    <button type="button" class="edit-modal table-warning-e btn btn-warning btn-sm btn-center p-edit"
                    data-id="{{ $ens->enseignantID }}" data-nom="{{ $ens->Nom }}" data-prenom="{{ $ens->Prenom }}"
                        data-email="{{ $ens->Email }}" data-grade="{{ $ens->Grade }}" data-daterecrutement="{{ $ens->DateRecrutement }}" >
                        <i class="far fa-edit"></i></button>

                    <button type="button" class="delete-modal table-remove-b btn btn-danger btn-sm left-right-buttons btn-right" data-id="{{ $ens->enseignantID }}" data-nom="{{ $ens->Nom }}" data-Prenom="{{ $ens->Prenom }}"
                        data-email="{{ $ens->Email }}" data-grade="{{ $ens->Grade }}" data-daterecrutement="{{ $ens->DateRecrutement }}" >
                    <i class="far fa-trash-alt fa-2x"></i></button>
                </td>
            </tr>
            @empty

        @endforelse
    </tbody>
</table>-->
//vacataire table

<!-- end new table 

<div class="row d-flex justify-content-center modalWrapper">
        {{-- formulaire pour ajouter un enseignent vacataire --}}

</div>
<table id="dBasicExample" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
    <thead>
        <tr>
            <th class="font text-center pl-3 pr-3">Nom</th>
            <th class="font text-center pl-3 pr-3">Prenom </th>
            <th class="th-sm hidden">ID</th>
            <th class="font text-center pl-3 pr-3">Etablissement </th>
            <th class="font text-center pl-3 pr-3">NumT </th>
            <th class="font text-center  p-action">Action</th>
        </tr>
    </thead>
    <tbody>
        @foreach ($enseignentV as $ensv)
        <tr class="enseignentv{{ $ensv->enseignantVacataireID }} active-tab">
            <td>{{ $ensv->Nom }}</td>
            <td>{{ $ensv->Prenom }}</td>
            <td class="hidden">{{ $ensv->enseignantVacataireID }}</td>
            <td>{{ $ensv->etablisement }}</td>
            <td>{{ $ensv->numT }}</td> 
            <td>
                <button class="showEnsvA table-info-b btn btn-info btn-sm left-right-buttons btn-left"
                data-id="{{ $ensv->enseignantVacataireID }}"><i class='fas fa-info-circle fa-3x'></i></button>
                        <button type="button" class="edit-ensv table-warning-v btn btn-warning btn-sm btn-center p-edit"
                    data-id="{{ $ensv->enseignantVacataireID }}"" data-nom="{{ $ensv->Nom }}" data-prenom="{{ $ensv->Prenom }}"
                        data-email="{{ $ensv->Email }}" data-grade="{{ $ensv->grade }}" data-etablisement="{{ $ensv->etablisement }}"
                        data-num="{{ $ensv->numT }}" data-dated="{{ $ensv->dateDebut }}" data-datef="{{ $ensv->dateFin }}" >
                        <i class="far fa-edit"></i></button>


                    <button type="button" class="delete-ensv table-remove-b btn btn-danger btn-sm left-right-buttons btn-right" data-id="{{ $ensv->enseignantVacataireID }}"" data-nom="{{ $ensv->Nom }}" data-prenom="{{ $ensv->Prenom }}">
                    <i class="far fa-trash-alt fa-2x"></i></button>
            </td>

        </tr>

        @endforeach
    </tbody>
</table>-->