<table id="equipement" class="table table-bordered table-responsive-md table-striped text-center table3">
    <thead>
        <tr>
            <th class="text-center font">Désignation</th>
            <th class="text-center font">Reference</th>
            <th class="text-center font">Num d'inventaire</th>
            <th class="text-center font w-date">Date d’acquisition</th>
            <th class="text-center font p-action">Action</th>
        </tr>
    </thead>
    <tbody>
        <?php
        $row=0;
        if(isset($equipementbureau))
        foreach($equipementbureau as $data){ 
        echo"
        <tr id='".$row."'> 
          <td class='pt-3-half' >". $data->designation ."</td>
          <td class='pt-3-half' >". $data->ref ."</td>
          <td class='pt-3-half' >". $data->numInventaire ."</td>
          <td class='pt-3-half' >". $data->dateAcquisition ."</td>
          <td >
            <span class='affecter-btn'><button type='button' class='btn btn-info btn-sm left-right-buttons btn-left' data-toggle='modal' data-target='#modalAffecter'><i class='fas fa-users-cog fa-2x'></i></button></span>
            <span class='edit-btn'><button type='button' class='btn btn-warning btn-sm btn-center p-edit'  data-toggle='modal' data-target='#modalUpdate'><i class='far fa-edit'></i></button></span>
            <span class='remove-btn'><button type='button' class='btn btn-danger btn-sm left-right-buttons btn-right' data-toggle='modal' data-target='#modalRemove'><i class='far fa-trash-alt fa-2x'></i></button></span>
          </td></tr>";
          $row++;
        }
    ?>
    </tbody>
</table>