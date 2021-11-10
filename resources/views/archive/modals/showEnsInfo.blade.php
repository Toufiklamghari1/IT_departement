{{-- modal show  --}}
<div class="modal fade addNewInputs" id="showArcEnsM" tabindex="-1" role="dialog" aria-labelledby="EnsV"
    aria-hidden="true">
<div class="modal-dialog modal-lg" role="document">
    <div class="modal-content" style="background-color:#212121">
        <div class="modal-header text-center bg-primary">
            <h4 class="modal-title w-100 font-weight-bold ml-5" id="nomAEns"></h4>
            <button type="button" class="close text-black" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <input type="text" id="idAEnsM" class="hidden">
            <div class="container" id="body-ensA">
                <div class="card">
                    <h3 class="card-header text-white text-center">Information Personnel </h3>
                    <div class="card-body">
                        <dl class="row">
                            <dt class="col-md-6 col-sm-6">Etat :</dt>
                            <dd class="col-md-6 col-sm-6" id="etatAs"></dd>
                            <dt class="col-md-4 col-sm-4">Email :</dt>
                            <dd class="col-md-8 col-sm-8" id="emailAs"></dd>
                            <dt class="col-md-6 col-sm-6">Grade :</dt>
                            <dd class="col-md-6 col-sm-6" id="gradeAs"></dd>
                            <dt class="col-md-6 col-sm-6">Date de recrutement :</dt>
                            <dd class="col-md-6 col-sm-6" id="dateAs"></dd>
                            <dt class="col-md-6 col-sm-6">Bureau :</dt>
                            <dd class="col-md-6 col-sm-6" id="bureauAs"></dd>
                        </dl>
                    </div>
                </div>
                <hr>
                <div class="card">
                    <h3 class="card-header text-white text-center">Material Affecté</h3>
                    <div class="card-body">
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
                                            <table id="tableMtI" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
                                                <thead>
                                                  <tr>
                                                    <th class="th-sm">Numero d'inventaire

                                                    </th>
                                                    <th class="th-sm">designation

                                                    </th>
                                                    <th class="th-sm">referance

                                                    </th>
                                                    <th class="th-sm">Quantité

                                                    </th>
                                                  </tr>
                                                </thead>
                                                <tbody id="tbodyMTIA">

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
                                            <table id="tableMEB" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
                                                <thead>
                                                  <tr>
                                                    <th class="th-sm">Numero d'inventaire

                                                    </th>
                                                    <th class="th-sm">designation

                                                    </th>
                                                    <th class="th-sm">referance

                                                    </th>
                                                    <th class="th-sm">Quantité

                                                    </th>
                                                  </tr>
                                                </thead>
                                                <tbody id="tbodyMEBA">

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
            <div class="container" id="body-ensAv">
                <div class="card">
                    <h3 class="card-header text-white text-center">Information Personnel </h3>
                    <div class="card-body">
                        <dl class="row">
                            <dt class="col-md-6 col-sm-6">Etat :</dt>
                            <dd class="col-md-6 col-sm-6" id="etatAvs"></dd>
                            <dt class="col-md-4 col-sm-4">Email :</dt>
                            <dd class="col-md-8 col-sm-8" id="emailAvs"></dd>
                            <dt class="col-md-6 col-sm-6">Grade :</dt>
                            <dd class="col-md-6 col-sm-6" id="gradeAvs"></dd>
                            <dt class="col-md-6 col-sm-6">Etablissement :</dt>
                            <dd class="col-md-6 col-sm-6" id="etabAvs"></dd>
                            <dt class="col-md-6 col-sm-6">Numero Telephone :</dt>
                            <dd class="col-md-6 col-sm-6" id="telAvs"></dd>
                            <dt class="col-md-6 col-sm-6">Date debut :</dt>
                            <dd class="col-md-6 col-sm-6" id="datedebutAs"></dd>
                            <dt class="col-md-6 col-sm-6">Date fin :</dt>
                            <dd class="col-md-6 col-sm-6" id="datefinA"></dd>
                        </dl>
                    </div>
                </div>
            </div>

        </div>
    </div>
</div>
</div>
{{-- end modal show --}}
