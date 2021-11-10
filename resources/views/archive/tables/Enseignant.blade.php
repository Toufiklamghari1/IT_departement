<table id="archiveEns" class="table table-bordered table-responsive-md table-striped ">
    <thead>
        <tr>
            <th class="th-sm hidden">ID  </th>
            <th class='w-1'></th>
            <th class="font text-center">Nom </th>
            <th class="font text-center">Prenom </th>
            <th class="font text-center">Email</th>
            <th class="text-center font p-action">Action</th>
        </tr>
    </thead>
    <tbody>
        <input type="text" id="ensID" class="hidden">
        {{ csrf_field() }}
        @forelse ($archive as $arc)
            <tr class="enseignent{{$arc->enseignantID}} active-tab">
                <td>
                    <a type="button" class="showArcEns btn btn-primary btn-sm btn-center p-0 pt-2"
                    data-id="{{ $arc->enseignantID }}">
                    <i class='fas fa-info-circle'></i></a>
                </td>
                <td class="font-weight-normal hidden">{{ $arc->enseignantID }}</td>
                <td class="font-weight-normal">{{ $arc->Nom }}</td>
                <td class="font-weight-normal">{{ $arc->Prenom }}</td>
                <td class="font-weight-normal">{{ $arc->Email }}</td>
                <td class="font-weight-normal">
                    <a class="disE-modal text-success text-center hidden" id="switch1{{ $arc->enseignantID }}" data-id="{{$arc->enseignantID}}"><i class="far fa-check-circle fa-3x"></i>
                    </a>
                    <a class="actiE-modal text-danger text-center" id="switch2{{ $arc->enseignantID }}" data-id="{{$arc->enseignantID}}"> <i class="far fa-times-circle fa-3x"></i>
                    </a>
                </td>
            </tr>
            @empty

        @endforelse
    </tbody>
</table>
