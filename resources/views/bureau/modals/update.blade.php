<!-- add Modal -->
<div class="modal fade" id="modalupdate" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
  aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="border border-warning modal-content bg-modal">
      <div class="modal-header text-white text-center">
        <h4 class="modal-title w-100 font-weight-bold">Modifier Un Bureau</h4>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <form id="updateForm" class="update-form">
        <div class="modal-body mx-3"> 
          <div id="update" class="text-center" style = 'height:15px;'>
          </div>
            <div class="md-form mb-5">
                <input type="text" id="numero" name='numero' autocomplete="off" class="text-white form-control validate">
                <label data-error="wrong" data-success="right" for="numero" class="active">Numéro</label>
            </div>
            <div class="md-form mb-5">
                <input type="number" id="Capacite" min="1" class="text-white form-control validate">
                <label data-error="wrong" data-success="right" for="Capacite" class="active">Capacité</label>
            </div>
            <div class="md-form mb-4">
                <input id="dateAcqui" type="date" name="dateAcqui" min="1" class="text-white form-control validate">
                <label data-error="wrong" data-success="right" for="dateAcqui" class="active">Date d’acquisition</label>
            </div>
        </div>
        <div class="modal-footer d-flex justify-content-center">
            <a id="modifier" type="button" class="btn btn-warning">Modifier</a>
            <a type="button" class="btn  btn-dark waves-effect" data-dismiss="modal">Annuler</a>
        </div>
      </form>
    </div>
  </div>
</div>
<!--<script type="module" src="/ts/gestionB/ajouter.js"></script>
  -->