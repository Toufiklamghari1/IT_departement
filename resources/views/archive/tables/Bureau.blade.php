<style>

</style>
<table id="archiveBureau" class="table table-bordered table-responsive-md table-striped ">
    <thead>
        <tr>
            <th class='w-1'></th>
            <th class="font text-center">Numéro du bureau </th>
            <th class="font text-center">Capacité </th>
            <th class="font text-center">Date d'Acquisition</th>
            <th class="text-center font">Etat </th>
        </tr>
    </thead>
    <tbody>
        {{ csrf_field() }}
        <input type="text" class="hidden" id="bureauID">
        @forelse ($bureau as $arc)
            <tr>
                <td>
                    <a type="button" class="showArcBu btn btn-primary btn-sm btn-center p-0 pt-2"
                    data-id="{{ $arc->num }}">
                    <i class='fas fa-info-circle'></i></a>
                </td>
                <td class="font-weight-normal">{{ $arc->num }}</td>
                <td class="font-weight-normal">{{ $arc->capacite }}</td>
                <td class="font-weight-normal">{{ $arc->dateAcquisition }}</td>
                <td class="text-center" id="{{ $arc->num }}">
                    <a class="dis-modal text-success text-center hidden" id="switch1{{ $arc->num }}" data-id="{{$arc->num}}"><i class="far fa-check-circle fa-3x"></i>
                    </a>
                    <a class="acti-modal text-danger text-center" id="switch2{{ $arc->num }}" data-id="{{$arc->num}}"> <i class="far fa-times-circle fa-3x"></i>
                    </a>
                </td>
            </tr>
            @empty

        @endforelse
    </tbody>
</table>
