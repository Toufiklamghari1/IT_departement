
<div class="modal fade modalAffecterForm" id="modalAffecter" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
  aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="border border-info modal-content">
      <div class="modal-header text-center">
        <h4 class="modal-title w-100 font-weight-bold text-white">Affecter Bureau à Enseignant</h4>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div id="affectr" class="text-center" style = 'height:15px;'>
        </div>
        <div class="h5 text-center text-white" >
          <span>Bureau :  <span id='numBureau'></span></span>
        </div>
        <div class="affcter-msg">
          <span> Le nombre selectioner : <span id="nbr-select"></span> </span>
        </div>
        <table id="affecterTable" class="dataTable" width="100%">
          <!-- Table head -->
            <thead>
              <th class="text-center text-white " style="width:20px;">#</th>
                <th class="text-center text-white">Nom</th>
                <th class="text-center text-white">Prénom</th>
                <th class="text-center text-white">Bureau</th>
              </th>
            </thead>
            <tbody class=''>
              <?php
                
                $row = 0 ;
                if(isset($enseignants)){
                  foreach( $enseignants as $data ){
                    echo"
                      <tr id='".$row."'>
                        <td id='".$data->personID."' class='check-cell affecterTable' ><input class='check-box'  type='checkbox' id='check".$row."'><label class='label-size' for='check".$row."'></label></td>
                        <td><label>".$data->nom."</label></td>
                        <td><label>".$data->prenom."</label></td>
                        <td><label>".$data->bureauID."</label></td>
                      </tr>
                    ";
                    $row ++;
                  }
                }
              ?>
              
            </tbody>
        </table>
      </div>
      <div class="modal-footer d-flex justify-content-center">
        <button class="btn btn-info">Affecter</button>
        <a type="button" class="btn  btn-dark waves-effect" data-dismiss="modal">Annuler</a>
      </div>
    </div>
  </div>
</div>
