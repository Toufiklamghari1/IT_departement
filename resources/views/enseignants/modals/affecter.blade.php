<div class="modal fade " id="modalAffecter" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
    aria-hidden="true">
    <div class="modal-dialog " role="document">
        <div class="border border-info modal-content" style="width:600px !important">
            <div class="modal-header text-center">
                <h4 class="modal-title w-100 font-weight-bold text-white">Affecter Matériel Aux Enseignants</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="modal-body">
                    <div id="affecter" class="text-center" style='height:30px;'>
                    </div>
                    <div class="h4-responsive text-center text-white">
                        <span>Materiel : <span class="materiel-info"></span></span>
                    </div>
                    <div id="affecterMsg" class=" h3-responsive text-info text-center">
                    </div>
                    <table id="affecterTable" class="dataTable" width="100%">
                        <!-- Table head -->
                        <thead>
                            <td class="text-center text-white w-2 " style="width:20px;">#</td>
                            <td class="text-center text-white ">Nom</td>
                            <td class="text-center text-white">Prénom</td>
                            <td class="text-center text-white">Bureau</td>
                            <td class="text-center text-white hidden">Quantite</td>
                            <td class="text-center text-white">Partagé</td>
                            </th>
                        </thead>
                        <tbody>
                            <?php
                              /*$row = 0;
                              if (isset($enseignant))
                                foreach ($enseignant as $data) {
                                  echo "
                                  <tr id='" . $row . "'>
                                    <td class='check-cell' ><input class='check-box'  type='checkbox' id='check" . $row . "'><label class='label-size' for='check" . $row . "'></label></td>
                                    <td >" . $data->nom . "</td>
                                    <td>" . $data->prenom . "</td>
                                    <td>" . $data->num . "</td>
                                    <td class='inputQ hidden md-form w-1 text-center'><input type='number' name='Quntite' min='1' class='affecterQuantite m-auto text-white text-center form-control'></td>
                                    <td ><a disabled='true' class='is-shared p-0 bg-transparent white-text'><i class='far fa-circle'></i></a></td>
                                  </tr>";
                                  $row++;
                                }*/
                              ?>

                        </tbody>
                    </table>
                </div>
            </div>
            <div class="modal-footer d-flex justify-content-center">
                <button class="btn btn-info">Affecter</button>
                <a type="button" class="btn  btn-dark waves-effect" data-dismiss="modal">Annuler</a>
            </div>
        </div>
    </div>
</div>