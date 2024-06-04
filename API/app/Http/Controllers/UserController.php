<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use App\Traits\httpResponses;

class UserController extends Controller
{
    use httpResponses;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return User::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        return $this->response('Usuario criado com sucesso!', 200, new UserResource(User::create($request->all())));
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        // return $this->response('Dados do Usuario', 200, new UserResource($user));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }
}
