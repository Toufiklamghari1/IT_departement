<!-- add Modal -->
<div class="modal fade" id="modalAdd" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
  aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="border border-success modal-content bg-modal">
      <div class="modal-header text-white text-center">
        <h4 class="modal-title w-100 font-weight-bold">Ajouter Un Bureau</h4>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <form id="addForm" class="add-form">
        <div class="modal-body mx-3">
          <div id="add" class="text-center" style = 'height:15px;'>
          </div>
          <div class="md-form mb-5">
            <input type="text" name="Numero" id="addForm_numero" autocomplete="off" class="text-white form-control validate">
            <label data-error="wrong" data-success="right" for="addForm_numero">Numéro</label>
          </div>
          <div class="md-form mb-5">
            <input type="number" name="Capacite" min="1" id="addForm_capacite" class="text-white form-control validate">
            <label data-error="wrong" data-success="right" for="Capacite">Capacité</label>
          </div>
          <div class="md-form mb-4">
            <input type="date" name="Date" id="addForm_date" require class="text-white form-control validate">
            <label data-error="wrong" data-success="right" for="addForm_date">Date d’acquisition</label>
          </div>
        </div>
        <div class="modal-footer d-flex justify-content-center">
        <button id="ajouter" type="button" class="btn btn-success">Ajouter</button>
        <a type="button" class="btn  btn-dark waves-effect" data-dismiss="modal">Annuler</a>
        </div>
      </form>
    </div>
  </div>
</div>
<!--<script type="module" src="/ts/gestionB/ajouter.js"></script>
  -->