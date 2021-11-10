
{{-- modal show  --}}
    <div class="modal fade showModalHide addNewInputs" id="showensM" tabindex="-1" role="dialog" aria-labelledby="EnsV"
        aria-hidden="true">
        <div class="modal-dialog modal-lg border-info" role="document">
            <div class="modal-content">
                <div class="modal-header text-center text-white">
                    <h4 class="modal-title w-100 font-weight-bold ml-5" id="nomEns"></h4>
                    <button type="button" class="close text-black" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="showMsg  mx-3  result-msg ">
                        <div id='addSuccess' class="text-center text-success hidden">Restitution Réussite  <i class="far fa-check-circle"></i></div>
                        <div id='addError' class="text-center text-danger hidden">Erreur  <i class="fas fa-exclamation"></i></div>
                        <div id='addWork'  class="text-center text-white hidden">En cours.... <i class="fas fa-sync text-warning"></i></div>
                    </div>
                    <input type="text" id="idEnsM" class="hidden">
                    <div class="container" id="body-ens">
                        <div >
                            <h3 class="text-white text-center">Information Personnel </h3>
                            <div class="text-white ml-5 mr-5">
                                <dl class="row">
                                    <dt class="col-md-6 col-sm-6">Etat :</dt>
                                    <dd class="col-md-6 col-sm-6" id="etats"></dd>
                                    <dt class="col-md-4 col-sm-4">Email :</dt>
                                    <dd class="col-md-8 col-sm-8" id="emails"></dd>
                                    <dt class="col-md-6 col-sm-6">Grade :</dt>
                                    <dd class="col-md-6 col-sm-6" id="grades"></dd>
                                    <dt class="col-md-6 col-sm-6">Date de recrutement :</dt>
                                    <dd class="col-md-6 col-sm-6" id="dates"></dd>
                                    <dt class="col-md-6 col-sm-6">Bureau :</dt>
                                    <dd class="col-md-6 col-sm-6" id="bureaus"></dd>
                                </dl>
                            </div>
                        </div>
                        <hr>
                        <div>
                            <h3 class="text-white text-center">Material Affecté</h3>
                            <div class="text-white">
                                <ul class="nav nav-tabs" id="myTab" role="tablist">
                                    <li class="nav-item" role="presentation">
                                      <a class="nav-link active" id="MtI-tab" data-toggle="tab" href="#MtI" role="tab" aria-controls="MtI" aria-selected="true">Materiel Informatique</a>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                      <a class="nav-link" id="MEB-tab" data-toggle="tab" href="#MEB" role="tab" aria-controls="MEB" aria-selected="false">Equipement Bureau</a>
                                    </li>
                                   
                                  </ul>
                                  <div class="tab-content" id="myTabContent">
                                    <div class="tab-pane fade show active" id="MtI" role="tabpanel" aria-labelledby="MtI-tab">
                                        <div class="row z-depth-5 mt-3 p-0 ml-1">
                                            <div class="col-md-12">
                                                <div class="table-responsive">
                                                    <table id="tableMtI" class="dataTable" cellspacing="0" width="100%">
                                                        <thead>
                                                          <tr>
                                                            <th class="text-white text-center" style="width:20px;">#</th>
                                                            <th class="text-white text-center">designation</th>
                                                            <th class="text-white text-center">referance</th>
                                                            <th class="text-white text-center">Numero d'inventaire</th>
                                                          </tr>
                                                        </thead>
                                                        <tbody id="tbodyMTI">

                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="MEB" role="tabpanel" aria-labelledby="MEB-tab">
                                        <div class="row z-depth-5 mt-3 p-0 ml-1">
                                            <div class="col-md-12">
                                                <div class="table-responsive">
                                                    <table id="tableMEB" class="dataTable" cellspacing="0" width="100%">
                                                        <thead>
                                                          <tr>
                                                            <th class="text-white text-center" style="width:20px;">#</th>
                                                            <th class="text-white text-center">designation</th>
                                                            <th class="text-white text-center">referance</th>
                                                            <th class="text-white text-center">Numero d'inventaire </th>
                                                          </tr>
                                                        </thead>
                                                        <tbody id="tbodyMEB">

                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                  </div>


                            </div>
                        </div>


                    </div>
                    <div class="container" id="body-ensv">
                        <input type="text" id="idEnsvM" class="hidden">
                        <div class="card">
                            <h3 class="card-header text-white text-center">Information Personnel </h3>
                            <div class="card-body">
                                <dl class="row">
                                    <dt class="col-md-6 col-sm-6">Etat :</dt>
                                    <dd class="col-md-6 col-sm-6" id="etatvs"></dd>
                                    <dt class="col-md-4 col-sm-4">Email :</dt>
                                    <dd class="col-md-8 col-sm-8" id="emailvs"></dd>
                                    <dt class="col-md-6 col-sm-6">Grade :</dt>
                                    <dd class="col-md-6 col-sm-6" id="gradevs"></dd>
                                    <dt class="col-md-6 col-sm-6">Etablissement :</dt>
                                    <dd class="col-md-6 col-sm-6" id="etabvs"></dd>
                                    <dt class="col-md-6 col-sm-6">Numero Telephone :</dt>
                                    <dd class="col-md-6 col-sm-6" id="telvs"></dd>
                                    <dt class="col-md-6 col-sm-6">Date debut :</dt>
                                    <dd class="col-md-6 col-sm-6" id="datedebuts"></dd>
                                    <dt class="col-md-6 col-sm-6">Date fin :</dt>
                                    <dd class="col-md-6 col-sm-6" id="datefin"></dd>
                                </dl>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="modal-footer d-flex justify-content-center">
                    <button id="restituer" class="btn text-dark btn-warning hidden" onclick="restituerMaker()">Restituer</button>
                    <a type="button" class="btn  btn-dark waves-effect" data-dismiss="modal">Annuler</a>
                </div>
            </div>
        </div>
    </div>
{{-- end modal show --}}
