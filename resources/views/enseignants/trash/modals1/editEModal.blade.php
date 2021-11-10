{{-- edit an delete modal for enseignent permanente--}}
<div id="myModal"class="modal fade" role="dialog">
    <div id="deleteM" class="modal-dialog">
        <div class="modal-content text-center">
            <div class="modal-header text-white">
                <h4 id="titleM" class="modal-title"></h4>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body">
                <form  class="form-horizontall" id="editform" role="form">
                    @csrf
                    @method('PATCH')
                    <div id='editEModal' class="modal-body">
                        <div class=" editEMsg  result-msg">
                            <div class="text-center text-success hidden">Enseignant ajouté  <i class="far fa-check-circle"></i></div>
                            <div class="text-center text-danger hidden">Erreur  <i class="fas fa-exclamation"></i></div>
                            <div class="text-center text-white hidden">En cours.... <i class="fas fa-sync text-info"></i></div>
                            <div class="text-center text-success hidden">Enseignant supprimer  <i class="far fa-check-circle"></i></div>
                            <div class="text-center text-warning hidden">En cours.... <i class="fas fa-sync text-info"></i></div>
                        </div>
                        <div class="hid  hidden">
                            <input type="text" name="finputID" id="ID">
                        </div>
                        <form id="editEForm">
                            <div class="row">
                                <div class="md-form col-5 p-0 m-0 mr-4">
                                    <input type="text" name="finputNom" id="finputNom" class="form-control validate  text-white" >
                                    <label data-error="wrong" data-success="right" for="finputNom">Nom</label>
                                </div>
                                <div class="md-form col-5 p-0 m-0 ">
                                    <input type="text" name="finputPrenom" id="finputPrenom" class="form-control validate  text-white" >
                                    <label  data-error="wrong" data-success="right" for="finputPrenom">Prenom</label>
                                </div>
                            </div>
                            <div class="md-form  hidden">
                                <input type="email" name="finputEmail" id="finputEmail" class="form-control validate  text-white" >
                            </div>
                            <div class="row">
                                <div class="md-form col-5  p-0 m-0 mr-1">
                                    <input type="text" name="fEmail" id="fEmail" class="form-control text-white" >
                                    <label data-error="wrong" data-success="right" for="fEmail">Email</label>
                                </div>
                                <div class="md-form p-0 m-0 mr-1">
                                    <span type="text" class="form-control text-center text-white mt-4 p-0" style="border : 0px">@</span>
                                </div>
                                <div  class="md-form m-0" style="padding-top:13px;">
                                    <select  id="selectAR">
                                        <option value="1">usmba.ac.ma</option>
                                        <option value="2">gmail.com</option>
                                        <option value="3">yahoo.com</option>
                                    </select>
                                </div>
                            </div>

                            <div class="row mt-2">
                                <div class="mt-2">
                                    <select class="custom-select selectop" id="selectGrade">
                                        <option value="2">PESA</option>
                                        <option value="3">PH</option>
                                        <option value="4">PES</option>
                                    </select>
                                </div>
                                <div class="hid hidden">
                                    <input type="text" name="finputGrade" id="finputGrade">
                                </div>
                            </div>
                            <div class="md-form col-6 p-0 m-0">
                                <input type="date" id="finputDateDeRecrutement" name="fDateDeRecrutement" class=" mt-4 form-control validate text-white">
                                <label data-error="wrong" data-success="right" for="finputDateDeRecrutement">Date de Recrutement</label>
                            </div>
                        </form>
                    </div>
                </form>
                {{-- Form Delete Post --}}
                <div class="deleteContent text-white">
                    <i class="fas fa-times fa-4x animated rotateIn"></i>
                    <div> êtes-vous sûr de vouloir supprimer<br> L'enseignant <span class="title h5 text-warning"></span> ? </div>
                    <span class="hidden id"></span>
                </div>

            </div>
            <div class="modal-footer flex-center">

                <button type="button" class="btn actionBtn btn-s" data-dismiss="modal">
                    <span id="footer_action_button" class="far"></span>
                </button>

                <button type="button" class="btn btn-warning btn-s" data-dismiss="modal">
                    <span></span>Fermer
                </button>

            </div>
        </div>
    </div>
</div>


{{-- end edit and delete modal --}}
