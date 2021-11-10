
<table id="enseignant" class="table table-bordered table-responsive-md table-striped text-center table3">
    <thead>
        <tr>
            <th class='w-1 text-center font'>Info</th>
            <th class="text-center font">Nom</th>
            <th class="text-center font">Prenom</th>
            <th class="text-center font w-date">Date de recrutement </th>
            <th class="text-center font p-action">Action</th>
        </tr>
    </thead>
    <tbody>
        <?php
        $row=0;
        if(isset($enseignant))
        foreach($enseignant as $data){ 
        echo"
        <tr id='".$row."'> 
          <td>
              <button type='button' class='details-btn details btn btn-primary btn-sm btn-center p-1' data-toggle='modal' data-target='#modalDetails'>
                  <i class='fas fa-info-circle'></i></button>
          </td>
          <td class='pt-3-half' >". $data->Nom ."</td>
          <td class='pt-3-half' >". $data->Prenom ."</td>
          <td class='pt-3-half' >". $data->DateRecrutement ."</td>
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
