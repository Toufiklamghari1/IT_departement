<!-- Add Ens -->
<div class="modal fade addNewInputs border-success modalAdd" id="modalAdd" tabindex="-1" role="dialog" aria-labelledby="modalAdd"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="border border-success modal-content bg-modal">
            <div class="modal-header text-center text-white">
                <h4 class="modal-title w-100 font-weight-bold">Ajouter Enseignent</h4>
                <button type="button" class="close text-black" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            {{-- <form action="{{ route('enseignent.store') }}" method="POST"> --}}
            <form class="form-horizontal p-3" role="form" id="reset">

                    <div class="modal-body" id='addEModal'>
                        <div class=" addEMsg  result-msg">
                            <div class="text-center text-success hidden">Enseignant ajouté  <i class="far fa-check-circle"></i></div>
                            <div class="text-center text-danger hidden">Erreur  <i class="fas fa-exclamation"></i></div>
                            <div class="text-center text-white hidden">En cours.... <i class="fas fa-sync text-info"></i></div>
                        </div>
                        @foreach ($maxID as $id)
                        <input type="text" class="hidden" id="maxid" value="{{ $id->id }}">

                        @endforeach

                        <!-- <div id="hid" class="md-form mb-5 " style='display: none;' >
                            l'enseignent <span class="text-center text-success" id="title"></span> est ajouté
                        </div> -->
                        <form class="addEForm">
                            <div class="row">
                                <div class="md-form col-5 p-0 mr-5">
                                    <input type="text" name="Nom" id="inputNom" autocomplete="off" class="form-control validate text-white" required>
                                    <label data-error="wrong" data-success="right" for="inputNom">Nom</label>
                                    <p class="error text-center alert alert-danger hidden"></p>
                                </div>
                                <div class="md-form col-5 p-0">
                                    <input type="text" name="Prenom" autocomplete="off" id="inputPrenom" class="form-control validate text-white" required>
                                    <label  data-success="right" for="inputPrenom">Prenom</label>
                                    <p class="error text-center alert alert-danger hidden"></p>
                                </div>
                            </div>
                            <div class="row h-5">
                                <div class="md-form col-4 p-0 m-0">
                                    <input type="text" name="Email" autocomplete="off" id="Email" class="form-control validate text-white" required>
                                        <label data-error="wrong" data-success="right" for="Email">Email</label>
                                        <p class="error text-center alert alert-danger hidden"></p>
                                </div>
                            <div class="md-form col-2 m-0">
                                <span type="text" class="form-control text-center text-white mt-1" style="border : 0px">@</span>
                            </div>
                                <div class="md-form m-0" style="padding-top:13px;">
                                    <select class="custom-select selectop" id="selectA">
                                        <option value="1">usmba.ac.ma</option>
                                        <option value="2">gmail.com</option>
                                        <option value="3">yahoo.com</option>
                                    </select>
                                </div>
                                <p class="error text-center alert alert-danger hidden"></p>
                            </div>
                            <div class="row h-5">
                                <div class=" md-form  m-2">
                                    <select class="custom-select selectop" id="selectG" placeholder="Grade">
                                        <option></option>
                                        <option>PESA</option>
                                        <option>PH</option>
                                        <option>PES</option>
                                    </select>
                                    <p class="error text-center alert alert-danger hidden"></p>
                                </div>
                                <div class="md-form">
                                    <select class="custom-select selectop" id="selectB" plaseholder="lite des Bureaux">
                                        <option></option>
                                        @foreach ($bureaux as $bur)
                                            <option id="{{ $bur->Num }}2">{{ $bur->Num }} nb places : <span id="nb_place">{{ $bur->Capacite - $bur->nb_ens }}</span> </option>
                                        @endforeach

                                    </select>
                                </div>
                            </div>
                            <div class="md-form">
                                    <input type="date" id="inputDateDeRecrutement" name="DateDeRecrutement" class="form-control text-white"  required>
                                    <label data-error="wrong" data-success="right" for="inputDateDeRecrutement">Date de Recrutement</label>
                                    <p class="error text-center alert alert-danger hidden"></p>
                            </div>
                        </form>
                    </div>
            </form>
                    <div class="modal-footer d-flex justify-content-center buttonAddFormWrapper">
                        <button class="btn btn-success buttonAdd z-depth-5" onclick="store()">Ajouter </button>
                        <button class="btn btn-dark waves-effect" data-dismiss="modal">Annuler</button>
                        </button>

                    </div>
        </div>
    </div>
</div>
