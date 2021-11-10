
<div class="modal fade affecterModalHide modalAffecterForm" id="modalAffecterForm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
  aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="border border-info modal-content">
      <div class="modal-header text-center">
        <h4 class="modal-title w-100 font-weight-bold text-white">Affecter Matriel à Enseignant</h4>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
          <div class="affecterMsg  mx-3  result-msg ">
            <div id='addSuccess' class="text-center text-success hidden">Affectation Réussite  <i class="far fa-check-circle"></i></div>
            <div id='addError' class="text-center text-danger hidden">Erreur  <i class="fas fa-exclamation"></i></div>
            <div id='addWork'  class="text-center text-white hidden">En cours.... <i class="fas fa-sync text-info"></i></div>
          </div>
        <div class="h5 text-center text-white" id='numBureau'>
          L'enseignant : Zahi  Azeddin
        </div>
        <ul class="nav" id="myTab" role="tablist">
            <li class="nav-item mt-1" role="presentation">
                <a class="nav-link" id="affecter1" data-toggle="tab" href="#tab1" 
                role="tab" aria-controls="matInfo" aria-selected="true" onclick="switchAffecter(2,1)">Materiel Informatique</a>
            </li>
            <li class="nav-item mt-1" role="presentation" >
                <a class="nav-link" id="affecter2" data-toggle="tab" href="#tab2" 
                role="tab" aria-controls="equipementB" aria-selected="false"  onclick="switchAffecter(1,2)">Equipement Bureau</a>
            </li>
        </ul>
        <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade  show active" id="tab1" role="tabpanel" aria-labelledby="name1"><div 
            class="table-responsive"><table id="matInfo" class="dataTable" width="100%">
          <!-- Table head -->
            <thead>
              <th class="text-center text-white " style="width:20px;">#</th>
                <th class="text-center text-white">Designation</th>
                <th class="text-center text-white">Reference</th>
                <th class="text-center text-white">Num d'inventaire</th>
              </th>
            </thead>
            <tbody id='affecterTableM'>
              <?php
                
                $row ="1" ;
                if(isset($materielInfo)){
                  foreach( $materielInfo as $data ){
                    echo"
                      <tr id='Mrow".$row."'>
                        <td id='m".$data->matID."' class='check-cell affecterTable' ><input class='check-box'  type='checkbox' id='maCheck".$row."'  onchange='isChecked(0,".$row.")'><label class='label-size' for='maCheck".$row."'></label></td>
                        <td><label>".$data->designation."</label></td>
                        <td><label>".$data->ref."</label></td>
                        <td><label>".$data->numInventaire."</label></td>
                      </tr>
                    ";
                    $row ++;
                  }
                }
              ?>
              
            </tbody>
        </table></div></div>
            <div class="tab-pane fade" id="tab2" role="tabpanel" aria-labelledby="name2"><div 
            class="table-responsive">
        <table id="EquipementBureau" class="dataTable" width="100%">
          <!-- Table head -->
            <thead>
              <th class="text-center text-white " style="width:20px;">#</th>
                <th class="text-center text-white">Designation</th>
                <th class="text-center text-white">Reference</th>
                <th class="text-center text-white">Num d'inventaire</th>
              </th>
            </thead>
            <tbody id='affecterTableE'>
              <?php
                
                $row ="1" ;
                if(isset($equipementB)){
                  foreach( $equipementB as $data ){
                    echo"
                      <tr id='Erow".$row."'>
                        <td id='m".$data->matID."' class='check-cell affecterTable' ><input class='check-box'  type='checkbox' id='eaCheck".$row."'  onchange='isChecked(1,".$row.")'><label class='label-size' for='eaCheck".$row."'></label></td>
                        <td><label>".$data->designation."</label></td>
                        <td><label>".$data->ref."</label></td>
                        <td><label>".$data->numInventaire."</label></td>
                      </tr>
                    ";
                    $row ++;
                  }
                }
              ?>
              
            </tbody>
        </table></div></div>
        </div>           
        
      </div>
      <div class="modal-footer d-flex justify-content-center">
        <button class="btn btn-info" onclick="affecterMaker()">Affecter</button>
        <a type="button" class="btn  btn-dark waves-effect" data-dismiss="modal">Annuler</a>
      </div>
    </div>
  </div>
</div>
