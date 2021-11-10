<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Route::get('/gestion_materiel', 'GestionMController@index')->name('gestion_materiel');
Route::get('/gestion_enseignant', 'GestionEController@index')->name('gestion_enseignant');
Route::get('/gestion_bureau', 'GestionBController@index')->name('gestion_bureau');
Route::get('/archive', 'archiveEController@index')->name('archive');
// Route::get('/archive', 'archiveMController@index')->name('archive');
// Route::get('/archive', 'archiveBController@index')->name('archive');

// routes

Route::resource('/bureau', 'GestionBController');
Route::resource('/materiel', 'GestionMController');
Route::resource('/enseignant', 'GestionEController');
Route::resource('/enseignentV', 'EnseignentVacataireCon');
//Bureau
Route::get('/initList', 'GestionBController@initList');
//Materiel
Route::get('/getDesignations/{type}', 'GestionMController@getDesignations');
Route::get('/getReferences/{designationID}', 'GestionMController@getReferences');
Route::get('/getListes', 'GestionMController@getListes');
Route::put('/archiver/{type}', 'GestionMController@archiver');
// Enseignant
Route::get('/getListesEns', 'GestionEController@getListesEns');


// archive

// Route::resource('/archive', 'ArchiveController');
// Route::resource('/archiveMat', 'ArchiveMat');
// Route::resource('/archivebureau', 'ArchiveBureau');