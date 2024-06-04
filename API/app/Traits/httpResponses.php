<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\MessageBag;
use Illuminate\Http\Resources\Json\JsonResource;

trait httpResponses
{
    public function response(string $message, string|int $status, array|Model|JsonResource $data = [])
    {
        return response()->json([
            'message' => $message,
            'status'  => $status,
            'data'    => $data
        ], $status);
    }

    public function error(string $message, string|int $status, array|MessageBag $erros = [], array $data = [])
    {
        return response()->json([
            'message' => $message,
            'status'  => $status,
            'erros'   => $erros,
            'data'    => $data
        ], $status);
    }
}
