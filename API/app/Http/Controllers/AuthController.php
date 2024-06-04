<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Traits\HttpResponses;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    use httpResponses;

    public function login(Request $request)
    {
        if (Auth::attempt($request->only('email', 'password')))
            return $this->response('Authorized', 200, [
                'token' => $request->user()->createToken('Access')->plainTextToken,
            ]);

        return $this->response('Not Authorized', 403);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return $this->response('Token Revoked', 200);
    }

    public function me(Request $request)
    {
        return $this->response('Dados do usuario autenticado', 200, new UserResource(auth()->user()));
    }
}
