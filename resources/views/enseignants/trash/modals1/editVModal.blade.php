
{{-- edit an delete modal for enseignent vacataire--}}
<div id="EditME"class="modal fade" role="dialog">
    <div id="deleteME" class="modal-dialog">
        <div class="modal-content text-center">
            <div class="modal-header text-white">
                <h4 id="titleMV"class="modal-title"></h4>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div id="editVModal" class="modal-body">
                <div class=" editVMsg  result-msg">
                    <div class="text-center text-success hidden">Enseignant ajouté  <i class="far fa-check-circle"></i></div>
                    <div class="text-center text-danger hidden">Erreur  <i class="fas fa-exclamation"></i></div>
                    <div class="text-center text-white hidden">En cours.... <i class="fas fa-sync text-info"></i></div>
                    <div class="text-center text-success hidden">Enseignant supprimer  <i class="far fa-check-circle"></i></div>
                    <div class="text-center text-warning hidden">En cours.... <i class="fas fa-sync text-info"></i></div>
                </div>
                <form class="form-horizontalll" role="form">

                    <div class="">
                            <input type="text" id="ide" class="hidden">
                            <input type="email" id="inputemailv" class="hidden">
                            <input type="text" id="inputGradeev" class="hidden">
                        <div class="row">
                            <div class="md-form col-5 p-0 m-0 mr-4">
                                <input type="text" name="Nomev" id="inputNomev" class="form-control validate text-white" >
                                <label data-error="wrong" data-success="right" for="inputNomev">Nom</label>
                            </div>
                            <div class="md-form col-5 p-0 m-0">
                                <input type="text" name="Prenomev" id="inputPrenomev" class="form-control validate text-white" >
                                <label  data-success="right" for="inputPrenomev">Prenom</label>
                            </div>
                        </div>
                            <div class="row">
                                <div class="md-form md-form col-5 p-0 m-0 mr-1">
                                    <input type="text" name="Emailev" id="Emailev" class="form-control validate text-white" >
                                    <label  data-success="right" for="Emailev">Email</label>
                                </div>
                                <div class="md-form m-0 mr-1">
                                    <span type="text" class="form-control text-center text-white mt-2" style="border : 0px">@</span>
                                </div>
                                <div style="padding-top:14px;" >
                                    <select  id="selectAev">
                                        <option value="1">usmba.ac.ma</option>
                                        <option value="2">gmail.com</option>
                                        <option value="3">yahoo.com</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row">
                                <div class="md-form col-5 p-0 m-0 ">
                                    <input type="text" id="inputEtabe" name="Etabe" class="form-control validate text-white" >
                                    <label data-error="wrong" data-success="right" for="inputEtabe">Etablissement</label>
                                </div>
                                <div class="ml-4"  style="padding-top:15px;" >
                                    <select id="selectGev">
                                        <option value="1">PESA</option>
                                        <option value="2">PH</option>
                                        <option value="3">PES</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row">
                                <div class="md-form col-5 p-0 m-0">
                                    <input type="Number" id="inputTele" name="Tele" class="form-control validate text-white"  >
                                    <label data-error="wrong" data-success="right" for="inputTele">Numéro de telephone</label>
                                </div>
                            </div>
                            <div class="h-5 row">
                                <div class="md-form col-5 p-0 mb-0 mr-4">
                                    <input type="date" id="inputPerv" autocomplete="off" name="Per" class=" m-0 form-control validate text-white" >
                                    <label data-error="wrong" data-success="right" for="inputPer">Date début</label>
                                </div>
                                <div class="md-form col-5 p-0 mb-0">
                                    <input type="date" id="inputdfv" autocomplete="off" name="df" class="m-0 form-control validate text-white" >
                                    <label data-error="wrong" data-success="right" for="inputdfv">Date Fin</label>

                                </div>
                            </div>
                    </div>
 
            </form>
                {{-- Form Delete Post --}}
                <div class="deleteContentE text-white">
                    <i class="fas fa-times fa-4x animated rotateIn"></i>
                    <div> êtes-vous sûr de vouloir supprimer <br> Le vacataire  <span class="titlee h5 text-warning"></span> ? </div>
                    <span class="hidden ide"></span>
                </div>

            </div>
            <div class="modal-footer flex-center">

                <button type="button" class="btn actionBtnE btn-sE" data-dismiss="modal">
                    <span id="footer_action_buttonE" class="far"></span>
                </button>

                <button type="button" class="btn btn-warning btn-sE" data-dismiss="modal">
                    <span></span>Fesrmer
                </button>

            </div>
        </div>
    </div>
</div>

{{-- end edit and delete modal --}}
