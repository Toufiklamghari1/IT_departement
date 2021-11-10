<!-- Add Ens Vacataire -->
<div class="modal fade addNewInputs" id="EnsV" tabindex="-1" role="dialog" aria-labelledby="EnsV" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="border border-success modal-content bg-modal">
            <div class="modal-header text-center text-white">
                <h4 class="modal-title w-100 font-weight-bold">Ajouter Enseignant Vacataire</h4>
                <button type="button" class="close text-black" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
                    <div id="addVModal" class="modal-body mx-3 pl-4">
                        <div class=" addVMsg  result-msg">
                            <div class="text-center text-success hidden">Enseignant vacataire ajouté  <i class="far fa-check-circle"></i></div>
                            <div class="text-center text-danger hidden">Erreur  <i class="fas fa-exclamation"></i></div>
                            <div class="text-center text-white hidden">En cours.... <i class="fas fa-sync text-info"></i></div>
                        </div>
                        <!-- <div class="hid mb-5 hidden">
                            <h3 class="text-center alert alert-success">Enseignant Ajouté <i class="far fa-check-circle"></i></h3>
                        </div> -->
                <form id="resetv">
                    <form id="addVForm">
                        <div class="row">
                            <div class="md-form  col-5 p-0 mr-5 mb-0">
                                <input type="text" name="Nomv" id="inputNomv" autocomplete="off" class="form-control validate text-white" required>
                                <label data-error="wrong" data-success="right" for="inputNomv">Nom</label>
                            </div>
                            <div class="md-form col-5 p-0 mb-0">
                                <input type="text" name="Prenomv" id="inputPrenomv" autocomplete="off" class="form-control validate text-white" required>
                                <label  data-success="right" for="inputPrenomv">Prenom</label>
                            </div>
                        </div>
                        <div class="h-5 row">
                            <div class="md-form col-4 p-0 m-0">
                                <input type="text" name="Emailv" id="Emailv" autocomplete="off" class="form-control validate text-white" required>
                                <label data-error="wrong" data-success="right" for="Emailv">exemple.exo</label>
                            </div>
                            <div class="md-form col-2 m-0">
                                <span type="text" class="form-control text-center text-white mt-1" style="border : 0px">@</span>
                            </div>
                            <div  style="padding-top:13px;">
                                <select class="md-form m-0" id="selectAv">
                                    <option value="1">usmba.ac.ma</option>
                                    <option value="2">gmail.com</option>
                                    <option value="3">yahoo.com</option>
                                </select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="md-form col-5 p-0 mb-0">
                                <input type="text" id="inputEtab" name="Etab" class="form-control validate text-white">
                                <label data-error="wrong" data-success="right" for="inputEtab">Etablissement</label>
                            </div>
                            <div class="ml-4"  style="padding-top:15px;">
                                <select  id="selectGv">
                                    <option></option>
                                    <option>PESA</option>
                                    <option>PH</option>
                                    <option>PES</option>
                                    <option>PHD</option>
                                </select>
                            </div>
                        </div>
                        <div class="h-5 row">
                            <div class="md-form col-6 p-0 mb-0">
                                <input type="number" id="inputTel"  name="Tel" class="form-control validate text-white">
                                <label data-error="wrong" data-success="right" for="inputTel">Numero de Télephone</label>
                            </div>
                        </div>
                        <div class="h-5 row">
                            <div class="md-form col-5 p-0 mb-0 mr-3">
                                <input type="date" id="inputPer" autocomplete="off" name="Per" class="form-control validate text-white">
                                <label data-error="wrong" data-success="right" for="inputPer">Date début</label>
                            </div>
                            <div class="md-form col-5 p-0 mb-0 ml-1">
                                <input type="date" id="inputdf" autocomplete="off" name="df" class="form-control validate text-white">
                                <label data-error="wrong" data-success="right" for="inputdf">Date Fin</label>

                            </div>
                        </div>

                    </div>
                    </form>
            </form>
                    <div class="modal-footer d-flex justify-content-center buttonAddFormWrapper">
                        <button class="btn  btn-success buttonAdd" onclick="storeV()">Ajouter</button>
                        <button class="btn btn-dark waves-effect" data-dismiss="modal">Annuler</button>

                    </div>

            </div>
        </div>
</div>